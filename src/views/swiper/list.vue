<template>
  <div>
    <el-upload
      class="upload-demo"
      action="http://localhost:3000/swiper/upload"
      :on-success="uploadSuccess"
      :show-file-list="false"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <el-table v-loading="loading" :data="swiperList" stripe style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="图片" width="400">
        <template slot-scope="scope">
          <img :src="scope.row.download_url" alt height="50" />
        </template>
      </el-table-column>

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
import { fetchList, deleteList } from "@/api/swiper";
export default {
  data() {
    return {
      swiperList: [],
      loading: false,
      delDialogVisible: false,
      info: {}
    };
  },
  created() {
    this.getSwiper();
  },
  methods: {
    getSwiper() {
      this.loading = true;
      fetchList().then(res => {
        console.log(res);
        this.swiperList = res.data;
        this.loading = false;
      });
    },
    uploadSuccess(res) {
      if (res.id_list) {
        this.$message({
          message: "上传成功",
          type: "success"
        });
        this.getSwiper();
      } else {
        this.$message.error("上传失败");
      }
    },
    onDel(row) {
      this.info = row;
      this.delDialogVisible = true;
    },
    doDel() {
      this.delDialogVisible = false;
      this.loading = true;
      deleteList(this.info).then(res => {
        this.loading = false;
        console.log(res)
        if (res.data.delDBres.deleted > 0) {
          this.swiperList = [];
          this.getSwiper();
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