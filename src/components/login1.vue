<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="fa fa-users"></i>
        <span>通用后台管理系统</span>
        <el-form label-width="80px" :model="form" ref="form">
          <el-form-item
            label="用户名"
            prop="username"
            :rules="[
              { required: true, message: '请输入用户名', trigger: 'blur' },
              { min: 4, max: 10, message: '长度 4-10 位', trigger: 'blur' },
            ]"
          >
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
            :rules="[
              { required: true, message: '密码', trigger: 'blur' },
              { min: 6, max: 12, message: '长度 6-12 位', trigger: 'blur' },
            ]"
          >
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login(form)">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },

  methods: {
    login() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.form);
          this.axios
            .post("http://localhost:3000/api")
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                localStorage.setItem("username", res.data.username);
                this.$message({ message: res.data.message, type: "success" });
                this.$router.push("./home");
              }
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          console.error(this.form);
        }
      });
    },
  },
};
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgb(69, 132, 214);
  .box-card {
    width: 450px;
    margin: 200px auto;
    .el-card__header {
      font-size: 30px;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>