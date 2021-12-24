<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="650px">
    <div>
      <div class="card-title-container">
        <div
          style="font-weight: bold; font-size: 20px; color: black;"
          class="text-truncate"
        >
          {{ item.docNumber }}
          <el-button
            class="card-tag"
            :title="item.title"
            :type="item.type"
            size="mini"
            style="margin-left: 10px;"
            round
          >
            {{ item.text }}
          </el-button>
        </div>
      </div>
      <div style="font-size: 13px; margin-left: 10px;">
        <p style="margin-top: 10px; color: black;">測定日</p>
        <p style="color: blue; margin-top: 10px;">
          IMRD-001 > 觀察期間/觀察期間(60ヶ月)/全身狀態、一般所見
        </p>
      </div>
      <div v-for="tabItem in item.editableTabs" :key="tabItem.key">
        <span v-if="tabItem.title == '回答'">{{ tabItem.title }} :</span>
        <el-input
          v-model="tabItem.content"
          type="textarea"
          autosize
          resize="none"
          class="editableTab"
          :readonly="title == '质疑详细' || title == '质疑回答'"
        ></el-input>
      </div>
      <div v-if="title == '质疑再次提出' || title == '质疑回答'">
        <span v-if="title == '质疑再次提出'">再次提出：</span>
        <span v-if="title == '质疑回答'">
          回答：
          <i class="el-icon-add-location"></i>
        </span>
        <el-input
          v-model="textarea"
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 10 }"
          resize="none"
          style="margin-top: 10px;"
        ></el-input>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button
        v-if="title == '质疑详细'"
        type="primary"
        style="width: 7rem;"
        @click="close"
      >
        关 闭
      </el-button>
      <div
        v-if="
          title == '质疑关闭' ||
          title == '质疑再次提出' ||
          title == '质疑发行' ||
          title == '质疑回答'
        "
      >
        <el-button type="primary" style="width: 7rem;" @click="close">
          确 认
        </el-button>
        <el-button type="info" style="width: 7rem;" @click="close">
          取 消
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        title: '',
        dialogVisible: false,
        item: 0,
        isanswer: true,
        textarea: '',
      }
    },
    methods: {
      show(item, title) {
        this.dialogVisible = true
        this.item = item
        this.title = title
      },
      close() {
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
      }
      &-buttons {
        display: flex;
        cursor: pointer;
      }
    }
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
  .editableTab {
    color: black !important;
    margin: 10px 0 10px 0;
  }
  ::v-deep {
    .el-input--suffix {
      border: 1px solid #dcdfe6;
      border-radius: 4px;
    }
  }
</style>
