<template>
  <div class="">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[1, 2, 3]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :url="url"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getTabledata } from "@/utils/table";
export default {
  props:{
    'total': Number,
    'url': String
  },
  data() {
    return {
      page: 1,
      size: 3,
    };
  },
  created() {
    getTabledata(this.$parent, "/work", { page: this.page, size: this.size }, [
      "completed",
    ]);
  },
  methods: {
    handleSizeChange(val) {
      this.size = val;
      this.page = 1;
      getTabledata(this.$parent, "/work", { page: this.page, size: val }, [
        "completed",
      ]);
    },
    handleCurrentChange(val) {
      this.page = val;
      getTabledata(this.$parent, "/work", { page: val, size: this.size }, [
        "completed",
      ]);
    },
  },
};
</script>

<style lang="scss" scoped>

  .el-pagination {
    text-align: left;
    margin-top: 10px;
  }

</style>