<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      label-position="left"
    >
      <h2 style="text-align: center">欢迎登录YJU！</h2>
      <el-form-item style="margin-top: 40px" prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model.trim="loginForm.username"
          v-focus
          placeholder="请输入用户名"
          tabindex="1"
          type="text"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model.trim="loginForm.password"
          :type="passwordType"
          tabindex="2"
          placeholder="请输入密码"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-password" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          class="login-btn"
          type="primary"
          @click="handleLogin"
        >
          登录
        </el-button>
        <router-link to="/register">
          <div style="margin-top: 20px; float: right">立即注册</div>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { validUsername } from '@/utils/validate'

  export default {
    name: 'Login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('Please enter the correct user name'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('The password can not be less than 6 digits'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: 'admin',
          password: '111111',
        },
        loginRules: {
          username: [
            { required: true, trigger: 'blur', validator: validateUsername },
          ],
          password: [
            { required: true, trigger: 'blur', validator: validatePassword },
          ],
        },
        loading: false,
        passwordType: 'password',
        redirect: undefined,
      }
    },
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true,
      },
    },
    methods: {
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.loading = true
            this.$store
              .dispatch('user/login', this.loginForm)
              .then(() => {
                this.$router.push({ path: this.redirect || '/' })
                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  $base-font-size-default: 14px;
  $base-font-size-small: 12px;
  $base-color-white: #fff;
  $base-color-blue: #409eff;
  $base-color-red: #f34d37;
  $base-z-index: 999;
  $base-input-height: 32px;
  $base-font-color: #606266;

  .login-container {
    display: flex;
    min-height: 100%;
    overflow: hidden;
    background: url('~@/assets/login-images/background.png') center center/cover
      fixed no-repeat;

    .title {
      font-size: 54px;
      font-weight: 500;
      color: rgba(14, 18, 26, 1);
    }

    .title-tips {
      margin-top: 29px;
      font-size: 26px;
      font-weight: 400;
      color: rgba(14, 18, 26, 1);
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .login-btn {
      display: inherit;
      width: 220px;
      height: 60px;
      margin: 0 auto;
      border: 0;

      &:hover {
        opacity: 0.9;
      }
    }

    .login-form {
      align-items: center;
      width: 520px;
      margin: auto;
      overflow: hidden;
      background-color: white;
      padding: 8px 24px;
      border-radius: 8px;

      .forget-password {
        width: 100%;
        margin-top: 40px;
        text-align: left;

        .forget-pass {
          width: 129px;
          height: 19px;
          font-size: 20px;
          font-weight: 400;
          color: rgba(92, 102, 240, 1);
        }
      }
    }

    .tips {
      margin-bottom: 10px;
      font-size: $base-font-size-default;
      color: $base-color-white;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .title-container {
      position: relative;

      .title {
        margin: 0 auto 40px auto;
        font-size: 34px;
        font-weight: bold;
        color: $base-color-blue;
        text-align: center;
      }
    }

    .svg-container {
      position: absolute;
      top: 14px;
      left: 15px;
      z-index: $base-z-index;
      font-size: 16px;
      color: #d7dee3;
      cursor: pointer;
      user-select: none;
    }

    .show-password {
      position: absolute;
      top: 14px;
      right: 25px;
      font-size: 16px;
      color: #d7dee3;
      cursor: pointer;
      user-select: none;
    }

    ::v-deep {
      .el-form-item {
        padding-right: 0;
        margin: 20px 0;
        color: #454545;
        background: transparent;
        border: 1px solid transparent;
        border-radius: 2px;

        &__content {
          min-height: $base-input-height;
          line-height: $base-input-height;
        }

        &__error {
          position: absolute;
          top: 100%;
          left: 18px;
          font-size: $base-font-size-small;
          line-height: 18px;
          color: $base-color-red;
        }
      }

      .el-input {
        box-sizing: border-box;

        input {
          height: 58px;
          padding-left: 45px;
          font-size: $base-font-size-default;
          line-height: 58px;
          color: $base-font-color;
          background: #f6f4fc;
          border: 0;
          caret-color: $base-font-color;
        }
      }
    }
  }
</style>
