<template>
  <!-- 关注用户组件 -->
  <van-button v-if="followed" class="follow-btn" round size="small" @click="onFollowed" :loading='followLoding'
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollowed"
    :loading='followLoding'
    >关注</van-button
  >
</template>

<script>
import { onFollowedUser, deleteFollowedUser } from '../../api/user'
export default {
  name: 'FollowUser',
  data () {
    return {
      followLoding: false
    }
  },
  props: {
    followed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [String, Number, Object],
      required: true
    }
  },
  created () {},
  methods: {
    // 关注用户
    async onFollowed () {
      this.followLoding = true
      try {
        if (this.followed) {
        // 已关注，取消关注
          await deleteFollowedUser(this.userId)
        } else {
        // 未关注 ，添加关注
          await onFollowedUser(this.userId)
        }
        this.$emit('update:followed', !this.followed)
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.$toast('不能关注自己')
          return
        }
        this.$toast('关注失败')
      }
      this.followLoding = false
    }
  },
  computed: {}
}
</script>

<style lang="less" scoped></style>
