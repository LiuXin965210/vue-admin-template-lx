<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="550px">
    <el-input
      v-model="textarea"
      type="textarea"
      :autosize="{ minRows: 10, maxRows: 20 }"
      placeholder="请输入警告忽视理由"
    ></el-input>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary">确 定</el-button>
      <el-button>取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        title: '警告忽视理由',
        textarea: '',
        dialogFormVisible: false,
      }
    },
    methods: {
      showIgnoreWaring() {
        this.dialogFormVisible = true
      },
    },
  }
</script>
