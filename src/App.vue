<template>
  <div id="app">
    <!-- <button class="g-signin2" v-show="1==2">This button is to initialize google auth2 instance</button> -->
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>

    </div> -->
    <app-header />
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>

<script>
import Header from "./views/Header";

export default {
  components: {
    appHeader: Header
  }
};
</script>

