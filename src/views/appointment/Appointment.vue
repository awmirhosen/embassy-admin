<template>

  <div class="w-100">
    <!---------heading title---------------->
    <div class="d-flex justify-space-between align-center pa-4 ">
      <p class="text-h4 w-100 ms-5 mt-3">Appointment</p>
    </div>

    <!----------------------width 75 % wrapper------------------------>
    <div class="w-75 mx-auto mt-5">
      <!-------------start table of users-------------->
      <v-table class="mt-4 rounded-lg border">
        <thead class="bg-black" >
        <tr>
          <th class="text-center text-white">
            Embassy
          </th>
          <th class="text-center text-white">
            Credential username
          </th>
          <th class="text-center text-white">
            Delay from today
          </th>
          <th class="text-center text-white">
            Date
          </th>
          <th class="text-center text-white">
            Ready
          </th>
          <th class="text-center text-white">
            Fake
          </th>
          <th class="text-center text-white">
            Action
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in appointmentStore.allAppointment"
            :key="item.name"
        >
          <td class="text-center">{{ item.applicant_id.embassy_id.name }}</td>
          <td class="text-center">{{ item.applicant_id.credentials_id.credentials.username }}</td>
          <td class="text-center">{{ item.delay_from_today }}</td>
          <td class="text-center">
            <span class="text-blue">From</span>{{ item.take_from }}
            <br>
            <span class="text-blue">To</span>{{ item.take_to }}
          </td>
          <td class="text-center">
            <div class="d-flex justify-center align-center">
              <div v-if="item.is_ready_to_schedule" class="active-in-table"></div>
              <div v-else class="inactive-in-table" ></div>
            </div>
          </td>
          <td class="text-center">
            <div class="d-flex justify-center align-center">
              <div v-if="!item.fake" class="active-in-table"></div>
              <div v-else class="inactive-in-table" ></div>
            </div>
          </td>
          <td class="text-center d-flex align-center justify-center">
            <div class="mx-2 cursor-pointer">
              <v-icon icon="mdi-pencil" color="blue" @click="editAppointment(`${item._id}`)"></v-icon>
            </div>
            <div class="mx-2 cursor-pointer">
              <v-icon icon="mdi-delete-forever-outline" @click="deleteAppointment(item._id)" color="red"></v-icon>
            </div>
          </td>
        </tr>
        </tbody>

      </v-table>
      <!-------------End table of users-------------->
      <div class="text-center mt-8">
        <v-progress-circular v-if="loading" indeterminate :size="70" :width="10"></v-progress-circular>
      </div>

    </div>
  </div>

</template>

<script setup>


import {ref} from "vue";
import {useAppointmentStore} from "../../store/appointment";
import swal from 'sweetalert2';
import {axios} from "../../store/index.js";
import {useRouter} from "vue-router";

const loading = ref(true);
const router = useRouter();

window.Swal = swal;

const appointmentStore = useAppointmentStore();

appointmentStore.fetchAllApplicant(loading);

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

      axios.delete(`appointment/us/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
      }).then(res => {
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

const editAppointment = (id) => {
  router.push(`/appointment/${id}`)
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
.cursor-pointer {
  cursor: pointer;
}

</style>