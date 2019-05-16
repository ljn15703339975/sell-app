<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <span class="cart" @click="showCartList">
          <span class="icon" :class="{active:foodList.length>0}">
            <i class="icon-shopping_cart"></i>
          </span>
        </span>
        <span class="count" v-show="totalNumber">{{totalNumber}}</span>
        <span class="price">￥{{totalPrice}}</span>
        <span class="deliveryPrice">另需配送费￥{{deliveryPrice}}</span>
      </div>
      <div class="content-right">
        <span v-if="totalPrice === 0">￥{{minPrice}}起送</span>
        <span v-else-if="totalPrice < minPrice">还差￥{{minPrice - totalPrice}}起送</span>
        <span v-else class="active" @click="toPay">去结算</span>
      </div>
    </div>

    <div class="ball-wrapper">
      <transition-group
        name="drop"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:after-enter="afterEnter"
      >
        <div class="ball" v-for="(ball, index) in balls" :key="index" v-show="ball.show">
          <div class="inner inner-hook"></div>
        </div>
      </transition-group>
    </div>

    <transition name="fold">
      <div class="cart-list" v-show="show">
        <div class="cart-content">
          <div class="cart-title">
            <span class="name">购物车</span>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="food-list" ref="cartWrapper">
            <ul>
              <li
                v-for="(food, index) in foodList"
                :key="index"
                class="food-item"
                v-show="food.count"
              >
                <span class="food-name">{{food.name}}</span>
                <span>
                  <span class="food-price">
                    <span class="icon">￥</span>
                    {{food.price}}
                  </span>
                  <cartControl :food="food"></cartControl>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="mask" v-show="show" @click="showCartList"></div>
    </transition>
  </div>
</template>

<script>
import cartControl from "../cartControl/cartControl.vue";
import BScroll from "better-scroll";
export default {
  props: {
    minPrice: {
      type: Number
    },
    deliveryPrice: {
      type: Number
    },
    foodList: {
      type: Array
    }
  },
  components: {
    cartControl
  },
  data() {
    return {
      showList: false,
      balls: [
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false }
      ],
      dropBalls: []
    };
  },
  computed: {
    totalPrice() {
      let totalPri = 0;
      for (let i = 0; i < this.foodList.length; i++) {
        totalPri += this.foodList[i].price * this.foodList[i].count;
      }
      return totalPri;
    },
    totalNumber() {
      let totalNum = 0;
      for (let i = 0; i < this.foodList.length; i++) {
        totalNum += this.foodList[i].count;
      }
      return totalNum;
    },
    show() {
      if (this.showList) {
        this.$nextTick(() => {
          this.scroll();
        });
        if (this.totalNumber === 0) {
          this.showList = false;
          return false;
        }
        return this.showList;
      }
    }
  },
  methods: {
    scroll() {
      if (!this.initScroll) {
        this.initScroll = new BScroll(this.$refs.cartWrapper, {
          click: true
        });
      } else {
        this.initScroll.refresh();
      }
    },
    showCartList() {
      if (this.totalNumber > 0) {
        this.showList = !this.showList;
      }
    },
    empty() {
      this.showList = false;
      this.foodList.forEach(food => {
        food.count = 0;
      });
    },
    toPay() {
      alert(this.totalPrice + this.deliveryPrice);
    },
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforeEnter(el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          //dom元素在视窗的位置
          let pos = ball.el.getBoundingClientRect();
          let x = pos.left + 20 + "px";
          let y = -(window.innerHeight - pos.top - 40) + "px";
          el.style.display = "block";
          el.style.transform = `translate3d(0,${y},0)`;
          el.querySelector(
            ".inner-hook"
          ).style.transform = `translate3d(${x},0,0)`;
        }
      }
    },
    enter(el, done) {
      //在钩子函数里面必须用offsetwidth去刷新元素的大小，才能实现过渡效果
      let rf = el.offsetwidth;
      this.$nextTick(() => {
        el.querySelector(".inner-hook").style.transform = `translate3d(0,0,0)`;
        el.style.transform = `translate3d(0,0,0)`;
      });
      setTimeout(() => {
        done();
      }, 400);
    },
    afterEnter(el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        // el.style.display = "none";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 48px;
  background-color: #141d27;
  color: rgba(255, 255, 255, 0.4);
  z-index: 1;
  .content {
    position: relative;
    z-index: 999;
    display: flex;
    .content-left {
      flex: 1;
      position: relative;
      z-index: 100;
      background-color: #141d27;
      .cart {
        display: inline-block;
        position: relative;
        top: -10px;
        left: 12px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background-color: #141d27;
        .icon {
          display: inline-block;
          margin: 6px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.2);
          text-align: center;
          line-height: 44px;
          font-size: 24px;
          &.active {
            background-color: rgb(0, 160, 220);
            color: #ffffff;
          }
        }
      }
      .count {
        position: absolute;
        top: -8px;
        left: 44px;
        width: 24px;
        line-height: 16px;
        font-size: 9px;
        color: rgb(255, 255, 255);
        text-align: center;
        background-color: rgb(240, 20, 20);
        border-radius: 12px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
      }
      .price {
        display: inline-block;
        padding: 0 12px;
        margin-top: 12px;
        margin-left: 6px;
        vertical-align: top;
        line-height: 24px;
        font-size: 16px;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        font-weight: 700;
      }
      .deliveryPrice {
        display: inline-block;
        padding-left: 12px;
        margin-top: 12px;
        vertical-align: top;
        line-height: 24px;
        font-size: 12px;
        font-weight: 200;
      }
    }
    .content-right {
      flex: 0 0 105px;
      span {
        display: block;
        background-color: #435159;
        font-size: 12px;
        font-weight: 700;
        line-height: 24px;
        padding: 12px;
        text-align: center;
        &.active {
          background-color: #00b43c;
          color: #ffffff;
        }
      }
    }
  }
  .fold-enter-active,
  .fold-leave-active {
    transition: all 0.5s;
  }
  .fold-enter,
  .fold-leave-to {
    transform: translateY(260px);
  }
  .cart-list {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 48px;
    z-index: 9;
    .cart-content {
      position: absolute;
      bottom: 0;
      max-height: 260px;
      width: 100%;
      .cart-title {
        height: 40px;
        background-color: #f3f5f7;
        color: rgb(7, 17, 27);
        font-size: 14px;
        font-weight: 200;
        line-height: 40px;
        padding: 0 18px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .empty {
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }
      .food-list {
        background-color: #ffffff;
        padding: 0 18px;
        overflow: hidden;
        max-height: 219px;
        .food-item {
          height: 48px;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
          box-sizing: border-box;
          padding: 12px 0;
          display: flex;
          justify-content: space-between;
          .food-name {
            color: rgb(7, 17, 27);
            font-size: 14px;
            font-weight: 200;
            line-height: 24px;
          }
          .food-price {
            color: rgb(240, 20, 20);
            font-size: 14px;
            font-weight: 700;
            line-height: 24px;
            margin-left: 18px;
            margin-right: 12px;
            .icon {
              font-size: 10px;
              font-weight: normal;
            }
          }
        }
      }
    }
  }
  .mask {
    filter: blur(10px);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(7, 17, 27, 0.6);
    z-index: -1;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  .ball-wrapper {
    .ball {
      position: fixed;
      left: 30px;
      bottom: 20px;
      z-index: 999;
      &.drop-enter-active {
        transition: all 0.4s cubic-bezier(0.15, -0.41, 0.74, 0.57);
      }
      .inner {
        width: 20px;
        height: 20px;
        background-color: rgb(0, 160, 220);
        border-radius: 50%;
        transition: all 0.4s;
      }
    }
  }
}
</style>