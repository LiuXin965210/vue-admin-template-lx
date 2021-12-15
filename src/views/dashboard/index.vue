<template>
  <div class="dashboard-container">
    <el-row :gutter="40">
      <el-col
        v-for="(index, item) in 8"
        :key="item.id"
        :span="6"
        :xs="24"
        :sm="24"
        :md="12"
        :lg="6"
        :xl="6"
      >
        <el-card class="card-item">
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
            "
          >
            <div>
              <h1>IMRD-00{{ index }}</h1>
            </div>
            <div>
              <svg-icon icon-class="star" />
              <svg-icon style="margin-left: 20px" icon-class="document" />
            </div>
          </div>
          <p>○○○研究中心</p>
          <p>患者识别番号H001-{{ index }}</p>
          <p>出生日期</p>
          <el-progress
            :text-inside="true"
            :stroke-width="26"
            :percentage="70"
            :format="format"
          />
          <div class="progress-container">
            <el-progress
              :width="48"
              :stroke-width="4"
              type="circle"
              :percentage="0"
            />
            <el-progress
              :width="48"
              :stroke-width="4"
              type="circle"
              :percentage="25"
            />
            <el-progress
              :width="48"
              :stroke-width="4"
              type="circle"
              :percentage="100"
              status="success"
            />
            <el-progress
              :width="48"
              :stroke-width="4"
              type="circle"
              :percentage="70"
              status="warning"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Dashboard',
    computed: {
      ...mapGetters(['name']),
    },
  }
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }
  }

  .el-col {
    margin-bottom: 40px;
  }

  .progress-container {
    margin-top: 16px;

    & > * {
      margin: 0 8px;
    }
  }
</style>
