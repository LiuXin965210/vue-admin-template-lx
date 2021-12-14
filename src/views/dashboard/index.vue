<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
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
              <vab-icon style="margin-right: 8px" :icon="['fas', 'star']" />
              <vab-icon :icon="['fas', 'envelope-open-text']" />
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
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
