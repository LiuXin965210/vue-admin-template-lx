<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-table
      ref="multiple"
      :data="list"
      height="320px"
      :show-header="false"
      border
      highlight-current-row
      @current-change="handleCurrentChange"
    >
      <el-table-column show-overflow-tooltip prop="hospital"></el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">确 定</el-button>
      <el-button @click="close">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'ChangeHospital',
    components: {},
    data() {
      return {
        list: [
          { hospital: '全施设' },
          { hospital: '青岛医院' },
          { hospital: '齐鲁医院' },
          { hospital: '北京医院' },
          { hospital: '第一人民医院' },
          { hospital: '第二人民医院' },
          { hospital: '第三人民医院' },
          { hospital: '上海医院' },
          { hospital: '深圳医院' },
          { hospital: '首都医院' },
          { hospital: '杭州医院' },
          { hospital: '山东医院' },
          { hospital: '南京医院' },
        ],
        listLoading: true,
        title: '施设切换',
        dialogFormVisible: false,
        currentRow: null,
      }
    },
    created() {},
    mounted() {},
    methods: {
      showChangeHosp() {
        this.dialogFormVisible = true
      },
      close() {
        this.dialogFormVisible = false
      },
      save() {
        this.dialogFormVisible = false
        return this.multipleSelection
      },
      handleCurrentChange(row) {
        this.currentRow = row
      },
    },
  }
</script>
