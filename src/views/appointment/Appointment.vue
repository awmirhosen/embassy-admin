<template>

  <!---------heading title---------------->
  <div class="d-flex justify-space-between align-center pa-4 ">
    <p class="text-h4 w-100 ms-5 mt-3">Appointment</p>
  </div>

  <!----------------------width 75 % wrapper------------------------>
  <div class="w-75 mx-auto mt-5">
    <!-------------start table of users-------------->
    <v-table class="mt-4">
      <thead>
      <tr>
        <th class="text-center">
          Embassy
        </th>
        <th class="text-center">
          Credential username
        </th>
        <th class="text-center">
          Delay from today
        </th>
        <th class="text-center">
          Date
        </th>
        <th class="text-center">
          Ready
        </th>
        <th class="text-center">
          Fake
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
            <div v-if="item.fake" class="active-in-table"></div>
            <div v-else class="inactive-in-table" ></div>
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


</template>

<script setup>


import {ref} from "vue";
import {usePlatformStore} from "../../store/platform";
import {useApplicantStore} from "../../store/applicant";
import {useAppointmentStore} from "../../store/appointment";

const loading = ref(true)

const appointmentStore = useAppointmentStore();

appointmentStore.fetchAllApplicant(loading);


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
</style>