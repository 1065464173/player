<template>
  <div class="playlists-container">
    <!-- 同步 -->
    <div class="top-card" v-for="(item,index) in toplist" :key="index">
      <div class="icon-wrap">
        <img :src="item.coverImgUrl" alt />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <div class="title">{{item.name}}</div>
        <div class="info">{{item.description}}</div>
      </div>
      <img src="../assets/listCover.jpg" alt class="bg" />
      <div class="bg-mask"></div>
    </div>
    <!-- 歌单列表 -->
    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <span class="item" :class="{active:tag=='全部'}" @click="tag='全部'">全部</span>
        <span class="item" :class="{active:tag=='欧美'}" @click="tag='欧美'">欧美</span>
        <span class="item" :class="{active:tag=='华语'}" @click="tag='华语'">华语</span>
        <span class="item" :class="{active:tag=='流行'}" @click="tag='流行'">流行</span>
        <span class="item" :class="{active:tag=='说唱'}" @click="tag='说唱'">说唱</span>
        <span class="item" :class="{active:tag=='摇滚'}" @click="tag='摇滚'">摇滚</span>
        <span class="item" :class="{active:tag=='民谣'}" @click="tag='民谣'">民谣</span>
        <span class="item" :class="{active:tag=='电子'}" @click="tag='电子'">电子</span>
        <span class="item" :class="{active:tag=='轻音乐'}" @click="tag='轻音乐'">轻音乐</span>
        <span class="item" :class="{active:tag=='影视原声'}" @click="tag='影视原声'">影视原声</span>
        <span class="item" :class="{active:tag=='ACG'}" @click="tag='ACG'">ACG</span>
        <span class="item" :class="{active:tag=='怀旧'}" @click="tag='怀旧'">怀旧</span>
        <span class="item" :class="{active:tag=='治愈'}" @click="tag='治愈'">治愈</span>
        <span class="item" :class="{active:tag=='旅行'}" @click="tag='旅行'">旅行</span>
      </div>
      <!-- tab的内容区域 -->
      <div class="tab-content">
        <div class="items">
          <div class="item" v-for="(item,index) in playlists" :key="index">
            <div class="img-wrap" @click="tolist(item.id)">
              <div class="num-wrap">
                播放量:
                <span class="num">{{item.playCount}}</span>
              </div>
              <img :src="item.coverImgUrl" alt />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{item.name}}</p>
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
      :page-size="10"
    ></el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "recommend",
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      page: 1,
      //顶部精品歌单
      toplist: [],
      //歌单列表
      playlists: [],
      //当前选择的分类
      tag: "全部"
    };
  },
  created() {
    //顶部精品歌单
    this.topData();
    //获取歌单列表
    this.listData();
  },
  watch: {
    tag() {
      //顶部精品歌单
      this.topData();
      //获取歌单列表
      this.listData();
    }
  },
  methods: {
    //获取顶部数据
    topData() {
      axios({
        method: "get",
        url: "https://autumnfish.cn/top/playlist/highquality",
        params: {
          limit: 1,
          cat: this.tag
        }
      }).then(res => {
        this.toplist = res.data.playlists;
      });
    },
    //获取列表数据
    listData() {
      axios({
        method: "get",
        url: "https://autumnfish.cn/top/playlist/",
        params: {
          limit: 10,
          offset: (this.page - 1) * 10,
          cat: this.tag
        }
      }).then(res => {
        //保存总条数
        this.total = res.data.total;
        //保存数据列表
        this.playlists = res.data.playlists;
      });
    },
    //页码改变事件
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      //保存页码
      this.page = val;
      //更新数据
      this.listData();
    },
    //跳转到歌单列表
    tolist(id) {
      this.$router.push({ path: "playlist", query: { id: id } });
    }
  }
};
</script>

<style >
</style>
