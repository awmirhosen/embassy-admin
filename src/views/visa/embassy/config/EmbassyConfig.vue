<template>

  <div class="d-flex justify-space-between align-center pa-4">
    <p class="text-h4 w-100 ms-5 mt-3">Embassy Config</p>
    >
  </div>

  <div class="w-75 mx-auto mt-5">
    <!-------------start table of users-------------->
    <v-table class="mt-4 rounded-xl border">
      <thead class="bg-black w-100 rounded-xl">
      <tr class="text-center ">
        <th class="text-center text-white">Code</th>
        <th class="text-center text-white">Url</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in embassyConfigStore.allEmbassyConfig" class="text-center" :key="item.name">
        <td>{{ item.code }}</td>
        <td>
          {{ item.url }}
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

import {useEmbassyConfig} from "../../../../store/embassyConfig.js";
import {ref} from "vue";

const loading = ref(false);

const embassyConfigStore = useEmbassyConfig();

embassyConfigStore.fetchAllEmbassyConfig(loading);

</script>

<style scoped>

</style>