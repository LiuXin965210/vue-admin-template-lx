<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="部门名称" prop="deptName">
        <el-input
          v-model.trim="form.deptName"
          autocomplete="off"
          :maxlength="50"
        ></el-input>
      </el-form-item>
      <el-form-item label="所属机构" prop="branchId">
        <el-select v-model="form.branchId" :loading="isLoading">
          <el-option
            v-for="branch in branchList"
            :key="branch.branchId"
            :label="branch.branchName"
            :value="branch.branchId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="负责人" prop="username">
        <el-cascader
          v-model="form.userId"
          :options="userList"
          :props="{ expandTrigger: 'hover' }"
          :show-all-levels="false"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input
          v-model.trim="form.connectTelNo"
          autocomplete="off"
          :maxlength="8"
        ></el-input>
      </el-form-item>
      <el-form-item label="移动电话">
        <el-input
          v-model.trim="form.connectMobileTelNo"
          autocomplete="off"
          :maxlength="11"
        ></el-input>
      </el-form-item>
      <el-form-item label="传真">
        <el-input
          v-model.trim="form.faxes"
          autocomplete="off"
          :maxlength="9"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { create, updateById } from '@/api/department'
  import { findAll as findAllBranches } from '@/api/branch'
  import { findAll as findAllUsers } from '@/api/user'
  export default {
    name: 'DeptEdit',
    data() {
      return {
        title: '',
        form: {
          deptName: '',
          branchId: '',
          userId: '',
          connectTelNo: '',
          connectMobileTelNo: '',
          faxes: '',
        },
        rules: {
          deptName: [
            { required: true, trigger: 'blur', message: '请输入部门名称' },
          ],
          branchId: [
            { required: true, trigger: 'blur', message: '请选择机构' },
          ],
          userId: [
            { required: true, trigger: 'blur', message: '请选择部门负责人' },
          ],
        },
        visible: false,
        isLoading: true,
        branchList: [],
        userList: [],
      }
    },
    created() {
      this.initBranchList()
      this.initUserList()
    },
    methods: {
      async initBranchList() {
        this.isLoading = true
        const { data } = await findAllBranches()
        this.branchList = data
        this.isLoading = false
      },
      async initUserList() {
        const { data } = await findAllUsers()
        this.userList = data
      },
      open(row) {
        if (!row) {
          this.title = '添加部门'
        } else {
          this.title = '编辑部门'
          this.form = Object.assign({}, row)
        }
        this.visible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.visible = false
        this.$parent.initDeptList()
      },
      save() {
        const self = this
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            const { msg } = self.form.deptId
              ? await updateById(self.form)
              : await create(self.form)
            self.$message({
              message: msg,
              type: 'success',
            })
            self.$refs['form'].resetFields()
            self.visible = false
            self.$parent.initDeptList()
            self.form = self.$options.data().form
          } else {
            return false
          }
        })
      },
    },
  }
</script>
