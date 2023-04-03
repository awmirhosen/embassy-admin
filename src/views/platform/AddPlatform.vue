<template>

  <!---------heading title---------------->
  <div class="d-flex justify-space-between align-center pa-4 ">
    <p class="text-h4 w-100 ms-5 mt-3">Add Platform</p>
    <router-link to="/platform" class="me-5 v-btn--elevated v-btn text-black bg-white pa-3">back</router-link>
  </div>

  <!----------------------width 75 % wrapper------------------------>
  <div class="w-75 mx-auto mt-5">
    <!-------------start table of users-------------->
    <div class="w-100">
      <v-form @submit.prevent="createPlatform" >

        <!--------------- Country field -------------------->
        <v-text-field
            class="mt-8"
            label="Platform Name"
            v-model="platform.name"
            :rules="[
        v => !!v || 'Field is required'
      ]"
        />
        <!------------- select box for your considered country of country -------------->
        <v-select
            v-model="platform.platformType"
            label=" Platform Type"
            :items="platformType"
            item-title="name"
            item-value="value"
        >
        </v-select>
        <!------------- select in country box-------------->
        <v-select
            v-model="platform.embassy_ids"
            :items="visaStore.allEmbassies"
            label="Select"
            item-value="_id"
            item-title="name"
            multiple
            hint="Pick your favorite states"
            persistent-hint
        ></v-select>
        <!----------submit btn--------->
        <v-btn type="submit"
               class="w-100 mt-2"
               color="blue"
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
import {useVisaStore} from "../../store/visa";

const disable = ref(false)
const response = ref("")
const err = ref("")
const loading = ref(false)

const platform = reactive({
  platformType : null,
  embassy_ids : null,
  name : null,
})

const platformType = reactive([
  {name: "UsVisaInfo", value:1},
  {name: "Ckgsir", value:2}
])

const visaStore = useVisaStore();

visaStore.fetchAllEmbassies(loading);

visaStore.fetchAllCountries(loading);
console.log(visaStore.allEmbassies)




const createPlatform = () => {

  console.log(platform.embassy_ids)
  Axios.post("http://185.208.172.123/platform", {
    name : platform.name,
    embassy_ids : platform.embassy_ids,
    platformType : platform.platformType,
  }, {
    headers :{
      Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }
  }).then(res => {
    disable.value = false;
    console.log(res);
    platform.name = null;
    platform.platformType = null;
    platform.embassy_ids = null
    response.value = "Platform Created Successfully"
  }).catch(error => {
    err.value = "something went wrong!"
    disable.value = false;
    console.log(error);
  })

}


</script>

<style scoped>

</style>