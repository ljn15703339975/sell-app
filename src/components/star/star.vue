<template>
  <div :class="starType">
    <span v-for="(item, index) in result" :key="index" :class="item" class="star-item"></span>
  </div>
</template>

<script>
const LENGTH = 5;
const ON_STAR = "on"; //满星
const HALF_STAR = "half"; //半颗星
const OFF_STAR = "off"; //没有星

export default {
  props: ["score", "size"],
  computed: {
    result() {
      let result = [];
      let score = Math.floor(this.score * 2) / 2;
      let onLength = Math.floor(score);
      let halfStar = score - onLength;
      for (let i = 0; i < onLength; i++) {
        result.push(ON_STAR);
      }
      if (halfStar) {
        result.push(HALF_STAR);
      }
      while (result.length<LENGTH) {
        result.push(OFF_STAR);
      }
      // let l = result.length;
      // for (let i = 0; i < LENGTH - l; i++) {
      //   result.push(OFF_STAR);
      // }
      return result;
    },
    starType() {
      return "star-" + this.size;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/css/mixins.scss";
.star-48 {
  display: inline-block;
  .star-item {
    display: inline-block;
    width: 24px;
    height: 24px;
    background-size: 24px 24px;
    background-repeat: no-repeat;
    margin-right: 20px;
    &:last-child {
      margin-right: 0;
    }
    &.on {
      @include bgimg(images/star24_on);
    }
    &.half {
      @include bgimg(images/star24_half);
    }
    &.off {
      @include bgimg(images/star24_off);
    }
  }
}
.star-36 {
  display: inline-block;
  .star-item {
    display: inline-block;
    width: 18px;
    height: 18px;
    background-size: 18px 18px;
    background-repeat: no-repeat;
    margin-right: 6px;
    &:last-child {
      margin-right: 0;
    }
    &.on {
      @include bgimg(images/star36_on);
    }
    &.half {
      @include bgimg(images/star36_half);
    }
    &.off {
      @include bgimg(images/star36_off);
    }
  }
}
.star-24 {
  display: inline-block;
  .star-item {
    display: inline-block;
    width: 12px;
    height: 12px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
    margin-right: 3px;
    &:last-child {
      margin-right: 0;
    }
    &.on {
      @include bgimg(images/star24_on);
    }
    &.half {
      @include bgimg(images/star24_half);
    }
    &.off {
      @include bgimg(images/star24_off);
    }
  }
}
</style>