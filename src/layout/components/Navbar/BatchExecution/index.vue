<template>
  <el-dialog title="批量执行" :visible.sync="dialogVisible">
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
      <el-link style="margin-left: 250px" @click="clearAll">
        <svg-icon icon-class="broom" />
        清空
      </el-link>
    </el-header>

    <el-container style="height: 400px">
      <el-aside width="200px" class="tree-container">
        <el-tree
          :data="tree"
          show-checkbox
          node-key="id"
          default-expand-all="true"
          :render-content="renderTree"
        ></el-tree>
      </el-aside>
      <el-main class="card-container">
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
  </el-dialog>
</template>

<script>
  export default {
    name: 'Index',
    data() {
      return {
        executionType: 'SDV',
        executionTypes: [
          {
            value: 'SDV',
            label: 'SDV完了',
          },
          {
            value: 'DATA',
            label: '数据审核',
          },
        ],
        tree: [
          {
            id: 1,
            label: 'IMP_RAD',
            icon: 'home',
            children: [
              {
                id: 2,
                label: '登录票',
                icon: 'folder',
                children: [
                  {
                    id: 20,
                    label: '基本信息',
                    icon: 'file',
                  },
                  {
                    id: 21,
                    label: '留置信息',
                    icon: 'file',
                  },
                  {
                    id: 22,
                    label: '并发症',
                    icon: 'file',
                  },
                ],
              },
              {
                id: 3,
                label: '生活调查票',
                icon: 'folder',
                children: [
                  {
                    id: 30,
                    label: '生活调查票',
                    icon: 'file',
                  },
                ],
              },
              {
                id: 4,
                label: '生活调查票2',
                icon: 'folder',
                children: [
                  {
                    id: 40,
                    label: '生活调查票',
                    icon: 'file',
                  },
                ],
              },
              {
                id: 5,
                label: 'BaseLine',
                icon: 'folder',
                children: [
                  {
                    id: 50,
                    label: '合并症',
                    icon: 'file',
                  },
                  {
                    id: 51,
                    label: '既往病例',
                    icon: 'file',
                  },
                ],
              },
            ],
          },
        ],
        value: '',
        currentNumber: 0,
        dialogVisible: false,
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
        this.dialogVisible = true
      },
      renderTree(h, { node, data, store }) {
        let span = (
          <span style="display: flex; width: 100%; padding-right: 10px; align-items: center;">
            <svg-icon icon-class={data.icon} />
            <span style="margin-left: 10px">{data.label}</span>
          </span>
        )
        span.children.push(
          <svg-icon icon-class={data.info} style="margin-left: auto" />
        )
        if (data.activate !== undefined && !data.activate) {
          span.data.style += 'font-style: italic; color: #dfdfdf;'
          span.children.push(<el-switch v-model={data.activate}></el-switch>)
        }
        return span
      },
      clearAll() {},
      executeAndClear() {},
      destoryCard() {},
    },
  }
</script>

<style lang="scss" scoped>
  .tree-container {
    border: 1px solid #c3c3c5;
    padding: 8px 0;
  }

  .card-container {
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
  .excution-header {
    height: 40px !important;
    padding: 0rem !important;
    margin-bottom: 1rem;
  }

    >>>.el-input {
      input {
        border: 2px solid #dbdbdb;
        width: 400px;
        height: 20px;
      }
    }
  
</style>
