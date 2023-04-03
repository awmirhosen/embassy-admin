<template>
  <!---------heading title---------------->
  <div class="d-flex justify-space-between align-center pa-4">
    <p class="text-h4 w-100 ms-5 mt-3">Add Country</p>
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
      <v-form @submit.prevent="createEmbassy">
        <!--------------- Country field -------------------->
        <v-text-field
          class="mt-8"
          label="Embassy Name"
          v-model="embassy.name"
          :rules="[(v) => !!v || 'Field is required']"
        />
        <!------------- select box for your considered country of country -------------->
        <v-select
          v-model="embassy.country_id"
          label=" your considered Country"
          :items="visaStore.allCountries"
          item-title="name"
          item-value="_id"
        >
        </v-select>
        <!------------- select in country box-------------->
        <v-select
          v-model="embassy.in_country_id"
          label="In Country"
          :items="visaStore.allCountries"
          item-title="name"
          item-value="_id"
        >
        </v-select>
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

      <div class="w-100">
        <p
          v-if="response.length >= 3 && response !== null"
          class="w-100 pa-4 bg-green text-white text-center fs-2 mt-3"
        >
          {{ response }}
        </p>
      </div>

      <div class="w-100">
        <p
          v-if="err.length >= 3 && err !== null"
          class="w-100 pa-4 bg-red text-white text-center fs-2 mt-3"
        >
          {{ err }}
        </p>
      </div>
    </div>
    <!-------------End table of users-------------->
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import Axios from "axios";
import { useVisaStore } from "../../../store/visa";

const disable = ref(false);
const response = ref("");
const err = ref("");
const loading = ref(false);

const embassy = reactive({
  country_id: null,
  in_country_id: null,
  name: null,
});

const visaStore = useVisaStore();

visaStore.fetchAllCountries(loading);

const createEmbassy = () => {
  disable.value = true;
  response.value = "";

  if (embassy.name === null) {
    disable.value = false;
    return;
  }

  console.log(embassy.country_id);

  Axios.post(
    "http://185.208.172.123/visa/embassy",
    {
      name: embassy.name,
      in_country_id: embassy.in_country_id,
      country_id: embassy.country_id,
    },
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }
  )
    .then((res) => {
      disable.value = false;
      console.log(res);
      embassy.name = null;
      embassy.in_country_id = null;
      embassy.country_id = null;
      response.value = "Embassy Created Successfully";
    })
    .catch((error) => {
      err.value = "something went wrong!";
      disable.value = false;
      console.log(error);
    });
};
</script>

<style scoped></style>
