import { defineStore } from "pinia";
import { axios } from "./index";

export const useUsersStore = defineStore("users", {
  state: () => {
    return {
      allUsers: null,
    };
  },
  actions: {
    /////// get all users
    fetchAllUsers(loading) {
      loading.value = true;
      axios
        .get("/user", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res);
          loading.value = false;
          this.allUsers = res.data.reverse();
          return res.data
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /////// create user
    createUser(data, disable, loading, success, errorResponse) {
      axios
        .post("/user", data, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          //// enable form & loading
          disable.value = false;
          console.log(res);
          loading.value = false;
          /// ------- success message div show
          success.value = true;
        })
        .catch((err) => {
          /// error message and loading
          errorResponse.value = true;
          disable.value = false;
          loading.value = false;
          console.log(err);
        });
    },
    ////// edit user
    editUser(data, user_id, loading, success, errorReq) {
      console.log("enter the function");
      axios
        .put(`/user/${user_id}`, data, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log("res");
          loading.value = false;
          success.value = true;
          console.log(res);
        })
        .catch((err) => {
          errorReq.value = true;
          loading.value = false;
          console.log(err);
        });
    },
  },
});
