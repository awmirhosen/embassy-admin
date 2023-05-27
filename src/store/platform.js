import {defineStore} from "pinia";
import Axios from "axios";
import {axios} from "./index.js";


export const usePlatformStore = defineStore("platform", {
    state: () => {
        return {
            allPlatforms : []
        }
    },
    actions: {
        fetchAllPlatforms(loading) {
            axios.get("/platform").then(res => {
                loading.value = false;
                this.allPlatforms = res.data;
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        },
        findPlatformById(id) {
            axios.get("/platform").then(res => {
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