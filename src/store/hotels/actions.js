import axios from "axios";
const APIROUTE = "https://5f6d939160cf97001641b049.mockapi.io/tkn";

export function GET_HOTELS({ commit }) {
  return new Promise((resolve, reject) => {
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

export function GET_SELECTED_DETAILS({ commit, state }, id) {
  return new Promise((resolve, reject) => {
    try {
      const selectedDetails = state.hoteldetailsdata.filter((x) => x.id == id);
      commit("setSelectedDetails", selectedDetails);
      resolve(selectedDetails);
    } catch (error) {
      reject(err);
    }
  });
}

export function GET_HOTEL_DETAILS({ commit }) {
  return new Promise((resolve, reject) => {
    axios
      .get(APIROUTE + "/hotel-details")
      .then((response) => {
 
        commit("setHotelDetails", response.data);
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
