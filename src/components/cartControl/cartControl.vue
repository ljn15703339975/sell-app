<template>
  <div class="car-control-wrapper" ref="cartWrapper">
    <transition name="move">
      <span v-show="food.count" class="decrease move-transition">
        <span class="inner icon-remove_circle_outline" @click="decrease"></span>
      </span>
    </transition>
    <span v-if="food.count" class="count">{{food.count}}</span>
    <span class="icon-add_circle" @click="add"></span>
  </div>
</template>
<script>
import Vue from "vue";
import bus from "../../bus.js";
export default {
  props: ["food"],
  methods: {
    add() {
      if (!this.food.count) {
        // Vue.set(目标对象，添加的属性，属性值)
        Vue.set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
      bus.$emit("cart-add",this.$refs.cartWrapper);
    },
    decrease() {
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.car-control-wrapper {
  display: inline-block;
  span {
    display: inline-block;
    line-height: 24px;
    vertical-align: middle;
    transition: all 0.4s linear;
    &.move-transition {
      opacity: 1;
      transform: translate3d(0, 0, 0);
      .icon-remove_circle_outline {
        font-size: 24px;
        color: rgb(0, 160, 220);
        transform: rotate(0deg);
        transition: all 0.4s linear;
      }
      &.move-enter,
      &.move-leave-to {
        opacity: 0;
        transform: translate3d(24px, 0, 0);
        .inner {
          transform: rotate(360deg);
        }
      }
    }
    &.icon-add_circle {
      font-size: 24px;
      color: rgb(0, 160, 220);
    }
    &.count {
      width: 24px;
      text-align: center;
      font-size: 10px;
      color: rgb(147, 153, 159);
    }
  }
}
</style>