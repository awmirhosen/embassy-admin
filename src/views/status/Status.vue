<template>

  <div class="w-100 pt-10 text-center" v-if="loading" >
    <v-progress-circular indeterminate :size="125" :width="7"></v-progress-circular>
    <p class="text-h3 mt-4">This Request can take a while</p>
  </div>

  <div class="w-75 mx-auto pt-12" v-else>

    <select class="status-select-box" name="" @change="changeStatus" >
      <option value="none" @click="changeStatus">Chose your Embassy</option>
      <option v-for="(embassySelect, index) in statusStore.embassiesName" :key="index" :value="embassySelect.id" @click="changeStatus(e)" >{{ embassySelect.name }}</option>
    </select>

    <div v-if="loadingStatus">
      <div class="w-100 mt-8">
        <div class="w-100 text-center">
          <div class="w-100">
            <div class="d-flex">
              <p class="text-left mx-3 text-h5 mt-8 w-100">Appointments:</p>
              <p class="text-left mx-3 text-h5 mt-8 w-100" @click="fakeFilter">Fake</p>
            </div>
            <!-----------table of appointment started------------->
            <v-table class="mt-4 rounded-lg">
              <thead class="bg-black">
              <tr>
                <th class="text-center text-white">
                  Credential username
                </th>
                <th class="text-center text-white">
                  Appointment Number
                </th>
                <th class="text-center text-white">
                  Delay From Today
                </th>
                <th class="text-center text-white">
                  status
                </th>
                <th class="text-center text-white">
                  date
                </th>
                <th class="text-center text-white">
                  fake
                </th>
                <th class="text-center text-white">
                  Action
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="embassyData in statusStore.statusEmbassyData.apois"
                  :key="embassyData.applicant_id"
              >
                <td class="text-center">{{ embassyData.user.fullname }}</td>
                <td class="text-center">{{ embassyData.appointment_number }}</td>
                <td class="text-center">{{ embassyData.delay_from_today }}</td>
                <td class="text-center">{{ embassyData.status }}</td>
                <td class="text-center">
                  <span class="text-blue">From</span>{{ embassyData.take_from }}
                  <br>
                  <span class="text-blue">To</span>{{ embassyData.take_to }}
                </td>
                <td class="text-center">
                  <div class="d-flex justify-center align-center">
                    <div v-if="!embassyData.fake" class="active-in-table"></div>
                    <div v-else class="inactive-in-table" ></div>
                  </div>
                </td>
                <td class="text-center d-flex align-center justify-center">
                  <div class="mx-2 cursor-pointer">
                    <v-icon icon="mdi-pencil" color="blue" @click="editAppointment(embassyData._id, embassyData.take_from, embassyData.take_to, embassyData.delay_from_today, embassyData.status, embassyData.fake)"></v-icon>
                  </div>
                  <div class="mx-2 cursor-pointer">
                    <v-icon icon="mdi-delete-forever-outline" @click="deleteAppointment(embassyData._id)" color="red"></v-icon>
                  </div>
                </td>
              </tr>
              </tbody>
            </v-table>
            <!---------- table end ----------->
          </div>
        </div>

        <!----- best time and block start ----->
        <div class="w-100 mt-8 d-flex justify-center">
          <div class="best-time-today mx-4 position-relative pa-4">
            <section>
              <p class="w-100 text-h6">Best time for today</p>
              <br>
              <p class="w-100 text-h6">{{ statusStore.statusEmbassyData.best_time_today_found.best_time_today}}</p>
              <br>
              <p class="w-100 text-h6">{{ todayBestTime }}</p>
            </section>
            <div class="position-absolute"></div>
          </div>
          <div class="best-time-today mx-4 position-relative pa-4" @click="lastBlocked(1639172876)" >
            <section>
              <p class="w-100 text-h6">Last Time Blocked</p>
              <br>
              <div class="w-100" v-if="!blockTimeFlag">
                <p class="w-100 text-h6">{{ lastBlockTime.time}} ago</p>
              </div>
              <div class="w-100" v-else>
                <p class="w-100 text-h6 text-green">None</p>
              </div>
            </section>
            <div class="position-absolute"></div>
          </div>
        </div>
        <!----- best time and block End ----->

        <!------days card start------->
        <div class="w-100">
          <div class="w-100">
            <p class="text-left text-h5 mt-8 w-100">Available Times and Dates:</p>
              <v-sheet class="d-flex flex-wrap justify-center mt-8 rounded-lg bg-inherit" v-if="Array.isArray(statusEmbassyData.avbls)">
                <v-sheet
                    v-for="(item, index) in statusEmbassyData.avbls"
                    :key="index"
                    class="ma-2 pa-2 box-wrapper"
                >
                  <div class="avbl-box">
                    <div class="w-100 text-center">
                       {{ item.date }}
                    </div>
                  </div>
                </v-sheet>
              </v-sheet>
            <div class="w-100 mt-4 bg-black pa-2 rounded-lg" v-else>
              <p class="w-100 text-center text-h6 text-red">There is No Available Data</p>
            </div>
          </div>
        </div>
        <!------days card End------->

      </div>
    </div>
    <div v-else class="w-100 mt-8 text-center text-h3">
      Please Select your Embassy
    </div>

  </div>

  <div class="w-100 text-center text-red mt-10 text-red text-h6" v-if="errMessage">
    We have some error here!
  </div>

</template>

<script setup>

import {onMounted, reactive, ref, watch} from "vue";
import {axios} from "../../store/index.js";
import {useRoute, useRouter} from "vue-router";
import swal from "sweetalert2";
import {useStatusStore} from "../../store/status.js";

const loading = ref(true);
const errMessage = ref(false);

const statusStore = useStatusStore();

// all status data in mounted function call
var allStatusData = reactive([]);
var statusEmbassyData = reactive([]);
const embassiesName = reactive([]);
const loadingStatus = ref(false)

const lastBlockTime = reactive({
  years: "",
  month: "",
  days: "",
  hours: "",
  time: "",
})
var todayBestTime = null;
const blockTimeFlag = ref(false)
// swal config
window.Swal = swal;

const lastBlocked = (date) => {
  console.log("current date",new Date().getTime())
  console.log("input date", date)
  let seconds = Math.floor(( new Date().getTime() - (date * 1000 ) ) / 1000);
  console.log("seconds", seconds);
  console.log(new Date() - date);

  let interval = seconds / 31536000;

  if (interval > 1) {
    lastBlockTime.time = Math.floor(interval) + " years";
    return;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    lastBlockTime.time = Math.floor(interval) + " month"
    return;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    lastBlockTime.time = Math.floor(interval) + " days"
    return;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    lastBlockTime.time = Math.floor(interval) + " hours"
    return;
  }
  interval = seconds / 60;
  if (interval > 1) {
    lastBlockTime.time = Math.floor(interval) + " Minutes"
    console.log(lastBlockTime.time)
    return;
  }
  interval = seconds / 2;
  if (interval > 1) {
    lastBlockTime.time = Math.floor(interval) + " Seconds"
  }

  console.log(lastBlockTime.time)

}

onMounted(() => {
  loading.value = true;
  statusStore.fetchAllStatus(loading, errMessage);
})

const changeStatus = (e) => {
  
  loadingStatus.value = false;
  // console.log(e.target.value)

  statusStore.allStatusData.forEach(item => {
    if (item.embassy_id._id === e.target.value) {
      statusStore.statusEmbassyData = item;
      // appointmentDataTable = statusEmbassyData.apois
      console.log(statusEmbassyData)
      loadingStatus.value = true;
    }
  })

  const timem = () => {
    const timestamp = statusStore.statusEmbassyData.best_time_today_found.timestampt
    var date = new Date(timestamp * 1000);
// Hours part from the timestamp
    var hours = date.getHours();
// Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
    todayBestTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  }
  timem();

  if (statusStore.statusEmbassyData.lastBlockTime !== 0) {
    lastBlocked(statusStore.statusEmbassyData.lastBlockTime)
  }else {
    blockTimeFlag.value = true;
  }

}

const router = useRouter();

const deleteAppointment = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {

      axios.delete(`appointment/us/${id}`).then(res => {
        console.log(res)
        Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
        )
      }).catch(err => {
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      })
    }
  })
}

const editAppointment = (id, take_from, take_to, delay_from_today, status, fake) => {
  if (take_to === "") {
    take_to = null
  }
  if (take_from === "") {
    take_from === null
  }
  router.push(`/appointment/${id}/${take_from}/${take_to}/${delay_from_today}/${status}/${fake}`)
}

</script>

<style scoped>

.active-in-table {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: green;
}
.inactive-in-table {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: red;
}
.avbl-box {
  width: 150px;
  height: 60px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: all linear 300ms;
}
.avbl-box:hover {
  background: #eeeeee;
}
.bg-inherit {
  background: inherit !important;
}

.best-time-today {
  width: 300px;
  height: 200px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
}
.best-time-today > div {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(to top, white, lightblue);
  top: 50%;
  right:-10%;
}

.status-select-box {
  width: 100%;
  border: none;
  border-radius: 6px;
  padding: 15px;
  background: white;
  box-shadow: 4px 4px 10px rgba(0,0,0,0.4);
}
.box-wrapper {
  transition: all linear 200ms;
  border-radius: 12px;
}

.status-select-box:focus {
  border: none;
  outline: none;
}

</style>

