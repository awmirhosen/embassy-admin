<template>

  <v-dialog v-model="props.showModal" persistent max-width="600px">

    <v-card>

      <v-card-title>
        Creat New Page
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
                v-model="fields.postTitle"
                color="primary"
                label="Page Title"
                variant="underlined"
                :disabled="process.create"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
                v-model="fields.postSlug"
                color="primary"
                label="Page Slug"
                variant="underlined"
                :disabled="process.create"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text :disabled="process.isProcess" @click="hideModal">
          Cansel
        </v-btn>
        <v-btn color="blue darken-1" text @click="addPage" :loading="process.create" :disabled="process.isProcess">
          Add Page
        </v-btn>
      </v-card-actions>

    </v-card>

  </v-dialog>

</template>

<script setup>
import {reactive, watch} from "vue"
import {usePageStore} from "@/store/pages"
import {storeToRefs} from "pinia"

/** define props **/
const props = defineProps({
  showModal: {
    type: Boolean,
    required: true
  }
})

/** define emits **/
const emits = defineEmits(['hideModal'])

/** initialize page store  **/
const pageStore = usePageStore()

/** get process from page store **/
const {process} = storeToRefs(pageStore)

const fields = reactive({
  postTitle: "",
  postSlug: ""
})

/** add page button **/
function addPage() {
  pageStore.createPage(fields.postTitle, fields.postSlug)
}

/** hide modal button **/
function hideModal() {
  emits('hideModal', false)
}

/** watch add page **/
watch(pageStore.process, (value) => {
  if (!value.create) {
    fields.postTitle = ""
    fields.postSlug = ""
    emits('hideModal', false)
  }
})

</script>