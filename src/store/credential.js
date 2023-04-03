import {defineStore} from "pinia";
import Axios from "axios";


export const useCredentialStore = defineStore("credential", {
    state: () => {
        return {
            allCredential : []
        }
    },
    actions: {
        fetchAllCredentials(loading) {
            Axios.get("http://185.208.172.123/credentials", {
                headers : {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            }).then(res => {
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