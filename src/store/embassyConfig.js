import {defineStore} from "pinia";
import {axios} from "./index.js";


export const useEmbassyConfig = defineStore("embassyConfig", {
    state: () => {
        return {
            allEmbassyConfig : []
        }
    },
    actions : {
        fetchAllEmbassyConfig(loading) {
            axios.get("/visa/us/embassy-config", {
                headers : {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            }).then(res => {
                loading.value = false;
                console.log(res)
                this.allEmbassyConfig = res.data;
            }).catch(err => {
                loading.value = false;
                console.log(err)
            })
        }
    }
})