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
          Credentials username
        </th>
        <th class="text-center text-white">

        </th>
        <th class="text-center text-white">
          Action
        </th>
        <td></td>
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
          {{ item.credentials_id.credentials.username }}
        </td>
        <td>
          <router-link :to="{ name: 'fetchGroup', params: {applicant_id : `${item._id}`, user_id: `${item.user_id['_id']}`} }">
            <v-btn>
              Fetch Group
            </v-btn>
          </router-link>
        </td>
        <td class="text-center">
          <v-icon icon="mdi-delete-forever-outline" @click="deleteApplicant(item._id)" color="red"></v-icon>
        </td>
      </tr>
      </tbody>

    </v-table>
    <!-------------End table of users-------------->

    <!------------Loading for request ------------->
    <div class="text-center mt-8">
      <v-progress-circular v-if="loading" indeterminate :size="70" :width="10"></v-progress-circular>
    </div>

  </div>


</template>

<script setup>

import swal from 'sweetalert2';
import { ref} from "vue";
import {useApplicantStore} from "../../store/applicant";
import {axios} from "../../store/index.js";
const loading = ref(true);

window.Swal = swal;

// applicant store calling pinia
const applicantStore = useApplicantStore();
// flag
const fetchGroupFlag = ref(false)
// fetch all applicant
applicantStore.fetchAllApplicant(loading);

const fetchGroup = () => {
  fetchGroupFlag.value = true;
}

const deleteApplicant = (id) => {
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
      axios.delete(`applicant/${id}`, {
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
        applicantStore.fetchAllApplicant(loading);
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



</script>

<style scoped>

</style>