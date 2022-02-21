export default function () {
  return {
    namespaced: true,
    reservation: {
      hotel_id: 0,
      hotel_name:"",
      start_date: "",
      end_date: "",
      adult: null,
      child: null,
      room_type: 0,
      room_scenic: 0,
      room_title: "",
      scenic_title: "",
      price: 0,
      room_price:0,
      price_rate:0,
      coupon_code: "",
      discount_ammount:0,
      card_name: "",
      card_number: "",
      card_date_month: "",
      card_date_year: "",
      card_cvv: "",
      max_adult_size:5,
      action_status:"add",
      last_post_id:""
    },
    coupons:[],
  };
}
