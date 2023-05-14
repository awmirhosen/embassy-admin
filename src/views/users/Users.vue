<template>
  <!---------heading title---------------->
  <div class="d-flex justify-space-between align-center pa-4">
    <p class="text-h4 w-100 ms-5 mt-3">All Users</p>
    <router-link
      :to="{ name: 'addUser'}"
      class="me-5 v-btn--elevated v-btn text-black bg-white pa-3"
      >Add User</router-link
    >
  </div>

  <!----------------------width 75 % wrapper------------------------>
  <div class="w-75 mx-auto mt-5">
    <!-------------start table of users-------------->
    <v-table class="mt-4 border rounded-xl">
      <thead class="bg-black">
        <tr>
          <th class="text-center text-white">Full name</th>
          <th class="text-center text-white">Phone</th>
          <th class="text-center text-white">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="text-center"
          v-for="item in usersStore.allUsers"
          :key="item.name"
        >
          <td class="text-center">{{ item.fullname }}</td>
          <td class="text-center">{{ item.phone_number }}</td>
          <td class="text-center">
            <v-btn
              class="mx-3"
              color="black"
              @click.prevent="editUser(item._id)"
              >Edit</v-btn
            >
            <v-btn
              class="mx-3"
              color="black"
              @click.prevent="addCredential(item._id)"
              >Credential</v-btn
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
import { useUsersStore } from "../../store/users";
import { useRouter } from "vue-router";
import {ref} from "vue";


const loading = ref(false)
// user pinia store
const usersStore = useUsersStore();
// fetch all users form pinia
const checkUserStoreEmpty = async () => {
  console.log(usersStore.allUsers)
  if (usersStore.allUsers === null) {
    await usersStore.fetchAllUsers(loading);
  }
}
checkUserStoreEmpty();

const router = useRouter();

///// edit user function
const editUser = (id) => {
  router.push(`/edit_user/${id}`);
};

const addCredential = (id) => {
  router.push(`/user/${id}`);
};

const addApplicant = (id) => {
  router.push(`/user/applicant/${id}`);
};
</script>

<style scoped></style>
