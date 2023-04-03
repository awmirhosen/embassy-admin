<template>
  <!---------heading title---------------->
  <div class="d-flex justify-space-between align-center pa-4">
    <p class="text-h4 w-100 ms-5 mt-3">Add Credential</p>
    <router-link
      to="/users"
      class="me-5 v-btn--elevated v-btn text-black bg-white pa-3"
      >Users</router-link
    >
  </div>

  <!----------------------width 75 % wrapper------------------------>
  <div class="w-75 mx-auto mt-16">
    <!-------------start table of users-------------->
    <div class="w-100">
      <v-form @submit.prevent="createCredential">
        <!--------------- Credential field -------------------->
        <v-text-field
          class=""
          label="Enter ID"
          v-model="user_id"
          disabled="true"
        />

        <!---------------Platform field----------------------->
        <v-select
          v-model="credentials.platform_id"
          label="Chose Platform"
          :items="platformStore.allPlatforms"
          item-title="name"
          item-value="_id"
        >
        </v-select>

        <!-----------------credential username and password---------------->
        <v-text-field
          class=""
          label="Enter Username"
          v-model="credentials.credentials.username"
          :rules="[(v) => !!v || 'Field is required']"
        />
        <!---------------- password ------------------>
        <v-text-field
          class=""
          v-model="credentials.credentials.password"
          :rules="[(v) => !!v || 'Field is required']"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          hint="At least 4 characters"
          counter
          @click:append="show1 = !show1"
        ></v-text-field>

        <!----------submit btn--------->
        <v-btn
          type="submit"
          class="w-100 mt-2 py-6 d-flex align-center"
          color="black"
          :disabled="disable"
        >
          <p v-if="loading == false">Submit</p>
          <p v-else>
            <v-progress-circular
              indeterminate
              color="white"
            ></v-progress-circular>
          </p>
        </v-btn>
      </v-form>

      <div class="w-100" v-if="success">
        <p class="w-100 pa-4 bg-green text-white text-center fs-2 mt-3">
          SUCCESSFUL!
        </p>
      </div>

      <div class="w-100" v-if="resError">
        <p class="w-100 pa-4 bg-red text-white text-center fs-2 mt-3">
          We have Some Error
        </p>
      </div>
    </div>
    <!-------------End table of users-------------->
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useUsersStore } from "../../store/users";
import { usePlatformStore } from "../../store/platform";
import Axios from "axios";
import { useRoute, useRouter } from "vue-router";

////// loading value
const loading = ref(true);

///// platform store for getting platform
const platformStore = usePlatformStore();
platformStore.fetchAllPlatforms(loading);
const router = useRoute();

/////// show password
const show1 = ref(false);

const user_id = ref(router.params.user_id);

const credentials = reactive({
  user_id: null,
  platform_id: null,
  credentials: {
    username: null,
    password: null,
  },
});
///// disable btn
const disable = ref(false);
///// success for 200 response
const success = ref(false);
//// Error for Response Error
const resError = ref(false);

///// create credential function
const createCredential = () => {
  loading.value = true;
  disable.value = true;
  Axios.post(
    "http://185.208.172.123/credentials",
    {
      user_id: user_id.value,
      platform_id: credentials.platform_id,
      credentials: {
        username: credentials.credentials.username,
        password: credentials.credentials.password,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    }
  )
    .then((res) => {
      loading.value = false;
      success.value = true;
      console.log(res);
    })
    .catch((err) => {
      loading.value = false;
      resError.value = true;
      console.log(err);
    });
};
</script>

<style scoped></style>
