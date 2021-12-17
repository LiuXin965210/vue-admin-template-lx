<template>
  <div class="dashboard-container">
    <el-row :gutter="40">
      <el-col
        v-for="(index, item) in 8"
        :key="item.id"
        :span="6"
        :xs="24"
        :sm="24"
        :md="12"
        :lg="6"
        :xl="6"
      >
        <el-card class="card-item">
          <div @dblclick="openInputData">
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: space-between;
              "
            >
              <div>
                <div class="card-title">IMRD-00{{ index }}</div>
              </div>
              <div>
                <svg-icon icon-class="star" />
                <svg-icon style="margin-left: 10px" icon-class="shopping" />
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
              患者识别番号H001-{{ index }}
            </div>
            <div style="margin-top: 10px; margin-bottom: 10px">出生日期</div>
            <el-progress
              color="#20c6dc"
              :text-inside="true"
              :stroke-width="26"
              :percentage="70"
              :format="format"
            />
            <div class="progress-container">
              <el-progress
                :width="48"
                :stroke-width="4"
                type="circle"
                :percentage="25"
                :format="formatCheck"
              />
              <el-progress
                :width="48"
                :stroke-width="4"
                type="circle"
                :percentage="25"
                :format="formatSDV"
              />
              <el-progress
                :width="48"
                :stroke-width="4"
                type="circle"
                :percentage="25"
                :format="formatSign"
              />
              <el-progress
                :width="48"
                :stroke-width="4"
                type="circle"
                :percentage="25"
                :format="formatLock"
              />
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
      openInputData() {
        this.$router.push('/input-data')
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
    }
  }
</style>
