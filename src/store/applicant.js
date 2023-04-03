import {defineStore} from "pinia";
import Axios from "axios";


export const useApplicantStore = defineStore("applicant", {
    state: () => {
        return {
            allApplicant : []
        }
    },
    actions: {
        fetchAllApplicant(loading) {
            Axios.get("http://185.208.172.123/applicant", {
                headers : {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            }).then(res => {
                loading.value = false;
                this.allApplicant = res.data;
                console.log(res)
            }).catch(err => {
                loading.value = false;
                console.log(err)
            })
        }
    }
})