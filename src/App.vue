<template>
  <div id="app">
   <router-view></router-view>
   
  </div>
</template>

<script>
export default {
  name: 'App',

}
</script>

<style scoped>
@import url(./assets/css/reset.css);
.html .body{
  width: 100%;
  height: 100%;
}
#app{
  text-align: center;
}
</style>
