<template>
  <div>
    <el-container>
      <el-header class="input-header">
        <Navbar></Navbar>
      </el-header>
      <el-container class="input-container">
        <el-aside
          style="padding-top: 10px; padding-right: 15px; font-size: 14px"
        >
          <el-tree
            node-key="id"
            :default-expand-all="true"
            :highlight-current="true"
            :expand-on-click-node="false"
            :data="screens"
            @current-change="changeForm"
          >
            <div slot-scope="{ node, data }" style="display: flex; width: 100%">
              <svg-icon :icon-class="getTreeNodeIcon(node)" />
              <span class="tree-node-label" :style="getLabelStyle(node, data)">
                {{ data.name }}
              </span>
              <el-progress
                v-if="node.level === 1"
                :text-inside="true"
                :stroke-width="20"
                :percentage="60"
                :format="formatProgress"
                style="width: 50%; margin-left: 10px"
              />
              <span
                v-else-if="data.disabled !== undefined"
                style="margin-left: auto"
              >
                <el-switch v-model="data.disabled"></el-switch>
              </span>
              <span
                v-else-if="data.status === 'over'"
                style="margin-left: auto"
              >
                <svg-icon icon-class="tick" />
              </span>
              <span
                v-else-if="data.status === 'error'"
                style="margin-left: auto"
              >
                <svg-icon icon-class="error" />
              </span>
              <span
                v-if="node.isLeaf && data.disabled === undefined"
                class="progress-info"
              >
                {{ data.sdvProgress }}
              </span>
            </div>
          </el-tree>
        </el-aside>
        <el-main
          style="
            border-left: 1px solid #dfdfdf;
            border-right: 1px solid #dfdfdf;
          "
        >
          <el-row v-show="folder.length != 0" :gutter="20">
            <div class="data-title">
              【IMRD-001】
              <el-button type="primary" size="mini" style="margin-left: 590px">
                署名完了
              </el-button>
              <el-button type="primary" size="mini" style="margin-left: 10px">
                署名取消
              </el-button>
            </div>
            <el-col
              v-for="item of folder"
              :key="item.id"
              :span="8"
              style="margin-bottom: 10px"
            >
              <el-card class="card-item">
                <div>
                  <div style="display: flex; align-items: center">
                    <svg-icon icon-class="folder" />
                    <span style="margin-left: 10px">{{ item.name }}</span>
                    <el-checkbox
                      v-model="item.checked"
                      style="margin-left: auto"
                    ></el-checkbox>
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
                      :width="50"
                      :stroke-width="4"
                      type="circle"
                      :percentage="20"
                      :format="formatSdv"
                    />
                    <el-progress
                      :width="50"
                      :stroke-width="4"
                      type="circle"
                      :percentage="70"
                      :format="formatInput"
                    />
                    <div class="folder-error-count">
                      <tr>
                        <td>
                          <div
                            class="circular"
                            style="
                              border: 2px solid #f6bb4e;
                              background-color: #f9cf7c;
                            "
                          >
                            2
                          </div>
                        </td>
                        <td>
                          <div
                            class="circular"
                            style="
                              border: 2px solid red;
                              background-color: #ff6f6f;
                            "
                          >
                            2
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #f6bb4e">质疑</td>
                        <td style="color: red">警告</td>
                      </tr>
                    </div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row v-show="showBasic" style="margin-bottom: 25px">
            <div type="info" class="data-title">
              【基本情报】
              <el-checkbox v-model="basicChecked" style="float: right">
                全部署名
              </el-checkbox>
            </div>
            <el-table
              :data="basicInfo"
              :show-header="false"
              border
              :cell-style="addColClass"
            >
              <el-table-column prop="label" width="300px"></el-table-column>
              <el-table-column prop="value">
                <template slot-scope="scope">
                  <span v-html="scope.row.value"></span>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-row v-show="showRetention" style="margin-bottom: 25px">
            <div type="info" class="data-title">
              【留置信息】
              <el-checkbox v-model="retentionChecked" style="float: right">
                全部署名
              </el-checkbox>
            </div>
            <el-table
              :data="retentionInfo"
              :show-header="false"
              border
              :cell-style="addColClass"
            >
              <el-table-column prop="label" width="200px"></el-table-column>
              <el-table-column prop="value">
                <template slot-scope="scope">
                  <span v-html="scope.row.value"></span>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-row v-show="showComplication" style="margin-bottom: 25px">
            <div type="info" class="data-title">
              【并发症】
              <!-- <el-button
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
              </el-button> -->
              <el-checkbox v-model="complicationChecked" style="float: right">
                全部署名
              </el-checkbox>
            </div>
            <el-table
              :data="complication"
              :show-header="false"
              border
              :cell-style="addColClass"
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
        <el-aside>
          <el-tabs v-model="activeName" @tab-click="handleClick">
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
                  <svg-icon icon-class="error-check" />
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
              <div class="tab-query-card">
                <div style="display: flex">
                  <label style="font-weight: bold">Query00121</label>
                  <div class="query-status" style="background-color: #409eff">
                    待发行
                  </div>
                </div>
                <div class="title">质疑</div>
                <div class="tab-query-card">
                  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                  <br />
                  <br />
                  张三 2021/11/25 数据核查提出
                </div>
                <div class="title">回答</div>
                <div class="tab-query-card">
                  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                  <br />
                  <br />
                  李四 2021/11/26
                </div>
                <div class="title">再提问</div>
                <div class="tab-query-card">
                  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                  <br />
                  <br />
                  张三 2021/11/27
                </div>
                <div class="title">
                  回答
                  <i class="el-icon-add-location"></i>
                </div>
                <el-input
                  v-model="query2"
                  type="textarea"
                  :autosize="{ minRows: 3 }"
                  style="width: -webkit-fill-available; font-size: 12px"
                ></el-input>
                <div style="margin-top: 10px; text-align: right">
                  <el-button type="primary">OK</el-button>
                  <el-button type="primary">取消</el-button>
                </div>
              </div>
              <div class="tab-query-card">
                <div style="display: flex">
                  <label style="font-weight: bold">Query00122</label>
                  <div class="query-status" style="background-color: #e6a23c">
                    待回答
                  </div>
                </div>
                <div class="title">质疑</div>
                <div class="tab-query-card">
                  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                  <br />
                  <br />
                  张三 2021/11/25 数据核查提出
                </div>
                <div class="title">
                  回答
                  <i class="el-icon-add-location"></i>
                </div>
                <el-input
                  v-model="query2"
                  type="textarea"
                  :autosize="{ minRows: 3 }"
                  style="width: -webkit-fill-available; font-size: 12px"
                ></el-input>
                <div style="margin-top: 10px; text-align: right">
                  <el-button type="primary">OK</el-button>
                  <el-button type="primary">取消</el-button>
                </div>
              </div>
              <el-button type="primary" style="margin: 10px">追加</el-button>
            </el-tab-pane>
            <el-tab-pane label="修订" name="revise">
              <div class="tab-card">
                <div
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  "
                >
                  <div>症例保存</div>
                  <div>张三 2021/11/24</div>
                </div>
                <el-divider></el-divider>
                <div>2021/10/1 -> 2021/10/9</div>
              </div>
              <div class="tab-card">
                <div
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  "
                >
                  <div>症例保存</div>
                  <div>张三 2021/11/30</div>
                </div>
                <el-divider></el-divider>
                <div>男 -> 女</div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="批注" name="annotation">
              <el-input
                v-model="annotation"
                type="textarea"
                :autosize="{ minRows: 3 }"
                style="margin: 10px; width: -webkit-fill-available"
              ></el-input>
            </el-tab-pane>
          </el-tabs>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Navbar from './components/Navbar.vue'
  import { tree, basicInfo, retentionInfo, complication } from './data'

  export default {
    name: 'SignInput',
    components: { Navbar },
    data() {
      return {
        retentionChecked: false,
        basicChecked: false,
        complicationChecked: false,
        progress: this.$route.query.progress,
        mode: this.$route.query.mode,

        activeName: 'warning',
        screens: tree,
        basicInfo: basicInfo,
        showBasic: true,
        retentionInfo: retentionInfo,
        showRetention: false,
        complication: complication,
        showComplication: false,
        defaultExpandedKeys: ['1', '11', '12', '13', '14'],
        folder: [],
        showCard2: true,
        annotation: '',
        saved: true,
      }
    },
    created() {},
    mounted() {},
    updated() {
      // let inputs = document.getElementsByClassName('inputdata')
      // for (let i in inputs) {
      //   let input = inputs[i]
      //   input.addEventListener('input', () => {
      //     this.saved = false
      //     if (i < 5) this.screens[0].children[0].children[0].icon = 'fileEdit'
      //     else if (i < 9)
      //       this.screens[0].children[0].children[1].icon = 'fileEdit'
      //     else this.screens[0].children[0].children[2].icon = 'fileEdit'
      //   })
      // }
    },
    methods: {
      getTreeNodeIcon(node) {
        if (node.level === 1) return 'home'
        return node.isLeaf ? 'file' : 'folder'
      },
      getLabelStyle(node, data) {
        if (node.level === 1) {
          return { 'font-weight': 700, color: 'black' }
        }
        return data.sdvProgress == '未录入'
          ? { color: 'rgb(157, 157, 157)' }
          : { color: 'black' }
      },
      formatProgress() {
        return '署名60%'
      },
      formatInput(percentage) {
        return '署名\r\n' + percentage + '%'
      },
      formatSdv(percentage) {
        return '输入\r\n' + percentage + '%'
      },
      addColClass({ columnIndex }) {
        if (columnIndex == 0) return { background: '#ebf1dd' }
      },

      save() {
        this.$router.push('home')
      },
      close() {
        this.$router.push('home')
      },
      handleClick(tab, event) {},
      copyComplication() {
        this.complication = this.complication.concat(complication)
        this.screens[0].children[0].children[2].icon = 'fileEdit'
        this.saved = false
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
  ::v-deep {
    .el-header {
      padding: 0;
    }
    .el-table td,
    .el-table th.is-leaf,
    .el-table--border,
    .el-table--group {
      border-color: black;
    }
    .el-table--border::after,
    .el-table--group::after,
    .el-table::before {
      background-color: black;
    }
  }

  .progress-info {
    width: 60px;
    margin-left: auto;
    font-size: 12px;
    background-color: rgb(246, 237, 222);
    text-align: center;
    border-radius: 4px;
    line-height: 18px;
  }

  .tree-node-label {
    margin-left: 10px;
    width: 80px;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .col-label {
    background-color: #ebf1dd;
  }
  .data-title {
    width: 100%;
    font-size: 18px;
    font-weight: bold;
    color: black;
    margin-bottom: 10px;
    background-color: #f4f4f5;
    border: 1px solid #e9e9eb;
    border-radius: 4px;
    padding: 10px 10px;
  }
  // .el-table {
  //   margin-bottom: 20px;
  // }
  ::v-deep {
    .el-table td {
      padding: 5px 0 !important;
    }
    // .el-table {
    //   color: black;
    // }
    // .el-table--border,
    // .el-table--group {
    //   border-color: black;
    // }
    // .el-table--border::after,
    // .el-table--group::after,
    // .el-table::before {
    //   background-color: black;
    // }
    .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
      padding-left: 20px;
    }
    .el-tabs__header {
      margin: 0;
    }
    .el-tabs__content {
      height: 100%;
      overflow-y: hidden;
    }
    .el-tabs__content:hover {
      overflow-y: auto;
    }
    .el-divider--horizontal {
      margin: 8px 0;
      background: 0 0;
      border-top: 1px dashed $base-color-grey;
    }
  }
  .input {
    border: none;
  }
  .tab-card {
    border: 1px solid #e9e9eb;
    background-color: white;
    margin: 10px;
    padding: 10px;
    font-size: 14px;
    border-radius: 4px;
  }
  .register-link {
    float: right;
    color: $base-font-color-a;
    cursor: pointer;
  }
  .folder-error-count td {
    padding: 0 10px;
    vertical-align: middle;
    text-align: center;
  }
  .circular {
    width: 30px;
    height: 30px;
    border-radius: 15px;
    color: white;
    align-items: center;
    display: flex;
    justify-content: center;
  }
  .tab-query-card {
    border: 1px solid #e9e9eb;
    background-color: #fafafa;
    margin: 10px;
    padding: 10px;
    font-size: 14px;
    border-radius: 4px;
    word-break: break-word;
    .tab-query-card {
      margin: 0;
      font-size: 12px;
    }
    .title {
      margin-top: 10px;
      margin-bottom: 5px;
      font-size: 12px;
    }
    .el-button {
      padding: 0;
      width: 40px;
      height: 20px;
    }
  }
  .query-status {
    color: white;
    padding: 1px 4px;
    font-size: 12px;
    margin-left: 5px;
    border-radius: 10px;
  }

  $navbar-height: 60px;
  .input-header {
    height: $navbar-height !important;
  }
  .input-container {
    height: calc(100vh - #{$navbar-height}) !important;
  }
</style>
