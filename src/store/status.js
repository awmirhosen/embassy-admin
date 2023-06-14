import {defineStore} from "pinia";
import {axios} from "./index.js";

export const useStatusStore = defineStore("status", {
    state: () => {
        return {
            allStatusData: [],
            embassiesName: [],
            statusEmbassyData: [],
            appointmentDataTable: [],
        }
    },
    actions: {
        fetchAllStatus(loading, errMessage) {
            this.embassiesName = [];
            axios.get("/stat/us").then(res => {
                console.log(res.data);
                loading.value = false;
                this.allStatusData = res.data;
                console.log(res.data)
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