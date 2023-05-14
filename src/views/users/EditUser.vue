<template>
  <!---------heading title---------------->
  <div class="d-flex justify-space-between align-center pa-4">
    <p class="text-h4 w-100 ms-5 mt-3">Edit User</p>
    <router-link
      to="/users"
      class="me-5 v-btn--elevated v-btn text-black bg-white pa-3"
      >Back</router-link
    >
  </div>

  <!----------------------width 75 % wrapper------------------------>
  <div class="w-75 mx-auto mt-5">
    <!-------------start table of users-------------->
    <div class="w-100">
      <v-form @submit.prevent="editUser">
        <!-----username field-------->
        <v-text-field
          class="mt-8"
          label="Fullname"
          v-model="user.fullname"
          :rules="[(v) => !!v || 'Field is required']"
        />
        <v-text-field
          class="mt-8"
          label="Phone number"
          v-model="user.phone_number"
          :rules="[(v) => !!v || 'Field is required']"
        />
        <!--------password field---------->

        <!----------submit btn--------->
        <v-btn
          type="submit"
          class="w-100 mt-2"
          color="black"
          :disabled="loading"
        >
          <p v-if="loading" class="w-100 text-center">Update User</p>
          <p v-else class="w-100 text-center">Updating User</p>
        </v-btn>
      </v-form>
    </div>
    <!-------------End table of users-------------->

    <!--------------api messages start------------->
    <div class="w-100 mt-4">
      <div class="w-100 text-center pa-8 bg-green text-white" v-if="success">
        User Edited !
      </div>
      <div class="w-100 text-center pa-8 bg-red text-white" v-if="errorReq">
        We Have Some Error Here !
      </div>
    </div>
    <!--------------api messages End------------->
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useUsersStore } from "../../store/users";
import { reactive, ref } from "vue";

///// Pinia -------------
const userStore = useUsersStore();
///// Using useRoute for finding param
const route = useRoute();
///// loading and disable for preventing to send another req
const loading = ref(false);

///// for req message
const errorReq = ref(false);
const success = ref(false);

///// filter to find current user
const currentUser = userStore.allUsers.filter(
  (item) => item._id === route.params.id
);
//create user object

const user = reactive({
  fullname: currentUser[0].fullname,
  phone_number: currentUser[0].phone_number,
});

const editUser = () => {
  loading.value = true;
  ///// make data for sending to store
  const data = reactive({
    fullname: user.fullname,
    phone_number: user.phone_number,
  });

  userStore.editUser(data, currentUser[0]._id, loading, success, errorReq);
};
</script>

<style scoped></style>
