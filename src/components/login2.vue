<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="fa fa-users"></i>
        <span>通用后台管理系统</span>
        <el-form label-width="80px" :model="form" ref="form" :rules="rules">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
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
    const validateName = (rules, value, callback) => {
      let reg = /^[a-zA-Z0-9]{4,10}$/;
      if (value === "") {
        callback(new Error("请输入用户名4-10位"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入用户名4-10位"));
      } else {
        callback();
      }
    };
    const validatePass = (rules, value, callback) => {
      let pass = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\\W]{6,12}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!pass.test(value)) {
        callback(new Error("请输入密码包含英文大小写、数字和特殊符号6-12位"));
      } else {
        callback();
      }
    };

    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: validateName, triger: "blur" }],
        password: [{ validator: validatePass, triger: "blur" }],
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