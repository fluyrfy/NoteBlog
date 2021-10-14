<template>
  <div id="app" class="container">
    <top-bar></top-bar>
    <div class="d-flex">
      <left-bar></left-bar>
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import topBar from './components/bar/topBar.vue'
import leftBar from './components/bar/leftBar.vue'
export default {
  components: {
    'topBar': topBar,
    'leftBar': leftBar,
  }
}
</script>

<style>

</style>
