<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" width="750px">
    <el-container class="container">
      <el-header class="excution-header">
        <el-select v-model="value" placeholder="请选择类型">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button type="primary" class="clean" @click="implementAndClear">
          执行后清空
        </el-button>
        <el-button type="primary" @click="implement">执行</el-button>
        <el-link class="clean-all" @click="clearAll">
          <svg-icon icon-class="broom" />
          清空
        </el-link>
      </el-header>

      <el-container>
        <el-aside width="200px" class="left-tree">
          <el-tree
            :data="tree"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[1, 2, 3, 4, 5]"
            :default-checked-keys="[2, 40]"
            :prop="defaultProps"
          ></el-tree>
        </el-aside>
        <el-main class="right-card">
          <el-row :gutter="15">
            <el-col v-for="(index, item) in 8" :key="item.id" :span="8">
              <div :class="getClass(index)" @click="getIndex(index)">
                <div style="font-weight: bold">
                  {{ 'IMRD-00' + index }}
                  <svg-icon
                    v-show="imgshow(index)"
                    icon-class="close"
                    style="margin-left: 2.5rem"
                    @click="destoryCard(index)"
                  />
                </div>
                <p class="card-font">○○○研究中心</p>
              </div>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </el-dialog>
</template>

<script>
  export default {
    name: 'Index',
    data() {
      return {
        options: [
          {
            value: 'SDV',
            label: 'SDV完了',
          },
          {
            value: 'data',
            label: '数据审核',
          },
        ],
        tree: [
          {
            id: 1,
            label: 'IMP_RAD',
            children: [
              {
                id: 2,
                label: '登录票',
                children: [
                  {
                    id: 20,
                    label: '基本信息',
                  },
                  {
                    id: 21,
                    label: '留置信息',
                  },
                  {
                    id: 22,
                    label: '并发症',
                  },
                ],
              },
              {
                id: 3,
                label: '生活调查票',
                children: [
                  {
                    id: 30,
                    label: '生活调查票',
                  },
                ],
              },
              {
                id: 4,
                label: '生活调查票2',
                children: [
                  {
                    id: 40,
                    label: '生活调查票',
                  },
                ],
              },
              {
                id: 5,
                label: 'BaseLine',
                children: [
                  {
                    id: 50,
                    label: '合并症',
                  },
                  {
                    id: 51,
                    label: '既往病例',
                  },
                ],
              },
            ],
          },
        ],
        defaultProps: {
          children: 'children',
          label: 'label',
        },
        value: '',
        title: '',
        currentNumber: 0,
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      getIndex(index) {
        this.currentNumber = index
      },
      imgshow(index) {
        return this.currentNumber == index
      },
      getClass(index) {
        return [this.currentNumber == index ? 'active' : 'cards']
      },
      show() {
        this.title = '批量执行'
        this.dialogFormVisible = true
      },
      clearAll() {
        alert('清空')
      },
      implement() {
        this.dialogFormVisible = false
        alert('执行')
      },
      implementAndClear() {
        this.dialogFormVisible = false
        alert('执行后清空')
      },
      destoryCard(index) {
        this.dialogFormVisible = false
        alert('清除选中卡片')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .left-tree {
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 0.5rem;
    border: 1px solid #c3c3c5;
    border-radius: 0px;
  }
  .right-card {
    border: 1px solid #c3c3c5;
    border-radius: 0px;
    margin-left: 0.5rem;
  }
  .cards {
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 6px;
    background-color: #f6f6f6;
    border: 2px solid #dbdbdb;
  }
  .active {
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 6px;
    border: 2px solid rgba(53, 129, 243, 0.25);
    background-color: #f6f6f6;
    border-color: #91bcfc;
    outline: 0;
    box-shadow: 0 0 0 4px rgba(53, 129, 243, 0.25);
  }
  .card-font {
    font-size: 5px;
    margin-top: 2px;
    margin-bottom: 0rem;
    padding-left: 0.3rem;
  }
  .clean {
    margin-left: 0.5rem;
  }
  .clean-all {
    margin-left: 15rem;
  }
  .excution-header {
    height: 40px !important;
    padding: 0rem !important;
    margin-bottom: 1rem;
  }
</style>
