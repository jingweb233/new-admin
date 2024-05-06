<template>
  <div class="">
    <el-tree :data="menus" show-checkbox node-key="name" :props="defaultProps" ref="tree">
    </el-tree>
    <el-button @click="getCheckedNodes">get</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
    };
  },
  created() {
    this.menus = [...this.$router.options.routes];
  },
  methods: {
    getCheckedNodes(){
        let ar = this.$refs.tree.getCheckedNodes()
        console.log(ar);
    }
  },
};
</script>