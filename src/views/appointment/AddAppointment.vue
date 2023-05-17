<template>

  <div class="w-100 text-center mb-4 pt-10 justify-center" v-if="loading">
    <v-progress-circular indeterminate :size="90" :width="10"></v-progress-circular>
    <p class="mt-8">This request can take some time, Please Be Patient.</p>
  </div>

  <div class="w-100 mt-4" v-if="errorMessage">
    <p>We have Some Error Here if you see this message for multiple time, contact us</p>
    <RouterLink to="/applicant">
      <v-btn>Back</v-btn>
    </RouterLink>
  </div>

  <div class="w-75 mx-auto pt-4" v-else>
    <v-form @submit.prevent = "submitAppointment">
      <!--------date fields--------->
      <div class="w-100 mt-8">
        <p class="text-h4 mb-4">Make Appointment</p>

        <div>
          <v-text-field label="Appointment Number" v-model="appointmentData.appointment_number" :value="route.params.appointment_number" type="text"
                        class="mt-6" disabled></v-text-field>
        </div>

        <p class="text-h5 text-center mb-4">Date</p>
        <div class="w-100 d-flex justify-center align-center">
          <div class="mx-8 w-100">
            <p>From:</p>
            <v-text-field size="4" type="date" v-model="appointmentData.take_from"></v-text-field>
          </div>

          <div class="mx-8 w-100">
            <p>to:</p>
            <v-text-field type="date" v-model="appointmentData.take_to"></v-text-field>
          </div>

          <div class="w-100 mt-6 number-field-delay">
            <v-text-field label="Delay from today" v-model="appointmentData.delay_from_today"
                          type="number"></v-text-field>
          </div>
        </div>
        <v-text-field label="Delay from today" v-model="appointmentData.status" value="not-taken" type="text"
                      class="mt-6" disabled></v-text-field>
        <div>

        </div>

        <div class="d-flex align-center justify-start">
          <div>
            <v-checkbox class="h-100 mt-4 ml-6" v-model="appointmentData.fake"></v-checkbox>
          </div>
          <div>
            Fake
          </div>
        </div>

      </div>

      <v-btn type="submit" class="w-100 mt-6" :disabled="disable" color="black">SUBMIT</v-btn>

    </v-form>

  </div>

</template>

<script setup>

import {useRoute} from "vue-router";
import {onMounted, reactive, ref} from "vue";
import {axios} from "../../store/index.js";


const route = useRoute()

const loading = ref(false);
const errorMessage = ref(false);

const disable = ref(false);

const appointmentData = reactive({
  appointment_number: `${route.params.appointment_number}`,
  user_id: route.params.user_id,
  applicant_id: route.params.applicant_id,
  is_ready_to_schedule: false,
  scheduledBefore: false,
  want_to_schedule: false,
  want_to_reschedule: false,
  take_from: "",
  take_to: "",
  delay_from_today: null,
  status: "not-taken",
  fake: true,
  took: false,
})

const submitAppointment = () => {
  disable.value = true;
  axios.post("appointment/us/", appointmentData, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  }).then(res => {
    disable.value = false;
    loading.value = false;
    console.log(res);
  }).catch(err => {
    disable.value = false;
    loading.value = false
    errorMessage.value = true;
    console.log(err)
  })
  console.log(appointmentData)
}


</script>

<style scoped>


</style>