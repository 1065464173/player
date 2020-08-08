<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video controls :src="mvadress.url"></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img :src="mvdetail.cover" alt />
          </div>
          <span class="name">{{mvdetail.artistName}}</span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{mvdetail.name}}</h2>
          <span class="date">发布：{{mvdetail.publishTime}}</span>
          <span class="number">播放：{{mvdetail.subCount}}次</span>
          <p class="desc">{{mvdetail.desc}}</p>
        </div>
      </div>
      <!-- 精彩评论 -->
      <div class="comment-wrap">
        <p class="title">
          精彩评论
          <span class="number"></span>
        </p>
        <div class="comments-wrap" v-for="(item,index) in hotcomments" :key="index">
          <div class="item">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{item.user.nickname}}：</span>
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
        <div class="comments-wrap" v-for="(item,index) in comments" :key="index">
          <div class="item">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{item.user.nickname}}：</span>
                <span class="comment">{{item.content}}</span>
              </div>
              <div class="re-content" v-for="(it,id) in item.beReplied" :key="id">
                <span class="name">{{it.user.nickname}}：</span>
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
    </div>
    <!-- 相关mv -->
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items" v-for="(item,index) in mvrelated" :key="index" @click="toMV(item.id)">
          <div class="item">
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
              <div class="name">{{item.name}}</div>
              <div class="singer">{{item.artistName}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "mv",
  data() {
    return {
      //mvid
      mvid: this.$route.query.id,
      // 总条数
      total: 0,
      // 页码
      page: 1,
      // 页容量
      limit: 10,
      //mv信息
      mvdetail: {},
      //mv地址
      mvadress: {},
      //获取相关mv
      mvrelated: {},
      //热门评论
      hotcomments: [],
      //最新评论
      comments: [],
      //每页显示评论数
      limit: 10,
    };
  },
  methods: {
    //获取mv信息
    getMV() {
      axios({
        method: "get",
        url: "https://autumnfish.cn/mv/detail",
        params: { mvid: this.mvid },
      }).then((res) => {
        // console.log(res);
        //获取mv信息
        this.mvdetail = res.data.data;
      });
    },
    //获取mv播放地址
    playMV() {
      axios({
        method: "get",
        url: "https://autumnfish.cn/mv/url",
        params: { id: this.mvid },
      }).then((res) => {
        // console.log(res)
        this.mvadress = res.data.data;
      });
    },
    //获取相关mv
    getMVRelated() {
      axios({
        method: "get",
        url: "https://autumnfish.cn/simi/mv",
        params: { mvid: this.mvid },
      }).then((res) => {
        //获取相关mv
        this.mvrelated = res.data.mvs;
        //处理时长毫秒转化为分秒
        for (let i = 0; i < this.mvrelated.length; i++) {
          let duration = this.mvrelated[i].duration;
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
          this.mvrelated[i].duration = `${min}:${sec}`;
        }
      });
    },
    //获取mv评论
    getComments() {
      axios({
        method: "get",
        url: "https://autumnfish.cn/comment/mv",
        params: {
          id: this.mvid,
          limit: this.limit,
          offset: (this.page - 1) * this.limit,
        },
      }).then((res) => {
        //获取评论总数
        this.total = res.data.total;
        //获取热门评论
        this.hotcomments = res.data.hotComments;
        //获取最新评论
        this.comments = res.data.comments;
      });
    },
    //跳转mv
    toMV(id) {
      this.$router.push({ path: "mv", query: { id: id } });
    },
    //分页
    handleCurrentChange(val) {
      //保存页码
      this.page = val;
      //更新数据
      this.getComments();
    },
  },
  created() {
    this.getMV();
    this.playMV();
    this.getMVRelated();
    this.getComments();
  },
  watch: {
    //路由监听
    $route: {
      handler(val, oldval) {
        //val新路由 oldval老路由
        // 将新id赋值
        this.mvid = val.query.id;
        //获取数据
        this.getMV();
        this.playMV();
        this.getMVRelated();
        this.getComments();
      },
    },
    
  },
};
</script>

<style></style>
