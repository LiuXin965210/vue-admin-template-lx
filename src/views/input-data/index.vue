<template>
  <div class="inputData-container">
    <div style="display: flex; align-items: center; background-color: #f5f4f3">
      <div class="study-container">
        <img src="@/assets/icon-images/logo.svg" class="study-icon" />
      </div>
      <label style="padding: 10px">IMP_RMD > 症例入力 > {{ title }}</label>
      <div style="margin-left: auto; padding: 10px">
        <el-button type="primary" disabled @click="save">保 存</el-button>
        <el-button type="primary" @click="close">关 闭</el-button>
      </div>
    </div>

    <el-container style="height: 650px">
      <el-aside style="border: 1px solid #dfdfdf">
        <el-tree
          node-key="id"
          :default-checked-keys="defaultSelectedKeys"
          :default-expanded-keys="defaultExpandedKeys"
          :data="treeOptions"
          :props="defaultProps"
          :highlight-current="true"
          :render-content="renderTree"
          :expand-on-click-node="false"
          @current-change="changeForm"
        ></el-tree>
      </el-aside>
      <el-main style="border: 1px solid #dfdfdf">
        <el-scrollbar style="height: 100%">
          <el-row v-show="folder.length != 0">
            <el-tag type="info" class="data-title">【{{ title }}】</el-tag>
            <el-col
              v-for="item of folder"
              :key="item.id"
              :span="6"
              :xs="24"
              :sm="24"
              :md="12"
              :lg="6"
              :xl="6"
            >
              <el-card class="card-item">
                <div>
                  <div style="display: flex; align-items: center">
                    <svg-icon :icon-class="item.icon" />
                    <span style="margin-left: 10px">{{ item.label }}</span>
                  </div>
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      justify-content: space-between;
                      margin-top: 10px;
                    "
                  >
                    <el-progress
                      :width="48"
                      :stroke-width="4"
                      type="circle"
                      :percentage="70"
                      :format="formatCheck"
                    />
                    <div>
                      <svg-icon icon-class="error" />
                      <svg-icon style="margin-left: 10px" icon-class="error" />
                    </div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row v-show="showBasic">
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
          <el-row v-show="showRetention">
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
          <el-row v-show="showComplication">
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
        </el-scrollbar>
      </el-main>
      <el-aside style="border: 1px solid #dfdfdf; border-right: none">
        <el-tabs
          v-model="activeName"
          style="height: 100%"
          @tab-click="handleClick"
        >
          <el-tab-pane label="警告" name="warning">
            <div class="tab-card">
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                "
              >
                <div>2021/11/24</div>
                <svg-icon icon-class="error" />
              </div>
              <div>请输入同意取得日。</div>
            </div>
            <div v-if="showCard2" class="tab-card">
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                "
              >
                <div>2021/11/24</div>
                <div class="register-link" @click="hiddenCard">忽视</div>
              </div>
              <div>xxxxxxx</div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="质疑" name="question">
            <div class="tab-card"></div>
          </el-tab-pane>
          <el-tab-pane label="修订" name="revise">修订</el-tab-pane>
          <el-tab-pane label="批注" name="annotation">
            <textarea
              id=""
              name=""
              cols="30"
              rows="10"
              class="tab-card"
            ></textarea>
          </el-tab-pane>
        </el-tabs>
      </el-aside>
      <el-aside
        style="
          border: 1px solid #fafafa;
          width: 20px;
          background-color: #fafafa;
        "
      ></el-aside>
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
        showBasic: true,
        retentionInfo: retentionInfo,
        showRetention: false,
        complication: complication,
        showComplication: false,
        defaultExpandedKeys: ['1', '11', '12', '13', '14'],
        defaultSelectedKeys: ['111'],
        title: '',
        folder: [],
        showCard2: true,
      }
    },
    created() {},
    mounted() {
      this.title = this.$route.query.title
      tree[0].label = this.title
    },
    methods: {
      save() {
        this.$router.push('dashboard')
      },
      close() {
        this.$router.push('dashboard')
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
      copyComplication() {
        this.complication = this.complication.concat(complication)
      },
      changeForm(data, node) {
        this.folder.splice(0, this.folder.length)
        if (data.children) {
          for (let child of data.children) {
            if (child.children) this.folder.push(child)
          }
        }
        this.showBasic = this.isShowForm(data, '111')
        this.showRetention = this.isShowForm(data, '112')
        this.showComplication = this.isShowForm(data, '113')
      },
      isShowForm(data, id) {
        if (data.id == id) return true
        if (data.children) {
          for (let child of data.children) {
            if (child.id == id) return true
          }
        }
        return false
      },
      hiddenCard() {
        this.showCard2 = false
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
    margin-bottom: 10px;
  }
  .el-row {
    padding-right: 40px;
  }
  .el-table {
    margin-bottom: 20px;
  }
  .el-col {
    margin: 0 20px 20px 10px;
  }
  ::v-deep {
    .el-table td {
      padding: 5px 0 !important;
    }
    .el-table {
      color: black;
    }
    .el-table--border,
    .el-table--group {
      border-color: black;
    }
    .el-table--border::after,
    .el-table--group::after,
    .el-table::before {
      background-color: black;
    }
    .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
      padding-left: 20px;
    }
    .el-tabs__header {
      margin: 0;
    }
    .el-tabs__content {
      height: 100%;
    }
  }
  .input {
    border: none;
  }
  .study-container {
    padding: 10px 20px;
    background-color: rgb(202, 236, 245);
    .study-icon {
      width: 150px;
      height: 50px;
    }
  }
  ::v-deep {
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
  .el-main {
    padding-right: 0;
  }
  .tab-card {
    border: 1px solid #e9e9eb;
    background-color: white;
    margin: 10px;
    padding: 10px;
    font-size: 14px;
  }
  .register-link {
    float: right;
    color: $base-font-color-a;
    cursor: pointer;
  }
</style>
