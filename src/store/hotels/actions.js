import api from '../../api'

export function GET_HOTELS({ commit }) {
  return new Promise((resolve, reject) => {
    // console.log('route',APIROUTE);
    api
      .get("/hotels")
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
    api
      .get("/hotel-details")
      .then((response) => {
 
        commit("setHotelDetails", response.data);
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
