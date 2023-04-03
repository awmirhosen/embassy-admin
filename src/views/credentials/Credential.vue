<template>
  <!---------heading title---------------->
  <div class="d-flex justify-space-between align-center pa-4">
    <p class="text-h4 w-100 ms-5 mt-3">Credential</p>
    <router-link
      to="/add_platform"
      class="me-5 v-btn--elevated v-btn text-black bg-white pa-3"
      >Add Credential</router-link
    >
  </div>

  <!----------------------width 75 % wrapper------------------------>
  <div class="w-75 mx-auto mt-5">
    <!-------------start table of users-------------->
    <v-table class="mt-4">
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Platform type</th>
          <!--        <th class="text-left">-->
          <!--          Action-->
          <!--        </th>-->
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in credentialStore.allCredential" :key="item.name">
          <td>{{ item.credentials.username }}</td>
          <td ref="platform_id">
            {{item._id}}
          </td>
          <td ref="platform_id">
            <p v-if="item.platformType === 1" class="w-100">UsVisaInfo</p>
            <p v-if="item.platformType === 2" class="w-100">Ckgsir</p>
          </td>
          <!--        <td>-->
          <!--          <v-btn color="black" @click="goToApplicant(item._id, item.user_id)">Applicant</v-btn>-->
          <!--        </td>-->
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
import { usePlatformStore } from "../../store/platform";
// import { useApplicantStore } from "../../store/applicant";
import { useCredentialStore } from "../../store/credential";
import { useRouter } from "vue-router";
const loading = ref(true);

const credentialStore = useCredentialStore();
const platformStore = usePlatformStore();

// platformStore.fetchAllPlatforms(loading);
credentialStore.fetchAllCredentials(loading);

platformStore.allPlatforms.forEach((i) => {
  console.log("sss");
  credentialStore.allCredential.forEach((cred) => {
    if (cred.platform_id == i._id) {
      console.log(i);
    } else {
      console.log("noneq");
    }
  });
});

// const router = useRouter();
//
// const goToApplicant = (credential_id, user_id) => {
//   router.push(`/applicant/${credential_id}/${user_id}`);
// };
</script>

<style scoped></style>
