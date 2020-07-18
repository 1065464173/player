<template>
  <div class="result-container">
    <div class="title-wrap">
      <h2 class="title">李荣浩</h2>
      <span class="sub-title">找到985个结果</span>
    </div>
    <el-tabs v-model="activeIndex">
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
            <tr class="el-table__row">
              <td>1</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>你要相信这不是最后一天</span>
                    <span class="iconfont icon-mv"></span>
                  </div>
                  <span>电视剧加油练习生插曲</span>
                </div>
              </td>
              <td>华晨宇</td>
              <td>你要相信这不是最后一天</td>
              <td>06:03</td>
            </tr>
            <tr class="el-table__row">
              <td>2</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>你要相信这不是最后一天</span>
                    <span class="iconfont icon-mv"></span>
                  </div>
                </div>
              </td>
              <td>华晨宇</td>
              <td>你要相信这不是最后一天</td>
              <td>06:03</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="lists">
        <div class="items">
          <div class="item">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">66892</span>
              </div>
              <img src="../assets/cover.jpg" alt />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">编辑推荐：一起探索这个未知的音乐罐头吧！</p>
          </div>
          <div class="item">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">66892</span>
              </div>
              <img src="../assets/cover.jpg" alt />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">编辑推荐：一起探索这个未知的音乐罐头吧！</p>
          </div>
          <div class="item">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">66892</span>
              </div>
              <img src="../assets/cover.jpg" alt />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">编辑推荐：一起探索这个未知的音乐罐头吧！</p>
          </div>
          <div class="item">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">66892</span>
              </div>
              <img src="../assets/cover.jpg" alt />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">编辑推荐：一起探索这个未知的音乐罐头吧！</p>
          </div>
          <div class="item">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">66892</span>
              </div>
              <img src="../assets/cover.jpg" alt />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">编辑推荐：一起探索这个未知的音乐罐头吧！</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <div class="items mv">
          <div class="item">
            <div class="img-wrap">
              <img src="../assets/mvCover.jpg" alt />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">9912</div>
              </div>
              <span class="time">02:43</span>
            </div>
            <div class="info-wrap">
              <div class="name">HEYNA</div>
              <div class="singer">余恩</div>
            </div>
          </div>
          <div class="item">
            <div class="img-wrap">
              <img src="../assets/mvCover.jpg" alt />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">9912</div>
              </div>
              <span class="time">02:43</span>
            </div>
            <div class="info-wrap">
              <div class="name">HEYNA</div>
              <div class="singer">余恩</div>
            </div>
          </div>
          <div class="item">
            <div class="img-wrap">
              <img src="../assets/mvCover.jpg" alt />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">9912</div>
              </div>
              <span class="time">02:43</span>
            </div>
            <div class="info-wrap">
              <div class="name">HEYNA</div>
              <div class="singer">余恩</div>
            </div>
          </div>
          <div class="item">
            <div class="img-wrap">
              <img src="../assets/mvCover.jpg" alt />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">9912</div>
              </div>
              <span class="time">02:43</span>
            </div>
            <div class="info-wrap">
              <div class="name">HEYNA</div>
              <div class="singer">余恩</div>
            </div>
          </div>
          <div class="item">
            <div class="img-wrap">
              <img src="../assets/mvCover.jpg" alt />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">9912</div>
              </div>
              <span class="time">02:43</span>
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
      //活动页
      activeIndex: "songs",
      //搜索关键字
      q: "",
      //返回数量
      limit: 30,
      //返回歌曲类型type 歌曲:1，歌单:1000，MV:1004
      type: 1
    };
  },
  methods: {
    //获取搜索关键字，跳转请求页
    toQuery() {
      this.q = this.$route.query.q; 
    },
    //获取搜索信息
    list() {
      axios({
        method: "get",
        url: "https://autumnfish.cn/search",
        params: {
          keywords:this.q,
          limit:30,
          offset:0,
          type:1,
        }
      }).then(res=>{
        console.log(res);
      });
    }
  },
  created() {
    //跳转请求页
    this.toQuery();
    //获取跳转信息
    this.list();
  },
  watch: {
    //跳转请求页
    query() {
      toQuery();
    }
  }
};
</script>

<style >
</style>
