<template>

  <v-navigation-drawer v-model="navigationMain" class="pa-2">

    <v-list>

      <v-list-item prepend-icon="mdi-home"
                   title="Home"
                   value="Home"
                   class="mb-1"
                   :to="{name : 'step'}"
      />
      <v-list-item prepend-icon="mdi-chart-bubble"
                   title="Status"
                   value="Status"
                   class="mb-1"
                   :to="{name : 'status'}"
      />
      <v-list-group value="Pages">

        <template v-slot:activator="{ props }">
          <v-list-item
              class="mb-1"
              v-bind="props"
              prepend-icon="mdi-account-supervisor"
              title="Users">
          </v-list-item>
        </template>

        <v-list-item
            v-for="(menu, index) in subMenusUsers"
            :key="index"
            :value="menu.keyword"
            :title="menu.title"
            class="mb-1"
            :to="{name : menu.link}"
            :prepend-icon="menu.icon"/>

      </v-list-group>

      <v-list-group value="Visa">

        <template v-slot:activator="{ props }">
          <v-list-item
              class="mb-1"
              v-bind="props"
              prepend-icon="mdi-passport-biometric"
              title="Visa">
          </v-list-item>
        </template>

        <v-list-item
            v-for="(menu, index) in subMenusVisa"
            :key="index"
            :value="menu.keyword"
            :title="menu.title"
            class="mb-1"
            :to="{name : menu.link}"
            :prepend-icon="menu.icon"/>

      </v-list-group>

      <v-list-group value="Platform">

        <template v-slot:activator="{ props }">
          <v-list-item
              class="mb-1"
              v-bind="props"
              prepend-icon="mdi-alpha-p"
              title="Platform">
          </v-list-item>
        </template>

        <v-list-item
            v-for="(menu, index) in subMenusPlatform"
            :key="index"
            :value="menu.keyword"
            :title="menu.title"
            class="mb-1"
            :to="{name : menu.link}"
            :prepend-icon="menu.icon"/>

      </v-list-group>

      <v-list-group value="Credentials">

        <template v-slot:activator="{ props }">
          <v-list-item
              class="mb-1"
              v-bind="props"
              prepend-icon="mdi-credit-card-chip-outline"
              title="Credentials">
          </v-list-item>
        </template>

        <v-list-item
            v-for="(menu, index) in subMenusCredential"
            :key="index"
            :value="menu.keyword"
            :title="menu.title"
            class="mb-1"
            :to="{name : menu.link}"
            :prepend-icon="menu.icon"/>

      </v-list-group>

      <v-list-group value="Applicant">

        <template v-slot:activator="{ props }">
          <v-list-item
              class="mb-1"
              v-bind="props"
              prepend-icon="mdi-frequently-asked-questions"
              title="Applicant">
          </v-list-item>
        </template>

        <v-list-item
            v-for="(menu, index) in subMenusApplicant"
            :key="index"
            :value="menu.keyword"
            :title="menu.title"
            class="mb-1"
            :to="{name : menu.link}"
            :prepend-icon="menu.icon"/>

      </v-list-group>

      <v-list-group value="Appointment">

        <template v-slot:activator="{ props }">
          <v-list-item
              class="mb-1"
              v-bind="props"
              prepend-icon="mdi-credit-card-multiple-outline"
              title="Appointment">
          </v-list-item>
        </template>

        <v-list-item
            v-for="(menu, index) in subMenusAppointment"
            :key="index"
            :value="menu.keyword"
            :title="menu.title"
            class="mb-1"
            :to="{name : menu.link}"
            :prepend-icon="menu.icon"/>
      </v-list-group>



    </v-list>

  </v-navigation-drawer>

</template>

<script setup>
import {reactive} from "vue";
import {useThemeStore} from "../../store/theme";
import {storeToRefs} from "pinia";

/** submenus pages **/
const subMenusUsers = reactive([
  {title: "All Users", keyword: "all-users", icon: null, link: "users"},
  {title: "Add User", keyword: "add-user", icon: null, link: "addUser"},
]);
const subMenusVisa = reactive([
  {title: "All Countries", keyword: "all-countries", icon: null, link: "countries"},
  {title: "Add Country", keyword: "add-country", icon: null, link: "addCountry"},
  {title: "All Embassy", keyword: "all-embassy", icon: null, link: "embassy"},
  {title: "Add embassy", keyword: "add-embassy", icon: null, link: "addEmbassy"},
  {title: "Embassies Config", keyword: "add-embassy", icon: null, link: "embassyConfig"},
]);

const subMenusPlatform = reactive([
  {title: "All Platforms", keyword: "all-platforms", icon: null, link: "platform"},
  {title: "Add Platforms", keyword: "add-platform", icon: null, link: "addPlatform"},
]);

const subMenusApplicant = reactive([
  {title: "All Applicant", keyword: "all-applicant", icon: null, link: "applicant"},
]);

const subMenusCredential = reactive([
  {title: "All Credential", keyword: "all-credential", icon: null, link: "credential"},
]);

const subMenusAppointment = reactive([
  {title: "All Appointment", keyword: "all-appointment", icon: null, link: "appointment"},
]);

/** theme store **/
const themeStore = useThemeStore();

/** navigationMain status  **/
const {navigationMain} = storeToRefs(themeStore);

</script>