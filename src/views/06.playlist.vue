<template>
  <div class="playlist-container">
    <!-- 歌单top信息 -->
    <div class="top-wrap">
      <div class="img-wrap">
        <img :src="playlist.coverImgUrl" alt />
      </div>
      <div class="info-wrap">
        <p class="title">{{playlist.name}}</p>
        <div class="author-wrap">
          <img class="avatar" :src="playlist.creator.avatarUrl" alt />
          <span class="name">{{playlist.creator.nickname}}</span>
          <span class="time">{{playlist.createTime}} 创建</span>
        </div>
        <div class="play-wrap">
          <span class="iconfont icon-circle-play"></span>
          <span class="bottom" @click="playGroup">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul>
            <li v-for="(item,index) in playlist.tags" :key="index">{{item}}</li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span class="desc">{{playlist.description}}</span>
        </div>
      </div>
    </div>
    <!-- 列表 -->
    <el-tabs v-model="activeIndex">
      <!-- 歌曲 -->
      <el-tab-pane label="歌曲列表" name="1">
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
            <tr class="el-table__row" v-for="(item,index) in playlist.tracks" :key="index">
              <td>{{index+1}}</td>
              <td>
                <div class="img-wrap">
                  <img :src="item.al.picUrl" alt />
                  <span class="iconfont icon-play" @click="playMusic(item.id)"></span>
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{item.name}}</span>
                    <span class="iconfont icon-mv"></span>
                  </div>
                </div>
              </td>
              <td>{{item.ar[0].name}}</td>
              <td>{{item.al.name}}</td>
              <td>{{item.dt}}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <!-- 评论 -->
      <el-tab-pane label="评论" name="2">
        <!-- 精彩评论 -->
        <div class="comment-wrap">
          <p class="title">
            精彩评论
            <span class="number"></span>
          </p>
          <div class="comments-wrap">
            <div class="item" v-for="(item,index) in hotcomment" :key="index">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{item.user.nickname}}:</span>
                  <span class="comment">{{item.content}}</span>
                </div>
                <div class="re-content" v-for="(it,id) in item.beReplied" :key="id">
                  <span class="name">{{it.user.nickname}}</span>
                  <span class="comment">{{it.content}}</span>
                </div>
                <div class="date">{{item.time}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 最新评论 -->
        <div class="comment-wrap">
          <p class="title">
            最新评论
            <span class="number"></span>
          </p>
          <div class="comments-wrap">
            <div class="item" v-for="(item,index) in newcomment" :key="index">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{item.user.nickname}}:</span>
                  <span class="comment">{{item.content}}</span>
                </div>
                <div class="re-content" v-for="(it,id) in item.beReplied" :key="id">
                  <span class="name">{{it.user.nickname}}</span>
                  <span class="comment">{{it.content}}</span>
                </div>
                <div class="date">{{item.time}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页器 -->
        <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="page"
          :page-size="5"
          :limit="limit"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "playlist",
  data() {
    return {
      activeIndex: "1",
      // 总条数
      total: 0,
      // 页码
      page: 1,
      // 页容量
      limit: 10,
      //歌单列表
      playlist: {},
      //热门评论
      hotcomment: [],
      //最新评论
      newcomment: [],
      //歌单ID组
      musicIdGroup: [],
      //歌单URL组
      musicUrlGroup: [],
    };
  },
  methods: {
    //获取歌单
    getList() {
      axios({
        method: "get",
        url: "https://autumnfish.cn/playlist/detail",
        params: { id: this.$route.query.id },
      }).then((res) => {
        //获取数据
        this.playlist = res.data.playlist;
        //处理时长毫秒转化为分秒
        for (let i = 0; i < this.playlist.tracks.length; i++) {
          let duration = this.playlist.tracks[i].dt;
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
          this.playlist.tracks[i].dt = `${min}:${sec}`;
        }
      });
    },
    //获取热门评论(歌单)
    getComment() {
      axios({
        method: "get",
        url: "https://autumnfish.cn/comment/playlist",
        params: {
          id: this.$route.query.id,
          //0: 歌曲，1: mv，2: 歌单，3: 专辑，4: 电台，5: 视频
          type: 2,
          limit: this.limit,
          offset: (this.page - 1) * this.limit,
        },
      }).then((res) => {
        console.log(res);
        //获取热门评论
        this.hotcomment = res.data.hotComments;
        //获取最新评论
        this.newcomment = res.data.comments;
        //获取页码数据总数
        this.total = res.data.total;
      });
    },
    //播放单歌
    playMusic(id) {
      axios({
        method: "get",
        url: "https://autumnfish.cn/song/url",
        params: { id },
      }).then((res) => {
        id;
        this.$parent.musicUrl = res.data.data[0].url;
      });
    },
    //播放歌单
    playGroup() {
      //获取id组
      for (let i = 0; i < this.playlist.tracks.length; i++) {
        this.musicIdGroup[i] = this.playlist.tracks[i].id;
      }
      // //通过其id获取url组
      // for (let i = 0; i < this.musicIdGroup.length; i++) {
      //   axios({
      //     async:false,
      //     method: "get",
      //     url: "https://autumnfish.cn/song/url",
      //     params: { id:this.musicIdGroup[i] },
      //   }).then((res) => {
      //     this.musicUrlGroup[i] = res.data.data[0].url;
      //     console.log(this.musicUrlGroup)
      //   });
      // }
      console.log(this.musicIdGroup);
      this.$parent.audioGroup = this.musicIdGroup; 
    },
    //页码
    handleCurrentChange(val) {
      //保存页码
      this.page = val;
      //更新数据
      this.getComment();
    },
  },
  created() {
    this.getList();
    this.getComment();
  },
};
</script>

<style >
</style>
