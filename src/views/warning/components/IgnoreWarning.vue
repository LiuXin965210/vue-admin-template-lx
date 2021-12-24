<template>
  <el-dialog title="警告忽视理由" :visible.sync="dialogVisible" width="550px">
    <el-input
      v-model="textarea"
      type="textarea"
      resize="none"
      :autosize="{ minRows: 10, maxRows: 20 }"
      placeholder="请输入警告忽视理由"
    ></el-input>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">确 定</el-button>
      <el-button @click="cancel">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'IgnoreWarning',
    data() {
      return {
        textarea: '',
        dialogVisible: false,
      }
    },
    methods: {
      show() {
        this.dialogVisible = true
      },
      save() {
        this.dialogVisible = false
      },
      cancel() {
        this.dialogVisible = false
      },
    },
  }
</script>
