<template>
  <div class="inputData-container">
    <div style="display: flex; align-items: center; background-color: #f5f4f3;">
      <div class="study-container">
        <img src="@/assets/icon-images/logo.svg" class="study-icon" />
      </div>
      <label style="padding: 10px;">IMP_RMD > 症例入力 > {{ title }}</label>
      <div style="margin-left: auto; padding-right: 10px;">
        <el-button type="primary" :disabled="saved" @click="save">
          保 存
        </el-button>
        <el-button type="primary" @click="close">关 闭</el-button>
      </div>
    </div>

    <el-container style="height: 700px;">
      <el-aside style="border: 1px solid #dfdfdf;">
        <el-tree
          node-key="id"
          :default-checked-keys="defaultSelectedKeys"
          :default-expanded-keys="defaultExpandedKeys"
          :data="treeOptions"
          :highlight-current="true"
          :render-content="renderTree"
          :expand-on-click-node="false"
          :current-node-key="defaultSelectedKeys[0]"
          @current-change="changeForm"
        ></el-tree>
      </el-aside>
      <el-main style="border: 1px solid #dfdfdf;">
        <el-scrollbar style="height: 100%;">
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
                  <div style="display: flex; align-items: center;">
                    <svg-icon :icon-class="item.icon" />
                    <span style="margin-left: 10px;">{{ item.label }}</span>
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
                        <td style="color: #f6bb4e;">质疑</td>
                        <td style="color: red;">警告</td>
                      </tr>
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
              style="border-color: black;"
            >
              <el-table-column prop="label" width="300px"></el-table-column>
              <el-table-column prop="value">
                <template slot-scope="scope">
                  <div
                    v-html="scope.row.value"
                    :style="`height: ${scope.row.height || '40px'}`"
                  ></div>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-row v-show="showRetention">
            <el-tag type="info" class="data-title">【留置信息】</el-tag>
            <el-table
              :data="retentionInfo"
              :show-header="false"
              border
              :cell-style="addClass"
            >
              <el-table-column prop="label" width="200px"></el-table-column>
              <el-table-column prop="value">
                <template slot-scope="scope">
                  <div
                    v-html="scope.row.value"
                    :style="`height: ${scope.row.height || '40px'}`"
                  ></div>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-row v-show="showComplication">
            <el-tag
              type="info"
              class="data-title"
              style="display: flex; align-items: center;"
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
              border
              :cell-style="addSpanClass"
              :span-method="arraySpan"
            >
              <el-table-column prop="no" width="50px"></el-table-column>
              <el-table-column prop="label" width="250px"></el-table-column>
              <el-table-column prop="value">
                <template slot-scope="scope">
                  <div
                    v-html="scope.row.value"
                    :style="`height: ${scope.row.height || '40px'}`"
                  ></div>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-row v-show="showBefore">
            <div v-show="!tableDisabled.activate" class="float-disabled"></div>
            <el-tag type="info" class="data-title">【既往病例】</el-tag>
            <el-table
              :data="basicInfo"
              :show-header="false"
              border
              :cell-style="addClass"
              style="border-color: black;"
            >
              <el-table-column prop="label" width="300px"></el-table-column>
              <el-table-column prop="value">
                <template slot-scope="scope">
                  <div
                    v-html="scope.row.value"
                    :style="`height: ${scope.row.height || '40px'}`"
                  ></div>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-scrollbar>
      </el-main>
      <el-aside
        :style="`border: 1px solid #dfdfdf; border-right: none; width: ${
          tabsShow ? '300px' : '0px'
        };`"
      >
        <div :class="tabsShow ? 'tabsShow' : 'tabsHidden'">
          <el-tabs
            v-model="activeName"
            style="height: 659px;"
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
                  <svg-icon icon-class="error-check" />
                </div>
                <div>请输入同意取得日。</div>
              </div>
              <div
                :disabled="!showCard2"
                class="tab-card"
                :style="`background-color: ${showCard2 ? 'white' : '#dfdfdf'}`"
              >
                <div
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  "
                >
                  <div>2021/11/24</div>
                  <div
                    v-if="!showCard2"
                    class="register-link"
                    @click="ignoreCard"
                  >
                    取消忽视
                  </div>
                  <div
                    v-if="showCard2"
                    class="register-link"
                    @click="ignoreCard"
                  >
                    忽视
                  </div>
                </div>
                <div>xxxxxxx</div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="质疑" name="query">
              <div class="tab-query-card">
                <div style="display: flex;">
                  <label style="font-weight: bold;">Query00121</label>
                  <div class="query-status" style="background-color: #409eff;">
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
                  type="textarea"
                  :autosize="{ minRows: 3 }"
                  v-model="query2"
                  style="width: -webkit-fill-available; font-size: 12px;"
                ></el-input>
                <div style="margin-top: 10px; text-align: right;">
                  <el-button type="primary">OK</el-button>
                  <el-button type="primary">取消</el-button>
                </div>
              </div>
              <div class="tab-query-card">
                <div style="display: flex;">
                  <label style="font-weight: bold;">Query00122</label>
                  <div class="query-status" style="background-color: #e6a23c;">
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
                  type="textarea"
                  :autosize="{ minRows: 3 }"
                  v-model="query2"
                  style="width: -webkit-fill-available; font-size: 12px;"
                ></el-input>
                <div style="margin-top: 10px; text-align: right;">
                  <el-button type="primary">OK</el-button>
                  <el-button type="primary">取消</el-button>
                </div>
              </div>
              <el-button type="primary" style="margin: 10px;">
                追加
              </el-button>
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
                type="textarea"
                :autosize="{ minRows: 3 }"
                v-model="annotation"
                style="margin: 10px; width: -webkit-fill-available;"
              ></el-input>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-aside>
      <el-aside
        style="
          border-top: 1px solid #dfdfdf;
          border-bottom: 1px solid #dfdfdf;
          border-left: 1px solid #fafafa;
          border-right: 1px solid #fafafa;
          width: 20px;
          background-color: #fafafa;
        "
      >
        <i
          v-show="tabsShow"
          class="el-icon-s-unfold"
          style="margin-top: 10px;"
          @click="showTabs"
        ></i>
        <i
          v-show="!tabsShow"
          class="el-icon-s-fold"
          style="margin-top: 10px;"
          @click="showTabs"
        ></i>
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
        showBasic: true,
        retentionInfo: retentionInfo,
        showRetention: false,
        complication: complication,
        showComplication: false,
        defaultExpandedKeys: ['1', '11', '12', '13', '14'],
        defaultSelectedKeys: ['10'],
        title: '',
        folder: [],
        showCard2: true,
        annotation: '',
        saved: true,
        counter: 1,
        showBefore: false,
        tableDisabled: tree[0].children[3].children[1],
        query1: '',
        query2: '',
        tabsShow: true,
      }
    },
    created() {},
    mounted() {
      this.title = this.$route.query.title
      this.treeOptions[0].label = this.title
    },
    updated() {
      let inputs = document.getElementsByClassName('inputdata')
      for (let i = 0; i < inputs.length; i++) {
        let input = inputs[i]
        input.addEventListener('input', () => {
          this.saved = false
          if (i < 5) this.treeOptions[0].children[0].icon = 'fileEdit'
          else if (i < 9)
            this.treeOptions[0].children[1].children[0].icon = 'fileEdit'
          else this.treeOptions[0].children[1].children[1].icon = 'fileEdit'
        })
        let parent = input.parentElement
        input.addEventListener('focus', () => {
          parent.style.border = '3px solid #5292F7'
          parent.style.padding = 0
        })
        input.addEventListener('blur', () => {
          parent.style.border = 'none'
          parent.style.padding = '3px 0 2px'
        })
      }
    },
    methods: {
      save() {
        let inputs = document.getElementsByClassName('inputdata')
        if (inputs[2].value == '') {
          let parent = inputs[2].parentElement
          parent.style.border = '3px solid red'
          parent.style.padding = 0
        } else {
          this.treeOptions[0].children[0].icon = 'file'
          this.treeOptions[0].children[1].children[0].icon = 'file'
          this.treeOptions[0].children[1].children[1].icon = 'file'
          this.$router.push('home')
        }
      },
      close() {
        this.$router.push('home')
      },
      addClass({ columnIndex }) {
        let css = 'border-color: black;'
        if (columnIndex === 0) {
          css = css.concat('background: #ebf1dd')
        }
        return css
      },
      addSpanClass({ columnIndex }) {
        let css = 'border-color: black;'
        if (columnIndex === 0 || columnIndex === 1) {
          css = css.concat('background: #ebf1dd')
        }
        return css
      },
      handleClick(tab, event) {},
      renderTree(h, { node, data, store }) {
        let span = (
          <span style="display: flex; width: 100%; padding-right: 10px; align-items: center; font-size: 14px;">
            <svg-icon icon-class={data.icon} />
            <span style="margin-left: 6px;">{data.label}</span>
          </span>
        )
        if (data.icon == 'home') {
          span.data.style += 'color: black; height: 40px;'
          span.children[1].data.style += 'font-weight: bold;'
          span.children.push(
            <el-progress
              text-inside={true}
              stroke-width={20}
              percentage={60}
              format={(percentage) => {
                return `输入${percentage}%`
              }}
              style="margin-left: 10px; width: 120px; font-size: small;"
            />
          )
        } else {
          if (data.info) {
            span.children.push(
              <svg-icon icon-class={data.info} style="margin-left: auto" />
            )
          }
          if (data.activate !== undefined) {
            span.children.push(
              <el-switch
                v-model={data.activate}
                style="margin-left: auto"
              ></el-switch>
            )
            if (!data.activate)
              span.data.style += 'font-style: italic; color: #dedede;'
            else span.data.style += 'color: #9d9d9d;'
          } else if (data.saved) {
            span.data.style += 'color: black;'
          } else {
            span.data.style += 'color: #9d9d9d;'
          }
        }
        return span
      },
      copyComplication() {
        let data = JSON.parse(JSON.stringify(complication))
        data[0].no = ++this.counter
        this.complication = this.complication.concat(data)
        this.treeOptions[0].children[1].children[1].icon = 'fileEdit'
        this.saved = false
      },
      changeForm(data, node) {
        this.folder.splice(0, this.folder.length)
        if (data.children) {
          for (let child of data.children) {
            if (child.children) this.folder.push(child)
          }
        }
        this.showBasic = this.isShowForm(data, '10')
        this.showRetention = this.isShowForm(data, '111')
        this.showComplication = this.isShowForm(data, '112')
        this.showBefore = this.isShowForm(data, '132')
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
      async ignoreCard() {
        const info = this.showCard2
          ? '是否忽视此警告？'
          : '是否取消忽视此警告？'
        const configResult = await this.$confirm(info, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).catch((err) => err)
        if (configResult == 'confirm') this.showCard2 = !this.showCard2
      },
      arraySpan({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 3 === 0) return [3, 1]
          else return [0, 0]
        }
        if (columnIndex === 1) {
          if (rowIndex % 3 === 0) return [2, 1]
          else if (rowIndex % 3 === 2) return [1, 1]
          else return [0, 0]
        }
      },
      showTabs() {
        this.tabsShow = !this.tabsShow
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
  .input {
    border: none;
  }
  .study-container {
    padding: 10px 10px 6px;
    background-color: rgb(202, 236, 245);
    .study-icon {
      width: 90px;
      height: 30px;
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
    border-radius: 4px;
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
  .table-td-input {
    padding: 5px 0;
    display: flex;
  }
  .float-disabled {
    margin-right: 40px;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    z-index: 9;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .query-status {
    color: white;
    padding: 1px 4px;
    font-size: 12px;
    margin-left: 5px;
    border-radius: 10px;
  }

  ::v-deep {
    .el-button {
      padding: 8px 20px;
    }
    .el-table td {
      padding: 0;
      vertical-align: middle;
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
      overflow-y: hidden;
      background-color: #fafafa;
    }
    .el-tabs__content:hover {
      overflow-y: auto;
    }
    .el-divider--horizontal {
      margin: 8px 0;
      background: 0 0;
      border-top: 1px dashed $base-color-grey;
    }

    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-thumb {
      position: relative;
      display: block;
      width: 0;
      height: 0;
      cursor: pointer;
      border-radius: 20px;
      background-color: rgba(144, 147, 153, 0.3);
      -webkit-transition: 0.3s background-color;
      transition: 0.3s background-color;
    }
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
    .el-tree-node__content {
      height: auto;
    }
    .sub-comments-leave-active,
    .sub-comments-enter-active {
      transition: max-width 0.3s;
    }
    .sub-comments-enter,
    .sub-comments-leave-to {
      max-width: 0;
    }
    .sub-comments-enter-to,
    .sub-comments-leave {
      max-width: 300px;
    }
    .tabsShow {
      transition: all 5s ease-out;
    }
    .tabsHidden {
      transition: all 5s ease-in;
      width: 0;
    }
  }
</style>
