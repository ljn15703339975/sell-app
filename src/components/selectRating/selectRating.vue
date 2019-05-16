<template>
  <div class="ratingselect" v-if="ratings">
    <div class="rating-type">
      <span
        class="block positive"
        :class="{active:selectType===2}"
        @click="select(2)"
      >全部{{ratings.length}}</span>
      <span
        class="block positive"
        :class="{active:selectType===0}"
        @click="select(0)"
      >推荐{{recommend.length}}</span>
      <span
        class="block negative"
        :class="{active:selectType===1}"
        @click="select(1)"
      >吐槽{{negative.length}}</span>
    </div>
    <div class="switch" :class="{on:isActive}" @click="showAll">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    ratings: {
      type: Array
    }
  },
  data() {
    return {
      isActive: true,
      selectType: 2
    };
  },
  computed: {
    recommend() {
      let arr = [];
      if (this.ratings) {
        this.ratings.forEach(value => {
          if (value.rateType === 0) {
            arr.push(value);
          }
        });
      }
      return arr;
    },
    negative() {
      let arr = [];
      if (this.ratings) {
        this.ratings.forEach(value => {
          if (value.rateType === 1) {
            arr.push(value);
          }
        });
      }
      return arr;
    }
  },
  methods: {
    showAll() {
      this.isActive = !this.isActive;
      this.$emit("toggle-text", this.isActive);
    },
    select(type) {
      this.selectType = type;
      this.$emit("select-rating-type", type);
    }
  }
};
</script>

<style lang="scss" scoped>
.ratingselect {
  .rating-type {
    padding: 18px 0;
    margin: 0 18px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    font-size: 0;
    .block {
      display: inline-block;
      padding: 8px 12px;
      margin-right: 8px;
      border-radius: 1px;
      color: rgb(77, 85, 93);
      font-size: 12px;
      line-height: 16px;
      &.active {
        color: #fff;
      }
      .count {
        font-size: 8px;
        margin-left: 2px;
      }
      &.positive {
        background: rgba(0, 160, 220, 0.2);
        &.active {
          background: rgb(0, 160, 220);
        }
      }
      &.negative {
        background: rgba(77, 85, 93, 0.2);
        &.active {
          background: rgb(77, 85, 93);
        }
      }
    }
  }
  .switch {
    padding: 12px 18px;
    line-height: 24px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    color: rgb(147, 153, 159);
    font-size: 0;
    &.on {
      .icon-check_circle {
        color: rgb(0, 160, 220);
      }
    }
    .icon-check_circle {
      display: inline-block;
      vertical-align: top;
      font-size: 24px;
      margin-right: 4px;
    }
    .text {
      display: inline-block;
      font-size: 12px;
      vertical-align: top;
    }
  }
}
</style>