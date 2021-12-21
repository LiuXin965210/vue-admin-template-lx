<template>
  <div class="navbar-container">
    <div class="icon-container">
      <img src="@/assets/icon-images/logo.svg" style="width: 150px" />
    </div>
    <label style="padding: 10px">IMP_RMD > 症例入力 > {{ title }}</label>
    <div style="margin-left: auto; padding: 10px">
      <el-button type="primary" @click="save">保 存</el-button>
      <el-button type="primary" @click="close">关 闭</el-button>
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
    height: 100%;
    .icon-container {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 20px;
      background-color: rgb(202, 236, 245);
    }
  }
</style>
