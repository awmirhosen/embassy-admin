<template>
  <!---------heading title---------------->
  <div class="d-flex justify-space-between align-center pa-4">
    <p class="text-h4 w-100 ms-5 mt-3">Credential</p>
  </div>

  <!----------------------width 75 % wrapper------------------------>
  <div class="w-75 mx-auto mt-5">
    <!-------------start table of users-------------->
    <v-table class="mt-4 rounded-xl border">
      <thead class="bg-black w-100 rounded-xl">
        <tr class="text-center ">
          <th class="text-center text-white">Embassy account username / email</th>
          <th class="text-center text-white">User</th>
          <th class="text-center text-white">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in credentialStore.allCredential" class="text-center" :key="item.name">
          <td>{{ item.credentials.username }}</td>
          <td>{{ item.user_id.fullname }}</td>
          <td>
            <v-btn color="black" @click="createApplicant(item._id, item.user_id._id)">Make Applicant</v-btn>
            <RouterLink :to="{ name: 'editCredential', params: {credential_id: item._id}}">
              <v-btn color="white" class="ml-3">Edit Password</v-btn>
            </RouterLink>
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
import { usePlatformStore } from "../../store/platform";
import { useCredentialStore } from "../../store/credential";
import { useRouter } from "vue-router";
const loading = ref(true);

const credentialStore = useCredentialStore();
const platformStore = usePlatformStore();

const router = useRouter();

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

const createApplicant = (credential_id, user_id) => {
  router.push(`/applicant/${credential_id}/${user_id}`)
}

</script>

<style scoped></style>
