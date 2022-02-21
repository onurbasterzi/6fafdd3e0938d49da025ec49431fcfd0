const APIROUTE = "https://5f6d939160cf97001641b049.mockapi.io/tkn";
import axios from "axios";
export function GET_COUPON({ commit }, code) {
  return new Promise((resolve, reject) => {
    console.log(APIROUTE + `/coupons?code=${code}`);
    axios
      .get(APIROUTE + `/coupons?code=${code}`)
      .then((response) => {
        let data = response.data;
        commit("setCoupon", data);
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function POST_RESERVATION({ commit }, formData) {
  return new Promise((resolve, reject) => {
    axios
      .post(APIROUTE + "/hotel-bookings", formData)
      .then((response) => {
        let data = response.data;
        console.log(data.id);
        commit("setReservation", {last_post_id:data.id});
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function UPDATE_RESERVATION({ commit }, payload) {
  return new Promise((resolve, reject) => {
    const id=payload[0]
    const formData=payload[1]
    axios
      .put(APIROUTE + `/hotel-bookings/${id}`, formData)
      .then((response) => {
        let data = response.data;
        console.log(data.id);
        commit("setReservation", {last_post_id:data.id});
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function DELETE_RESERVATION({ commit }, id) {
  return new Promise((resolve, reject) => {
    
    axios
      .delete(APIROUTE + `/hotel-bookings/${id}`)
      .then((response) => {
        let data = response.data;
        console.log(data.id);
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
