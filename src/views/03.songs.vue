<template>
  <div class="songs-container">
    <div class="tab-bar">
      <span class="item" :class="{active:tag==0}" @click="tag=0">全部</span>
      <span class="item" :class="{active:tag==7}" @click="tag=7">华语</span>
      <span class="item" :class="{active:tag==96}" @click="tag=96">欧美</span>
      <span class="item" :class="{active:tag==8}" @click="tag=8">日本</span>
      <span class="item" :class="{active:tag==16}" @click="tag=16">韩国</span>
    </div>
    <!-- 底部的table -->
    <table class="el-table playlit-table">
      <thead>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <!-- 列表数据 -->
        <tr class="el-table__row" v-for="(item,index) in songslist" :key="index">
          <td>{{index+1}}</td>
          <td>
            <div class="img-wrap">
              <img :src="item.album.picUrl" alt />
              <!-- 播放按钮 -->
              <span @click="playMusic(item.id)"  class="iconfont icon-play"></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{item.name}}</span>
                <span class="iconfont icon-mv"></span>
              </div>
              <span>{{item.album.subType}}</span>
            </div>
          </td>
          <td>{{item.artists[0].name}}</td>
          <td>{{item.album.name}}</td>
          <td>{{item.duration}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "songs",
  data() {
    return {
      // 音乐类型全部:0,华语:7,欧美:96,日本:8,韩国:16
      tag: 0,
      //最新音乐列表
      songslist: []
    };
  },
  created() {
    //获取最新音乐
    this.songlist();
  },
  watch: {
    //更改音乐类型
    tag() {
      this.songlist();
    }
  },
  methods: {
    //获取最新音乐列表
    songlist() {
      axios({
        method: "post",
        url: "https://autumnfish.cn/top/song",
        params: {
          type: this.tag
        }
      }).then(res => {
        //获取数据
        this.songslist = res.data.data;
        //处理时长毫秒转化为分秒
        for (let i = 0; i < this.songslist.length; i++) {
          let duration = this.songslist[i].duration;
          //转化分
          let min = parseInt(duration / 1000 / 60);
          if (min < 10) {
            min = "0" + min;
          }
          //转化秒
          let sec = parseInt((duration / 1000) % 60);
          if (sec < 10) {
            sec = "0" + sec;
          }
          this.songslist[i].duration = `${min}:${sec}`;
        }
      });
    },
    //播放音乐
    playMusic(id){
      axios({
        method:'get',
        url: 'https://autumnfish.cn/song/url',
        params:{
          id
        }
      }).then(res=>{
        let url= res.data.data[0].url
        this.$parent.musicUrl=url
      })
    }
  }
};
</script>

<style >
</style>
