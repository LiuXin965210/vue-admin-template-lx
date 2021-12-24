<template>
  <el-dialog title="批量执行" :visible.sync="dialogVisible" width="1000px">
    <el-header class="excution-header">
      <el-select v-model="executionType" placeholder="请选择类型">
        <el-option
          v-for="item in executionTypes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button
        type="primary"
        style="margin-left: 8px"
        @click="executeAndClear"
      >
        执行后清空
      </el-button>
      <el-button type="primary" style="margin-left: 8px" @click="execute">
        执行
      </el-button>
      <el-link style="margin-left: 480px" @click="clearAll">
        <svg-icon icon-class="broom" />
        清空
      </el-link>
    </el-header>
    <div class="card-container">
      <el-row :gutter="15">
        <el-col
          v-for="(item, index) in warningInfo"
          :key="index"
          style="margin-bottom: 20px"
          :span="8"
        >
          <el-card :class="getClass(index)" @click.native="getIndex(index)">
            <div class="card-title-container">
              <div
                style="font-weight: bold; margin: 0rem; font-size: 16px"
                class="text-truncate"
              >
                {{ item.name }}
              </div>
              <svg-icon
                icon-class="close"
                style="margin-left: 3rem"
                @click="destoryCard(index)"
              />
            </div>
            <p style="color: blue; font-size: 14px" class="text-truncate">
              {{ item.infoPath }}
            </p>
            <p style="font-size: 14px; margin-bottom: auto">
              {{ item.info }}
            </p>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'Index',
    data() {
      return {
        cards: [],
        executionType: 'query',
        executionTypes: [
          {
            value: 'query',
            label: '生成质疑',
          },
        ],
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
        ],
        value: '',
        dialogVisible: false,
      }
    },
    methods: {
      getIndex(index) {
        this.currentNumber = index
      },
      getClass(index) {
        return [this.currentNumber == index ? 'active' : 'card-item']
      },
      show() {
        this.dialogVisible = true
      },
      execute() {
        this.dialogVisible = false
      },
      clearAll() {
        this.warningInfo.splice(0)
      },
      destoryCard(index) {
        this.warningInfo.splice(index, 1)
      },
      executeAndClear() {
        this.warningInfo.splice(0)
        this.dialogVisible = false
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
      &-buttons {
        display: flex;
        cursor: pointer;
      }
    }
  }
  .card-container {
    border: 1px solid #dbdbdb;
    height: 420px;
    padding: 1rem;
    border-radius: 4px;
  }

  .active {
    border-color: #91bcfc;
    outline: 0;
    box-shadow: 0 0 0 5px rgba(53, 129, 243, 0.25);
  }
  .card-font {
    font-size: 5px;
    margin-top: 2px;
    margin-bottom: 0rem;
    padding-left: 0.3rem;
  }
  .excution-header {
    height: 40px !important;
    padding: 0rem !important;
    margin-bottom: 1rem;
  }

  .el-input {
    input {
      border: 2px solid #dbdbdb;
      width: 400px;
      height: 20px;
    }
  }
  .text-truncate {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  ::v-deep {
    .el-input--suffix {
      border: 1px solid #dcdfe6;
      border-radius: 4px;
    }
  }
</style>
