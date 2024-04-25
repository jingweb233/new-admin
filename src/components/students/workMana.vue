<template>
  <div class="workMana">
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
    <Pages :total="total" :url="url" />
  </div>
</template>

<script>
import  Pages  from '@/components/common/PageContainer.vue';
export default {
    components:{
        Pages
    },
  data() {
    return {
      tableData: [],
      total: 0,
      loading: true,
      url:"/work"
    };
  },
  
};
</script>

<style lang="scss" scoped>
.workMana {
  .el-pagination {
    text-align: left;
    margin-top: 10px;
  }
}
</style>