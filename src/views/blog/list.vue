<template>
  <div>
    <el-table v-loading="loading" :data="blogList" stripe style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="textcontent" label="博客内容" width="300"></el-table-column>
      <el-table-column prop="nickName" label="作者"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="onDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="提示" :visible.sync="delDialogVisible" width="30%">
      <span>确定删除吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doDel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { fetchList, deleteList } from "@/api/blog";
import scroll from "@/utils/scroll";
export default {
  data() {
    return {
      blogList: [],
      count: 50,
      delDialogVisible: false,
      loading: false,
      blog: {}
    };
  },
  created() {
    this.getBlogList();
  },
  mounted() {
    scroll.start(this.getList);
  },
  methods: {
    getBlogList() {
      this.loading = true;
      fetchList({
        start: this.blogList.length,
        count: this.count
      }).then(res => {
        this.loading = false;
        const data = res.data;
        if (res.data.length < this.count) {
          scroll.end();
        }
        data.forEach(item => {
          let blog = JSON.parse(item);
          this.blogList.push(blog);
        });
      });
    },
    onDel(row) {
      this.delDialogVisible = true;
      this.blog = row;
    },
    doDel() {
      this.delDialogVisible = false;
      this.loading = true;
      deleteList(this.blog).then(res => {
        this.loading = false;
        if (res.data.dlblogRes.deleted > 0) {
          this.blogList = [];
          this.getBlogList();
          this.$message({
            message: "删除成功",
            type: "success"
          });
        } else {
          this.$message.error("删除失败");
        }
      });
    }
  }
};
</script>