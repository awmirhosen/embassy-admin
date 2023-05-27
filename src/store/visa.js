import { defineStore } from "pinia";
import { axios } from "./index";

export const useVisaStore = defineStore("visa", {
  state: () => {
    return {
      allCountries: [],
      allEmbassies: [],
      countryEmbassies: [],
    };
  },
  actions: {
    //// get all contries
    fetchAllCountries(loading) {
      axios
        .get("/visa/country")
        .then((res) => {
          console.log(res);
          this.allCountries = res.data;
          loading.value = false;
          return res.data;
        })
        .catch((err) => {
          loading.value = false;
          console.log(err);
        });
    },
    ////// create country
    createCountry(data, disable, response, err) {
      console.log("Enter");
      axios
        .post("/visa/country", data)
        .then((res) => {
          disable.value = false;
          console.log(res);
          response.value = "Country Created Successfully";
        })
        .catch((error) => {
          err.value = "something went wrong!";
          disable.value = false;
          console.log(error);
        });
    },
    ////// all embassies
    fetchAllEmbassies(loading) {
      axios
        .get("/visa/embassy")
        .then((res) => {
          this.allEmbassies = res.data.reverse();
          loading.value = false;
          console.log(res);
          return res.data;
        })
        .catch((err) => {
          loading.value = false;
          console.log(err);
        });
    },
    fetchCountryEmbassies(loading, country_id) {
      axios
        .get(`/visa/embassy/${country_id}`)
        .then((res) => {
          this.countryEmbassies = res.data.reverse();
          loading.value = false;
          console.log(res);
        })
        .catch((err) => {
          loading.value = false;
          console.log(err);
        });
    },
  },
});
