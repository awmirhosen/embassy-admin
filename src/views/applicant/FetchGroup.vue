<template>




  <div class="w-100 text-center mb-4 pt-10 justify-center" v-if="loading">

    <v-progress-circular indeterminate :size="90" :width="10"></v-progress-circular>
    <p class="mt-8">This request can take some time, Please Be Patient.</p>
  </div>


  <div class="w-75 mx-auto pt-4" v-else>

    <div class="w-100 mt-8">

      <p class="text-h5 text-center mb-4">Date</p>

      <div class="w-100 d-flex justify-center">
        <div class="mx-8">
          <p>From:</p>
          <template>
            <VueDatePicker v-model="date" :format="format" />
          </template>
        </div>

        <div class="mx-8">
          <p>to:</p>

        </div>

      </div>




    </div>


    <div class="w-100 mt-4" v-if="errorMessage">
      We have Some Error Here if you see this message for multiple time, contact us
    </div>

  </div>

  <!----------------------width 75 % wrapper------------------------>
<!--  <div class="w-75 mx-auto mt-5">-->
<!--    &lt;!&ndash;-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;start table of users&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
<!--    <div class="w-100">-->
<!--      <v-form @submit.prevent="">-->
<!--        &lt;!&ndash;-&#45;&#45;username field&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
<!--        <template>-->
<!--          <v-row justify="center">-->
<!--            <v-date-picker v-model="picker"></v-date-picker>-->
<!--          </v-row>-->
<!--        </template>-->
<!--        <v-text-field-->
<!--            class="mt-8"-->
<!--            label="Phone number"-->
<!--            v-model="user.phone_number"-->
<!--            :rules="[(v) => !!v || 'Field is required']"-->
<!--        />-->
<!--        &lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;password field&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
<!--        <v-text-field-->
<!--            class="mt-8"-->
<!--            v-model="user.password"-->
<!--            :rules="[(v) => !!v || 'Field is required']"-->
<!--            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"-->
<!--            :type="show1 ? 'text' : 'password'"-->
<!--            name="input-10-1"-->
<!--            label="Password"-->
<!--            hint="At least 4 characters"-->
<!--            counter-->
<!--            @click:append="show1 = !show1"-->
<!--        ></v-text-field>-->
<!--        &lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;submit btn-&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
<!--        <v-btn type="submit" class="w-100 mt-2" color="black">-->
<!--          <p class="w-100 text-center" v-if="!loading">Create User</p>-->
<!--          <p class="w-100 text-center" v-else>Creating User...</p>-->
<!--        </v-btn>-->
<!--      </v-form>-->
<!--    </div>-->
<!--    &lt;!&ndash;-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;End table of users&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->

<!--    &lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; success user message start &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
<!--    <div class="w-100" v-if="success">-->
<!--      <div class="w-100 bg-green text-white text-center pa-4 mt-4 rounded-lg">-->
<!--        User Created Successfully!-->
<!--      </div>-->
<!--    </div>-->
<!--    &lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; success user message End &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
<!--    &lt;!&ndash;-&#45;&#45;&#45;&#45;error message start -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
<!--    <div class="w-100" v-if="errorResponse">-->
<!--      <div class="w-100 bg-red text-white text-center pa-4 mt-4 rounded-xl">-->
<!--        We Have Some Error-->
<!--      </div>-->
<!--    </div>-->
<!--    &lt;!&ndash;-&#45;&#45;&#45;&#45;error message End -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
<!--  </div>-->



</template>

<script setup>

import { useRoute } from "vue-router";
import {onMounted, ref} from "vue";
import Datepicker from 'vuejs3-datepicker';
import {axios} from "../../store/index.js";
import VueDatePicker from '@vuepic/vue-datepicker';

const route = useRoute()

const loading = ref(false)
const errorMessage = ref(false)
const appointment_id = ref("");
const current_status = ref("");
const IVR_NUMBER = ref("")

const dateSelected = ref(new Date())

const tst = ref(null);
const testFunction = () => {
  console.log(tst.value)
}

const date = ref(new Date());
// In case of a range picker, you'll receive [Date, Date]
const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `Selected date is ${day}/${month}/${year}`;
}

onMounted(() => {
  loading.value = false;
  // axios.post("applicant/fetch-my-groups", {_id: route.params.applicant_id}, {
  //   headers: {
  //     Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //   },
  // }).then(res => {
  //   loading.value = false;
  //   console.log(res);
  //   console.log(res.data);
  // }).catch(err => {
  //   loading.value = false
  //   errorMessage.value = true;
  //   console.log(err)
  // })
})


</script>

