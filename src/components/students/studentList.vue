<template>
  <div class="stulist">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      size="small"
    >
      <el-form-item label="姓名">
        <el-input
          v-model="formInline.name"
          placeholder="输入姓名查询"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="find()">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="compData" border style="width: 100%">
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="age" label="年龄" align="center">
      </el-table-column>
      <el-table-column prop="sex_text" label="性别" align="center">
      </el-table-column>
      <el-table-column prop="number" label="学号" align="center">
      </el-table-column>
      <el-table-column prop="class" label="班级" align="center">
      </el-table-column>
      <el-table-column prop="state_text" label="状态" align="center">
      </el-table-column>
      <el-table-column prop="address" label="地址" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="联系方式" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="del(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { students, stuDel } from "@/api/api.js";
export default {
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 3,
      total: 0,
      formInline: {
        name: "",
      },
    };
  },
  computed: {
    compData() {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
  },
  created() {
    this.getData();
  },
  methods: {
    getData(params) {
      students(params).then((res) => {
        if (res.data.status === 200) {
          if (!Array.isArray(res.data.data)) {
            this.tableData = [res.data.data];
          } else {
            this.tableData = res.data.data;
          }
          this.total = res.data.total;
          this.tableData.forEach((item) => {
            item.sex === 1 ? (item.sex_text = "男") : (item.sex_text = "女");
            item.state === "1"
              ? (item.state_text = "已入学")
              : item.state === "2"
              ? (item.state_text = "未入学")
              : (item.state_text = "休学中");
          });
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    del(row) {
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => this.deleteConfirmed(row)) 
        .catch(() => this.deleteCanceled()); 
    },

    deleteConfirmed(row) {
      // 调用删除操作的函数，并处理响应
      stuDel(row.id)
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({ message: "数据删除成功", type: "success" });
            this.getData(); // 刷新数据列表的函数
          }
        })
        .catch((err) => {
          // 错误处理逻辑
          console.error(err);
          this.$message({ message: "删除失败，请重试", type: "error" });
        });
    },

    deleteCanceled() {
      // 用户点击了取消按钮
      this.$message({ message: "已取消删除", type: "info" });
    },
    find() {
      this.getData(this.formInline);
    },
    reset() {
      // 重置表单和分页到第一页
      this.formInline.name = "";
      this.currentPage = 1;
      this.pageSize = 10;
      // 重新获取数据，这里不传递任何搜索参数
      this.getData();
    },
  },
};
</script>

<style lang="scss" scoped>
.stulist {
  .demo-form-inline,
  .el-form-item {
    margin-top: 5px;
    text-align: left;
  }
  .el-pagination {
    text-align: left;
    margin-top: 10px;
  }
}
</style>