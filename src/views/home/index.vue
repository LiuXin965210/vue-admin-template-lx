<template>
  <div class="home-container">
    <el-row v-loading.fullscreen.lock="loading" :gutter="55">
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
          @click.native="setCurrentIndex(index)"
        >
          <div class="card-title-container">
            <div
              class="card-title-content text-truncate"
              @click="openDocInput(item.docNumber)"
            >
              {{ item.docNumber }}
            </div>
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
            </div>

            <el-dropdown
              v-if="imgshow(index)"
              class="card-setting-button"
              style="position: absolute; right: -8px; top: 0"
            >
              <el-button icon="el-icon-setting" size="mini"></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>打开</el-dropdown-item>
                <el-dropdown-item divided>转院</el-dropdown-item>
                <el-dropdown-item>导出PDF</el-dropdown-item>
                <el-dropdown-item divided>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="text-truncate">{{ item.hospitalName }}</div>
          <div class="text-truncate">
            患者识别番号：{{ item.patientNumber }}
          </div>
          <div class="text-truncate">出生日期：{{ item.birthday }}</div>
          <div
            class="card-progress-input"
            @click.stop="openDocInput(item.docNumber)"
          >
            <el-progress
              color="#20c6dc"
              :text-inside="true"
              :stroke-width="22"
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
            <div @click.stop="openSignInput(item.docNumber)">
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
          <div v-if="keywords !== ''" style="height: 30px">
            <el-divider></el-divider>
            <div class="search-info">
              <span>
                登录票 > 基本情报 > 姓名
                <span class="keywords">{{ keywords }}</span>
              </span>
              <span v-if="index % 2 == 0">
                ; 生活调查票 > 基本情报 > 姓名
                <span class="keywords">{{ keywords }}</span>
              </span>
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
        currentIndex: -1,
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
      openDocInput() {
        this.$router.push({ path: 'input-data', query: { title: 'IMP_RMD' } })
      },
      openSdvInput(title) {
        this.$router.push({ path: 'sdv-input', query: { title } })
      },
      openSignInput(title) {
        this.$router.push({ path: 'sign-input', query: { title } })
      },
      starDoc(index) {
        let status = !this.cards[index].stared
        this.cards[index].stared = status
        this.$notify({
          title: '成功',
          message: status ? '该数据已收藏' : '该数据已取消收藏',
          type: 'success',
          duration: 1000,
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
      setCurrentIndex(index) {
        this.currentIndex = index
      },
      imgshow(index) {
        return this.currentIndex == index
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
  .home {
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
    .el-button--mini,
    .el-button--mini.is-round {
      padding: 5px;
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
