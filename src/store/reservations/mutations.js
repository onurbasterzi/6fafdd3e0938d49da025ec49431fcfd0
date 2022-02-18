export function setReservation(state, reservationData) {
  console.log("in mutations", reservationData);

  state.reservation.hotel_id=reservationData.hotel_id?reservationData.hotel_id:state.reservation.hotel_id
  state.reservation.hotel_name=reservationData.hotel_name?reservationData.hotel_name:state.reservation.hotel_name

  state.reservation.start_date=reservationData.start_date?reservationData.start_date:state.reservation.start_date
  state.reservation.end_date=reservationData.end_date?reservationData.end_date:state.reservation.end_date
  state.reservation.adult=reservationData.adult?reservationData.adult:state.reservation.adult
  state.reservation.child=reservationData.child?reservationData.child:state.reservation.child

  state.reservation.room_type=reservationData.room_type?reservationData.room_type:state.reservation.room_type
  state.reservation.room_scenic=reservationData.room_scenic?reservationData.room_scenic:state.reservation.room_scenic

  state.reservation.price=reservationData.price?reservationData.price:state.reservation.price
  state.reservation.coupon_code=reservationData.coupon_code?reservationData.coupon_code:state.reservation.coupon_code
  state.reservation.card_name=reservationData.card_name?reservationData.card_name:state.reservation.card_name
  state.reservation.card_number=reservationData.card_number?reservationData.card_number:state.reservation.card_number
  state.reservation.card_date_month=reservationData.card_date_month?reservationData.card_date_month:state.reservation.card_date_month
  state.reservation.card_date_year=reservationData.card_date_year?reservationData.card_date_year:state.reservation.card_date_year
  state.reservation.card_cvv=reservationData.card_cvv?reservationData.card_cvv:state.reservation.card_cvv

 

}
