<template>
  <!---------heading title---------------->
  <div class="d-flex justify-space-between align-center pa-4">
    <p class="text-h4 w-100 ms-5 mt-3">Country</p>
    <router-link
      to="/add_country"
      class="me-5 v-btn--elevated v-btn text-black bg-white pa-3"
      >Add Country</router-link
    >
  </div>

  <!----------------------width 75 % wrapper------------------------>
  <div class="w-75 mx-auto mt-5">
    <!-------------start table of users-------------->
    <v-table class="mt-4 rounded-xl shadow-xl">
      <thead class="bg-black">
        <tr class="text-center">
          <th class="text-left text-center text-white">Name</th>
          <th class="text-left text-center text-white">Short Name</th>
          <th class="text-left text-white text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in visaStore.allCountries" :key="item.name" class="text-center" >
          <td class="text-center">{{ item.name }}</td>
          <td class="text-center">{{ item.short }}</td>
          <td>
            <v-btn @click="showEmbassy(item._id)" color="black"
              >See Embassies</v-btn
            >
          </td>
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
import { ref } from "vue";
import { useVisaStore } from "../../../store/visa";
import { useRouter } from "vue-router";

const loading = ref(true);
const router = useRouter();

const visaStore = useVisaStore();

const showEmbassy = (id) => {
  router.push(`/visa/country/${id}/embassies`);
};

visaStore.fetchAllCountries(loading);
</script>

<style scoped></style>
