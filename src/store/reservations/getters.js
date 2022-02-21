export function getFormData(state) {
  let formData = { ...state.reservation };
  delete formData.room_title;
  delete formData.discount_ammount;
  delete formData.hotel_name;
  delete formData.price_rate;
  delete formData.room_price;
  delete formData.scenic_title;
  delete formData.max_adult_size;
  delete formData.action_status;
  delete formData.last_post_id;

  return formData;
}
