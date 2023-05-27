import {defineStore} from "pinia";
import Axios from "axios";
import {axios} from "./index.js";


export const useAppointmentStore = defineStore("appointment", {
    state: () => {
        return {
            allAppointment : []
        }
    },
    actions: {
        fetchAllApplicant(loading) {
            axios.get("/appointment/us").then(res => {
                loading.value = false;
                this.allAppointment = res.data;
                console.log(res)
            }).catch(err => {
                loading.value = false;
                console.log(err)
            })
        }
    }
})