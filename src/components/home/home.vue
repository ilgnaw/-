<template>
  <el-container class="container">
  <el-header class="header">
    <el-row>
      <el-col :span="4"><div class="grid-content bg-purple"><img src="./home-log.png" alt=""></div></el-col>
      <el-col :offset="16" :span="4"><div class="grid-content bg-purple"><a href="#" @click.prevent='logout' >退出</a></div></el-col>
  </el-row>
  </el-header>
  <el-container class="container">
    <el-aside class="aside" width="200px">
       <el-menu
      default-active="2"
      class="el-menu-vertical-demo aside-menu"
      :unique-opened = 'false'
      :router='true'
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item index="/users">用户列表</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item index="/roles">角色列表</el-menu-item>
        <el-menu-item index="/rights">权限列表</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item index="3-1">商品列表</el-menu-item>
        <el-menu-item index="3-2">商品分类</el-menu-item>
        <el-menu-item index="3-3">商品参数</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item index="4-1">订单列表</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据统计</span>
        </template>
        <el-menu-item index="4-1">数据报表</el-menu-item>
      </el-submenu>
    </el-menu>
    </el-aside>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>

</template>
<script>
import {removeUserInfo} from '@/assets/js/auth'
export default {
  data () {
    return {}
  },
  methods: {
    logout () {
      this.$confirm('你确定要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeUserInfo()
        this.$router.push({
          'name': 'login'
        })
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
      })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style>
.container {
  height: 100%;
}
.aside,.aside-menu {
  height: 100%;
}
.header {
  background-color: #B3C0D1;
  line-height: 60px;
}
.aside {
    background-color: #D3DCE6;
}
.main {
  background-color: #E9EEF3;
  height: 100%;
}

</style>
