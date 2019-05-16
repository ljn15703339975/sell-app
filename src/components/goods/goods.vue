<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li
          v-for="(item, index) in goods"
          :key="index"
          :class="{current:currentIndex === index}"
          @click="selectFood(index)"
        >
          <span class="text">
            <span class="icon" v-if="item.type >= 0" :class="classMap[item.type]"></span>
            <span class="title">{{item.name}}</span>
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="(item, index) in goods" :key="index" class="foods-list foods-list-hook">
          <h2 class="title">{{item.name}}</h2>
          <div class="food-item" v-for="(food, index) in item.foods" :key="index">
              <div @click="detaile(food)" class="food-content">
                <div class="item-left">
                  <img :src="food.icon">
                </div>
                <div class="item-right">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="description">{{food.description}}</p>
                  <p class="description">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span class="rating">好评率{{food.rating}}%</span>
                  </p>
                  <p class="price">
                    <span class="now">
                      <span>￥</span>
                      {{food.price}}
                    </span>
                    <span class="old" v-show="food.oldPrice">
                      <span>￥</span>
                      {{food.oldPrice}}
                    </span>
                  </p>
                </div>
              </div>
            <div class="cart-control">
              <cartControl :food="food"></cartControl>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <shopcart
      :minPrice="seller.minPrice"
      :deliveryPrice="seller.deliveryPrice"
      :foodList="selectFoods"
      ref="shopCart"
    ></shopcart>
    <food :food="foodDetaile" ref="food"></food>
  </div>
</template>

<script>
import shopcart from "../shopcart/shopcart.vue";
import cartControl from "../cartControl/cartControl.vue";
import food from "../food/food.vue";
import BScroll from "better-scroll";
import bus from "../../bus.js";
export default {
  props: ["seller"],
  components: {
    shopcart,
    cartControl,
    food
  },
  data() {
    return {
      goods: null,
      classMap: ["decrease", "discount", "special", "invoice", "guarantee"],
      heightScroll: [],
      scrollY: 0,
      foodDetaile: {}
    };
  },
  created() {
    this.$axios
      .get("./api/goods")
      .then(result => {
        if (result.data.errno === 0) {
          this.goods = result.data.goods;
          this.$nextTick(() => {
            this.initScroll();
            this.caicHeight();
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.heightScroll.length; i++) {
        let height1 = this.heightScroll[i];
        let height2 = this.heightScroll[i + 1];
        if (!height2 || (this.scrollY < height2 && this.scrollY >= height1)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      if (this.goods) {
        this.goods.forEach(good => {
          good.foods.forEach(food => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
      }
      return foods;
    }
  },
  methods: {
    selectFood(index) {
      let element = this.$refs.foodsWrapper.querySelectorAll(
        ".foods-list-hook"
      );
      this.foodsScroll.scrollToElement(element[index], 500);
    },
    initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, { click: true });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        probeType: 3,
        click: true
      });
      this.foodsScroll.on("scroll", pos => {
        this.scrollY = Math.abs(Math.floor(pos.y));
      });
    },
    caicHeight() {
      //获取所有商品分类的元素
      let foodList = this.$refs.foodsWrapper.querySelectorAll(
        ".foods-list-hook"
      );
      let height = 0;
      this.heightScroll.push(height);
      for (let i = 0; i < foodList.length; i++) {
        height += foodList[i].clientHeight;
        this.heightScroll.push(height);
      }
    },
    drop(target) {
      this.$nextTick(() => {
        this.$refs.shopCart.drop(target);
      });
    },
    detaile(food) {
      this.foodDetaile = food;
      this.$refs.food.show();
    }
  },
  mounted() {
    bus.$on("cart-add", target => {
      this.drop(target);
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../../common/css/mixins.scss";
.goods {
  width: 100%;
  display: flex;
  position: absolute;
  top: 177px;
  bottom: 48px;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 80px;
    background-color: #f3f5f7;
    ul {
      li {
        height: 54px;
        padding: 0 12px;
        font-size: 0;
        font-weight: 200;
        line-height: 14px;
        display: table;
        &.current {
          font-weight: 700;
          background-color: #fff;
          margin-top: -1px;
          .text {
            border-bottom: none;
          }
        }
        .text {
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
          font-size: 12px;
          display: table-cell;
          width: 56px;
          height: 54px;
          vertical-align: middle;
          .icon {
            display: inline-block;
            width: 12px;
            height: 12px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            vertical-align: top;
            margin-right: 2px;
            margin-top: 1px;
            &.decrease {
              @include bgimg(images/decrease_3);
            }
            &.discount {
              @include bgimg(images/discount_3);
            }
            &.special {
              @include bgimg(images/special_3);
            }
            &.invoice {
              @include bgimg(images/invoice_3);
            }
            &.guarantee {
              @include bgimg(images/guarantee_3);
            }
          }
        }
      }
    }
  }
  .foods-wrapper {
    flex: auto;
    .foods-list {
      .title {
        background-color: #f3f5f7;
        font-size: 12px;
        height: 26px;
        line-height: 26px;
        color: rgb(147, 153, 159);
        padding-left: 14px;
        border-left: 2px solid #d9dde1;
      }
      .food-item {
        margin: 18px 18px 0;
        padding-bottom: 18px;
        font-size: 0;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        position: relative;
        &:last-child {
          border-bottom: none;
        }
        .food-content {
          display: flex;
        }
        .item-left {
          flex: 0 0 57px;
          margin-right: 10px;
          vertical-align: top;
          img {
            width: 57px;
            height: 57px;
            border-radius: 3px;
          }
        }
        .item-right {
          flex: 1;
          font-size: 12px;
          position: relative;
          .name {
            margin-top: 2px;
            color: rgb(7, 17, 27);
            font-size: 14px;
            line-height: 14px;
            font-weight: 700;
          }
          .description {
            margin: 8px 0;
            color: rgb(147, 153, 159);
            font-size: 10px;
            line-height: 12px;
            .count {
              display: inline-block;
              margin-right: 12px;
            }
            .rating {
              display: inline-block;
            }
          }
          .price {
            line-height: 24px;
            font-weight: 700;
            .now {
              color: rgb(240, 20, 20);
              font-size: 14px;
              margin-right: 8px;
              span {
                font-size: 10px;
              }
            }
            .old {
              color: rgb(147, 153, 159);
              font-size: 10px;
              text-decoration: line-through;
            }
          }
        }
        .cart-control {
          position: absolute;
          right: 0;
          bottom: 18px;
        }
      }
    }
  }
}
</style>