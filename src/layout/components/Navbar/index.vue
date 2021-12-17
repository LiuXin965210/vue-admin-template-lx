<template>
  <div class="navbar">
    <div class="study-container">
      <img src="@/assets/icon-images/logo.svg" class="study-icon" />
      <div class="study-title">
        {{ appName }}
      </div>
    </div>
    <el-tabs type="border-card" style="height: 100%; width: 100%">
      <el-tab-pane label="受试者">
        <div style="display: flex; align-items: center">
          <div class="search-input">
            <el-popover placement="bottom-start" width="400" trigger="click">
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 10px;
                "
              >
                <div>历史记录</div>
                <div>
                  <el-link v-if="canEdit" type="primary" @click="editTags">
                    完成
                  </el-link>
                  <span v-else>
                    <el-link type="primary" @click="clearTags">清空</el-link>
                    <el-divider direction="vertical"></el-divider>
                    <el-link type="primary" @click="editTags">编辑</el-link>
                  </span>
                </div>
              </div>
              <div>
                <el-tag
                  v-for="tag in tags"
                  :key="tag.name"
                  :closable="canEdit"
                  @close="handleClose(tag)"
                  :type="tag.type"
                  style="margin-right: 10px"
                >
                  {{ tag.name }}
                </el-tag>
              </div>
              <span slot="reference" class="svg-container">
                <svg-icon icon-class="history" />
              </span>
            </el-popover>
            <el-input v-model="keywords" @change="search"></el-input>

            <el-popover placement="bottom-start" trigger="hover">
              <el-radio-group v-model="searchType">
                <el-radio-button label="全部"></el-radio-button>
                <el-radio-button label="输入率"></el-radio-button>
                <el-radio-button label="审查率"></el-radio-button>
                <el-radio-button label="SDV率"></el-radio-button>
                <el-radio-button label="锁定率"></el-radio-button>
              </el-radio-group>
              <span slot="reference" class="svg-container">
                <svg-icon icon-class="arrow-down" />
              </span>
            </el-popover>
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
              <svg-icon icon-class="history" />
            </span>
            <el-input v-model="keywords"></el-input>
            <span class="svg-container">
              <svg-icon icon-class="arrow-down" />
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
              <svg-icon icon-class="history" />
            </span>
            <el-input v-model="keywords"></el-input>
            <span class="svg-container">
              <svg-icon icon-class="arrow-down" />
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
      <el-select v-model="curRole" placeholder="研究者" size="medium">
        <el-option
          v-for="item in roles"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button size="medium" @click="showChangeHospital">
        请选择研究中心
      </el-button>
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
    <BatchExecution ref="batchExcution"></BatchExecution>
    <IgnoreWarning ref="ignoreWarning"></IgnoreWarning>
    <changeHospital ref="changeHospital"></changeHospital>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import BatchExecution from './BatchExecution'
  import IgnoreWarning from './IgnoreWarning'
  import ChangeHospital from './ChangeHospital/'

  export default {
    name: 'Navbar',
    components: { BatchExecution, IgnoreWarning, ChangeHospital },
    data() {
      return {
        searchType: '全部',
        canEdit: false,
        keywords: '',
        curRole: 'DoctorC',
        appName: 'IMP_RMD',
        tags: [
          { name: '常用', type: 'info' },
          { name: '输入率>50%', type: 'info' },
          { name: '张三', type: 'info' },
          { name: '男', type: 'info' },
        ],
        roles: [
          {
            value: 'DoctorC',
            label: '研究者',
          },
          {
            value: 'DoctorA',
            label: '医生A',
          },
          {
            value: 'DoctorB',
            label: '医生B',
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
      showIgnoreWarning() {
        this.$refs['ignoreWarning'].showIgnoreWaring()
      },
      showChangeHospital() {
        this.$refs['changeHospital'].showChangeHosp()
      },
      search() {
        this.$store
          .dispatch('app/search', this.keywords)
          .then(() => {})
          .catch(() => {
            this.$message('检索出错')
          })
      },
      handleClose(tag) {
        this.tags.splice(this.tags.indexOf(tag), 1)
      },
      clearTags() {
        this.tags.splice(0, this.tags.length)
      },
      editTags() {
        this.canEdit = !this.canEdit
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

    .study-title {
      text-align: center;
      margin-top: 10px;
      font-weight: $base-font-weight-title;
      font-size: $base-font-size-title;
    }

    .module-container {
      & > * {
        margin-left: 40px;
      }
    }

    .user-info-container {
      position: absolute;
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
      background-color: #fff;

      .svg-container {
        font-size: 16px;
        color: #d7dee3;
        cursor: pointer;
        user-select: none;
      }
    }

    ::v-deep {
      .el-tabs__nav {
        padding-top: 6px;
      }
      .el-tabs__nav {
        padding-left: 25px;
      }
      .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
        border-top-color: #dcdfe6;
      }
      .el-tabs__content {
        .el-input {
          input {
            border: 0;
            width: 400px;
            height: 20px;
          }
        }
        .el-button {
          padding: 0;
          border: 0;
          background-color: transparent;
        }
      }
      .el-tabs__item {
        height: 50px;
        width: 120px;
        line-height: 50px;
        font-size: 16px;
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
