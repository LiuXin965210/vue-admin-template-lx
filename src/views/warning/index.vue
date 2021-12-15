<template>
  <div class="index-container">
    <el-row :gutter="20">
      <el-col v-for="(index, item) in 4" :key="item.id" :span="6">
        <el-card class="card-item">
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
            "
          >
            <div style="font-weight: bold; margin: 0rem; font-size: 16px">
              文书同意取得日
            </div>
            <div>
              <vab-icon
                style="margin-right: 8px"
                :icon="['fas', 'envelope-open-text']"
              ></vab-icon>
            </div>
          </div>
          <p style="color: blue">{{ 'IMRD-00' + index }}</p>
          <p>
            {{
              '《' + 'W0000' + index + '>'
            }}【文书同意取得日】早于【出生年月】，请确认并修正
          </p>
        </el-card>
      </el-col>
      <el-col v-for="(index, item) in 4" :key="item.id" :span="6">
        <el-card class="card-item">
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
            "
          >
            <div style="font-weight: bold; margin: 0rem; font-size: 16px">
              同时并用化学疗法开始日
            </div>
            <div>
              <vab-icon
                style="margin-right: 8px"
                :icon="['fas', 'envelope-open-text']"
              ></vab-icon>
            </div>
          </div>
          <p style="color: blue">{{ 'IMRD-00' + index }}</p>
          <p>
            {{
              '《' + 'W0000' + index + '>'
            }}【同时并用化学疗法开始日】早于【文书同意取得日】，请确认并修正
          </p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    components: {},
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .index-container {
    padding: 16px !important;
    margin: 0 !important;
    background: #f5f7f8 !important;

    .card-item:hover {
      border-color: #91bcfc;
      outline: 0;
      box-shadow: 0 0 0 8px rgba(53, 129, 243, 0.25);
    }
  }
</style>
