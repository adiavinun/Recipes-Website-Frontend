<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar"
export default {
  components: {
    NavBar,
  },
  name: "App",
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";
#app {
  font-family: Tahoma, Geneva, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#app::before {
  content: "";
  display: block;
  position: absolute;
  min-height: 100%;
  min-width: 1024px;
  width: 100%;
  height: auto;
  position: fixed;
  top: 0;
  left: 0;
  background: url("https://previews.123rf.com/images/romastudio/romastudio1603/romastudio160300234/54088727-healthy-food-background-and-copy-space-studio-photo-of-different-fruits-and-vegetables-on-white-wood.jpg");
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.5;
  z-index: -1;
}
</style>
