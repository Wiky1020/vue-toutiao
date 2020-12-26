<template>
<div>
 <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="commentItem.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{commentItem.aut_name}}</div>
      <van-button
        class="like-btn"
        :class="{
          active:commentItem.like_count
          }"
        :icon="commentItem.like_count?'good-job':'good-job-o'"
        @click="likedCount"
      >{{commentItem.like_count>0?commentItem.like_count:'赞'}}</van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{commentItem.content}}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{commentItem.pubdate| relativeTime}}</span>
        <van-button
          class="reply-btn"
          round
          @click="$emit('openReply',commentItem)"
        >回复 {{commentItem.reply_count}}</van-button>
      </div>
    </div>

  </van-cell>

</div>

</template>

<script>

import { LikedComment, delLikedComment } from '@/api/comment'
export default {
  name: 'CommentItem',
  components: {

  },
  props: {
    commentItem: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isActive: true

    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async likedCount () {
      try {
        if (this.commentItem.is_liking) {
        // 点赞
          await delLikedComment(this.commentItem.com_id)
          this.commentItem.like_count--
          this.$toast.success('点赞成功')
        } else {
        // /点赞
          await LikedComment(this.commentItem.com_id)
          this.commentItem.like_count++
          this.$toast.success('取消点赞')
        }
        this.$emit('update-like', !this.commentItem.is_liking)
      } catch (err) {
        this.$toast('点赞失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
    .active{
      color:red
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    // width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
  }
}
</style>
