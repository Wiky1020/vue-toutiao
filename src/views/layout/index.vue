<template>
  <div clas="layout-conatiner">
    <!-- 路由 -->
    <router-view />
    <!-- 底部导航栏 -->
    <van-tabbar route class="layout-tabbar">
      <van-tabbar-item  to='/'>
        <i slot="icon" class="toutiao toutiao-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
     <van-tabbar-item to='/qa' >
        <i slot="icon" class="toutiao toutiao-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
       <van-tabbar-item to='/video' >
        <i slot="icon" class="toutiao toutiao-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
       <van-tabbar-item to='/my' >
        <i slot="icon" class="toutiao toutiao-wode"></i>
        <span class="text">{{this.user?'我的':'未登录'}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    TabBarHeight () {
      const height = document.querySelector('.layout-tabbar').clientHeight
      console.log(height)
      this.$store.commit('getTabBarHeight', height)
    }
  },
  mounted () {
    this.$nextTick(() => {
      return this.TabBarHeight()
    })
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
.layout-tabbar{
  i.toutiao{
    font-size: 40px;
  }
  span.text{
    font-size: 20px;
  }
}
</style>
