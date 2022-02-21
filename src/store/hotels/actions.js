import axios from "axios";
const APIROUTE='https://5f6d939160cf97001641b049.mockapi.io/tkn'

export function GET_HOTELS({ commit }) {
    return new Promise((resolve, reject) => {
        console.log(APIROUTE+"/hotels");
      axios
        .get(APIROUTE + "/hotels")
        .then((response) => {
          let data = response.data;
          commit("setHotels", data);
          resolve(response);
      
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  export function GET_HOTEL_DETAILS({ commit },id) {
    return new Promise((resolve, reject) => {
        console.log(APIROUTE+"/hotel-details");
      axios
        .get(APIROUTE + "/hotel-details")
        .then((response) => {
          const selectedDetails=response.data.filter(x => x.id == id);
          console.log(selectedDetails);
          commit("setHotelDetails", selectedDetails);
          resolve(selectedDetails);
      
        })
        .catch((err) => {
          reject(err);
        });
    });
  }