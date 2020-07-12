<template>
  <div class="top">
      <img src="../assets/01.top.png" alt="">
      <input type="text" placeholder="搜索" v-model="inputValue" @keyup.enter="toSearch"  />
      <el-button plain>朴素按钮</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue:""
    }
  },
  methods:{
    toSearch(){
      // console.log(this.inputValue)
      if(this.inputValue==''){alert('请输入内容')}
      else{this.$router.push(`/results?q=${this.inputValue}`)}
    }
  }
}
</script>

<style>
.top{
    display:flex;
    align-items:center;
    background-color: #f9f9f9;

}
</style>