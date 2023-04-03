<template>

  <!---------heading title---------------->
  <div class="d-flex justify-space-between align-center pa-4 ">
    <p class="text-h4 w-100 ms-5 mt-3">Platforms</p>
    <router-link to="/add_platform" class="me-5 v-btn--elevated v-btn text-black bg-white pa-3">Add Platform</router-link>
  </div>

  <!----------------------width 75 % wrapper------------------------>
  <div class="w-75 mx-auto mt-5">
    <!-------------start table of users-------------->
    <v-table class="mt-4 border">
      <thead class="bg-black text-white">
      <tr>
        <th class="text-center text-white">
          Name
        </th>
        <th class="text-center bg-black text-white">
          Platform type
        </th>
<!--        <th class="text-center">-->
<!--          Embassy ids-->
<!--        </th>-->
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="item in platformStore.allPlatforms"
          :key="item.name"
      >
        <td class="text-center" >{{ item.name }}</td>
        <td class="text-center" >
          <p class="w-100 text-center" v-if="item.platformType == 1">UsVisualInfo</p>
          <p class="w-100 text-center" v-else="item.platformType == 2">CKgsir</p>
        </td>
<!--        <td class="text-center" >-->
<!--          <div class="d-flex justify-center flex-column">-->
<!--            <p class="mx-4" v-for="embassy in item.embassy_ids">{{ embassy }}</p>-->
<!--          </div>-->
<!--        </td>-->

      </tr>
      </tbody>

    </v-table>
    <!-------------End table of users-------------->
    <div class="text-center mt-8">
      <v-progress-circular v-if="loading" indeterminate :size="70" :width="10"></v-progress-circular>
    </div>

  </div>


</template>

<script setup>


import { ref} from "vue";
import {usePlatformStore} from "../../store/platform";
const loading = ref(true)

const platformStore = usePlatformStore();

platformStore.fetchAllPlatforms(loading);






</script>

<style scoped>

</style>