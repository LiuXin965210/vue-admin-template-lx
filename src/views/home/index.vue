<template>
  <div class="home-container">
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
        <el-card>
          <div class="card-title-container">
            <div class="card-title-content">{{ item.docNumber }}</div>
            <div class="card-title-buttons">
              <svg-icon
                :style="{ fill: item.stared ? '#FFEC00' : '#DEDEDE' }"
                icon-class="star"
                @click.stop="starDoc(index)"
              />
              <svg-icon
                style="margin-left: 10px"
                :icon-class="item.collected ? 'shopping' : 'grey-shopping'"
                @click="collectDoc(index)"
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
          <div>{{ item.hospitalName }}</div>
          <div>患者识别番号：{{ item.patientNumber }}</div>
          <div>出生日期：{{ item.birthday }}</div>
          <div
            class="card-progress-input"
            @click.stop="openDocInput(item.docNumber)"
          >
            <el-progress
              color="#20c6dc"
              :text-inside="true"
              :stroke-width="26"
              :percentage="item.inputProgress"
              :format="formatInput"
              style="width: 100%"
            />
            <svg-icon
              v-show="item.hasError"
              icon-class="error"
              style="position: absolute; right: 10px"
            />
          </div>
          <div class="card-progress-modules">
            <div>
              <el-progress
                :width="50"
                :stroke-width="4"
                type="circle"
                :percentage="item.checkProgress"
                :format="formatCheck"
              />
            </div>
            <div @click.stop="openSdvInput(item.docNumber)">
              <el-progress
                :width="50"
                :stroke-width="4"
                type="circle"
                :percentage="item.sdvProgress"
                :format="formatSDV"
              />
            </div>
            <div>
              <el-progress
                :width="50"
                :stroke-width="4"
                type="circle"
                :percentage="item.signProgress"
                :format="formatSign"
              />
            </div>
            <div>
              <el-progress
                :width="50"
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
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getDocs } from '@/api/doc'

  export default {
    name: 'Home',
    data() {
      return {
        loading: true,
        cards: [],
      }
    },
    computed: {
      ...mapGetters(['keywords']),
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
      formatInput(percentage) {
        return percentage != 100 ? '输入' + percentage + '%' : '输入完毕'
      },
      formatCheck(percentage) {
        return percentage != 100 ? '审查\r\n' + percentage + '%' : '审查完毕'
      },
      formatSDV(percentage) {
        return percentage != 100 ? 'SDV\r\n' + percentage + '%' : 'SDV完毕'
      },
      formatSign(percentage) {
        return percentage != 100 ? '署名\r\n' + percentage + '%' : '署名完毕'
      },
      formatLock(percentage) {
        return percentage != 100 ? '锁定\r\n' + percentage + '%' : '锁定完毕'
      },
      openDocInput(title) {
        this.$router.push({ path: 'input-data', query: { title } })
      },
      openSdvInput(title) {
        this.$router.push({ path: 'sdv-input', query: { title } })
      },
      starDoc(index) {
        let status = !this.cards[index].stared
        this.cards[index].stared = status
        this.$notify({
          title: '成功',
          message: status ? '该数据已标记' : '该数据已取消标记',
          type: 'success',
        })
      },
      collectDoc(index) {
        let status = !this.cards[index].collected
        this.cards[index].collected = status
        this.$notify({
          title: '成功',
          message: status ? '该数据已收藏' : '该数据已取消收藏',
          type: 'success',
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .home {
    &-container {
      margin: 30px;
    }
  }

  .card {
    &-title {
      &-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        & ~ div {
          margin-top: 15px;
        }
      }
      &-content {
        font-size: $base-font-size-title;
        font-weight: $base-font-weight-title;
      }
      &-buttons {
        & > *:hover {
          cursor: pointer;
          transform: scale(1.5);
          transition-duration: 0.8s;
        }
      }
    }
    &-progress {
      &-input {
        display: flex;
        position: relative;
        align-items: center;
        cursor: pointer;
        &:hover {
          transform: scale(1.1);
          transition-duration: 0.8s;
        }
      }
      &-modules {
        margin-top: 16px;
        display: flex;
        justify-content: space-around;
        & > * {
          cursor: pointer;
          &:hover {
            transform: scale(1.1);
            transition-duration: 0.8s;
          }
        }
      }
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
    span {
      color: $base-color-red;
      word-break: break-all;
    }
  }
</style>
