<template>
  <div class="index">
      <div class="nav">
          <ul>
              <li><router-link to="discovery">发现音乐</router-link></li>
              <li><router-link to="playlists">推荐歌单</router-link></li>
              <li><router-link to="songs">最新音乐</router-link></li>
              <li><router-link to="mvs">最新MV</router-link></li>
          </ul>
      </div>
      <div class="main">
          <router-view></router-view>
      </div>
  </div>
</template>

<script>

export default {
    components:{

    }
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