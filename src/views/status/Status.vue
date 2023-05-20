<template>
  <div class="w-75 mx-auto pt-12">

    <select class="status-select-box" name="" @change="changeStatus" >
      <option value="none" @click="changeStatus">Chose your Embassy</option>
      <option v-for="(embassySelect, index) in embassiesName" :value="embassySelect.id" @click="changeStatus(e)" >{{ embassySelect.name }}</option>
    </select>

    <div v-if="loadingStatus">
      <div class="w-100 mt-8">
        <div class="w-100 text-center">
          <div class="w-100">
            <p class="text-left text-h5 mt-8 w-100">Appointments:</p>
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
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="item in statusEmbassyData.apois"
                  :key="item.applicant_id"
              >
                <td class="text-center">{{ item.user.fullname }}</td>
                <td class="text-center">{{ item.appointment_number }}</td>
                <td class="text-center">{{ item.delay_from_today }}</td>
                <td class="text-center">{{ item.status }}</td>
                <td class="text-center">
                  <span class="text-blue">From</span>{{ item.take_from }}
                  <br>
                  <span class="text-blue">To</span>{{ item.take_to }}
                </td>
                <td class="text-center">
                  <div class="d-flex justify-center align-center">
                    <div v-if="item.fake" class="active-in-table"></div>
                    <div v-else class="inactive-in-table" ></div>
                  </div>
                </td>
              </tr>
              </tbody>
            </v-table>
            <!---------- table end ----------->
          </div>
        </div>
        <!--------days card start--------->
        <div class="w-100">
          <div class="w-100">
            <p class="text-left text-h5 mt-8 w-100">Available Times and Dates:</p>
              <v-sheet class="d-flex flex-wrap justify-center mt-8 rounded-lg bg-inherit">
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
          </div>
        </div>
        <!--------days card End--------->

        <!----- best time start ----->
        <div class="w-100">
          <div class="best-time-today position-relative pa-4" @click="timem">
            <section>
              <p class="w-100 text-h6">Best time for today</p>
              <br>
              <p class="w-100 text-h6">{{ statusEmbassyData.best_time_today_found.best_time_today}}</p>
              <br>
              <p class="w-100 text-h6">{{ todayBestTime }}</p>
            </section>
            <div class="position-absolute"></div>
          </div>
        </div>
        <!----- best time End ----->

        {{statusEmbassyData}}
      </div>
    </div>
    <div v-else class="w-100 mt-8 text-center text-h3">
      Please Select your Embassy
    </div>

  </div>
</template>

<script setup>

import {onMounted, reactive, ref, watch} from "vue";
import {axios} from "../../store/index.js";

const selectBoxEmbassy = ref("")
const loading = ref(false);
var allStatusData = reactive([]);
var statusEmbassyData = reactive([]);
const embassiesName = reactive([
  {name: "ddd", id:1},
  {name: "dd33d", id:2}
]);

var todayBestTime = null;

onMounted(() => {
  loading.value = true;

  axios.get("stat/us", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  }).then(res => {
    console.log(res.data);
    allStatusData = res.data
    allStatusData.forEach((item) => {
      embassiesName.push({name: item.embassy_id.name, id: item.embassy_id._id})
    })
    console.log(embassiesName)
    allStatusData = res.data;
  }).catch(err => {
    console.log(err);
  })

  console.log("after something")

})

const loadingStatus = ref(false)

const changeStatus = (e) => {

  loadingStatus.value = false;

  allStatusData.forEach(item => {
    if (item.embassy_id._id === e.target.value) {
      statusEmbassyData = item;
      console.log(item)
      loadingStatus.value = true;
    }
  })

  const timem = () => {
    const timestamp = statusEmbassyData.best_time_today_found.timestampt

    var date = new Date(timestamp * 1000);
// Hours part from the timestamp
    var hours = date.getHours();
// Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    todayBestTime = formattedTime
    console.log(formattedTime);
  }

  timem();

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
}
.avbl-box:hover {
  background: white;
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
.box-wrapper:hover {
  background: lightgray !important;
}

.status-select-box:focus {
  border: none;
  outline: none;
}

</style>

