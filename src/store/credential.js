import {defineStore} from "pinia";
import Axios from "axios";
import {axios} from "./index.js";


export const useCredentialStore = defineStore("credential", {
    state: () => {
        return {
            allCredential : []
        }
    },
    actions: {
        fetchAllCredentials(loading) {
            axios.get("/credentials").then(res => {
                loading.value = false;
                console.log(res)
                this.allCredential = res.data;
            }).catch(err => {
                loading.value = false;
                console.log(err)
            })
        },
    }
})