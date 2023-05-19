<template>
  <div class="w-75 mx-auto pt-12">

    <select class="status-select-box" name="" @change="changeStatus" >
      <option value="none" @click="changeStatus">Chose your Embassy</option>
      <option v-for="(embassySelect, index) in embassiesName" :value="embassySelect.id" @click="changeStatus(e)" >{{ embassySelect.name }}</option>
    </select>

    <div v-if="loadingStatus">
      <div class="w-100 mt-8">
        <div class="w-100 text-center text-h5">
          Embassy Name : {{ statusEmbassyData.embassy_id.name }}
        </div>
        {{statusEmbassyData.embassy_id}}
      </div>
    </div>
    <div v-else class="w-100 mt-8 text-center text-h3">
      Please Select your Embassy
    </div>

  </div>
</template>

<script setup>

import {onMounted, reactive, ref, watch} from "vue";
import {axios} from "../../store/index.js";

const selectBoxEmbassy = ref("")
const loading = ref(false);
var allStatusData = reactive([]);
var statusEmbassyData = reactive([]);
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

const loadingStatus = ref(false)

const changeStatus = (e) => {

  loadingStatus.value = false;

  allStatusData.forEach(item => {
    if (item.embassy_id._id === e.target.value) {
      statusEmbassyData = item;
      console.log(item)
      loadingStatus.value = true;
    }
  })

}





</script>

<style scoped>

.status-select-box {
  width: 100%;
  border: none;
  border-radius: 6px;
  padding: 15px;
  background: white;
  box-shadow: 4px 4px 10px rgba(0,0,0,0.4);
}

.status-select-box:focus {
  border: none;
  outline: none;
}

</style>

