import {defineStore} from "pinia";
import Axios from "axios";


export const usePlatformStore = defineStore("platform", {
    state: () => {
        return {
            allPlatforms : []
        }
    },
    actions: {
        fetchAllPlatforms(loading) {
            Axios.get("http://185.208.172.123/platform", {
                headers : {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            }).then(res => {
                loading.value = false;
                this.allPlatforms = res.data;
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        },
        findPlatformById(id) {
            Axios.get("http://185.208.172.123/platform", {
                headers : {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            }).then(res => {
                res.data.forEach("dd")
                loading.value = false;
                this.allPlatforms = res.data;
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        }
    }
})