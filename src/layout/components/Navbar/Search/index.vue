<template>
  <div style="display: flex; align-items: center">
    <div class="search-container">
      <el-popover placement="bottom-start" width="400" trigger="click">
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
            @close="removeTag(tag)"
          >
            {{ tag.name }}
          </el-tag>
        </div>
        <span slot="reference" class="svg-container">
          <svg-icon icon-class="history" />
        </span>
      </el-popover>
      <el-input
        v-model="keywords"
        class="search-input"
        @change="search"
      ></el-input>

      <el-popover placement="bottom-start" trigger="hover">
        <el-radio-group v-model="searchType">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="输入率"></el-radio-button>
          <el-radio-button label="审查率"></el-radio-button>
          <el-radio-button label="SDV率"></el-radio-button>
          <el-radio-button label="锁定率"></el-radio-button>
        </el-radio-group>
        <span slot="reference" class="svg-container">
          <svg-icon icon-class="arrow-down" />
        </span>
      </el-popover>
    </div>
    <el-link @click="openBatchExecution">
      <svg-icon icon-class="document" />
      执行
    </el-link>
    <el-link style="margin-left: 15px">
      <svg-icon icon-class="document" />
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
  </div>
</template>

<script>
  import BatchExecution from '../BatchExecution'

  export default {
    name: 'Search',
    components: { BatchExecution },
    data() {
      return {
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
      openBatchExecution() {
        this.$refs['batchExcution'].show()
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
    .el-input {
      input {
        border: 0;
        width: 400px;
        height: 20px;
      }
    }
  }
</style>
