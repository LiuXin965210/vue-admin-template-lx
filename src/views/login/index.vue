<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      label-position="left"
    >
      <h2 style="text-align: center; margin-bottom: 40px">欢迎登录YJU！</h2>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model.trim="loginForm.username"
          placeholder="请输入用户名"
          tabindex="1"
          type="text"
          autofocus="true"
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
          <div class="register-link">立即注册</div>
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
  .login-container {
    display: flex;
    height: 100%;
    overflow: hidden;
    background: url('~@/assets/login-images/background.png') center center/cover
      fixed no-repeat;

    .login-form {
      width: 520px;
      margin: auto;
      overflow: hidden;
      background-color: $base-color-white;
      padding: 8px 24px;
      border-radius: $base-border-radius-form;

      .login-btn {
        display: inherit;
        width: 220px;
        height: 60px;
        margin: 0 auto;
      }
    }

    .svg-container {
      position: absolute;
      top: 14px;
      left: 15px;
      z-index: $base-z-index;
      font-size: $base-font-size-default;
      color: #d7dee3;
      user-select: none;
    }

    .show-password {
      position: absolute;
      top: 14px;
      right: 25px;
      font-size: $base-font-size-default;
      color: #d7dee3;
      cursor: pointer;
      user-select: none;
    }

    ::v-deep {
      .el-form-item {
        padding-right: 0;
        margin: 20px 0;
        color: $base-color-black;
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
          background: $base-color-purple-lighter;
          border: 0;
          caret-color: $base-font-color;
        }
      }

      .register-link {
        margin-top: 20px;
        float: right;
        color: $base-font-color-a;
      }
    }
  }
</style>
