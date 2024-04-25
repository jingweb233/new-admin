<template>
  <div class="workList">
    <el-table :data="tableData" v-loading="loading" border style="width: 100%">
      <el-table-column prop="id" label="用户ID" align="center">
      </el-table-column>
      <el-table-column prop="userId" label="所属班级" align="center">
      </el-table-column>
      <el-table-column prop="title" label="作业名称" align="center">
      </el-table-column>
      <el-table-column prop="completed_text" label="完成情况" align="center">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[1,2,3]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getTabledata } from "@/utils/table";
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      page: 1,
      size: 3,
      loading: true,
    };
  },
  created() {
    getTabledata(this, "/work", { page: this.page, size: this.size }, [
      "completed",
    ]);
  },
  methods: {
    handleSizeChange(val) {
      this.size = val;
      this.page = 1;
      getTabledata(this, "/work", { page: this.page, size: val }, [
        "completed",
      ]);
    },
    handleCurrentChange(val) {
      this.page = val;
      getTabledata(this, "/work", { page: val, size: this.size }, [
        "completed",
      ]);
    },
  },
};
</script>

<style lang="scss" scoped>
.workList {
  .el-pagination {
    text-align: left;
    margin-top: 10px;
  }
}
</style>