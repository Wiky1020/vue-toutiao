<template>
<!-- 收藏文章 -->
 <van-icon :color="collected?'orange':'#777'" :name="collected?'star':'star-o'" @click="collectedArticle" :loading='collectLoading' />
</template>

<script>
import { collectedArticle, deleteArticle } from '../../api/article'
export default {
  name: 'CollectArticle',
  props: {
    collected: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [String, Object, Number],
      required: true
    }
  },
  data () {
    return {
      collectLoading: false
    }
  },
  created () {},
  methods: {
    async collectedArticle () {
      this.collectLoading = true
      try {
        if (this.collected) {
          // 已经收藏，取消收藏
          await deleteArticle(this.articleId)
          this.$toast.success('取消收藏')
        } else {
          // 未收藏，添加收藏
          await collectedArticle(this.articleId)
          this.$toast.success('收藏成功')
        }
        this.$emit('update:collected', !this.collected)
      } catch (err) {
        this.$toast('收藏失败')
      }
      this.collectLoading = false
    }
  },
  computed: {}
}
</script>

<style lang='less' scoped>
</style>
