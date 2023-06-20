import {defineStore} from "pinia";
import Axios from "axios";
import {axios} from "./index.js";


export const useApplicantStore = defineStore("applicant", {
    state: () => {
        return {
            allApplicant : []
        }
    },
    actions: {
        fetchAllApplicant(loading) {
            axios.get("/applicant").then(res => {
                loading.value = false;
                this.allApplicant = res.data.reverse();
                console.log(res)
            }).catch(err => {
                loading.value = false;
                console.log(err)
            })
        }
    }
})