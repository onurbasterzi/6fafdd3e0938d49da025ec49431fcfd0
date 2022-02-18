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
      price: 0,
      coupon_code: "",
      card_name: "",
      card_number: "",
      card_date_month: "",
      card_date_year: "",
      card_cvv: "",
    },
  };
}
