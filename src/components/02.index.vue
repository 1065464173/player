<template>
  <div class="index-container">
    <!-- 导航区域 -->
    <div class="nav">
      <ul>
        <li>
          <router-link to="/discovery">
            <span class="iconfont icon-find-music"></span>
            发现音乐
          </router-link>
        </li>
        <li>
          <router-link to="/playlists">
            <span class="iconfont icon-music-list"></span>
            推荐歌单
          </router-link>
        </li>
        <li>
          <router-link to="/songs">
            <span class="iconfont icon-music"></span>
            最新音乐
          </router-link>
        </li>
        <li>
          <router-link to="/mvs">
            <span class="iconfont icon-mv"></span>
            最新MV
          </router-link>
        </li>
      </ul>
    </div>
    <!-- 主题区域 -->
    <div class="main">
      <router-view></router-view>
    </div>
    <!-- 播放标签 -->
    <div class="player">
      <audio id="audio" :src="musicUrl" controls autoplay @click="playGroup" @ended="playGroup"></audio>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "index",
  data() {
    return {
      //audio对象
      audio: document.getElementById("audio"),
      //组播放
      audioGroup: [],
      //组播放计数
      groupIndex: 0,
      //单曲播放
      musicUrl: "",
      group: [],
    };
  },
  methods: {
    playGroup() {
      console.log("开始播放");
      if (this.groupIndex <= this.audioGroup.length - 1) {
        //通过其id获取url
        axios({
          method: "get",
          url: "https://autumnfish.cn/song/url",
          params: { id: this.audioGroup[this.groupIndex] },
        }).then((res) => {
          this.musicUrl = res.data.data[0].url;
        });
        this.groupIndex++;
        console.log("播放到" + this.groupIndex);
      } else {
        console.log("组播放结束");
      }
    },
  },
  created() {
  },
  watch: {
    audioGroup() {
      this.groupIndex=0
      console.log(this.audioGroup)
      this.playGroup();
    },
  },
};
</script>

<style >
</style>
