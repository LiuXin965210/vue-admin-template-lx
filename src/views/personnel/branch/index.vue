<template>
  <div class="app-container">
    <h1 style="text-align: center">机构管理</h1>
    <el-divider></el-divider>

    <div class="input-container">
      <div>
        <el-button icon="el-icon-plus" type="primary" @click="editBranch()">
          添加
        </el-button>
        <el-button icon="el-icon-delete" type="danger" @click="deleteBranch()">
          删除
        </el-button>
      </div>
      <el-input
        v-model="keyword"
        placeholder="请输入检索内容"
        style="width: 350px"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-table
      v-loading="isLoading"
      :data="filterBranchList"
      style="margin: auto"
      max-height="578"
      @selection-change="setSelectRows"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="机构名称">
        <template slot-scope="scope">
          {{ scope.row.branchName }}
        </template>
      </el-table-column>
      <el-table-column label="机构简称">
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
  import { findAll, deleteById, deleteByIds } from '@/api/branch'
  import BranchEdit from './components/BranchEdit.vue'

  export default {
    name: 'Branch',
    components: {
      BranchEdit,
    },
    data() {
      return {
        isLoading: true,
        selectRows: [],
        keyword: '',
        branchName: '',
        branchShortName: '',
        branchList: [],
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
      setSelectRows(val) {
        this.selectRows = val
      },
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
        const { msg } = row
          ? await deleteById(row.branchId)
          : await deleteByIds(this.selectRows.map((row) => row.branchId))
        this.$message({
          message: msg,
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
    justify-content: space-between;
    margin: 50px auto;
    & > * {
      margin: 0 15px;
    }
  }
</style>
