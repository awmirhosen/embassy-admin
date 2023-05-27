<template>
  <!----loading for page ------->
  <div class="w-100 text-center mb-4 pt-10 justify-center" v-if="loading">
    <v-progress-circular indeterminate :size="90" :width="10"></v-progress-circular>
    <p class="mt-8">This request can take some time, Please Be Patient.</p>
  </div>
  <!----- when page loaded --------->
  <div v-if="!loading">
    <!-------error message for bad loading request ------------->
    <div class="pt-8" v-if="errorMessage">
      <div class="w-75 rounded-lg mx-auto mt-6 text-center pa-4 bg-red text-white">
        There is some error here!
      </div>
    </div>
    <!-------- w 75 % center wrapper -------------->
    <div class="w-75 mx-auto pt-12" v-if="!errorMessage">
      <!---------table start ----------->
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
        <tr
            v-for="item in fetchGroup"
            :key="item.appoint_id"
        >
          <td class="text-center">{{ item.appoint_id }}</td>
          <td class="text-center">{{ item.current_status }}</td>
          <td class="text-center">{{ item.IVR_NUMBER }}</td>
          <td class="text-center">
            <RouterLink
                :to="{name: `addAppointment`, params: { appointment_number: `${item.appoint_id}`, user_id: `${route.params.user_id}`, applicant_id: `${route.params.applicant_id}`}}">
              <v-btn color="black">Create Appointment</v-btn>
            </RouterLink>
          </td>
        </tr>
        </tbody>
        <!---------table End ----------->
      </v-table>
    </div>
  </div>

</template>

<script setup>

import {useRoute} from "vue-router";
import {onMounted, reactive, ref} from "vue";
import {axios} from "../../store/index.js";

// route for params
const route = useRoute()
//loading and error message
const loading = ref(false)
const errorMessage = ref(false)
// fetch group request data
var fetchGroup = reactive([]);


// on mounted for mounting component request
onMounted(() => {
  // loading get true
  loading.value = true;
  axios.post("applicant/fetch-my-groups", {_id: route.params.applicant_id}).then(res => {
    loading.value = false;
    console.log(res);
    console.log(res.data);
    fetchGroup = res.data;
    console.log(fetchGroup);
  }).catch(err => {
    loading.value = false
    errorMessage.value = true;
    console.log(err)
  })
})


</script>

<style scoped>


</style>