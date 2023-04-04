<template>
  <!---------heading title---------------->
  <div class="d-flex justify-space-between align-center pa-4">
    <p class="text-h4 w-100 ms-5 mt-3">Embassy Config</p>
    <router-link
        to="/users"
        class="me-5 v-btn--elevated v-btn text-black bg-white pa-3"
    >back</router-link
    >
  </div>

  <!----------------------width 75 % wrapper------------------------>
  <div class="w-75 mx-auto mt-5">
    <!-------------start table of users-------------->
    <div class="w-100">
      <v-form @submit.prevent="createEmbassyConfig">
        <!--------------- url field -------------------->
        <v-text-field
            class="mt-8"
            label="Enter URL"
            v-model="config.url"
            :rules="[(v) => !!v || 'Field is required']"
        />
        <!--------- code field ----------->
        <v-text-field
            class="mt-8"
            label="Enter Code"
            v-model="config.code"
            :rules="[(v) => !!v || 'Field is required']"
        />
        <!----------submit btn--------->
        <v-btn
            type="submit"
            class="w-100 mt-2"
            color="black"
            prepend-icon="mdi-arrow-right-bold-outline"
            :disabled="disable"
        >
          Submit
        </v-btn>
      </v-form>
    </div>
    <!-------------End table of users-------------->

    <div class="w-100 pa-4 bg-green text-white rounded-xl mt-8" v-if="succRes">
      Config for this Embassy has been Created
    </div>

    <div class="w-100 pa-4 bg-red text-white rounded-xl mt-8" v-if="errRes">
      We have Some Error Here!
    </div>

  </div>


</template>

<script setup>

import {reactive, ref} from "vue";
import {useRoute} from "vue-router";
import {axios} from "../../../../store/index.js";
const route = useRoute();

const disable = ref(false);

const embassy_id = route.params.embassy_id

const config = reactive({
  embassy_id: embassy_id,
  url: null,
  code: null,
})

const errRes = ref(false);
const succRes = ref(false);

const createEmbassyConfig = () => {

  disable.value = true;

  axios.post("/visa/us/embassy-config", {
    embassy_id : config.embassy_id,
    url : config.url,
    code : config.code,
  }, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  }).then(res => {
    console.log(res)
      disable.value = false;
      succRes.value = true;
  }).catch(err => {
    console.log(err)
    disable.value = true;
    errRes.value = true;
  })

}

</script>

<style scoped>

</style>