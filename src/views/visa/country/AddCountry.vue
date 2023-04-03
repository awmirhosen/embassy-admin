<template>

  <!---------heading title---------------->
  <div class="d-flex justify-space-between align-center pa-4 ">
    <p class="text-h4 w-100 ms-5 mt-3">Add Country</p>
    <router-link to="/users" class="me-5 v-btn--elevated v-btn text-black bg-white pa-3">back</router-link>
  </div>

  <!----------------------width 75 % wrapper------------------------>
  <div class="w-75 mx-auto mt-5">
    <!-------------start table of users-------------->
    <div class="w-100">
      <v-form @submit.prevent="createCountry" >

        <!--------------- Country field -------------------->
        <v-text-field
            class="mt-8"
            label="Country Name"
            v-model="country.name"
            :rules="[
        v => !!v || 'Field is required'
      ]"
        />
        <!------------- short name of country -------------->
        <v-text-field
            class="mt-8"
            label="Short Name Of Country"
            v-model="country.short_name"
            :rules="[
        v => !!v || 'Field is required'
      ]"
        />
        <!----------submit btn--------->
        <v-btn type="submit"
               class="w-100 mt-2"
               color="black"
               prepend-icon="mdi-arrow-right-bold-outline"
               :disabled="disable"
        >
          Submit
        </v-btn>

      </v-form>

      <div class="w-100">
        <p v-if="response.length >= 3 && response !== null" class="w-100 pa-4 bg-green text-white text-center fs-2 mt-3">{{response}}</p>
      </div>

      <div class="w-100">
        <p v-if="err.length >= 3 && err !== null" class="w-100 pa-4 bg-red text-white text-center fs-2 mt-3">{{err}}</p>
      </div>

    </div>
    <!-------------End table of users-------------->
  </div>

</template>

<script setup>


import {reactive, ref} from "vue";
import Axios from "axios";
import {useVisaStore} from "../../../store/visa";

const disable = ref(false);
const response = ref("");
const err = ref("");

const country = reactive({
  name : null,
  short_name : null,
})

const visaStore = useVisaStore();

const createCountry = () => {
  disable.value = true;
  response.value = "";

  const data = reactive({
      name : country.name,
      short : country.short_name,
  })

  visaStore.createCountry(data, disable, response, err);

  if (country.name === null && country.short_name === null) {
    disable.value = false;
    return
  }

  // Axios.post("http://185.208.172.123/visa/country", {
  //   name : country.name,
  //   short : country.short_name,
  // }, {
  //   headers :{
  //     Authorization: `Bearer ${sessionStorage.getItem("token")}`
  //   }
  // }).then(res => {
  //   disable.value = false;
  //   console.log(res);
  //   country.name = null;
  //   country.short_name = null;
  //   response.value = "Country Created Successfully"
  //
  // }).catch(error => {
  //   err.value = "something went wrong!"
  //   disable.value = false;
  //   console.log(error);
  // })

}

</script>

<style scoped>

</style>