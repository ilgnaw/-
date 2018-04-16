<template>
  <div>
    <el-breadcrumb  class="top" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/rights' }">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
      <el-table
    ref="singleTable"
    :data="tableData"
    highlight-current-row
    style="width: 100%">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      property="authName"
      label="权限名称"
      width="120">
    </el-table-column>
    <el-table-column
      property="path"
      label="路径"
      width="120">
    </el-table-column>
    <el-table-column
      property="level"
      label="层级">
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [{
        authName: '2016-05-02',
        path: '王小虎',
        level: '上海市普陀区金沙江路 1518 弄'
      }, {
        authName: '2016-05-02',
        path: '王小虎',
        level: '上海市普陀区金沙江路 1518 弄'
      }, {
        authName: '2016-05-02',
        path: '王小虎',
        level: '上海市普陀区金沙江路 1518 弄'
      }],
      currentRow: null
    }
  },
  async created () {
    const res = await this.$http.get(`/rights/list`)
    console.log(res)
    this.tableData = res.data.data
  }
}
</script>
<style>
.top {
  margin-bottom:10px;
  line-height: 3
}
</style>
