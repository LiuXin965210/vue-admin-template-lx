<template>
  <div class="exportList-container">
    <div style="display: flex; align-items: center; background-color: #f5f4f3">
      <div class="study-container">
        <img src="@/assets/icon-images/logo.svg" class="study-icon" />
      </div>
      <label style="padding: 10px">下载一览</label>
      <div style="margin-left: auto; padding-right: 10px">用户名</div>
    </div>
    <div style="padding: 20px">
      <el-row :gutter="15">
        <el-col
          v-for="(item, index) in exportFiles"
          :key="index"
          :span="8"
          :xs="24"
          :sm="24"
          :md="12"
          :lg="8"
          :xl="8"
        >
          <div
            class="export-file"
            :class="`cards ${fileIndex == index ? 'active' : ''}`"
            @click="setFileIndex(index)"
          >
            <div v-show="item.closed" class="file-img">
              <svg-icon
                icon-class="file-rar"
                style="width: 40px; height: 40px"
              />
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
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ExportList',
    components: {},
    data() {
      return {
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
          {
            name: '(IMP_RMD)受试者CSV_20211123100000',
            closed: true,
            time: '2021/11/25 10:00:00 [5M]',
          },
        ],
        fileIndex: -1,
      }
    },
    created() {},
    mounted() {},
    updated() {},
    methods: {
      setFileIndex(index) {
        this.fileIndex = index
      },
      destoryFile(index) {
        this.exportFiles.splice(index, 1)
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
  .cards {
    padding: 6px;
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
