<template>
  <div>
    <div
      style="
        padding: 10px;
        display: flex;
        align-items: center;
        background-color: #ededed;
      "
    >
      <label>IMP_RMD > 症例入力 > IMRD_001</label>
      <el-button type="primary" style="margin-left: auto" @click="save">
        保 存
      </el-button>
      <el-button type="primary" @click="close">关 闭</el-button>
    </div>

    <el-container style="height: 650px">
      <el-aside style="border: 1px solid #ededed">
        <el-tree
          node-key="id"
          :default-checked-keys="defaultSelectedKeys"
          :default-expanded-keys="defaultSelectedKeys"
          :data="treeOptions"
          :props="defaultProps"
          :highlight-current="true"
          :render-content="renderTree"
        ></el-tree>
      </el-aside>
      <el-main style="border: 1px solid #ededed">
        <el-row>
          <el-tag type="info" class="data-title">【基本情报】</el-tag>
          <el-table
            :data="basicInfo"
            :show-header="false"
            border
            :cell-style="addClass"
            style="border-color: black"
          >
            <el-table-column prop="label" width="300px"></el-table-column>
            <el-table-column prop="value">
              <template slot-scope="scope">
                <span v-html="scope.row.value"></span>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row>
          <el-tag type="info" class="data-title">【留置信息】</el-tag>
          <el-table
            :data="retentionInfo"
            :show-header="false"
            border="1px solid black"
            :cell-style="addClass"
          >
            <el-table-column prop="label" width="200px"></el-table-column>
            <el-table-column prop="value">
              <template slot-scope="scope">
                <span v-html="scope.row.value"></span>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row>
          <el-tag
            type="info"
            class="data-title"
            style="display: flex; align-items: center"
          >
            【并发症】
            <el-button
              icon="el-icon-plus"
              style="
                margin-left: auto;
                border: none;
                height: 30px;
                background-color: #f4f4f5;
                padding: 0;
                color: black;
              "
              @click="copyComplication"
            >
              追加
            </el-button>
          </el-tag>
          <el-table
            :data="complication"
            :show-header="false"
            border="1px solid black"
            :cell-style="addClass"
          >
            <el-table-column prop="label" width="250px"></el-table-column>
            <el-table-column prop="value">
              <template slot-scope="scope">
                <span v-html="scope.row.value"></span>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-main>
      <el-aside style="border: 1px solid #ededed">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="警告" name="warning">
            <div>警告</div>
          </el-tab-pane>
          <el-tab-pane label="质疑" name="question">质疑</el-tab-pane>
          <el-tab-pane label="修订" name="revise">修订</el-tab-pane>
          <el-tab-pane label="批注" name="annotation">批注</el-tab-pane>
        </el-tabs>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
  import { tree, basicInfo, retentionInfo, complication } from './data'

  export default {
    name: 'InputData',
    components: {},
    data() {
      return {
        activeName: 'warning',
        treeOptions: tree,
        basicInfo: basicInfo,
        retentionInfo: retentionInfo,
        complication: complication,
      }
    },
    created() {},
    mounted() {},
    methods: {
      save() {
        this.$router.go(-1)
      },
      close() {
        this.$router.go(-1)
      },
      addClass({ columnIndex }) {
        let css = 'border-color: black;'
        if (columnIndex === 0) {
          css = css.concat('background: #ebf1dd')
        }
        return css
      },
      handleClick(tab, event) {},
      renderTree(h, { node, data, store }) {
        let span = (
          <span style="display: flex; width: 100%; padding-right: 10px; align-items: center;">
            <svg-icon icon-class={data.icon} />
            <span style="margin-left: 10px">{data.label}</span>
          </span>
        )
        if (data.icon == 'home') {
          span.children.push(
            <el-progress
              text-inside="true"
              stroke-width="14"
              percentage="60"
              format={(percentage) => {
                return `输入${percentage}%`
              }}
              style="margin-left: 10px; width: 120px; font-size: small"
            />
          )
        } else {
          span.children.push(
            <svg-icon icon-class={data.info} style="margin-left: auto" />
          )
        }
        return span
      },
      progressText(percentage) {
        return `输入${percentage}%`
      },
      copyComplication() {
        this.complication = this.complication.concat(complication)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .col-label {
    background-color: #ebf1dd;
  }
  .data-title {
    width: 100%;
    font-size: 16px;
    font-weight: bold;
    color: black;
  }
  .el-table {
    margin: 10px 0 20px 0;
    border-color: black;
  }
  >>> .el-table td {
    padding: 5px 0 !important;
  }
  .input {
    border: none;
  }
</style>
