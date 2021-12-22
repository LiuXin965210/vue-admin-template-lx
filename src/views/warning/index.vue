<template>
  <div class="index-container">
    <el-row :gutter="20">
      <el-col v-for="(item, index) in warningInfo" :key="index" :span="6">
        <el-card class="card-item">
          <div class="card-title-container">
            <div style="font-weight: bold; margin: 0rem; font-size: 16px">
              {{ item.name }}
            </div>
            <svg-icon
              class="card-title-buttons"
              :icon-class="item.collected ? 'shopping' : 'grey-shopping'"
              @click="collectDoc(index)"
            />
          </div>
          <p style="color: blue; font-size: 14px">{{ item.infoPath }}</p>
          <p style="font-size: 14px">
            {{ item.info }}
          </p>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-dropdown style="margin-left: 10px">
          <el-button icon="el-icon-setting" size="mini" circle></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>生成质疑</el-dropdown-item>
            <el-dropdown-item @click.native="openIgnoreWarning" divided>
              忽视
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <IgnoreWarning ref="ignoreWarning"></IgnoreWarning>
  </div>
</template>

<script>
  import IgnoreWarning from './components/IgnoreWarning'

  export default {
    name: 'Warning',
    components: { IgnoreWarning },
    data() {
      return {
        warningInfo: [
          {
            name: '文书同意取得日',
            infoPath: 'IMRD-001 > 登录票',
            info: '<W00001>【文书同意取得日】早于【出生年月】，请确认并修正',
            collected: true,
          },
          {
            name: '同时并用化学疗法开始日',
            infoPath: 'IMRD-001 > 登录票',
            info: '<W00002>【同时并用化学疗法开始日】早于【文书同意取得日】，请确认并修正',
            collected: false,
          },
          {
            name: '文书同意取得日',
            infoPath: 'IMRD-002 > 登录票',
            info: '<W00001>【文书同意取得日】早于【出生年月】，请确认并修正',
            collected: false,
          },
          {
            name: '同时并用化学疗法开始日',
            infoPath: 'IMRD-002 > 登录票',
            info: '<W00002>【同时并用化学疗法开始日】早于【文书同意取得日】，请确认并修正',
            collected: false,
          },
        ],
      }
    },
    methods: {
      openIgnoreWarning() {
        this.$refs['ignoreWarning'].show()
      },
      collectDoc(index) {
        let status = !this.warningInfo[index].collected
        this.warningInfo[index].collected = status
        this.$notify({
          title: '成功',
          message: status ? '该数据已添加至执行列表' : '该数据已从执行列表删除',
          type: 'success',
        })
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
  .index-container {
    padding: 16px !important;
    margin: 0 !important;
    // background: #f5f7f8 !important;

    .card-item:hover {
      border-color: #91bcfc;
      outline: 0;
      box-shadow: 0 0 0 8px rgba(53, 129, 243, 0.25);
    }

    .card-icon {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      cursor: pointer;
    }
  }
</style>
