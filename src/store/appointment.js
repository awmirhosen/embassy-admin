import {defineStore} from "pinia";
import Axios from "axios";


export const useAppointmentStore = defineStore("appointment", {
    state: () => {
        return {
            allAppointment : []
        }
    },
    actions: {
        fetchAllApplicant(loading) {
            Axios.get("http://185.208.172.123/appointment/us", {
                headers : {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            }).then(res => {
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