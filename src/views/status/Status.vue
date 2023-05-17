<template>
  <div class="w-75 mx-auto pt-12">
      <div>
        <v-form>
          <v-select
              options
              v-model="selectBoxEmbassy"
              :items="embassiesName"
              item-title="name"
              item-value="id"
              :update:modelValue="changeStatus"
          >
          </v-select>
        </v-form>
      </div>

    <select class="status-select-box" name="" >
      <option value="none">Chose your Embassy</option>
      <option v-for="(embassySelect, index) in embassiesName" :value="embassySelect.name" @click="changeStatus()" >{{ embassySelect.name }}</option>
    </select>

  </div>
</template>

<script setup>

import {onMounted, reactive, ref, watch} from "vue";
import {axios} from "../../store/index.js";

const selectBoxEmbassy = ref("")
const loading = ref(false);
var allStatusData = reactive([]);
const embassiesName = reactive([
  {name: "ddd", id:1},
  {name: "dd33d", id:2}
]);

onMounted(() => {
  loading.value = true;

  axios.get("stat/us", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  }).then(res => {
    console.log(res.data);
    allStatusData = res.data
    allStatusData.forEach((item) => {
      embassiesName.push({name: item.embassy_id.name, id: item.embassy_id._id})
    })
    console.log(embassiesName)
    allStatusData = res.data;
  }).catch(err => {
    console.log(err);
  })

})

const changeStatus = () => {
  console.log("id");
}





</script>

<style scoped>

.status-select-box {
  width: 100%;
  border: none;
  border-radius: 6px;
  padding: 10px;
  background: white;
}

</style>

