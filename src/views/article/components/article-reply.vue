<template>
  <div class='article-reply'>
    <van-nav-bar :title="comment.reply_count?`${comment.reply_count}条回复`:'暂无回复'" class="reply-nav" >
      <van-icon name="cross" slot="left" @click="$emit('close')" />
    </van-nav-bar>
<div class="reply-bottom">
      <!-- 评论项 -->
    <CommentItem :commentItem='comment' />
    <!-- 获取评论回复列表 -->
    <van-cell title="全部回复">
    </van-cell>
    <!-- 回复列表 -->
    <Comment type='c' :source='comment.com_id' :list='commentList' />

    <div class="reply">
    <van-button class="reply-btn" size="mini" round @click="updateReplyshow=true" >写评论</van-button>
    </div>
   <van-popup v-model="updateReplyshow" position="bottom" >
    <CommentPost :target='comment.com_id'  @close='onClose' />
  </van-popup>
</div>
  </div>
</template>

<script>
import CommentItem from './article-item'
import Comment from './article-comment'
import CommentPost from './article-post'
export default {
  name: 'ArticleReply',
  data () {
    return {
      updateReplyshow: false,
      commentList: []
    }
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  components: {
    CommentItem,
    Comment,
    CommentPost
  },
  created () {},
  methods: {
    onClose (data) {
      this.updateReplyshow = false
      this.comment.reply_count++
      this.commentList.unshift(data.new_obj)
    }
  },
  computed: {}
}
</script>

<style lang='less' scoped>
.reply-bottom{
  margin-top: 92px;
}
.reply-nav{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.reply{
  width: 100%;
  height: 100px;
  position: fixed;
  bottom:0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .reply-btn{
    width: 60%;
    height: 50px;
    font-size: 20px;
  }
}
</style>
