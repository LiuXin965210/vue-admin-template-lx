<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="机构名称" prop="branchName">
        <el-input
          v-model.trim="form.branchName"
          autocomplete="off"
          :maxlength="50"
        ></el-input>
      </el-form-item>
      <el-form-item label="机构简称" prop="branchShortName">
        <el-input
          v-model.trim="form.branchShortName"
          autocomplete="off"
          :maxlength="50"
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
  import { create, updateById } from '@/api/branch'
  export default {
    name: 'BranchEdit',
    data() {
      return {
        title: '',
        form: {
          branchName: '',
          branchShortName: '',
        },
        rules: {
          branchName: [
            { required: true, trigger: 'blur', message: '请输入机构名称' },
          ],
          branchShortName: [
            { required: true, trigger: 'blur', message: '请输入机构简称' },
          ],
        },
        visible: false,
      }
    },
    methods: {
      open(row) {
        if (!row) {
          this.title = '添加机构'
        } else {
          this.title = '编辑机构'
          this.form = Object.assign({}, row)
        }
        this.visible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.visible = false
        this.$parent.initBranchList()
      },
      save() {
        const self = this
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            const { msg } = self.form.branchId
              ? await updateById(self.form)
              : await create(self.form)
            self.$message({
              message: msg,
              type: 'success',
            })
            self.$refs['form'].resetFields()
            self.visible = false
            self.$parent.initBranchList()
            self.form = self.$options.data().form
          } else {
            return false
          }
        })
      },
    },
  }
</script>
