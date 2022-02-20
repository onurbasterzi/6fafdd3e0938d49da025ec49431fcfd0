const APIROUTE='https://5f6d939160cf97001641b049.mockapi.io/tkn'
import axios from 'axios'
export function GET_COUPON({ commit },code) {
    return new Promise((resolve, reject) => {
        console.log(APIROUTE+`/coupons?code=${code}`);
      axios
        .get(APIROUTE+`/coupons?code=${code}`)
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
