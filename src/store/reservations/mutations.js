export function setReservation(state, reservationData) {
  console.log("in mutations", reservationData);

  state.reservation.hotel_id=reservationData.hotel_id?reservationData.hotel_id:reservationData.hotel_id!=0?state.reservation.hotel_id:0
  state.reservation.hotel_name=reservationData.hotel_name?reservationData.hotel_name:reservationData.hotel_id!=""?state.reservation.hotel_name:''

  state.reservation.start_date=reservationData.start_date?reservationData.start_date:reservationData.start_date!=""?state.reservation.start_date:''
  state.reservation.end_date=reservationData.end_date?reservationData.end_date:reservationData.end_date!=""?state.reservation.end_date:''
  state.reservation.adult=reservationData.adult?reservationData.adult:reservationData.adult!=0?state.reservation.adult:0
  state.reservation.child=reservationData.child?reservationData.child:reservationData.child!=0?state.reservation.child:0

  state.reservation.max_adult_size=reservationData.max_adult_size?reservationData.max_adult_size:reservationData.max_adult_size!=0?state.reservation.max_adult_size:0

  state.reservation.room_type=reservationData.room_type?reservationData.room_type:reservationData.room_type!=0?state.reservation.room_type:0
  state.reservation.room_scenic=reservationData.room_scenic?reservationData.room_scenic:reservationData.room_scenic!=0?state.reservation.room_scenic:0

  state.reservation.room_title=reservationData.room_title?reservationData.room_title:reservationData.room_title!=""?state.reservation.room_title:''
  state.reservation.scenic_title=reservationData.scenic_title?reservationData.scenic_title:reservationData.room_title!=""?state.reservation.scenic_title:''

  state.reservation.room_price=reservationData.room_price?reservationData.room_price:reservationData.room_price!=0?state.reservation.room_price:0
  state.reservation.price_rate=reservationData.price_rate?reservationData.price_rate:reservationData.price_rate!=0?state.reservation.price_rate:0

  state.reservation.price=reservationData.price?reservationData.price:reservationData.price!=0?state.reservation.price:0
  state.reservation.coupon_code=reservationData.coupon_code?reservationData.coupon_code:reservationData.coupon_code!=""?state.reservation.coupon_code:''
  state.reservation.discount_ammount=reservationData.discount_ammount?reservationData.discount_ammount:reservationData.discount_ammount!=0?state.reservation.discount_ammount:0
  

  state.reservation.card_name=reservationData.card_name?reservationData.card_name:reservationData.card_name!=""?state.reservation.card_name:''
  state.reservation.card_number=reservationData.card_number?reservationData.card_number:reservationData.card_number!=""?state.reservation.card_number:''
  state.reservation.card_date_month=reservationData.card_date_month?reservationData.card_date_month:reservationData.card_date_month!=""?state.reservation.card_date_month:''
  state.reservation.card_date_year=reservationData.card_date_year?reservationData.card_date_year:reservationData.card_date_year!=""?state.reservation.card_date_year:''
  state.reservation.card_cvv=reservationData.card_cvv?reservationData.card_cvv:reservationData.card_cvv!=""?state.reservation.card_cvv:''

  state.reservation.action_status=reservationData.action_status?reservationData.action_status:reservationData.action_status!=""?state.reservation.action_status:''
  state.reservation.last_post_id=reservationData.last_post_id?reservationData.last_post_id:reservationData.last_post_id!=""?state.reservation.last_post_id:""
}


export function clearReservation(state) {
    state.reservation={
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
    }
}

export function setCoupon(state, couponData) {
      state.coupons=couponData
}

export function setLastPostId(state, lastPostId) {
  state.last_post_id=lastPostId
}



