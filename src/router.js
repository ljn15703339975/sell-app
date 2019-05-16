import Vue from "vue"
import VueRouter from "vue-router"

//引入组件
// import Goods from "./components/goods/goods.vue"
// import Ratings from "./components/ratings/ratings.vue"
// import Seller from "./components/seller/seller.vue"

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: "/",
            redirect: "/goods"
        },
        {
            path: "/goods",
            // component: Goods
            // component:resolve=>require(['@/components/goods/goods.vue'],resolve)
            component: () => import('./components/goods/goods.vue')
        },
        {
            path: "/ratings",
            // component: Ratings
            // component:resolve=>require(['@/components/ratings/ratings.vue'],resolve)
            component:  () => import('./components/ratings/ratings.vue')
        },
        {
            path: "/seller",
            // component: Seller
            // component:resolve=>require(['@/components/seller/seller.vue'],resolve)
            component: () => import('./components/seller/seller.vue')
        },

    ]
})