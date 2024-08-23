<script setup lang="ts">

</script>

<template>
  <!-- <div class="titleBar">
    <TitleBar />
  </div> -->

  <div class="main">
    <router-view></router-view>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-family: "Alimama";
  overflow: auto;
}


#app {
  width: 100%;
  height: 100%;
  background-color: white;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

/* .titleBar {
  height: 32px;
} */


</style>