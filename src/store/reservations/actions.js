
import api from '../../api'
export function GET_COUPON({ commit }, code) {
  return new Promise((resolve, reject) => {
   
    api
      .get(`/coupons?code=${code}`)
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
    api
      .post("/hotel-bookings", formData)
      .then((response) => {
        let data = response.data;
    
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
    api
      .put(`/hotel-bookings/${id}`, formData)
      .then((response) => {
        let data = response.data;
  
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
    
    api
      .delete(`/hotel-bookings/${id}`)
      .then((response) => {
        let data = response.data;
        
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
