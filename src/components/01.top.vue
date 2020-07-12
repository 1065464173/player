<template>
  <div class="top">
      <img src="../assets/01.top.png" alt="">
      <input type="text" placeholder="搜索" v-model="inputValue">
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue:""
    }
  },
}
</script>

<style>
.top{
    display:flex;
    align-items:center;
    background-color: #f9f9f9;

}
</style>