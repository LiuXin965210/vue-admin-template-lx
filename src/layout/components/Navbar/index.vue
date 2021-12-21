<template>
  <div class="navbar">
    <div class="study-container">
      <img src="@/assets/icon-images/logo.svg" class="study-icon" />
      <div class="study-title">IMP_RMD</div>
    </div>
    <el-tabs type="border-card" style="height: 100%; width: 100%">
      <el-tab-pane label="受试者">
        <Search></Search>
      </el-tab-pane>
      <el-tab-pane label="质问">
        <Search></Search>
      </el-tab-pane>
      <el-tab-pane label="警告">
        <Search></Search>
      </el-tab-pane>
    </el-tabs>
    <div class="user-container">
      <el-select v-model="curRole" filterable placeholder="请选择研究者">
        <el-option
          v-for="item in roles"
          :key="item.value"
          :label="item.value"
          :value="item.code"
        ></el-option>
      </el-select>
      <el-select v-model="curHospital" filterable placeholder="请选择研究中心">
        <el-option
          v-for="item in hospitals"
          :key="item.value"
          :label="item.value"
          :value="item.code"
        ></el-option>
      </el-select>
      <el-dropdown>
        <el-avatar icon="el-icon-user-solid"></el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出登录</span>
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
        padding: 10px 20px;
        background-color: rgb(202, 236, 245);
      }
      &-icon {
        width: 150px;
        height: 50px;
      }
      &-title {
        text-align: center;
        margin-top: 10px;
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
        height: 50px;
        width: 120px;
        line-height: 50px;
        font-size: 16px;
      }
    }
  }
</style>
