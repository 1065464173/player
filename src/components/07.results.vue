<template>
  <div class="results">
    <!-- 搜索信息 -->
    <div class="results_head">
      <h2>{{result}}</h2>
      <span>共找到n个结果</span>
    </div>
    <!--搜索结果-->
    <div class="results_body">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 歌曲分页 -->
        <el-tab-pane label="歌曲" name="second">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="index" label=" " width="50"></el-table-column>
            <el-table-column prop="musictitile" label="音乐标题" width="280"></el-table-column>
            <el-table-column prop="singer" label="歌手" width="220"></el-table-column>
            <el-table-column prop="album" label="专辑" width="380"></el-table-column>
            <el-table-column prop="time" label="时长"></el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 歌单分页 -->
        <el-tab-pane label="歌单" name="third"></el-tab-pane>
        <!-- MV分页 -->
        <el-tab-pane label="MV" name="fourth"></el-tab-pane>
      </el-tabs>
      <img src="../assets/07.result.png" alt />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "second",
      result: this.$route.query.q,
       tableData: [
           {
              index:'1',
              musictitile:'',
              singer:'',
              album:'',
              time:'',
           },{
              index:'2',
              musictitile:'',
              singer:'',
              album:'',
              time:'',
           }
       ]
    };
  },
  created() {
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style>
.results_head {
  display: flex;
}
</style>