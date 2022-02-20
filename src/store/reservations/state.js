export default function () {
  return {
    namespaced: true,
    reservation: {
      hotel_id: 0,
      hotel_name:"",
      start_date: "",
      end_date: "",
      adult: 0,
      child: 0,
      room_type: 0,
      room_scenic: 0,
      room_title: "",
      scenic_title: "",
      price: 0,
      room_price:0,
      price_rate:0,
      coupon_code: "",
      coupon_status:"",
      discount_ammount:0,
      card_name: "",
      card_number: "",
      card_date_month: "",
      card_date_year: "",
      card_cvv: "",
    },
    coupons:[]
  };
}
