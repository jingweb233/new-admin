<template>
  <div class="infoList">
    <el-form :inline="true" class="demo-form-inline" size="small">
      <el-form-item>
        <el-button type="primary" @click="addStudent()">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="姓名" align="center">
      </el-table-column>
      <el-table-column prop="age" label="年龄" align="center">
      </el-table-column>
      <el-table-column prop="sex" label="性别" align="center">
      </el-table-column>
      <el-table-column prop="father" label="父亲姓名" align="center">
      </el-table-column>
      <el-table-column prop="mother" label="母亲姓名" align="center">
      </el-table-column>
      <el-table-column prop="time" label="入校时间" align="center">
      </el-table-column>
      <el-table-column prop="address" label="家庭住址" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="联系电话" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-edit"
            @click="edit(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="del(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="state === 1 ? '添加学生信息' : '修改学生信息'"
      :visible.sync="dialogFormVisible"
      width="500px"
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-radio v-model="form.sex" label="1">男</el-radio>
          <el-radio v-model="form.sex" label="2">女</el-radio>
        </el-form-item>
        <el-form-item
          label="父亲姓名"
          :label-width="formLabelWidth"
          prop="father"
        >
          <el-input v-model="form.father" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="母亲姓名"
          :label-width="formLabelWidth"
          prop="mother"
        >
          <el-input v-model="form.mother" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="入校时间"
          :label-width="formLabelWidth"
          prop="time"
        >
          <el-date-picker
            v-model="form.time"
            format="yyyy 年 mm 月 dd 日"
            value-format="yyyy-mm-dd"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="家庭住址"
          :label-width="formLabelWidth"
          prop="address"
        >
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="联系电话"
          :label-width="formLabelWidth"
          prop="phone"
        >
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeInfo(form)">取 消</el-button>
        <el-button type="primary" @click="sure(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Info, getInfo, infoDel } from "@/api/api.js";
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: "",
        age: "",
        sex: "1",
        father: "",
        mother: "",
        time: "",
        address: "",
        phone: "",
      },
      formLabelWidth: "80px",
      rules: {
        name: [{ required: true, message: "请输入姓名" }],
        age: [{ required: true, message: "请输入年龄" }],
        sex: [{ required: true, message: "请输入性别" }],
        time: [{ required: true, message: "请输入时间" }],
        address: [{ required: true, message: "请输入地址" }],
        phone: [{ required: true, message: "请输入联系电话" }],
      },
      total: 0,
      state: 1,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    edit(row) {
      console.log(row);
      this.form = { ...row };
      this.dialogFormVisible = true;
      this.state = 0;
    },
    del(row) {
      this.$alert('你确定要删除吗？','提示',{
        confirmButtonText:'确定',
        callback:()=>{
          infoDel(row.id).then((res)=>{
            if (res.data.status === 200) {
              this.$message({ type: "success", message: res.data.message });
              this.getData();
            }
          })
        }
      })
    },
    addStudent() {
      this.form = {
        name: "",
        age: "",
        sex: "1",
        father: "",
        mother: "",
        time: "",
        address: "",
        phone: "",
      };
      this.dialogFormVisible = true;
      this.state = 1;
    },
    getData() {
      getInfo().then((res) => {
        if (res.status === 200) {
          this.tableData = res.data.data;
          this.total = res.data.total;
        }
      });
    },
    closeInfo() {
      this.dialogFormVisible = false;
      this.$refs.form.resetFields();
    },
    sure() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.state) {
            Info('post',this.form).then((res) => {
              if (res.data.status === 200) {
                this.getData();
                this.dialogFormVisible = false;
                this.$message({ type: "success", message: res.data.message });
              }
            });
          } else {
            Info('put',this.form).then((res) => {
              if (res.data.status === 200) {
                this.getData();
                this.dialogFormVisible = false;
                this.$message({ type: "success", message: res.data.message });
              }
            });
          }
        }
      });
    },
  },
};
</script>

<style lang="scss">
.infoList {
  .demo-form-inline,
  .el-form-item {
    margin-top: 5px;
    text-align: left;
  }
}
</style>