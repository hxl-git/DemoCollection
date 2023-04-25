<template>
<div class="home">
  <el-card class="box-card-menu">
    <div> 导航栏 </div>
    <br/>
    <div v-for="router in routers" class="text item">
      <el-button type="text" @click="routerClick(router)">{{router.title}}</el-button>
    </div>
  </el-card>

  <el-card class="box-card-content">
    <router-view/>
  </el-card>
</div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      routers:[]
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.routers = this.$router.options.routes[0].children
    },
    routerClick(row){
      console.log('点击', row)
      this.$router.push({path: row.path, query: {}})
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  display: flex;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card-menu {
  width:200px;
  height: 800px;
}
.box-card-content {
  width:calc(100% - 200px);
  height: 800px;
}

</style>
