<template>
  <div clas="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        slot="title"
        round
        size="small"
        icon="search"
        class="search-btn"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!--tabs标签  -->
    <van-tabs v-model="active" swipeable animated class="tabs">
      <van-tab
        :title="item.name"
        class="tab-item"
        v-for="item in ChannelList"
        :key="item.id"
      >
        <Article :channel="item" :searchHeight="searchHeight"></Article>
      </van-tab>

      <!-- 汉堡叠层 -->
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hambuger-btn" @click="isChannelEditShow = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 汉堡弹出层 -->
    <van-popup
      v-model="isChannelEditShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
    <ChannelEdit :channels='ChannelList' :activeIndex='active' @update='update' />

    </van-popup>
  </div>
</template>

<script>
import { getUserChannel } from '@/api/user'
import Article from './component/article-list'
import ChannelEdit from './component/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  data () {
    return {
      active: 0,
      // 频道列表
      ChannelList: [],
      isChannelEditShow: false,
      searchHeight: null
    }
  },
  components: {
    Article,
    ChannelEdit
  },
  created () {
    this.getUserChannel()
    // console.log(this.searchHeight)
  },
  mounted () {
    this.$nextTick(() => {
      return (this.searchHeight = document.querySelector('.van-nav-bar__content').clientHeight)
    })
  },
  methods: {
    // 获取用户频道列表
    async getUserChannel () {
      // 判断是否登录状态
      if (this.user) {
        // 登录状态
        try {
          const { data } = await getUserChannel()
          this.ChannelList = data.data.channels
        } catch (err) {
          this.$toast('获取用户频道列表失败')
        }
      } else {
        // 未登录状态
        const channel = getItem('TOUTIAO_CHANNELS')
        if (channel) {
          this.ChannelList = channel
        } else {
          try {
            const { data } = await getUserChannel()
            this.ChannelList = data.data.channels
          } catch (err) {
            this.$toast('获取用户频道列表失败')
          }
        }
        // this.ChannelList = getItem('TOUTIAO_CHANNELS')
      }
    },
    // 切换频道
    update (i) {
      this.active = i
      this.isChannelEditShow = false
    }
  },
  computed: {
    ...mapState(['user'])
    // searchHeight () {
    //   return document.querySelector('.van-nav-bar__content').clientHeight
    // }
  }
}
</script>

<style lang="less" scoped>
.search-btn {
  width: 555px;
  height: 63px;
  background-color: #5babfb;
  border: none;
  color: #fff;
  font-size: 28px;
}
/deep/ .van-nav-bar__title {
  max-width: unset;
}
/deep/ .van-tabs__nav {
  padding-bottom: 0;
}
.tabs {
  height: 80px;
  padding-top: 170px;
  /deep/ .van-tabs__wrap {
    height: 80px;
    position: fixed;
    top: 92px;
    z-index: 2;
    width: 100%;
  }
  /deep/ .van-tab {
    border-right: 1px solid #eee;
    width: 220px;
  }
  /deep/ .van-tabs__line {
    bottom: 10px;
    background-color: #5babfb;
    width: 30px;
  }
  /deep/ .van-tab--active {
    color: black;
  }
}
.hambuger-btn {
  position: fixed;
  right: 0;
  width: 66px;
  height: 82px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  opacity: 0.902;
}
.placeholder {
  width: 66px;
  height: 82px;
  flex-shrink: 0;
}
</style>
