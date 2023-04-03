import {defineStore} from "pinia";


export const useShareStore = defineStore('share', {

    state: () => {
        return {
            snackBar: {
                show: false,
                message: ""
            }
        }
    },
    actions: {
        setSnackBar(show, message) {
            this.snackBar.show = show;
            this.snackBar.message = message;
        }
    }

});