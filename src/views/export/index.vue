<template>
  <div class="export-container">
    <div style="display: flex; align-items: center; background-color: #f5f4f3">
      <div class="study-container">
        <img src="@/assets/icon-images/logo.svg" class="study-icon" />
      </div>
      <label style="padding: 10px">IMP_RMD > 导出</label>
      <div style="margin-left: auto; padding-right: 10px">
        <el-dropdown>
          <i
            class="el-icon-s-tools"
            style="font-size: 30px; color: #0d6efd"
          ></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="openHome">
              <span>受试者</span>
            </el-dropdown-item>
            <el-dropdown-item @click.native="openQuery">
              <span>质疑</span>
            </el-dropdown-item>
            <el-dropdown-item @click.native="openWarning">
              <span>警告</span>
            </el-dropdown-item>
            <el-dropdown-item divided>用户</el-dropdown-item>
            <el-dropdown-item>研究中心</el-dropdown-item>
            <el-dropdown-item>角色</el-dropdown-item>
            <el-dropdown-item>基准值</el-dropdown-item>
            <el-dropdown-item divided @click.native="openExportList">
              <span>下载一览</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="close">
              <span>退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-col :span="16">
      <div>
        <div class="export-title">
          <svg-icon icon-class="list" />
          <span>导出数据</span>
        </div>
        <div class="export-data">
          <el-radio-group v-model="radioGroupData">
            <el-radio :label="1">受试者</el-radio>
            <el-radio :label="2">稽查</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div>
        <div class="export-title">
          <svg-icon icon-class="list" />
          <span>受试者</span>
        </div>
        <div class="export-data">
          <div style="padding-bottom: 5px">
            <el-radio v-model="radioGroupPatient" :label="1">
              <span>所有受试者</span>
            </el-radio>
          </div>
          <div>
            <div>
              <el-radio v-model="radioGroupPatient" :label="2">
                <span>受试者选择</span>
                <i
                  class="el-icon-search"
                  style="margin-left: 10px"
                  @click="selectPatient"
                ></i>
              </el-radio>
            </div>
            <div v-show="radioGroupPatient == 2" class="select-card">
              <el-row :gutter="15">
                <el-col
                  v-for="(item, index) in patients"
                  :key="item.docNumber"
                  :span="6"
                  :xs="24"
                  :sm="24"
                  :md="12"
                  :lg="6"
                  :xl="6"
                >
                  <div
                    :class="`cards ${patientIndex == index ? 'active' : ''}`"
                    @click="setPatientIndex(index)"
                  >
                    <div style="display: flex; justify-content: space-between">
                      <div
                        class="text-truncate"
                        style="font-weight: bold; font-size: 20px"
                      >
                        {{ item.docNumber }}
                      </div>
                      <svg-icon
                        v-show="patientIndex == index"
                        icon-class="close"
                        @click="destoryPatient(index)"
                      />
                    </div>
                    <div class="text-truncate">{{ item.hospitalName }}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
      <div v-show="radioGroupData == 1">
        <div class="export-title">
          <svg-icon icon-class="list" />
          <span>表单</span>
        </div>
        <div class="export-data">
          <div style="padding-bottom: 5px">
            <el-radio v-model="radioGroupForm" :label="1">
              <span>所有表单</span>
            </el-radio>
          </div>
          <div>
            <div>
              <el-radio v-model="radioGroupForm" :label="2">
                <span>表单选择</span>
                <i
                  class="el-icon-search"
                  style="margin-left: 10px"
                  @click="selectForm"
                ></i>
              </el-radio>
            </div>
            <div v-show="radioGroupForm == 2" class="select-card">
              <el-row :gutter="15">
                <el-col
                  v-for="(item, index) in forms"
                  :key="item"
                  :span="8"
                  :xs="24"
                  :sm="24"
                  :md="12"
                  :lg="8"
                  :xl="8"
                >
                  <div
                    :class="`cards ${formIndex == index ? 'active' : ''}`"
                    @click="setFormIndex(index)"
                  >
                    <div style="display: flex; justify-content: space-between">
                      <div class="text-truncate" style="font-weight: bold">
                        {{ `IMP_RMD/${item}` }}
                      </div>
                      <svg-icon
                        v-show="formIndex == index"
                        icon-class="close"
                        @click="destoryForm(index)"
                      />
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="export-title">
          <svg-icon icon-class="list" />
          <span>导出文件类型</span>
        </div>
        <div class="export-data">
          <el-radio-group v-model="radioGroupFile">
            <el-radio :label="1">PDF</el-radio>
            <el-radio v-show="radioGroupData == 1" :label="2">
              <span>PDF(含稽查)</span>
            </el-radio>
            <el-radio v-show="radioGroupData == 1" :label="3">CSV</el-radio>
            <el-radio v-show="radioGroupData == 1" :label="4">ODM</el-radio>
            <el-radio v-show="radioGroupData == 2" :label="5">Excel</el-radio>
          </el-radio-group>
        </div>
        <div style="padding-left: 35px; padding-top: 20px">
          <el-button
            type="primary"
            style="padding: 10px 40px"
            @click="showFile = true"
          >
            <span>导 出</span>
          </el-button>
        </div>
      </div>
    </el-col>
    <el-col v-show="showFile" :span="8">
      <div class="export-title">
        <svg-icon icon-class="list" />
        <span>最新导出文件</span>
      </div>
      <div class="export-data">
        <div
          v-for="(item, index) in exportFiles"
          :key="index"
          class="export-file"
          :class="`cards ${fileIndex == index ? 'active' : ''}`"
          @click="setFileIndex(index)"
        >
          <div v-show="item.closed" class="file-img">
            <svg-icon icon-class="file-rar" style="width: 40px; height: 40px" />
          </div>
          <div
            v-show="!item.closed"
            style="position: relative"
            class="file-img"
          >
            <el-progress
              :width="48"
              :stroke-width="4"
              type="circle"
              :percentage="70"
              :show-text="false"
            />
            <svg-icon
              icon-class="exporting"
              style="
                width: 25px;
                height: 25px;
                position: absolute;
                top: 12px;
                left: 12px;
              "
            />
          </div>
          <div>
            <div
              class="text-truncate"
              :style="`font-weight: bold; color: ${
                item.closed ? '#3f48d2' : '#7f7f7f'
              }; padding: 5px 10px;`"
            >
              {{ item.name }}
            </div>
            <div class="text-truncate" style="padding: 5px 10px">
              {{ item.time }}
            </div>
          </div>
          <div
            v-show="fileIndex == index"
            style="margin-left: auto; height: 50px"
          >
            <svg-icon icon-class="close" @click="destoryFile(index)" />
          </div>
        </div>
      </div>
    </el-col>
    <SelectPatient ref="selectPatient"></SelectPatient>
    <SelectForm ref="selectForm"></SelectForm>
  </div>
</template>

<script>
  import { getDocs } from '@/api/doc'
  import SelectPatient from './components/selectPatient.vue'
  import SelectForm from './components/selectForm.vue'

  export default {
    name: 'Export',
    components: { SelectPatient, SelectForm },
    data() {
      return {
        patients: [],
        forms: ['登录票', '生活调查票', 'BaseLine/合并症'],
        patientIndex: -1,
        formIndex: -1,
        fileIndex: -1,
        radioGroupData: 1,
        radioGroupPatient: 1,
        radioGroupForm: 1,
        radioGroupFile: 1,
        exportFiles: [
          {
            name: '(IMP_RMD)稽查历史_20211123100000',
            closed: false,
            time: '2021/11/25 10:00:00',
          },
          {
            name: '(IMP_RMD)受试者CSV_20211123100000',
            closed: true,
            time: '2021/11/25 10:00:00 [5M]',
          },
        ],
        showFile: false,
      }
    },
    created() {
      this.fetchData()
    },
    mounted() {},
    updated() {},
    methods: {
      close() {
        this.$router.push('home')
      },
      fetchData() {
        this.loading = true
        getDocs().then((response) => {
          this.patients = response.data.items.slice(0, 9)
          this.loading = false
        })
      },
      setPatientIndex(index) {
        this.patientIndex = index
      },
      destoryPatient(index) {
        this.patients.splice(index, 1)
      },
      setFormIndex(index) {
        this.formIndex = index
      },
      destoryForm(index) {
        this.forms.splice(index, 1)
      },
      setFileIndex(index) {
        this.fileIndex = index
      },
      destoryFile(index) {
        this.exportFiles.splice(index, 1)
      },
      openExportList() {
        const { href } = this.$router.resolve('export-list')
        window.open(href, '_blank')
      },
      openHome() {
        this.$router.push('home')
      },
      openQuery() {
        this.$router.push('query')
      },
      openWarning() {
        this.$router.push('warning')
      },
      selectPatient() {
        this.$refs['selectPatient'].show()
      },
      selectForm() {
        this.$refs['selectForm'].show()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .study-container {
    padding: 10px 10px 6px;
    background-color: rgb(202, 236, 245);
    .study-icon {
      width: 90px;
      height: 30px;
    }
  }
  .export-file {
    font-size: 14px;
    display: flex;
    align-items: center;
    .file-img {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .select-card {
    padding: 10px 20px 0 25px;
  }
  .export-title {
    padding: 15px;
    font-weight: bold;
    span {
      padding: 10px;
    }
  }
  .export-data {
    padding-left: 35px;
    padding-right: 15px;
  }
  .cards {
    font-size: 14px;
    padding: 15px 10px;
    margin-bottom: 10px;
    border-radius: 6px;
    border: 2px solid #dbdbdb;
  }
  .active {
    border: 2px solid rgba(53, 129, 243, 0.25);
    border-color: #91bcfc;
    outline: 0;
    box-shadow: 0 0 0 4px rgba(53, 129, 243, 0.25);
  }
  .text-truncate {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
</style>
