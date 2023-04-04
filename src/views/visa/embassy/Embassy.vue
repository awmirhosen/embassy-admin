<template>
  <!---------heading title---------------->
  <div class="d-flex justify-space-between align-center pa-4">
    <p class="text-h4 w-100 ms-5 mt-3">Embassy</p>
    <router-link
      to="/add_embassy"
      class="me-5 v-btn--elevated v-btn text-black bg-white pa-3"
      >Add Country</router-link
    >
  </div>

  <!----------------------width 75 % wrapper------------------------>
  <div class="w-75 mx-auto mt-5">
    <!-------------start table of users-------------->
    <v-table class="mt-4 rounded-xl">
      <thead class="bg-black text-center">
        <tr>
          <th class="text-left text-white text-center">Name</th>
          <th class="text-left text-white text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in visaStore.allEmbassies"
          :key="item.name"
          class="text-center"
        >
          <td @change="test">{{ item.name }}</td>
          <td @change="test">
            <v-btn color="black" @click="createConfig">
              Config
            </v-btn>
          </td>
        </tr>
      <tr>

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
import {useRouter} from "vue-router";

const loading = ref(true);
const visaStore = useVisaStore();

const router = useRouter();

visaStore.fetchAllEmbassies(loading);

const createConfig = (embassy_id) => {
  router.push(`./visa/us/embassy-config/${embassy_id}`);
}

</script>

<style scoped></style>
