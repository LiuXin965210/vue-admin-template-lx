<template>
  <div class="home-container" @click="home">我的主页内容，点我试试</div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Home',
    computed: {
      ...mapGetters(['name']),
    },
    methods: {
      home() {
        alert('back to home')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .home {
    &-container {
      margin: 30px;
      height: 30px;
      background-color: aquamarine;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
