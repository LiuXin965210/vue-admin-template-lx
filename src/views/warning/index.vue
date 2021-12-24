<template>
  <div class="index-container">
    <el-row :gutter="50">
      <el-col
        v-for="(item, index) in warningInfo"
        :key="index"
        style="margin-bottom: 30px; position: relative"
        :span="6"
        :xs="24"
        :sm="24"
        :md="12"
        :lg="6"
        :xl="6"
      >
        <div>
          <el-card
            class="card-item"
            :style="getFocusClass(index)"
            @click.native="getIndex(index)"
          >
            <div class="card-title-container">
              <div
                style="font-weight: bold; margin: 0rem; font-size: 16px"
                class="text-truncate"
              >
                {{ item.name }}
              </div>
              <svg-icon
                class="card-title-buttons"
                :icon-class="item.collected ? 'shopping' : 'grey-shopping'"
                @click="collectDoc(index)"
              />
            </div>
            <el-dropdown style="position: absolute; right: -8px; top: -12px">
              <el-button
                v-show="imgshow(index)"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>生成质疑</el-dropdown-item>
                <el-dropdown-item divided @click.native="openIgnoreWarning">
                  忽视
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <p style="color: blue; font-size: 14px" class="text-truncate">
              {{ item.infoPath }}
            </p>
            <p style="font-size: 14px">
              {{ item.info }}
            </p>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <IgnoreWarning ref="ignoreWarning"></IgnoreWarning>
  </div>
</template>

<script>
  import IgnoreWarning from './components/IgnoreWarning'

  export default {
    name: 'Warning',
    components: { IgnoreWarning },
    data() {
      return {
        currentNumber: -1,
        warningInfo: [
          {
            name: '文书同意取得日',
            infoPath: 'IMRD-001 > 登录票',
            info: '<W00001>【文书同意取得日】早于【出生年月】，请确认并修正',
            collected: true,
          },
          {
            name: '同时并用化学疗法开始日',
            infoPath: 'IMRD-001 > 登录票',
            info: '<W00002>【同时并用化学疗法开始日】早于【文书同意取得日】，请确认并修正',
            collected: false,
          },
          {
            name: '文书同意取得日',
            infoPath: 'IMRD-002 > 登录票',
            info: '<W00001>【文书同意取得日】早于【出生年月】，请确认并修正',
            collected: false,
          },
          {
            name: '同时并用化学疗法开始日',
            infoPath: 'IMRD-002 > 登录票',
            info: '<W00002>【同时并用化学疗法开始日】早于【文书同意取得日】，请确认并修正',
            collected: false,
          },
        ],
      }
    },
    methods: {
      openIgnoreWarning() {
        this.$refs['ignoreWarning'].show()
      },
      collectDoc(index) {
        let status = !this.warningInfo[index].collected
        this.warningInfo[index].collected = status
        this.$notify({
          title: '成功',
          message: status ? '该数据已添加至执行列表' : '该数据已从执行列表删除',
          type: 'success',
          duration: 1000,
        })
      },
      getIndex(index) {
        this.currentNumber = index
      },
      imgshow(index) {
        return this.currentNumber == index
      },
      getFocusClass(index) {
        if (this.currentNumber == index) {
          return 'box-shadow: 0 0 0 5px rgba(53, 129, 243, 0.55);'
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
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
  .index-container {
    padding: 30px 40px !important;
    margin: 0 !important;
    // background: #f5f7f8 !important;

    .card-icon {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      cursor: pointer;
    }
    .text-truncate {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  ::v-deep {
    .el-button--mini,
    .el-button--mini.is-round {
      padding: 5px;
    }
  }
</style>
