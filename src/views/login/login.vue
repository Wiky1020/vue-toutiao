<template>
  <div clas="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" class="page-nav-bar">
      <!-- <i slot="left" class="icon icon-corss"></i> -->
      <van-icon  slot="left" name="cross" @click="$router.back()" />
    </van-nav-bar>
    <!-- 表单-->
    <van-form @submit="onSubmit" class="login-from" ref="loginFormRef">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFromRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFromRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>

        <template #button>
           <van-count-down :time="1000 *10 "  format="ss s"  v-if="isShowCountDown" @finish="isShowCountDown=false" />
          <van-button v-else native-type="button" round size="small" type="default" class="send-btn" @click="onSendSms">获取验证码</van-button>
        </template>
      </van-field>
      <div class="sub-box">
        <van-button class="sub-btn" block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      isShowCountDown: false,
      userFromRules: {
        mobile: [{ required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号格式不正确' }
        ],
        code: [{ required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码必须为6位' }
        ]
      }
    }
  },
  created () {},
  methods: {
    async onSubmit () {
      // 验证表单数据

      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })

      try {
        const { data } = await login(this.user)
        this.$store.commit('getToken', data.data)
        this.$toast.success('登录成功')
        this.$router.push('/my')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('登录失败，请稍后重试')
          return console.log('验证码错误')
        }
        this.$toast.fail('登录失败，请稍后重试')
      }
      //
    },
    // 发送验证码s
    async onSendSms () {
      // 1.验证表单数据
      try {
        await this.$refs.loginFormRef.validate('mobile')
      } catch (err) {
        return console.log(err)
      }
      // 显示倒计时
      this.isShowCountDown = true
      // 调用接口发送验证码
      try {
        await sendSms(this.user.mobile)
      } catch (err) {
        this.isShowCountDown = false
        if (err.response.status === 429) {
          return this.$toast('操作太频繁了，请稍后重试')
        }
        this.$toast('发送失败，请稍后重试')
      }
    }
  },
  computed: {}
}
</script>

<style lang="less" scoped>
.login-from {
  .toutiao {
    font-size: 37px;
  }
  .send-btn{
  width: 156px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .sub-box {
    padding: 53px 33px;
    .sub-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
