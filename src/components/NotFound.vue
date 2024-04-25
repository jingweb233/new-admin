<template>
  <div class="error">
    <img src="../assets/error404.webp" />
    <button @click="goBack" class="back">点我返回</button>
    <button @click="goHome" class="back">点我回首页</button>
  </div>
</template>

<script>
export default {
  name: "ERROR404",  
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      goHome() {
        this.$router.push({ path: "/login" });
      },
    },
};
</script>

<style scoped>
.back {
    color: rgb(1, 9, 14);
    background: rgb(98, 155, 220);
    font-family: 65 YouYuan;
    font-size: 15px;
    border: rgb(97, 109, 221);
    box-shadow: 2px 2px 1px 1px black;
  padding: 10px 22px;
  border-radius: 20px;
}
</style>