<template>
  <div class="navbar">
    <div class="study-container">
      <img src="@/assets/icon-images/logo.svg" class="study-icon" />
      <div class="study-title">IMP_RMD</div>
    </div>
    <el-tabs
      v-model="activeName"
      type="border-card"
      style="height: 100%; width: 100%"
      @tab-click="handleClick"
    >
      <el-tab-pane label="受试者" name="Home">
        <Search ref="home"></Search>
      </el-tab-pane>
      <el-tab-pane label="质疑" name="Query">
        <Search ref="query"></Search>
      </el-tab-pane>
      <el-tab-pane label="警告" name="Warning">
        <Search ref="warning"></Search>
      </el-tab-pane>
    </el-tabs>
    <div class="user-container">
      <el-avatar icon="el-icon-user-solid"></el-avatar>
      <span style="margin-right: 15px">用户名</span>
      <el-select
        v-model="curRole"
        size="mini"
        filterable
        placeholder="请选择研究者"
        style="width: 100px"
      >
        <el-option
          v-for="item in roles"
          :key="item.value"
          :label="item.value"
          :value="item.code"
        ></el-option>
      </el-select>
      <el-select
        v-model="curHospital"
        size="mini"
        filterable
        placeholder="请选择研究中心"
      >
        <el-option
          v-for="item in hospitals"
          :key="item.value"
          :label="item.value"
          :value="item.code"
        ></el-option>
      </el-select>
      <el-dropdown>
        <i class="el-icon-s-tools" style="font-size: 30px; color: darkgray"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="openExport">导出</el-dropdown-item>
          <el-dropdown-item divided>用户</el-dropdown-item>
          <el-dropdown-item>研究中心</el-dropdown-item>
          <el-dropdown-item>角色</el-dropdown-item>
          <el-dropdown-item>基准值</el-dropdown-item>
          <el-dropdown-item divided @click.native="openExportList">
            <span>下载一览</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getRoles } from '@/api/role'
  import { getHospitals } from '@/api/hospital'
  import Search from './Search'

  export default {
    name: 'Navbar',
    components: { Search },
    data() {
      return {
        curRole: '',
        curHospital: '',
        roles: [],
        hospitals: [],
        activeName: this.$route.name,
      }
    },
    computed: {
      ...mapGetters(['avatar']),
    },
    created() {
      this.fetchRoleData()
      this.fetchHospitalData()
    },
    methods: {
      fetchRoleData() {
        getRoles().then((response) => {
          this.curRole = response.data.items[0].code
          this.roles = response.data.items
        })
      },
      fetchHospitalData() {
        getHospitals().then((response) => {
          this.curHospital = response.data.items[0].code
          this.hospitals = response.data.items
        })
      },
      logout() {
        this.$store.dispatch('user/logout').then(() => {
          this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        })
      },
      handleClick(tab, event) {
        switch (tab.name) {
          case 'Home':
            this.$router.push('/home')
            break
          case 'Query':
            this.$refs.query.setShowCreate(false)
            this.$router.push('/query')
            break
          case 'Warning':
            this.$router.push('/warning')
            break
        }
      },
      openExport() {
        this.$router.push('export')
      },
      openExportList() {
        const { href } = this.$router.resolve('export-list')
        window.open(href, '_blank')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .navbar {
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    display: flex;

    .study {
      &-container {
        padding: 5px 20px;
        background-color: rgb(202, 236, 245);
      }
      &-icon {
        width: 150px;
        height: 50px;
      }
      &-title {
        text-align: center;
        margin-top: 5px;
        font-weight: $base-font-weight-title;
        font-size: $base-font-size-title;
      }
    }

    .user-container {
      position: absolute;
      right: 0;
      display: flex;
      align-items: center;
      padding: 5px 0;
      & > * {
        margin-right: 20px;
      }
    }

    ::v-deep {
      .el-tabs__nav {
        padding-top: 6px;
        padding-left: 25px;
      }
      .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
        border-top-color: #dcdfe6;
      }
      .el-tabs__item {
        height: 45px;
        width: 120px;
        line-height: 45px;
        font-size: 16px;
      }
      .el-tabs--border-card > .el-tabs__content {
        padding: 8px 15px;
      }
      .el-input__inner {
        font-size: 15px;
      }
      .el-tabs__item.is-active {
        font-weight: 700;
      }
    }
  }
</style>
