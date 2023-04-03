<template>

  <!---------heading title---------------->
  <div class="d-flex justify-space-between align-center pa-4 ">
    <p class="text-h4 w-100 ms-5 mt-3">Applicant</p>
    <router-link to="/add_platform" class="me-5 v-btn--elevated v-btn text-black bg-white pa-3">Add Applicant</router-link>
  </div>

  <!----------------------width 75 % wrapper------------------------>
  <div class="w-75 mx-auto mt-5">
    <!-------------start table of users-------------->
    <v-table class="mt-4">
      <thead>
      <tr>
        <th class="text-left">
          Name
        </th>
        <th class="text-left">
          Platform type
        </th>
        <th class="text-left">
          Embassy ids
        </th>
        <th class="text-left">
          Action
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="item in applicantStore.allApplicant"
          :key="item.name"
      >
        <td>{{ item.name }}</td>
        <td>{{ item.platformType }}</td>
        <td>
          <v-btn color="black">Edit</v-btn>
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


import { ref} from "vue";
import {usePlatformStore} from "../../store/platform";
import {useApplicantStore} from "../../store/applicant";
const loading = ref(true)

const applicantStore = useApplicantStore();

applicantStore.fetchAllApplicant(loading);






</script>

<style scoped>

</style>