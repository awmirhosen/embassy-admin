<template>

  <v-dialog v-model="props.showModal" persistent max-width="600px">

    <v-card class="pa-6">
      <!-----------header of modal------------>
      <div class="d-flex justify-space-between border-b pb-2">
        <p class="text-dark">Upload File</p>
        <div>
          <v-icon icon="mdi-close" @click="hideModal"></v-icon>
        </div>
      </div>

      <!-----------uploader------------->
      <Uploader />


    </v-card>

  </v-dialog>

</template>

<script setup>
import {reactive, ref, watch} from "vue"
import {usePageStore} from "@/store/pages"
import {storeToRefs} from "pinia"
import Uploader from "../uploader/Uploader.vue";


/** define props **/
const props = defineProps({
  showModal: {
    type: Boolean,
    required: true
  }
})

/** define emits **/
const emits = defineEmits(['hideUploaderModal'])

/** hide modal button **/
function hideModal() {
  emits('hideModal', false)
}


</script>

<style scoped>

.mdi-close:hover {
  transition: all linear 100ms;
  transform: rotate(90deg);
}
.uploader-box {
  border-radius: 12px;
}
.uploader-box *{
  color: black;
}

</style>