<template>
  <div class='login-wrap'>
   <el-form label-position="top" class="login-form" ref="form"  label-width="80px">
     <h2>用户登入</h2>
  <el-form-item label="用户名">
    <el-input v-model="userForm.username">用户名</el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="userForm.password">密码</el-input>
  </el-form-item>
  <el-form-item>
    <el-button class="login-button" type="primary" @click="login">立即登入</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
import {saveUserInfo} from '@/assets/js/auth.js'
export default {
  data () {
    return {
      userForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      const res = await this.$http.post('/login', this.userForm)
      const data = res.data
      if (data.meta.status === 200) {
        saveUserInfo(data.data)
        this.$router.push({
          'name': 'home'
        })
        this.$message({
          type: 'success',
          message: '登入成功'
        })
      }
    }
  }
}
</script>

<style>
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  width: 400px;
  padding: 30px;
  border-radius: 2px;
  background-color: #fff;
}
.login-button {
  width:100%;
}

</style>
