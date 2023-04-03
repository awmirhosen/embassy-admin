<template>
  <v-app-bar density="compact" elevation="0" flat>

    <v-app-bar-title>Edit Post :</v-app-bar-title>

    <template v-slot:append>
      <v-btn variant="text" size="small" icon="mdi-shape-square-plus" @click="addRow"/>
    </template>

  </v-app-bar>
</template>

<script setup>
import {usePageStore} from "@/store/pages";

/** initialize page store  **/
const pageStore = usePageStore()

function addRow() {
  pageStore.addRow()
}

</script>