<template>
  <div class="home">
    <HeaderComponent />
    <el-container class="content">
      <MenuComponent />
      <el-container>
        <el-main>
          <Bread />
          <div class="cont">
            <router-view></router-view>
          </div>
        </el-main>
        <el-footer><FooterComponent /></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import MenuComponent from "./common/MenuComponent";
import HeaderComponent from "./common/HeaderComponent.vue";
import FooterComponent from "./common/FooterComponent.vue";
import Bread from "./common/BreadLine.vue";
export default {
  components: {
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    Bread,
  },
  name: "myHome",
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.home {
  text-align: center;
  .content {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 60px;
    bottom: 0;
    .el-aside {
      height: 100%;
      .cont {
        margin: 20px 0;
      }
    }
  }
}
</style>
