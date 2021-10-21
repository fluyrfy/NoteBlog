<template>
  <div id="app" class="container">
    <top-bar></top-bar>
    <div class="d-flex">
      <left-bar></left-bar>
      <router-view v-if="isRouterAlive"></router-view>
    </div>

  </div>
</template>

<script>
import topBar from './components/bar/topBar.vue'
import leftBar from './components/bar/leftBar.vue'
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
