<template>
  <div class="navbar">
    <div class="study-container">
      <img src="@/assets/icon-images/logo.png" class="study-icon" />
      <h2 style="text-align: center">{{ appName }}</h2>
    </div>
    <el-tabs type="border-card" style="height: 100%; width: 100%">
      <el-tab-pane label="受试者">
        <div style="display: flex; align-items: center">
          <div class="search-input">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input v-model="search"></el-input>
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
          </div>
          <el-button icon="el-icon-video-play" @click="showBatchExecution">
            执行
          </el-button>
          <el-button icon="el-icon-document-add">创建</el-button>
          <el-pagination
            background
            layout="total, prev, pager, next"
            :page-size="8"
            :total="23"
            style="margin-left: auto"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="质问">
        <div style="display: flex; align-items: center">
          <div class="search-input">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input v-model="search"></el-input>
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
          </div>
          <el-button icon="el-icon-video-play">执行</el-button>
          <el-pagination
            background
            layout="total, prev, pager, next"
            :page-size="8"
            :total="23"
            style="margin-left: auto"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="警告">
        <div style="display: flex; align-items: center">
          <div class="search-input">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input v-model="search"></el-input>
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
          </div>
          <el-button icon="el-icon-video-play">执行</el-button>
          <el-pagination
            background
            layout="total, prev, pager, next"
            :page-size="8"
            :total="23"
            style="margin-left: auto"
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>

    <div class="user-info-container">
      <el-badge value="">
        <el-button>研究者</el-button>
      </el-badge>
      <el-select v-model="curhospital" placeholder="请选择研究中心">
        <el-option
          v-for="item in hospitals"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-dropdown @command="handleCommand">
        <el-avatar icon="el-icon-user-solid"></el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="personalCenter">个人中心</el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <BatchExecution ref="batchExcution"></BatchExecution>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import BatchExecution from './BatchExecution'

  export default {
    name: 'Navbar',
    components: { BatchExecution },
    data() {
      return {
        search: '',
        curhospital: 'All',
        appName: 'IMP_RMD',
        hospitals: [
          {
            value: 'All',
            label: '所有可访问研究中心',
          },
          {
            value: 'HospitalA',
            label: '研究中心A',
          },
          {
            value: 'HospitalB',
            label: '研究中心B',
          },
        ],
      }
    },
    computed: {
      ...mapGetters(['avatar']),
    },
    methods: {
      showBatchExecution() {
        this.$refs['batchExcution'].show()
      },
      async logout() {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
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

    .study-container {
      padding: 10px 20px;
      background-color: rgb(202, 236, 245);
      .study-icon {
        width: 150px;
        height: 50px;
      }
    }

    .module-container {
      & > * {
        margin-left: 40px;
      }
    }

    .user-info-container {
      position: absolute;
      top: 4px;
      right: 0;
      display: flex;
      align-items: center;
      padding: 5px 0;
      & > * {
        margin-right: 20px;
      }
    }

    .search-input {
      display: flex;
      align-items: center;
      margin-right: 16px;
      border: 1px solid #d7dee3;
      border-radius: 32px;
      padding: 5px 5px;

      .svg-container {
        font-size: 16px;
        color: #d7dee3;
        cursor: pointer;
        user-select: none;
      }
    }

    ::v-deep {
      .el-tabs__content {
        .el-input {
          input {
            border: 0;
            width: 400px;
          }
        }
        .el-button {
          border: 0;
          padding: 0;
          font-size: 18px;
        }
      }
      .el-tabs__item {
        height: 60px;
        line-height: 60px;
        font-size: 18px;
      }
    }

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
