<template>
  <div clas='home-container'>
        <!-- 已登录状态 -->
    <div class="header login" v-if="user">
      <div class="header-top">
        <div class="left">
          <van-image class="avator" round fit="cover"  :src="userInfo.photo" />
          <span class="text">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button round size="small" to="/userinfo">编辑资料</van-button>
        </div>
      </div>
      <div class="header-bottom">
        <div class="bottom-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="bottom-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="bottom-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="bottom-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录状态 -->
    <div class="header not-login" v-else @click="$router.push('/login')">
      <img class="avator" src="../../assets/mobile.png" />
      <span class="text">登录 / 注册</span>
    </div>

    <!-- 收藏与历史 -->
    <van-grid :column-num="2" class="gird-wrap">
  <van-grid-item class="gird-item">
    <i slot="icon" class="toutiao toutiao-shoucang"></i>
    <span slot="text">收藏</span>
  </van-grid-item>
  <van-grid-item class="gird-item">
    <i slot="icon" class="toutiao toutiao-lishi"></i>
    <span slot="text">历史</span>
  </van-grid-item>
    </van-grid>
    <!-- 通知 -->
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell title="退出登录" class="logout-login" v-if="user" @click="logout"  />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // 获取用户个人信息
    async getUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
        console.log(this.userInfo)
      } catch (error) {

      }
    },
    // 退出登录
    logout () {
      this.$dialog.confirm({
        title: '是否确认退出'
      })
        .then(() => {
          // on confirm
          // 确定退出清除token
          this.$store.commit('getToken', null)
        })
        .catch(() => {
          this.$toast('取消了退出登录')
        })
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang='less' scoped>
.header{
  height: 360px;
  background: url('~@/assets/banner.png');
  background-size: cover;
}
.not-login{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  .avator{
    width: 130px;
    height: 130px;
  }
  .text{
    margin-top: 15px;
    font-size: 28px;
  }
}
.login{
  .header-top{
    height: 230px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    .left{
      display: flex;
      justify-content: center;
      align-items: center;
      color:#fff;
    .avator{
      width: 120px;
      height: 120px;
      border:2px solid #fff;
    }
    .text{
      margin-left: 20px;
      font-size: 36px;
    }

    }
  }
  .header-bottom{
    height: 130px;
    display: flex;
    .bottom-item{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      .count {
        font-size: 36px;
      }
      .text{
        font-size: 28px;
      }
    }
  }
}
.gird-wrap{
  margin-bottom: 8px;
  .gird-item{
  height: 140px;
  i.toutiao{
    font-size: 46px;
  }
  .toutiao-lishi{
    color: orange;
  }
   .toutiao-shoucang{
    color: lightcoral;
  }
  span{
    margin-top: 5px;
    font-size: 28px;
  }
  }
}
.logout-login{
  margin-top: 8px;
  text-align: center;
  color: red;
  font-size: 25px;

}
</style>
