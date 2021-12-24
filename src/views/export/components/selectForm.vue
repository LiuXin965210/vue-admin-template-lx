<template>
  <el-dialog title="表单选择" :visible.sync="dialogVisible" width="650px">
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">确 定</el-button>
      <el-button @click="close">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'SelectForm',
    components: {},
    data() {
      return {
        dialogVisible: false,
      }
    },
    created() {},
    mounted() {},
    methods: {
      show() {
        this.dialogVisible = true
      },
      save() {},
      close() {
        this.dialogVisible = false
      },
    },
  }
</script>

<style lang="scss" scoped></style>
