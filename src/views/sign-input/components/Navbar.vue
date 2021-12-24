<template>
  <div class="navbar-container">
    <div class="icon-container">
      <img
        src="@/assets/icon-images/logo.svg"
        style="width: 150px; height: 40px"
      />
    </div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        padding: 0 15px;
      "
    >
      <div style="font-weight: 700">IMP_RMD > 症例入力 > IMRD-001</div>
      <div>
        <el-button type="primary" size="medium" @click="save">保 存</el-button>
        <el-button type="primary" size="medium" @click="close">关 闭</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Navbar',
    data() {
      return {}
    },
    methods: {
      save() {
        this.$router.push('home')
      },
      close() {
        this.$router.push('home')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .navbar-container {
    display: flex;
    align-items: center;
    background-color: #f5f4f3;
    .icon-container {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 10px 15px;
      background-color: rgb(202, 236, 245);
    }
  }
</style>
