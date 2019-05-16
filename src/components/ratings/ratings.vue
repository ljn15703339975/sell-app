<template>
  <div class="ratings" ref="ratings">
    <div class="rating-content">
      <div class="overview">
        <div class="overview-left">
          <div class="score">{{seller.score}}</div>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务评分</span>
            <span class="star">
              <star :size="36" :score="seller.serviceScore"></star>
            </span>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <span class="star">
              <star :size="36" :score="seller.foodScore"></star>
            </span>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <selectRating
        :ratings="ratings"
        @select-rating-type="selectRatingType"
        @toggle-text="toggleText"
      ></selectRating>
      <div class="rating-wrapper">
        <ul>
          <li
            class="rating-item"
            v-for="(rating, index) in ratings"
            :key="index"
            v-show="needShow(rating.rateType,rating.text)"
          >
            <div class="avatar">
              <img :src="rating.avatar">
            </div>
            <div class="content">
              <span class="name">{{rating.username}}</span>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <div class="text">{{rating.text}}</div>
                <div class="recommend">
                  <span
                    :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"
                  ></span>
                  <span class="item" v-for="(item, index) in rating.recommend" :key="index">{{item}}</span>
                </div>
                <div class="time">{{rating.rateTime | fromatDateTime}}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script >
import star from "../star/star.vue";
import split from "../split/split.vue";
import selectRating from "../selectRating/selectRating.vue";
import BScroll from "better-scroll";
import { fromatDate } from "../../common/js/fromatDate.js";
export default {
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    star,
    split,
    selectRating
  },
  data() {
    return {
      ratings: null,
      selectType: 2,
      toggleContent: true
    };
  },
  created() {
    this.$axios
      .get("/api/ratings")
      .then(result => {
        if (result.data.errno === 0) {
          this.$nextTick(() => {
            this.ratings = result.data.ratings;
            this.scroll();
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    scroll() {
      if (!this.initScroll) {
        this.initScroll = new BScroll(this.$refs.ratings, {
          click: true
        });
      } else {
        this.initScroll.refresh();
      }
    },
    selectRatingType(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.initScroll.refresh();
      });
    },
    toggleText(bool) {
      this.toggleContent = bool;
      this.$nextTick(() => {
        this.initScroll.refresh();
      });
    },
    needShow(type, text) {
      if (!text && this.toggleContent) {
        return false;
      } else if (this.selectType === 2) {
        return true;
      } else {
        return type === this.selectType;
      }
    }
  },
  filters: {
    fromatDateTime(data) {
      return fromatDate(data);
    }
    // fromatDate(date) {
    //   let time = new Date(date);
    //   let oDate = {
    //     year: time.getFullYear(),
    //     month: time.getMonth() + 1,
    //     day: time.getDate(),
    //     hour: time.getHours(),
    //     minutes: time.getMinutes()
    //   };
    //   let str = `${oDate.year}年${oDate.month}月${oDate.day}日${oDate.hour}点${
    //     oDate.minutes
    //   }分`;
    //   return str;
    // }
  }
};
</script>

<style lang="scss" scoped>
.ratings {
  position: absolute;
  top: 177px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  .overview {
    display: flex;
    padding: 18px 0;
    .overview-left {
      flex: 0 0 137px;
      padding: 6px 0;
      width: 137px;
      border-right: 1px solid rgba(7, 17, 27, 0.1);
      text-align: center;
      @media only screen and (max-width: 320px) {
        flex: 0 0 120px;
        width: 120px;
      }
      .score {
        margin-bottom: 6px;
        line-height: 28px;
        font-size: 24px;
        color: rgb(255, 153, 0);
      }
      .title {
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 12px;
        color: rgb(7, 17, 27);
      }
      .rank {
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }
    .overview-right {
      flex: 1;
      padding: 6px 0 6px 24px;
      @media only screen and (max-width: 320px) {
        padding-left: 6px;
      }
      .score-wrapper {
        margin-bottom: 8px;
        font-size: 0;
        .title {
          display: inline-block;
          line-height: 18px;
          vertical-align: top;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
        .star {
          display: inline-block;
          margin: 0 12px;
          vertical-align: top;
        }
        .score {
          display: inline-block;
          line-height: 18px;
          vertical-align: top;
          font-size: 12px;
          color: rgb(255, 153, 0);
        }
      }
      .delivery-wrapper {
        font-size: 0;
        .title {
          line-height: 18px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
        .delivery {
          margin-left: 12px;
          font-size: 12px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
  .rating-wrapper {
    padding: 0 18px;
    .rating-item {
      display: flex;
      padding: 18px 0;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      .avatar {
        flex: 0 0 28px;
        width: 28px;
        margin-right: 12px;
        img {
          border-radius: 50%;
          width: 100%;
        }
      }
      .content {
        position: relative;
        flex: 1;
        .name {
          margin-bottom: 4px;
          line-height: 12px;
          font-size: 10px;
          color: rgb(7, 17, 27);
        }
        .star-wrapper {
          margin-bottom: 6px;
          font-size: 0;
          .star {
            display: inline-block;
            margin-right: 6px;
            vertical-align: top;
          }
          .delivery {
            display: inline-block;
            vertical-align: top;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
        .text {
          margin-bottom: 8px;
          line-height: 18px;
          color: rgb(7, 17, 27);
          font-size: 12px;
        }
        .recommend {
          line-height: 16px;
          font-size: 0;
          .icon-thumb_up,
          .icon-thumb_down,
          .item {
            display: inline-block;
            margin: 0 8px 4px 0;
            font-size: 9px;
          }
          .icon-thumb_up {
            color: rgb(0, 160, 220);
          }
          .icon-thumb_down {
            color: #93999f;
          }
          .item {
            padding: 0 6px;
            border: 1px solid rgba(7, 17, 27, 0.1);
            border-radius: 1px;
            color: rgb(147, 153, 159);
            background: #fff;
          }
        }
        .time {
          position: absolute;
          top: 0;
          right: 0;
          line-height: 12px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
}
</style>