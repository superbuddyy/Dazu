<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
};
</script>
<style>
@font-face {
  font-family: element-icons;
  src: url("~@/assets/custom-theme/fonts/element-icons.woff") format("woff"),
    url("~@/assets/custom-theme/fonts/element-icons.ttf") format("truetype");
}
</style>
