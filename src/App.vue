<template>
  <div id="app">
    <top />
    <index />
  </div>
</template>

<script>
import axios from 'axios'
import top from "./components/01.top.vue";
import index from "./components/02.index.vue";
export default {
  name: "app",
  components: {
    top,
    index
  },
  data() {
    return {
      //控制视图是否显示的变量
      isRouterAlive: true
    };
  },
  //父组件中通过provide来提供变量
  //子组件中通过inject来注入变量。
  provide() {
    return {
      reload: this.reload(),
    };
  },
  methods: {
    //刷新页面
    reload() {
      this.isRouterAlive = false; //先关闭，
      this.$nextTick(function() {
        this.isRouterAlive = true; //再打开
      });
    },
  }
};
</script>

<style >
</style>
