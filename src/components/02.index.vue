<template>
  <div class="index">
      <div class="nav">
          <ul>
              <li>发现音乐</li>
              <li>推荐歌单</li>
              <li>最新音乐</li>
              <li>最新MV</li>
          </ul>
      </div>
      <div class="main"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.index{
    display: flex;
    height: 830px;
}
.index .nav{
    width: 200px;
    background-color: #ededed;
}
.index .nav li{
    text-align: center;    
    margin: 10px; 
}
.main{
    background-color: brown;
    flex: 1;
}
</style>