<template>
  <div :class="['article_list']" :style="'height:' + height + 'px'">
    <!-- <div class='article-list'> -->

    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="successText"
      success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <!-- <van-cell v-for="(item,i) in list" :key="i" :title="item.title" /> -->
        <ArticleItem
          :article="item"
          v-for="(item, index) in list"
          :key="index"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
import ArticleItem from '@/components/article-item/index'
export default {
  name: 'Article',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      requied: true
    },
    searchHeight: {
      type: Number,
      requied: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isLoading: false,
      successText: '刷新成功',
      height: null
    }
  },
  created () {
    const height = document.documentElement.clientHeight
    const tabbarHeight = document.querySelector('.van-tabs__wrap')
      .clientHeight
      // console.log(this.searchHeight) // 搜索高度
      // console.log(this.$store.state.tabbarheight) // tabbar高度
    this.height =
        height -
        tabbarHeight -
        this.searchHeight -
        this.$store.state.tabbarheight
  },
  methods: {
    async onLoad () {
      // 1 .获取数据
      try {
        const { data } = await getArticle({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })

        const { results } = data.data

        this.list.push(...results)
        this.loading = false
        this.successText = `刷新成功，更新了${results.length}条数据`
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.loading = false
        this.error = true
      }
    },
    async onRefresh () {
      // 调用接口
      try {
        const { data } = await getArticle({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        const { results } = data.data
        this.list.unshift(...results)
        this.isLoading = false
      } catch (err) {
        this.isLoading = false
        this.$toast('刷新失败')
      }
    }
  },
  computed: {},
  mounted () {
    this.$nextTick(() => {

    })
  }
}
</script>

<style lang="less" scoped>
.article_list {
  // height: 60vh;
  overflow-y: auto;
}
</style>
