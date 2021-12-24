<template>
  <div class="query-container">
    <el-row v-loading.fullscreen.lock="loading" :gutter="50">
      <el-col
        v-for="(item, index) in cards"
        :key="item.docNumber"
        style="margin-bottom: 30px; position: relative"
        :span="6"
        :xs="24"
        :sm="24"
        :md="12"
        :lg="6"
        :xl="6"
      >
        <el-card
          class="card-item"
          :style="getFocusClass(index)"
          @click.native="setCurIndex(index)"
        >
          <div class="card-title-container">
            <div class="card-title-content text-truncate">
              <span ref="detail" @click.prevent="enterQueryDoc(item)">
                {{ item.docNumber }}
              </span>
              <el-button
                class="card-tag"
                :title="item.title"
                :type="item.type"
                size="mini"
                round
              >
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

            <el-dropdown
              v-if="imgshow(index, item.text)"
              class="card-setting-button"
              style="position: absolute; right: -8px; top: 0"
            >
              <el-button icon="el-icon-setting" size="mini"></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-if="item.text == '待发行'"
                  @click.native="issueQuery(item)"
                >
                  发行
                </el-dropdown-item>
                <el-dropdown-item
                  v-if="item.text == '待回答'"
                  @click.native="answerQuery(item)"
                >
                  回答
                </el-dropdown-item>
                <el-dropdown-item
                  v-if="item.text == '待回答' || item.text == '已回答'"
                  @click.native="closeQuery(item)"
                >
                  关闭
                </el-dropdown-item>
                <el-dropdown-item
                  v-if="item.text == '已回答'"
                  @click.native="proposeQuery(item)"
                >
                  再次提出
                </el-dropdown-item>
                <el-dropdown-item v-if="item.text == '待发行'" divided>
                  删除
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div style="font-size: 13px; margin: 20px 0 0 10px">
            <p>測定日</p>
            <p style="color: blue">
              IMRD-001 > 觀察期間/觀察期間(60ヶ月)/全身狀態、一般所見
            </p>
          </div>
          <el-tabs
            v-model="item.active"
            :tab-position="tabPosition"
            style="height: 85px"
            :stretch="true"
          >
            <el-tab-pane
              v-for="tabItem in item.editableTabs"
              :key="tabItem.key"
              :label="tabItem.title"
              :name="tabItem.name"
              style="font-size: 11px"
            >
              {{ tabItem.content }}
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
    <QueryDetail ref="queryDetail"></QueryDetail>
  </div>
</template>

<script>
  import { getDocs } from '@/api/querydoc'
  import QueryDetail from './components/QueryDetail'
  import { title } from '@/settings'

  export default {
    components: { QueryDetail },
    data() {
      return {
        currentIndex: -1,
        cards: [],
        tabPosition: 'left',
      }
    },
    created() {
      this.fetchData()
    },
    mounted() {},
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
          duration: 1000,
        })
      },
      enterQueryDoc(item) {
        let title = '质疑详细'
        this.$refs['queryDetail'].show(item, title)
      },
      closeQuery(item) {
        let title = '质疑关闭'
        this.$refs['queryDetail'].show(item, title)
      },
      issueQuery(item) {
        let title = '质疑发行'
        this.$refs['queryDetail'].show(item, title)
      },
      proposeQuery(item) {
        let title = '质疑再次提出'
        this.$refs['queryDetail'].show(item, title)
      },
      answerQuery(item) {
        let title = '质疑回答'
        this.$refs['queryDetail'].show(item, title)
      },
      setCurIndex(index) {
        this.currentIndex = index
      },
      imgshow(index, text) {
        return this.currentIndex == index && text !== '已关闭'
      },
      getFocusClass(index) {
        if (this.currentIndex == index) {
          return 'box-shadow: 0 0 0 5px rgba(53, 129, 243, 0.55);'
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .query {
    &-container {
      padding: 30px 40px;
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
    .el-tabs__item {
      padding: 0;
      writing-mode: tb;
      font-size: small;
      text-align: center;
      letter-spacing: 5px;
      // background-color: #dbd9da;
    }
    .el-tabs__content {
      padding: 3px 5px;
      height: 100%;
      background: white;
      // border: 1px solid #dcdfe6;
      border-left: 0;
    }
    .el-tab-pane {
      overflow-y: auto;
      overflow-x: hidden;
      height: 100%;
    }
    .el-button--mini,
    .el-button--mini.is-round {
      padding: 5px;
    }
    // .el-tabs--left .el-tabs__header.is-left {
    //   margin-right: 0;
    // }
    // .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    //   background-color: white;
    // }
    // .el-tabs--border-card > .el-tabs__header {
    //   border-bottom: 0;
    // }
    // .el-tabs--border-card {
    //   border: none;
    //   box-shadow: none;
    // }
    // .el-tabs--left.el-tabs--border-card .el-tabs__item.is-left {
    //   margin: 0;
    //   border: 1px solid #dcdfe6;
    //   border-right: 0;
    //   border-radius: 3px;
    // }
    // .el-button--mini,
    // .el-button--mini.is-round {
    //   padding: 5px;
    // }
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
