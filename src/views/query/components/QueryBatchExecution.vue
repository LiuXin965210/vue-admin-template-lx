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
          v-for="(item, index) in cards"
          v-show="item.text == '待发行'"
          :key="index"
          style="margin-bottom: 20px"
          :span="8"
        >
          <el-card :class="getClass(index)" @click.native="getIndex(index)">
            <div class="card-title-container">
              <div
                style="font-weight: bold; font-size: 20px"
                class="text-truncate"
              >
                {{ item.docNumber }}
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
              <svg-icon
                v-show="imgshow(index)"
                icon-class="close"
                style="margin-left: 3rem"
                @click="destoryCard(index)"
              />
            </div>
            <div style="font-size: 13px; margin-left: 10px">
              <p style="margin-top: 0px">測定日</p>
              <p style="color: blue; margin: 0px">
                IMRD-001 > 觀察期間/觀察期間(60ヶ月)/全身狀態、一般所見
              </p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
  import { getDocs } from '@/api/querydoc'
  export default {
    name: 'QueryBatchExecution',
    data() {
      return {
        cards: [],
        currentNumber: -1,
        dialogVisible: false,
        executionType: 'issue',
        executionTypes: [
          {
            value: 'issue',
            label: '发行',
          },
          {
            value: 'delete',
            label: '删除',
          },
        ],
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
        this.cards.splice(0)
      },
      destoryCard(index) {
        this.cards.splice(index, 1)
      },
      imgshow(index) {
        return this.currentNumber == index
      },
      executeAndClear() {
        this.cards.splice(0)
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
