<template>
  <div class="update-name">
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    >
    </van-nav-bar>
    <van-field
    class="fieldName"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { UpdateProfile } from '@/api/user'
export default {
  name: 'UpdateName',
  data () {
    return {
      message: this.name
    }
  },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  created () {},
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        if (this.message.trim().length <= 0) {
          this.$toast.fail('昵称不能为空')
          return
        }
        await UpdateProfile({
          name: this.message
        })
        this.$toast.success('更新成功')
        // 关闭弹层更新视图
        this.$emit('close')
        this.$emit('update:name', this.message)
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
  },
  computed: {}
}
</script>

<style lang="less" scoped>
.fieldName{
  margin: 20px;
}
.van-cell{
width: unset;
}
</style>
