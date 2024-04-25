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
            <el-button type="primary" @click="login()">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { nameRule, passRule } from "../utils/validate";
import { setToken } from "../utils/setToken";
import { denglu } from "../api/api";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ validator: nameRule, triger: "blur" }],
        password: [{ validator: passRule, triger: "blur" }],
      },
    };
  },

  methods: {
    login() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.form);
          denglu(this.form)
            .then((res) => {
              if (res.data.status === 200) {
                setToken("token", res.data.token);
                setToken("username", res.data.username);
                this.$message({ message: res.data.message, type: "success" });
                this.$router.push("./home");
                console.log(res);
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

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgb(110, 166, 230);
  .el-card{
    background: rgba($color: #d6d0d0, $alpha: .5);
  }
  .box-card {
    width: 450px;
    margin: 200px auto;
    color: #fff;
    .el-form-item__label{
      color: #fff;
    }
    .el-card__header {
      font-size: 30px;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>