<template>
  <!---------heading title---------------->
  <div class="d-flex justify-space-between align-center pa-4">
    <p class="text-h4 w-100 ms-5 mt-3">Embassies</p>
    <router-link
      to="/countries"
      class="me-5 v-btn--elevated v-btn text-black bg-white pa-3"
    >
      Countries
    </router-link>
  </div>

  <!----------------------width 75 % wrapper------------------------>
  <div class="w-75 mx-auto mt-5">
    <!-------------start table of users-------------->
    <v-table class="mt-4 rounded-xl shadow-xl">
      <thead class="bg-black">
        <tr>
          <th class="text-center text-white">Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in visaStore.countryEmbassies" :key="item.name">
          <td class="text-center">{{ item.name }}</td>
        </tr>
      </tbody>
    </v-table>
    <!-------------End table of users-------------->

    <div class="text-center mt-8">
      <v-progress-circular
        v-if="loading"
        indeterminate
        :size="70"
        :width="10"
      ></v-progress-circular>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import {useVisaStore} from "@/store/visa";
import {ref} from "vue";

const route = useRoute();
const loading = ref(false);
const country_id = route.params.id;

const visaStore = useVisaStore();
visaStore.fetchCountryEmbassies(loading, country_id);
</script>

<style scoped></style>
