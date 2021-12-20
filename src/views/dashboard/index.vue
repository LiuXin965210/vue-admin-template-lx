<template>
  <div class="dashboard-container">
    <el-row :gutter="40">
      <el-col
        v-for="(item, index) in cards"
        :key="item.number"
        :span="6"
        :xs="24"
        :sm="24"
        :md="12"
        :lg="6"
        :xl="6"
      >
        <el-card class="card-item">
          <div @dblclick="openInputData(`IMRD-00${index}`)">
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
              "
            >
              <div>
                <div class="card-title">IMRD-00{{ item.number }}</div>
              </div>
              <div>
                <svg-icon
                  :style="{ fill: item.stared ? '#FFEC00' : '#DEDEDE' }"
                  icon-class="star"
                  @click.stop="star(index)"
                />
                <svg-icon
                  style="margin-left: 10px"
                  :icon-class="item.collected ? 'shopping' : 'grey-shopping'"
                  @click="collect(index)"
                />
                <!-- <el-dropdown style="margin-left: 10px">
                <el-button
                  icon="el-icon-setting"
                  size="mini"
                  circle
                ></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>打开</el-dropdown-item>
                  <el-dropdown-item divided>转院</el-dropdown-item>
                  <el-dropdown-item>导出PDF</el-dropdown-item>
                  <el-dropdown-item divided>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown> -->
              </div>
            </div>
            <div style="margin-top: 10px; margin-bottom: 10px">○○○研究中心</div>
            <div style="margin-top: 10px; margin-bottom: 10px">
              患者识别番号H001-{{ item.number }}
            </div>
            <div style="margin-top: 10px; margin-bottom: 10px">出生日期</div>
            <div style="display: flex; position: relative; align-items: center">
              <el-progress
                color="#20c6dc"
                :text-inside="true"
                :stroke-width="26"
                :percentage="70"
                :format="format"
                style="width: 100%"
              />
              <svg-icon
                v-show="item.hasError"
                icon-class="error"
                style="position: absolute; right: 10px"
              />
            </div>
            <div class="progress-container">
              <div>
                <el-progress
                  :width="48"
                  :stroke-width="4"
                  type="circle"
                  :percentage="25"
                  :format="formatCheck"
                />
              </div>
              <div @dblclick.stop="openSdvInput">
                <el-progress
                  :width="48"
                  :stroke-width="4"
                  type="circle"
                  :percentage="25"
                  :format="formatSDV"
                />
              </div>
              <div>
                <el-progress
                  :width="48"
                  :stroke-width="4"
                  type="circle"
                  :percentage="25"
                  :format="formatSign"
                />
              </div>
              <div>
                <el-progress
                  :width="48"
                  :stroke-width="4"
                  type="circle"
                  :percentage="25"
                  :format="formatLock"
                />
              </div>
            </div>
            <div v-if="keywords !== ''">
              <el-divider></el-divider>
              <div class="search-info">
                登陆票 > 基本情报 > 姓名
                <span>{{ keywords }}</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Dashboard',
    computed: {
      ...mapGetters(['name', 'keywords']),
    },
    data() {
      return {
        cards: [
          { number: 1, stared: true, collected: false, hasError: true },
          { number: 2, stared: false, collected: false, hasError: false },
          { number: 3, stared: false, collected: true, hasError: true },
          { number: 4, stared: false, collected: false, hasError: false },
          { number: 5, stared: true, collected: true, hasError: true },
          { number: 6, stared: false, collected: false, hasError: true },
          { number: 7, stared: true, collected: false, hasError: false },
          { number: 8, stared: false, collected: true, hasError: true },
        ],
        // keywords: this.$store.state.app.search,
      }
    },
    methods: {
      format(percentage) {
        return percentage != 100 ? '输入' + percentage + '%' : '输入完毕'
      },
      formatCheck(percentage) {
        return percentage != 100 ? '审查' + percentage + '%' : '审查完毕'
      },
      formatSDV(percentage) {
        return percentage != 100 ? 'SDV\r\n' + percentage + '%' : 'SDV完毕'
      },
      formatSign(percentage) {
        return percentage != 100 ? '署名' + percentage + '%' : '署名完毕'
      },
      formatLock(percentage) {
        return percentage != 100 ? '锁定' + percentage + '%' : '锁定完毕'
      },
      openInputData(title) {
        this.$router.push({ path: 'input-data', query: { title } })
      },
      star(index) {
        this.cards[index].stared = !this.cards[index].stared
      },
      collect(index) {
        this.cards[index].collected = !this.cards[index].collected
      },
    },
  }
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }
  }

  .card-title {
    font-size: $base-font-size-title;
    font-weight: $base-font-weight-title;
  }

  .el-col {
    margin-bottom: 40px;
  }

  .progress-container {
    margin-top: 16px;
    display: flex;

    & > * {
      margin: 0 8px;
    }
  }

  ::v-deep {
    .el-divider--horizontal {
      margin: 8px 0;
      background: 0 0;
      border-top: 1px dashed $base-color-grey;
    }
  }

  .search-info {
    font-size: $base-font-size-small;
    span {
      color: $base-color-red;
      word-break: break-all;
    }
  }
</style>
