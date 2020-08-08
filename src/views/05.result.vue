<template>
  <div class="result-container">
    <!-- 搜索头部信息 -->
    <div class="title-wrap">
      <h2 class="title">{{this.q}}</h2>
      <span class="sub-title">找到{{this.count}}个结果</span>
    </div>
    <!-- 搜索内容 -->
    <el-tabs v-model="activeIndex">
      <!-- 歌曲  -->
      <el-tab-pane label="歌曲" name="songs">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr
              class="el-table__row"
              v-for="(item,index) in songlist"
              :key="index"
              @click="playMusic(item.id)"
            >
              <td>{{index+1}}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{item.name}}</span>
                    <span class="iconfont icon-mv"></span>
                  </div>
                  <!-- <span>电视剧加油练习生插曲</span> -->
                </div>
              </td>
              <td>{{item.artists[0].name}}</td>
              <td>{{item.album.name}}</td>
              <td>06:03</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <!-- 歌单 -->
      <el-tab-pane label="歌单" name="lists">
        <div class="items">
          <div class="item" v-for="(item,index) in playlist" :key="index" @click="tolist(item.id)">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{item.bookCount}}</span>
              </div>
              <img :src="item.coverImgUrl" alt />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{item.name}}</p>
          </div>
        </div>
      </el-tab-pane>
      <!-- MV -->
      <el-tab-pane label="MV" name="mv">
        <div class="items mv">
          <div class="item" v-for="(item,index) in mvlist" :key="index" @click="toMV(item.id)">
            <div class="img-wrap">
              <img :src="item.cover" alt />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{item.playCount}}</div>
              </div>
              <span class="time">{{item.duration}}</span>
            </div>
            <div class="info-wrap">
              <div class="name">HEYNA</div>
              <div class="singer">余恩</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "result",
  data() {
    return {
      //活动页 songs/lists/mv
      activeIndex: "songs",
      //搜索关键字
      q: "",
      //返回数量
      limit: 30,
      //返回歌曲类型type 歌曲:1，歌单:1000，MV:1004
      type: 1,
      //搜索总数
      count: 0,
      //返回歌曲列表
      songlist: [],
      //返回歌单列表
      playlist: [],
      //返回MV列表
      mvlist: []
    };
  },
  methods: {
    //获取搜索关键字，跳转请求页
    toQuery() {
      this.q = this.$route.query.q;
    },
    //获取搜索信息
    getList() {
      axios({
        method: "get",
        url: "https://autumnfish.cn/search",
        params: {
          keywords: this.q,
          limit: this.limit,
          offset: 0,
          type: this.type
        }
      }).then(res => {
        //获取搜索总条数
        this.count = res.data.result.songCount;
        //获取列表数据
        if (this.type == 1) {
          //歌曲
          this.songlist = res.data.result.songs;
          //处理时长毫秒转化为分秒
          for (let i = 0; i < this.songlist.length; i++) {
            let duration = this.songlist[i].duration;
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
            this.songlist[i].duration = `${min}:${sec}`;
          }
        } else if (this.type == 1000) {
          //歌单
          this.playlist = res.data.result.playlists;
          this.count = res.data.result.playlistCount;
        } else if (this.type == 1004) {
          //MV
          this.mvlist = res.data.result.mvs;
          this.count = res.data.result.mvCount;
          //处理时长毫秒转化为分秒
          for (let i = 0; i < this.mvlist.length; i++) {
            let duration = this.mvlist[i].duration;
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
            this.mvlist[i].duration = `${min}:${sec}`;
          }
        }
      });
    },
    //播放音乐
    playMusic(id) {
      axios({
        method: "get",
        url: "https://autumnfish.cn/song/url",
        params: { id }
      }).then(res => {
        id;
        this.$parent.musicUrl = res.data.data[0].url;
      });
    },
    //跳转到歌单详情
    tolist(id) {
      this.$router.push({ path: "playlist", query: { id: id } });
    },
    //跳转到MV详情
    toMV(id){
       this.$router.push({ path: "mv", query: { id: id } });
    }
  },
  created() {
    //跳转请求页
    this.toQuery();
    //获取跳转信息
    this.getList();
  },
  watch: {
    //路由监听
    $route: {
      handler(val, oldval) {
        //val新路由 oldval老路由
        // 将新query赋值到q
        this.q = val.query.q;
        this.getList();
      }
    },
    //tab切换
    activeIndex() {
      switch (this.activeIndex) {
        case "songs":
          this.type = 1;
          break;
        case "lists":
          this.type = 1000;
          break;
        case "mv":
          this.type = 1004;
          break;

        default:
          break;
      }
      this.getList();
    }
  }
};
</script>

<style >
</style>
