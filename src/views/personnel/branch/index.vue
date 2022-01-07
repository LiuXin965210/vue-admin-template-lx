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
            <el-button size="mini" type="danger" @click="deleteBranch(row)">
              删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { findAll } from '@/api/branch'

  export default {
    name: 'Branch',
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
      getBranchList() {
        this.isLoading = true
        findAll().then((response) => {
          this.branchList = response.data.items
          this.isLoading = false
        })
      },
      editBranch() {},
      deleteBranch() {},
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
