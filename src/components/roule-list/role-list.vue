<template>
<div>
  <el-breadcrumb  class="top" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/rights' }">权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button  plain @click="dialogFormVisible = true">添加用户</el-button>
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
      property="roleName"
      label="角色名称"
      width="120">
    </el-table-column>
    <el-table-column
      property="roleDesc"
      label="描述"
      width="180">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
      <el-button size="mini" type="primary" @click="editshowPeople(scope.row)" icon="el-icon-edit" ></el-button>
      <el-button size="mini"  type="danger" @click="deletePeople(scope.row)" icon="el-icon-delete"></el-button>
      <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog  :visible.sync="dialogFormVisible">
  <el-form :model="addData" >
    <el-form-item label="角色名称" label-width="120px" prop="roleName">
      <el-input v-model="addData.roleName" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="角色描述" label-width="120px" prop="roleName">
      <el-input v-model="addData.roleDesc" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click='dialogFormVisible = false' >取 消</el-button>
    <el-button type="primary" @click="add">确 定</el-button>
  </div>
</el-dialog>

  <el-dialog  :visible.sync="dialogVisible">
  <el-form :model="editData" >
    <el-form-item label="角色名称" label-width="120px" prop="roleName">
      <el-input v-model="editData.roleName" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="角色描述" label-width="120px" prop="roleName">
      <el-input v-model="editData.roleDesc" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click='dialogVisible = false' >取 消</el-button>
    <el-button type="primary" @click="updateData" >确 定</el-button>
  </div>
</el-dialog>
</div>
</template>
<script>
export default {
  async created () {
    this.update()
  },
  data () {
    return {
      tableData: [],
      dialogFormVisible: false,
      addData: {
        roleName: '',
        roleDesc: ''
      },
      editData: {
        roleName: '',
        roleDesc: ''
      },
      dialogVisible: false
    }
  },
  methods: {
    async add () {
      // console.log(this.addData)
      const res = await this.$http.post(`/roles`, this.addData)
      // console.log(res)
      if (res.data.meta.status === 201) {
        this.$message({
          type: 'success',
          message: '添加用户成功'
        })
        this.dialogFormVisible = false
        this.update()
        for (let key in this.addData) {
          this.addData[key] = ''
        }
      }
    },
    async deletePeople (user) {
      // console.log(user)
      const {id} = user
      const res = await this.$http.delete(`/roles/${id}`)
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      }
      this.update()
    },
    async update () {
      const res = await this.$http.get(`roles`)
      // console.log(res)
      this.tableData = res.data.data
    },
    async editshowPeople (user) {
      // console.log(user)
      const {id} = user
      this.dialogVisible = true
      const res = await this.$http.get(`roles/${id}`)
      // console.log(res)
      this.editData = res.data.data
    },
    async updateData () {
      // console.log(111)
      // console.log(this.editData)
      const {roleId} = this.editData
      const res = await this.$http.put(`/roles/${roleId}`, this.editData)
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: '编辑成功'
        })
        this.dialogVisible = false
        this.update()
      }
    }
  }
}
</script>
<style></style>
