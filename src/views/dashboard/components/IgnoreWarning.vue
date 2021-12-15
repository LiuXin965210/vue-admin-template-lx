<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="550px"
    @close="close"
  >
    <el-input
      v-model="textarea"
      type="textarea"
      :autosize="{ minRows: 10, maxRows: 20 }"
      placeholder="请输入警告忽视理由"
    ></el-input>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">确 定</el-button>
      <el-button @click="close">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        textarea: '',
        dialogFormVisible: false,
      }
    },
    methods: {
      showIgnoreWaring() {
        this.title = '警告忽视理由'
        this.dialogFormVisible = true
      },
    },
  }
</script>
