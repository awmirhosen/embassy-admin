<template>
  <div class="text-center">
    <v-snackbar v-model="snackBar.show" :timeout="timeout">

      {{ snackBar.message }}

      <template v-slot:actions>
        <v-btn color="blue" variant="text" @click="close">
          Close
        </v-btn>
      </template>

    </v-snackbar>
  </div>
</template>

<script setup>
import {useShareStore} from "../../store/share"
import {storeToRefs} from "pinia"
import {ref} from "vue"

/** timeout show snackbar **/
const timeout = ref(3000)

/** initialize share store  **/
const shareStore = useShareStore()
const {snackBar} = storeToRefs(shareStore)

/** close button snackbar **/
function close() {
  shareStore.setSnackBar(false, "")
}
</script>