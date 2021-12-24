<template>
  <div style="display: flex; align-items: center">
    <div
      class="search-container"
      :style="!showDetail ? 'padding-left:20px' : 'padding-left:5px'"
    >
      <span v-if="showDetail" slot="reference" class="svg-container">
        <svg-icon icon-class="history" />
      </span>
      <el-input
        v-if="showDetail"
        v-model="keywords"
        style="width: 400px"
        size="mini"
        @change="search"
      ></el-input>
      <div
        v-else
        style="
          width: 400px;
          border: 1px solid #dedede;
          display: flex;
          white-space: nowrap;
          align-items: center;
          padding: 0 4px;
          border-radius: 4px;
        "
      >
        <span style="margin-right: 10px">输入率</span>
        <el-link type="primary" underline>介于</el-link>
        <el-input value="20" size="mini" style="width: 50px"></el-input>
        <span>% ~</span>
        <el-input value="40" size="mini" style="width: 50px"></el-input>
        <span>%</span>
      </div>
      <el-popover placement="bottom-start" trigger="hover">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-radio-button label="常用"></el-radio-button>
          </el-col>
          <el-col :span="6">
            <el-radio-button label="全部"></el-radio-button>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 10px">
          <el-col :span="6">
            <el-radio-button label="输入率"></el-radio-button>
          </el-col>
          <el-col :span="6">
            <el-radio-button label="审查率"></el-radio-button>
          </el-col>
          <el-col :span="6">
            <el-radio-button label="SDV率"></el-radio-button>
          </el-col>
          <el-col :span="6">
            <el-radio-button label="锁定率"></el-radio-button>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <div class="search-history">
          <div>历史记录</div>
          <div>
            <el-link v-if="canEdit" type="primary" @click="editTags">
              完成
            </el-link>
            <span v-else>
              <el-link type="primary" @click="clearTags">清空</el-link>
              <el-divider direction="vertical"></el-divider>
              <el-link type="primary" @click="editTags">编辑</el-link>
            </span>
          </div>
        </div>
        <div>
          <el-tag
            v-for="tag in tags"
            :key="tag.name"
            :closable="canEdit"
            :type="tag.type"
            style="margin-right: 10px"
            @click.native="showDetailSearch"
            @close="removeTag(tag)"
          >
            {{ tag.name }}
          </el-tag>
        </div>
        <span slot="reference" class="svg-container">
          <svg-icon icon-class="arrow-down" />
        </span>
      </el-popover>
    </div>
    <el-link
      style="margin-left: 15px; font-size: 16px"
      :underline="false"
      @click="openBatchExecution"
    >
      <svg-icon icon-class="implement" style="width: 1.5em; height: 1.5em" />
      执行
    </el-link>
    <el-link
      v-if="showCreate"
      style="margin-left: 15px; font-size: 16px"
      :underline="false"
      @click="openDocInput"
    >
      <svg-icon icon-class="add-user" style="width: 1.5em; height: 1.5em" />
      创建
    </el-link>
    <el-pagination
      background
      layout="total, prev, pager, next"
      :current-page="pageNo"
      :page-size="12"
      :total="36"
      style="margin-left: auto"
      @current-change="changePage"
    ></el-pagination>
    <BatchExecution ref="batchExcution"></BatchExecution>
    <WarningBatchExecution ref="warningBatchExecution"></WarningBatchExecution>
    <QueryBatchExecution ref="queryBatchExecution"></QueryBatchExecution>
  </div>
</template>

<script>
  import BatchExecution from '../BatchExecution'
  import WarningBatchExecution from '../WarningBatchExecution'
  import QueryBatchExecution from '../../../../views/query/components/QueryBatchExecution'

  export default {
    name: 'Search',
    components: { BatchExecution, WarningBatchExecution, QueryBatchExecution },
    data() {
      return {
        showDetail: true,
        showCreate: this.$route.name != 'query',
        pageNo: 1,
        searchType: '全部',
        canEdit: false,
        keywords: '',
        tags: [
          { name: '常用', type: 'info' },
          { name: '输入率>50%', type: 'info' },
          { name: '张三', type: 'info' },
          { name: '男', type: 'info' },
        ],
      }
    },
    methods: {
      search() {
        this.$store
          .dispatch('app/search', this.keywords)
          .then(() => {})
          .catch(() => {
            this.$message('检索出错')
          })
      },
      removeTag(tag) {
        this.tags.splice(this.tags.indexOf(tag), 1)
      },
      clearTags() {
        this.tags.splice(0, this.tags.length)
      },
      editTags() {
        this.canEdit = !this.canEdit
      },
      changePage() {},
      openDocInput(title) {
        this.$router.push({ path: 'input-data', query: { title: 'IMP_RMP' } })
      },
      openBatchExecution() {
        switch (this.$route.name) {
          case 'Home':
            this.$refs['batchExcution'].show()
            break
          case 'Query':
            this.$refs['queryBatchExecution'].show()
            break
          case 'Warning':
            this.$refs['warningBatchExecution'].show()
            break
        }
      },
      setShowCreate(shown) {
        this.showCreate = shown
      },
      showDetailSearch() {
        this.showDetail = !this.showDetail
      },
    },
  }
</script>

<style lang="scss" scoped>
  .search {
    &-container {
      display: flex;
      align-items: center;
      margin-right: 16px;
      border: 1px solid #d7dee3;
      border-radius: 32px;
      padding: 5px 5px;
      background-color: #fff;

      .svg-container {
        font-size: 16px;
        color: #d7dee3;
        cursor: pointer;
        user-select: none;
      }
    }
    &-history {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
  }
  ::v-deep {
    .el-input__inner {
      border: none;
    }
  }
</style>
