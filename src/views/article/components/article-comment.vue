<template>
<!-- 文章评论列表 -->
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
    <ArticleItem :commentItem='item' v-for="(item,i) in list" :key="i"  @update-like='item.is_liking=$event' @openReply="$emit('openReply',$event)" />
    </van-list>
    <!-- 评论列表 -->

  </div>
</template>

<script>
import { getComment } from '@/api/comment'
import ArticleItem from './article-item'
export default {
  name: 'ArticleComment',
  props: {
    source: {
      type: [Object, String, Number],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: () => 'a'
    }
  },
  data () {
    return {
      // list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null,
      error: false,
      limit: 10
    }
  },
  components: {
    ArticleItem
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getComment({
          type: this.type,
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
        })
        const { results } = data.data
        console.log(data)
        this.list.push(...results)
        this.$emit('update-count', data.data.total_count)
        this.loading = false
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.loading = false
        this.$toast('获取失败')
      }
    }
  }
}
</script>

<style scoped lang="less">

  .van-list {
    margin-bottom: 45px;
  }
</style>
