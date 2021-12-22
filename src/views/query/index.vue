<template>
  <div class="query-container">
    <el-row v-loading.fullscreen.lock="loading" :gutter="50">
      <el-col
        v-for="(item, index) in cards"
        :key="item.docNumber"
        style="margin-bottom: 30px"
        :span="6"
        :xs="24"
        :sm="24"
        :md="12"
        :lg="6"
        :xl="6"
      >
        <el-card class="card-item">
          <div class="card-title-container">
            <div class="card-title-content text-truncate">
              {{ item.docNumber }}
              <el-button class="card-tag" :type="item.type" size="mini" round>
                {{ item.text }}
              </el-button>
            </div>
            <div class="card-title-buttons">
              <svg-icon
                style="margin-left: 10px"
                :icon-class="item.collected ? 'shopping' : 'grey-shopping'"
                @click="collectDoc(index)"
              />
            </div>
          </div>
          <div style="font-size: 13px; margin: 20px 0 0 10px">
            <p>測定日</p>
            <p style="color: blue">
              IMRD-001 > 觀察期間/觀察期間(60ヶ月)/全身狀態、一般所見
            </p>
          </div>
          <el-tabs
            :tab-position="tabPosition"
            type="border-card"
            style="height: 82px"
          >
            <el-tab-pane label="质疑">质疑</el-tab-pane>
            <el-tab-pane label="回答">回答</el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getDocs } from '@/api/querydoc'

  export default {
    data() {
      return {
        cards: [],
        tabPosition: 'left',
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.loading = true
        getDocs().then((response) => {
          this.cards = response.data.items
          this.loading = false
        })
      },
      collectDoc(index) {
        let status = !this.cards[index].collected
        this.cards[index].collected = status
        this.$notify({
          title: '成功',
          message: status ? '该数据已添加至执行列表' : '该数据已从执行列表删除',
          type: 'success',
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .query {
    &-container {
      padding: 30px;
    }
  }

  .card {
    &-title {
      &-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        user-select: none;
        cursor: pointer;
        & ~ div {
          font-size: 14px;
          margin-top: 12px;
        }
      }
      &-content {
        display: flex;
        font-size: $base-font-size-title;
        font-weight: $base-font-weight-title;
      }
      &-buttons {
        display: flex;
        cursor: pointer;
      }
    }
    &-progress {
      &-input {
        display: flex;
        position: relative;
        align-items: center;
        cursor: pointer;
      }
      &-modules {
        margin-top: 16px;
        display: flex;
        justify-content: space-around;
        & > * {
          cursor: pointer;
        }
      }
    }
    &-tag {
      margin-left: 10px;
    }
  }

  ::v-deep {
    .el-divider--horizontal {
      margin: 8px 0;
      background: 0 0;
      border-top: 1px dashed $base-color-grey;
    }
    .el-progress-bar__inner {
      text-align: center;
    }
    .el-progress__text {
      user-select: none;
    }
    .el-progress-bar__innerText {
      color: darkslategray;
    }
  }

  .search-info {
    font-size: $base-font-size-small;
    .keywords {
      color: $base-color-red;
      word-break: break-all;
    }
  }
  .text-truncate {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>
