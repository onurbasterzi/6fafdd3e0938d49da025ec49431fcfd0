import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/preview",
    name: "ReservationPreview",
    component: () => import("../views/preview/Final.vue")
  },

   {
    path: "/",
    component: () => import("../layouts/FormLayout.vue"),
    children: [
      { path: '',name:'Hotel', component: () => import('../views/rezervation/HotelAndDate.vue') },
      { path: '/room-type',name:'Room', component: () => import('../views/rezervation/RoomType.vue') },
      { path: '/payment-preview',name:'Payment',  component: () => import('../views/rezervation/PreviewAndPayment.vue') },
    ]
  },

 
  // {
  //   path: '*',
  //   component: () => import('pages/Error404.vue')
  // }
  
];




const router = new VueRouter({
  routes,
});

export default router;
