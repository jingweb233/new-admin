const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    open:true,
    host:'localhost',
    proxy:{
      '/api':{
        target:"http://localhost:3000",
        changeOrigin:true,
        pathRewrite:{
          '^api':"/"
        }
      }
    }
  }
})
