<template>
  <div class="register-container">
    <el-form
      ref="registerForm"
      :model="form"
      class="register-form"
      :rules="registerRules"
    >
      <h2 style="text-align: center; margin-bottom: 40px">医据用户注册</h2>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          v-model.trim="form.username"
          type="text"
          placeholder="请输入用户名"
          auto-complete="off"
          autofocus="true"
        ></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <span class="svg-container">
          <svg-icon icon-class="phone" />
        </span>
        <el-input
          v-model.trim="form.phone"
          type="text"
          placeholder="请输入手机号"
          maxlength="11"
          show-word-limit
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item prop="phoneCode" style="position: relative">
        <span class="svg-container">
          <svg-icon icon-class="verifycode" />
        </span>
        <el-input
          v-model.trim="form.phoneCode"
          type="text"
          placeholder="手机验证码"
        ></el-input>
        <el-button
          type="primary"
          class="show-pwd phone-code"
          :disabled="isGetphone"
          @click="getPhoneCode"
        >
          {{ phoneCode }}
        </el-button>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          v-model.trim="form.password"
          type="password"
          placeholder="设置密码"
          autocomplete="new-password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="register-btn"
          type="primary"
          @click.native.prevent="handleReister"
        >
          注册
        </el-button>
        <router-link to="/login">
          <div class="login-link">登录</div>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { isPassword, isPhone } from '@/utils/validate'
  import { register } from '@/api/user'
  export default {
    username: 'Register',
    data() {
      const validateusername = (rule, value, callback) => {
        if ('' == value) {
          callback(new Error('用户名不能为空'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (!isPassword(value)) {
          callback(new Error('密码不能少于6位'))
        } else {
          callback()
        }
      }
      const validatePhone = (rule, value, callback) => {
        if (!isPhone(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }
      return {
        isGetphone: false,
        getPhoneIntval: null,
        phoneCode: '获取验证码',
        showRegister: false,
        form: {},
        registerRules: {
          username: [
            { required: true, trigger: 'blur', message: '请输入用户名' },
            { max: 20, trigger: 'blur', message: '最多不能超过20个字' },
            { validator: validateusername, trigger: 'blur' },
          ],
          phone: [
            { required: true, trigger: 'blur', message: '请输入手机号码' },
            { validator: validatePhone, trigger: 'blur' },
          ],
          password: [
            { required: true, trigger: 'blur', message: '请输入密码' },
            { validator: validatePassword, trigger: 'blur' },
          ],
          phoneCode: [
            { required: true, trigger: 'blur', message: '请输入手机验证码' },
          ],
        },
        loading: false,
        passwordType: 'password',
      }
    },
    methods: {
      getPhoneCode() {
        if (!isPhone(this.form.phone)) {
          //this.$baseMessage('请输入手机号', 'error')
          this.$refs['registerForm'].validateField('phone')
          return
        }
        this.isGetphone = true
        let n = 60
        this.getPhoneIntval = setInterval(() => {
          if (n > 0) {
            n--
            this.phoneCode = '重新获取(' + n + 's)'
          } else {
            this.getPhoneIntval = null
            clearInterval(this.getPhoneIntval)
            this.phoneCode = '获取验证码'
            this.isGetphone = false
          }
        }, 1000)
      },
      handleReister() {
        this.$refs['registerForm'].validate(async (valid) => {
          if (valid) {
            const param = {
              username: this.form.username,
              phone: this.form.phone,
              password: this.form.password,
              phoneCode: this.form.phoneCode,
            }
            const { msg } = await register(param)
            this.$baseMessage(msg, 'success')
          }
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .register-container {
    display: flex;
    height: 100%;
    overflow: hidden;
    background: url('~@/assets/login-images/background.png') center center/cover
      fixed no-repeat;

    .register-btn {
      display: inherit;
      width: 220px;
      height: 60px;
      margin: 0 auto;
    }

    .register-form {
      width: 520px;
      margin: auto;
      overflow: hidden;
      background-color: $base-color-white;
      padding: 8px 24px;
      border-radius: $base-border-radius-form;

      .phone-code {
        width: 120px;
        height: 38px;
        font-size: 14px;
        color: #fff;
        border-radius: 3px;
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

    .show-pwd {
      position: absolute;
      top: 10px;
      right: 25px;
      font-size: 16px;
      color: $base-font-color;
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

        .el-input__count {
          .el-input__count-inner {
            background: transparent;
          }
        }

        .el-input__prefix {
          left: 15px;
          line-height: 56px;

          .svg-inline--fa {
            width: 20px;
          }
        }

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

      .login-link {
        margin-top: 20px;
        float: right;
        color: $base-font-color-a;
      }
    }
  }
</style>
