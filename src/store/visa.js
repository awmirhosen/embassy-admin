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
        .get("/visa/country", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
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
        .post("http://185.208.172.123/visa/country", data, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
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
        .get("/visa/embassy", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.allEmbassies = res.data;
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
        .get(`/visa/embassy/${country_id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.countryEmbassies = res.data;
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