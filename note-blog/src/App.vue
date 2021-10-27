<template>
  <div id="app" class="container">
    <header><top-bar></top-bar></header>
    <div class="row justify-content-between" id="body">
      <left-bar class="col-lg-3 "></left-bar>
      <router-view v-if="isRouterAlive" class="col-lg-9"></router-view>
    </div>
    <footer><foot-bar></foot-bar></footer>
  </div>
</template>

<script>
import topBar from './components/bar/topBar.vue'
import leftBar from './components/bar/leftBar.vue'
import footBar from './components/bar/footer.vue'
export default {
  provide () {
    return{
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true,
    }
  },
  components: {
    'topBar': topBar,
    'leftBar': leftBar,
    footBar,
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      })
    }
  },
}
</script>

<style>
  a {
    color: inherit;
    text-decoration:none;
  }
  a:hover {
    color: inherit;
    text-decoration:none;
  }
</style>
