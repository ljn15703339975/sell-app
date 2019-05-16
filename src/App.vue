<template>
  <div id="app">
    <myHeader :seller="seller"></myHeader>
    <div class="tab">
      <ul>
        <li>
          <router-link to="/goods">商品</router-link>
        </li>
        <li>
          <router-link to="/ratings">评价</router-link>
        </li>
        <li>
          <router-link to="/seller">商家</router-link>
        </li>
      </ul>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import myHeader from "./components/header/header.vue";
import utll from "./common/js/utll.js";
export default {
  data() {
    return {
      seller: {
        id: (() => {
          return utll().id;
        })()
      }
    };
  },
  components: {
    myHeader
  },
  created() {
    utll();
    this.$axios
      .get("/api/seller")
      .then(result => {
        if (result.data.errno === 0) {
          this.seller = Object.assign(result.data.seller, this.seller);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss">
@import url(common/css/style.css);
@import url(common/css/reset.css);
.tab {
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  ul {
    display: flex;
    height: 40px;
    font-size: 14px;
    align-items: center;
    li {
      flex: auto;
      line-height: 14px;
      text-align: center;
      a {
        text-decoration: none;
        color: rgb(77, 85, 93);
        &.router-link-active {
          color: rgb(240, 20, 20);
        }
      }
    }
  }
}
</style>
