<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel class="" :interval="4000" type="card">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">
        推荐歌单
      </h3>
      <div class="items">
        <div class="item" v-for="(item,index) in recommandlist" :key="index">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{item.copywriter}}</span>
            </div>
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
          </div>
          <p class="name">{{item.name}}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">
        最新音乐
      </h3>
      <div class="items">
        <div class="item" v-for="(item,index) in newestlist" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
          </div>
          <div class="song-wrap">
            <div class="song-name">{{item.name}}</div>
            <div class="singer">{{item.song.artists[0].name}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item">
          <div class="img-wrap">
            <img src="../assets/mvCover.jpg" alt="" />
            <span class="iconfont icon-play"></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">9912</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">HEYNA</div>
            <div class="singer">余恩</div>
          </div>
        </div>
        <div class="item">
          <div class="img-wrap">
            <img src="../assets/mvCover.jpg" alt="" />
            <span class="iconfont icon-play"></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">9912</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">HEYNA</div>
            <div class="singer">余恩</div>
          </div>
        </div>
        <div class="item">
          <div class="img-wrap">
            <img src="../assets/mvCover.jpg" alt="" />
            <span class="iconfont icon-play"></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">9912</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">HEYNA</div>
            <div class="singer">余恩</div>
          </div>
        </div>
        <div class="item">
          <div class="img-wrap">
            <img src="../assets/mvCover.jpg" alt="" />
            <span class="iconfont icon-play"></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">9912</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">HEYNA</div>
            <div class="singer">余恩</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'discovery',
  data(){
    return{
      //轮播图
      banners:[],
      //推荐歌单，
      recommandlist:[],
      //最新音乐
      newestlist:[],
      

    }
  },
  created() {
    //获取轮播图
    axios({
      method:'get',
      url: 'https://autumnfish.cn/banner',
      }).then(res=>{this.banners=res.data.banners})
    //获取推荐歌单
    axios({
      method:'get',
      url: 'https://autumnfish.cn/personalized',
      params:{limit:10}
      }).then(res=>{this.recommandlist=res.data.result})
    //获取最新音乐
    axios({
      method:'get',
      url: "https://autumnfish.cn/personalized/newsong",
      params: {}
      }).then(res=>{this.newestlist=res.data.result})
  },
}
</script>

<style >

</style>
