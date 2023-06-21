<template>

  <!---------heading title---------------->
  <div class="d-flex justify-space-between align-center pa-4">
    <p class="text-h4 w-100 ms-5 mt-3">Edit Credential Password</p>
  </div>

  <div class="w-75 mx-auto mt-4">
    <v-form @submit.prevent="submitNewPassword">
      <v-text-field
          class=""
          v-model="newPassword"
          :rules="[(v) => !!v || 'Field is required']"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          hint="At least 4 characters"
          counter
          @click:append="show1 = !show1"
      ></v-text-field>
      <v-btn class="mt-3" color="black" type="submit" >SUBMIT</v-btn>
    </v-form>

    <div class="w-100 rounded mt-4 bg-green text-white pa-4" v-if="response">
      Successful, Password changed
    </div>

  </div>

</template>

<script setup>

import {ref} from "vue";
import {axiosLogin, axios} from "../../store/index.js";
import {useRoute} from "vue-router";

const route = useRoute();
console.log(route.params)



const show1 = ref(false);

const newPassword = ref();
const response = ref(false)

const submitNewPassword = () => {
  axios.put(`/credentials/us/${route.params.credential_id}/${newPassword.value}`).then(res => {
    console.log(res)
    response.value = true;
  }).catch(err => {
    console.log(err)
    response.value = "err"
  })
}


</script>

<style scoped>

</style>