import {defineStore} from "pinia";

export const useOptionStore = defineStore('options', {

    state: () => {
        return {
            title: "Dashboard"
        }
    },
    actions: {

    }

});