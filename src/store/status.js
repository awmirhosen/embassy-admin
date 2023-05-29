import {defineStore} from "pinia";
import {axios} from "./index.js";

export const useStatusStore = defineStore("status", {
    state: () => {
        return {
            allStatusData: [],
            embassiesName: [],
        }
    },
    actions: {
        fetchAllStatus(laoding, errMessage) {
             axios.get("/stat/us").then(res => {
                console.log(res.data);
                loading.value = false;
                this.allStatusData = res.data
                this.allStatusData.forEach((item) => {
                    this.embassiesName.push({name: item.embassy_id.name, id: item.embassy_id._id})
                })
            }).catch(err => {
                console.log(err);
                errMessage.value = true;
            })
        }
    }
})