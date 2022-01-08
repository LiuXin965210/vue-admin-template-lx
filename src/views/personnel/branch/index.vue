<template>
  <div>
    <h1 style="text-align: center">机构管理</h1>
    <el-divider></el-divider>

    <div class="input-container">
      <el-input v-model="branchName" class="input-item">
        <template slot="prepend">机构名称</template>
      </el-input>
      <el-input v-model="branchShortName" class="input-item">
        <template slot="prepend">机构简称</template>
      </el-input>
      <el-button type="primary">添加</el-button>
      <el-button type="primary" disabled>保存修改</el-button>
    </div>
    <el-table
      v-loading="isLoading"
      :data="filterBranchList"
      style="width: 60%; margin: auto"
      height="595"
    >
      <el-table-column prop="date" label="机构名称">
        <template slot-scope="scope">
          {{ scope.row.branchName }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="机构简称">
        <template slot-scope="scope">
          {{ scope.row.branchShortName }}
        </template>
      </el-table-column>
      <el-table-column width="150" fixed="right" label="操作">
        <template #default="{ row }">
          <div style="display: flex; justify-content: space-between">
            <el-button size="mini" @click="editBranch(row)">修改</el-button>
            <el-popconfirm
              title="确定删除该机构吗？"
              @confirm="deleteBranch(row)"
            >
              <el-button slot="reference" size="mini" type="danger">
                删除
              </el-button>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <branch-edit ref="edit"></branch-edit>
  </div>
</template>

<script>
  import { findAll, deleteById } from '@/api/branch'
  import BranchEdit from './components/BranchEdit.vue'

  export default {
    name: 'Branch',
    components: {
      BranchEdit,
    },
    data() {
      return {
        isLoading: true,
        branchName: '',
        branchShortName: '',
        branchList: [],
        keyword: '',
      }
    },
    computed: {
      filterBranchList: function () {
        const self = this
        return this.branchList.filter(function (branch) {
          if (!self.keyword) {
            return true
          }
          const lowerKeyword = self.keyword.toLowerCase()
          return (
            branch.branchName.toLowerCase().includes(lowerKeyword) ||
            branch.branchShortName.toLowerCase().includes(lowerKeyword)
          )
        })
      },
    },
    created() {
      this.getBranchList()
    },
    methods: {
      async getBranchList() {
        this.isLoading = true
        const { data } = await findAll()
        this.branchList = data
        this.isLoading = false
      },
      editBranch(row) {
        this.$refs['edit'].open(row)
      },
      async deleteBranch(row) {
        const { msg, index } = await deleteById(row.branchId)
        this.$message({
          message: index,
          type: 'success',
        })
        this.getBranchList()
      },
    },
  }
</script>

<style lang="scss">
  .input-container {
    display: flex;
    justify-content: center;
    margin: 50px 0;
    .input-item {
      width: 400px;
    }
    & > * {
      margin: 0 15px;
    }
  }
  .table-container {
    display: flex;
    justify-content: center;
  }
</style>
