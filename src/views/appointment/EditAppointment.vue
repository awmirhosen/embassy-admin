<template>

  <div class="w-75 mx-auto pt-4">
    <v-form @submit.prevent="updateAppointment">
      <!--------date fields--------->
      <div class="w-100 mt-8">
        <p class="text-h4 mb-4">Edit Appointment</p>

<!--        <div>-->
<!--          <v-text-field label="Appointment Number"  :value="route.params.appointment_number" type="text"-->
<!--                        class="mt-6" disabled></v-text-field>-->
<!--        </div>-->

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
            <v-text-field label="Delay from today"  v-model="appointmentData.delay_from_today"
                          type="number"></v-text-field>
          </div>
        </div>
        <v-text-field label="Delay from today" v-model="appointmentData.status" type="text"
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

    <div class="w-100 bg-green pa-4 mt-8 rounded-lg text-white text-center" v-if="sucMessage">
      Appointment Successfully Updated!
    </div>
    <div class="w-100 bg-red pa-4 mt-8 rounded-lg text-white text-center" v-if="errMessage">
      We have Some Error Here!
    </div>

  </div>

</template>

<script setup>

import {reactive, ref} from "vue";
import {useRoute} from "vue-router";
import {axios} from "../../store/index.js";

const loading = ref(false);
const disable = ref(false);

const route = useRoute();

const sucMessage = ref(false);
const errMessage = ref(false);

const appointmentData = reactive({
  take_from: route.params.take_from,
  take_to: route.params.take_to,
  delay_from_today: route.params.delay_from_today,
  status: route.params.status,
  fake: "",
})

if (route.params.fake === "true") {
  appointmentData.fake = true;
}else {
  appointmentData.fake = false;
}

const updateAppointment = () => {
  disable.value = true;
  console.log(appointmentData);

  axios.put(`appointment/us/${route.params.appointment_id}`, appointmentData).then(res => {
    console.log(res)
    disable.value = false;
    sucMessage.value = true;
  }).catch(err => {
    console.log(err)
    disable.value = false;
    errMessage.value = true;
  })

}


</script>

<style scoped>

</style>