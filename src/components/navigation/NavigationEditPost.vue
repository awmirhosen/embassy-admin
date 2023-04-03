<template>
  <v-navigation-drawer width="400" r v-model="navigationEditPost">

    <div class="d-flex flex-row bg-grey justify-space-between align-center pa-1">

      <v-btn variant="text" size="small" icon="mdi-widgets"/>

      <p>Page Builder</p>

      <v-btn variant="text" size="small" icon="mdi-menu"/>

    </div>

    <v-text-field
        class="pa-2"
        density="compact"
        variant="underlined"
        label="Search widgets"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details/>

    <v-container>
      <Draggable :list="widgets"
                 item-key="name"
                 :group="{ name: 'widgets', pull: 'clone', put: false }"
                 class="v-row v-row--dense">
        <template #item="{ element }">
          <v-col cols="6">
            <div class="d-flex flex-column bg-grey align-center pa-5 rounded">
              <v-icon icon="mdi-cards-heart"></v-icon>
              <p v-text="element.name" class="pt-2"/>
            </div>
          </v-col>
        </template>
      </Draggable>
    </v-container>

    <template v-slot:append>
      <div class="d-flex flex-row bg-grey align-center pa-1 justify-space-between">

        <div></div>
        <v-btn variant="flat" color="green">Save</v-btn>

      </div>
    </template>

  </v-navigation-drawer>
</template>

<script setup>
import Draggable from "vuedraggable";
import {useThemeStore} from "@/store/theme";
import {storeToRefs} from "pinia";
import {reactive} from "vue";

/** theme store **/
const themeStore = useThemeStore();

/** navigationMain status  **/
const {navigationEditPost} = storeToRefs(themeStore);

const widgets = reactive([
  {name: "test1"},
  {name: "test2"},
  {name: "test3"},
  {name: "test4"},
  {name: "test5"},
  {name: "test6"},
  {name: "test7"},
  {name: "test8"},
  {name: "test9"},
  {name: "test10"}
])

</script>