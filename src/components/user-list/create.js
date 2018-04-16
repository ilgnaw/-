export default {
  async created () {
    this.loadUsersByPage(1)
  },
  data () {
    return {
      searchText: '',
      tableData: [],
      totalSize: 0,
      currentPage: 1,
      pageSize: 1,
      userForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editUserForm: {
        username: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话号码', trigger: 'blur' }
        ]
      },
      dialogFormVisible: false,
      dialogEditFormVisible: false
    }
  },
  methods: {
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      this.loadUsersByPage(1, pageSize)
      this.currentPage = 1
    },
    handleCurrentChange (currentPage) {
      this.loadUsersByPage(currentPage, this.pageSize)
    },
    async loadUsersByPage (page, pageSize = 1) {
      const res = await this.$http.get('/users', {
        params: {
          pagenum: page,
          pagesize: pageSize,
          query: this.searchText
        }
      })
      const {users, total} = res.data.data
      this.tableData = users
      this.totalSize = total
    },
    handleSearch () {
      // console.log(1)
      this.loadUsersByPage(1, this.pageSize)
    },
    async handleStateChange (val, user) {
      const {id: userId} = user
      const res = await this.$http.put(`/users/${userId}/state/${val}`)
      console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: '修改状态成功'
        })
      }
    },
    async handleAddUser () {
      this.$refs['addUser'].validate(async (valid) => {
        if (!valid) {
          return false
        }
        const res = await this.$http.post(`/users`, this.userForm)
        console.log(res)
        if (res.data.meta.status === 201) {
          this.$message({
            type: 'success',
            message: '添加用户成功'
          })
          this.dialogFormVisible = false
          this.loadUsersByPage(this.currentPage)

          for (let key in this.userForm) {
            this.userForm[key] = ''
          }
        }
      })
    },

    /**
     * 处理删除用户
     */
    async hangleDeleteUser (user) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {id: uesrId} = user
        const res = await this.$http.delete(`/users/${uesrId}`)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.loadUsersByPage(this.currentPage)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async handleEditUser () {
      console.log('编辑用户')
      console.log(this.editUserForm)
      const {id: userId} = this.editUserForm
      const res = await this.$http.put(`/users/${userId}`, this.editUserForm)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: '更新用户成功'
        })
        this.dialogEditFormVisible = false
        this.loadUsersByPage(this.currentPage)
      }
    },
    async hangleShowEditFrom (user) {
      this.dialogEditFormVisible = true
      const res = await this.$http.get(`/users/${user.id}`)
      this.editUserForm = res.data.data
    }
  }
}