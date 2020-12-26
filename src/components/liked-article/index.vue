<template>
   <van-icon :color="liked===1?'red':'#777'" :name="liked===1?'good-job':'good-job-o'" @click="likedArticle" />
</template>

<script>
import { LikedArticle, delLikedArticle } from '@/api/article'

export default {
  name: 'LikeArticle',

  data () {
    return {
    }
  },
  props: {
    liked: {
      type: [Number, String],
      required: true
    },
    articleId: {
      type: [String, Object, Number],
      required: true
    }
  },
  created () {},
  methods: {
    async likedArticle () {
      try {
        if (this.liked === 1) {
          // 点赞，取消点赞
          await delLikedArticle(this.articleId)
          this.$emit('update:liked', -1)
          this.$toast.success('取消点赞')
        } else {
          // 点赞，
          await LikedArticle(this.articleId)
          this.$emit('update:liked', 1)
          this.$toast.success('点赞成功')
        }
      } catch (err) {
        this.$toast('点赞失败')
      }
    }
  },
  computed: {}
}
</script>

<style lang='less' scoped>
</style>
