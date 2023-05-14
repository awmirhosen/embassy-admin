import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
// import {el} from "vuetify/lib/locale";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //////login
    {
      path: "/login",
      name: "login",
      component: () => import("../components/login/Login.vue"),
    },
    //////dashboard
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
    },
    //////client users
    {
      path: "/users",
      name: "users",
      component: () => import("../views/users/Users.vue"),
    },
    {
      path: "/add_user",
      name: "addUser",
      component: () => import("../views/users/AddUser.vue"),
    },
    {
      path: "/edit_user/:id",
      name: "editUser",
      component: () => import("../views/users/EditUser.vue"),
    },
    //////// country
    {
      path: "/countries",
      name: "countries",
      component: () => import("../views/visa/country/TheCountry.vue"),
    },
    {
      path: "/add_country",
      name: "addCountry",
      component: () => import("../views/visa/country/AddCountry.vue"),
    },
    //////// embassy
    {
      path: "/embassy",
      name: "embassy",
      component: () => import("../views/visa/embassy/Embassy.vue"),
    },
    {
      path: "/visa/country/:id/embassies",
      name: "countryEmbassies",
      component: () => import("../views/visa/embassy/CountryEmbassies.vue"),
    },
    {
      path: "/add_embassy",
      name: "addEmbassy",
      component: () => import("../views/visa/embassy/AddEmbassy.vue"),
    },
    /////// platform
    {
      path: "/platform",
      name: "platform",
      component: () => import("../views/platform/Platform.vue"),
    },
    {
      path: "/add_platform",
      name: "addPlatform",
      component: () => import("../views/platform/AddPlatform.vue"),
    },
    //////// applicant
    {
      path: "/applicant/:credential_id/:user_id",
      name: "addApplicant",
      component: () => import("../views/applicant/AddApplicant.vue"),
    },
    {
      path: "/applicant",
      name: "applicant",
      component: () => import("../views/applicant/Applicant.vue"),
    },
    {
      path: "/fetch-group/:applicant_id/:user_id",
      name: "fetchGroup",
      component: () => import("../views/applicant/FetchGroup.vue"),
    },
    /////// credential
    {
      path: "/user/:user_id",
      name: "addCredential",
      component: () => import("../views/credentials/AddCredential.vue"),
    },
    {
      path: "/credential",
      name: "credential",
      component: () => import("../views/credentials/Credential.vue"),
    },
    ////// appointment
    {
      path: "/appointment/us",
      name: "appointment",
      component: () => import("../views/appointment/Appointment.vue"),
    },
    ////// embassy config
    {
      path: "/visa/us/embassy-config/:embassy_id",
      name: "createEmbassyConfig",
      component: () => import("../views/visa/embassy/config/CreateEmbassyConfig.vue"),
    },
    {
      path: "/visa/us/embassy-config",
      name: "embassyConfig",
      component: () => import("../views/visa/embassy/config/EmbassyConfig.vue"),
    },
  ],
});

router.beforeEach(async (to, from) => {
  if (
    // make sure the user is authenticated
    sessionStorage.getItem("token") === null &&
    //  Avoid an infinite redirect
    to.name !== "login"
  ) {
    // redirect the user to the login page
    return { name: "login" };
  } else {

  }
});

export default router;
