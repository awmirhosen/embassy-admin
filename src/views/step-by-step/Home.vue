<template>
  <div class="w-100 pa-4">

    <div class="pa-2" v-if="step === 1">
      <div class="d-flex justify-space-between w-100">
        <p class="text-h5">Create User</p>
        <p style="width: 45px; height: 45px"
           class="text-h5 d-flex align-center justify-center text-center rounded-circle bg-black text-white">1</p>
      </div>
      <div class="mt-3">
        <v-form @submit.prevent="submitUser">
          <!-----username field-------->
          <v-text-field
              class="mt-8"
              label="Fullname"
              v-model="user.fullname"
              :rules="[(v) => !!v || 'Field is required']"
          />
          <v-text-field
              class="mt-8"
              label="Phone number / email"
              v-model="user.phone_number"
              :rules="[(v) => !!v || 'Field is required']"
          />
          <!--------password field---------->
          <v-text-field
              class="mt-8"
              v-model="user.password"
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
          <v-btn type="submit" class="w-100 mt-2" color="black" :disabled="disable">
            <p class="w-100 text-center" v-if="!loading">Next step</p>
            <p class="w-100 text-center" v-else>Creating User...</p>
          </v-btn>
        </v-form>
      </div>
    </div>

    <div class="pa-2" v-if="step === 2">
      <div class="d-flex justify-space-between w-100">
        <p class="text-h5">Create Credential</p>
        <p style="width: 45px; height: 45px"
           class="text-h5 d-flex align-center justify-center text-center rounded-circle bg-black text-white">2</p>
      </div>
      <div class="w-100">
        <v-form @submit.prevent="createCredential">
          <!--------------- Credential field -------------------->
          <v-text-field
              class=""
              label="Enter ID"
              v-model="credentials.user_id"
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
              label="Enter Embassy Account Username"
              v-model="credentials.credentials.username"
              :rules="[(v) => !!v || 'Field is required']"
          />
          <!---------------- password ------------------>
          <v-text-field
              v-model="credentials.credentials.password"
              :rules="[(v) => !!v || 'Field is required']"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Enter Embassy Account Password"
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
            <p>Submit</p>
          </v-btn>
        </v-form>

      </div>
    </div>

    <div class="pa-2" v-if="step === 3">
      <div class="d-flex justify-space-between">
        <p class="text-h5">Choose your embassy</p>
        <p style="width: 45px; height: 45px"
           class="text-h5 d-flex align-center justify-center text-center rounded-circle bg-black text-white">3</p>
      </div>
      <div>
        <v-form @submit.prevent="createAppointment">
          <v-select
              class="mt-8"
              v-model="applicant.embassy_id"
              label="Chose Embassy"
              :items="embassyStore.allEmbassies"
              item-title="name"
              item-value="_id"
          >
          </v-select>
          <v-btn type="submit" color="black" :disabled="disable">Next step</v-btn>
        </v-form>

      </div>
    </div>

    <div class="pa-2" v-if="step === 4">
      <div class="w-100 text-center text-h5">
        <p>You currently create a user, credential and applicant for your user.
          <br>
          Now you can make applicant by fetching this group and select your appo number
        </p>
        <v-btn color="black" @click="fetchGroup" class="mt-4">Fetch Group</v-btn>

        <div class="w-100 my-3" v-if="fetchLoading">
          <v-progress-linear
              indeterminate
              color="black"
          ></v-progress-linear>
        </div>

      </div>

      <div class="pa-3 text-center text-white bg-red text-h5 mt-3" v-if="fetchError">
        <p class="w-100">Something Went Wrong. Maybe this credential doesn't Have IVR Number</p>
        <v-btn  @click="backToFirst">Back to first step</v-btn>
      </div>

    </div>

    <div class="pa-2" v-if="step === 5">
      <!-------- w 75 % center wrapper -------------->
      <div class="w-75 mx-auto pt-12">
        <!---------table start ----------->
        <v-table class="mt-4">
          <thead>
          <tr>
            <th class="text-center">
              Appointment Number
            </th>
            <th class="text-center">
              Current Status
            </th>
            <th class="text-center">
              IVR Number
            </th>
            <th class="text-center">
              Action
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="item in fetchGroup"
              :key="item.appoint_id"
          >
            <td class="text-center">{{ item.appoint_id }}</td>
            <td class="text-center">{{ item.current_status }}</td>
            <td class="text-center">{{ item.IVR_NUMBER }}</td>
            <td class="text-center">
              <RouterLink
                  :to="{name: `addAppointment`, params: { appointment_number: `${item.appoint_id}`, user_id: `${route.params.user_id}`, applicant_id: `${route.params.applicant_id}`}}">
                <v-btn color="black">Create Appointment</v-btn>
              </RouterLink>
            </td>
          </tr>
          </tbody>
          <!---------table End ----------->
        </v-table>
      </div>
    </div>

  </div>
</template>

<script setup>

//create user object
import {reactive, ref} from "vue";
import {useUsersStore} from "../../store/users.js";
import {axios} from "../../store/index.js";
import {usePlatformStore} from "../../store/platform.js";
import {useVisaStore} from "../../store/visa.js";

const success = ref(false);
const errMessage = ref(false);
const show1 = ref(false);
const disable = ref(false);
const loading = ref(false);
const step = ref(1);
const fetchError = ref(false);

var fetchGroupTable = reactive([]);
const fetchLoading = ref(false);

///// fetch all users to see embassies with pinia store
const embassyStore = useVisaStore();
embassyStore.fetchAllEmbassies(loading);

const credentials = reactive({
  user_id: null,
  platform_id: null,
  credentials: {
    username: null,
    password: null,
  },
});

const applicant = reactive({
  user_id: null,
  credentials_id: null,
  embassy_id: null,
})

const fetchGroupData = reactive({
  _id: null
})

const user = reactive({
  fullname: null,
  password: null,
  phone_number: null,
});
/// user store
const userStore = useUsersStore();
//// submit user
const submitUser = () => {
  ///// disable form
  disable.value = true;
  ///// loading true
  loading.value = true;

  axios
      .post("/user", user)
      .then((res) => {
        //// enable form & loading
        loading.value = false;
        disable.value = false;
        console.log(res.data._id)
        applicant.user_id = res.data._id;
        credentials.user_id = res.data._id;
        /// ------- success message div show
        step.value = 2;
      })
      .catch((err) => {
        /// error message and loading
        errMessage.value = true;
        disable.value = false;
        loading.value = false;
        console.log(err);
      });
};

///// platform store for getting platform
const platformStore = usePlatformStore();
platformStore.fetchAllPlatforms(loading);

//// submit credential
const createCredential = () => {
  axios.post(
      "/credentials",
      credentials
  )
      .then((res) => {
        applicant.credentials_id = res.data._id;
        disable.value = false;
        step.value = 3;
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
}

//// create appointment
const createAppointment = () => {
  ///// making a post request
  axios.post(
      "/applicant", applicant
  )
      .then((res) => {
        console.log(res);
        fetchGroupData._id = res.data._id;
        step.value = 4;
      })
      .catch((err) => {
        disable.value = false;
        console.log(err);
      });
};

const fetchGroup = () => {
  fetchLoading.value = true;
  axios.post("applicant/fetch-my-groups", fetchGroupData ).then(res => {
    loading.value = false;
    fetchGroupTable = res.data;
    step.value = 5;
    console.log(res.data);
  }).catch(err => {
    loading.value = false
    fetchError.value = true;
    fetchLoading.value = false;
    console.log(err)
  })
}

const backToFirst = () => {
  step.value = 1;
  location.reload()

}

</script>

<style scoped>

</style>