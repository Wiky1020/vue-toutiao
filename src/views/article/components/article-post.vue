<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      :disabled='!message.length'
      @click="addArticleComment"
    >发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'CommentPost',
  components: {},
  inject: {
    articleId: {
      type: [Object, String, Number],
      default: null
    }
  },
  props: {
    // list: {
    //   type: Array,
    //   required: true
    // },
    target: {
      type: [Object, String, Number],
      required: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async addArticleComment () {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true,
        duration: 0
      })
      if (this.message.trim().length <= 0) {
        this.$toast.fail('内容不能为空')
        return
      }
      try {
        const { data } = await addComment({
          target: this.target.toString(), // 发表评论即文章id，评论回复评论id
          content: this.message,
          art_id: this.articleId ? this.articleId.toString() : this.articleId // 文章id。 发布评论不需要传递此参数，发表回复需要传递所属文章id
        })

        // 将数据添加到数组中，关闭弹层
        // this.list.unshift(data.data.new_obj)
        this.$emit('close', data.data)
        this.message = ''
        this.$toast.success('发布成功')
      } catch (err) {
        this.$toast.fail('发表失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
