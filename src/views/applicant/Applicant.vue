<template>

  <!---------heading title---------------->
  <div class="d-flex justify-space-between align-center pa-4 ">
    <p class="text-h4 w-100 ms-5 mt-3">Applicant</p>
    <router-link to="/add_platform" class="me-5 v-btn--elevated v-btn text-black bg-white pa-3">Add Applicant</router-link>
  </div>

  <!----------------------width 75 % wrapper------------------------>
  <div class="w-75 mx-auto mt-5">
    <!-------------start table of users-------------->
    <v-table class="mt-4 rounded-xl border">
      <thead class="bg-black text-white">
      <tr>
        <th class="text-center text-white">
          Embassy
        </th>
        <th class="text-center text-white">
          Users name
        </th>
        <th class="text-center text-white">
          Credentials username
        </th>
        <th class="text-center text-white">
          Action
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="item in applicantStore.allApplicant"
          :key="item.name"
          class="text-center"
      >
        <td>{{ item.embassy_id.name }}</td>
        <td>
          {{ item.user_id.fullname }}
        </td>
        <td>
          {{ item.credentials_id.credentials.username}}
        </td>
        <td>
          <router-link :to="{ name: 'fetchGroup', params: {applicant_id : `${item._id}`, user_id: `${item.user_id._id}`} }">
            <v-btn>
              Fetch Group
            </v-btn>
          </router-link>
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
const fetchGroupFlag = ref(false)

applicantStore.fetchAllApplicant(loading);

const fetchGroup = () => {
  fetchGroupFlag.value = true;
}




</script>

<style scoped>

</style>