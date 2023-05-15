<template>

  <div class="w-100 text-center mb-4 pt-10 justify-center" v-if="loading">
    <v-progress-circular indeterminate :size="90" :width="10"></v-progress-circular>
    <p class="mt-8">This request can take some time, Please Be Patient.</p>
  </div>

  <div v-if="!loading">
    <div class="pt-8" v-if="errorMessage">
      <div class="w-75 rounded-lg mx-auto mt-6 text-center pa-4 bg-red text-white" >
        There is some error here!
      </div>
    </div>

    <div class="w-100" v-if="!errorMessage">
      <v-table class="mt-4">
        <thead>
        <tr>
          <th class="text-center">
            Appointment Number
          </th>
          <th class="text-center">
            Current Status
          </th>
          <th class="text-center">
            IVR Number
          </th>
          <th class="text-center">
            Action
          </th>

        </tr>
        </thead>
        <tbody>
        <!--    <tr-->
        <!--        v-for="item in appointmentStore.allAppointment"-->
        <!--        :key="item.name"-->
        <!--    >-->
        <!--      <td class="text-center">{{ item.applicant_id.embassy_id.name }}</td>-->
        <!--      <td class="text-center">{{ item.applicant_id.credentials_id.credentials.username }}</td>-->
        <!--      <td class="text-center">{{ item.delay_from_today }}</td>-->
        <!--      <td class="text-center">-->
        <!--        <span class="text-blue">From</span>{{ item.take_from }}-->
        <!--        <br>-->
        <!--        <span class="text-blue">To</span>{{ item.take_to }}-->
        <!--      </td>-->
        <!--      <td class="text-center d-flex justify-center align-center">-->
        <!--        <div v-if="item.is_ready_to_schedule" class="active-in-table"></div>-->
        <!--        <div v-else class="inactive-in-table" ></div>-->
        <!--      </td>-->

        <!--    </tr>-->
        </tbody>

      </v-table>
    </div>
  </div>

</template>

<script setup>

import {useRoute} from "vue-router";
import {onMounted, reactive, ref} from "vue";
import {axios} from "../../store/index.js";


const route = useRoute()

const loading = ref(false)
const errorMessage = ref(false)

const fetchGroup = reactive([]);




onMounted(() => {
  loading.value = true;
  axios.post("applicant/fetch-my-groups", {_id: route.params.applicant_id}, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  }).then(res => {
    loading.value = false;
    console.log(res);
    console.log(res.data);
    fetchGroup = res.data;
  }).catch(err => {
    loading.value = false
    errorMessage.value = true;
    console.log(err)
  })
})


</script>

<style scoped>


</style>