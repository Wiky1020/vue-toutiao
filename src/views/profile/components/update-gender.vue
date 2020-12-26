<template>
  <div class='update-gender'>
    <van-picker
  title="标题"
  show-toolbar
  :default-index="gender"
  :columns="columns"
  @confirm="onConfirm"
  @cancel="$emit('close')"
  @change="onChange"
/>
  </div>
</template>

<script>
import { UpdateProfile } from '@/api/user'
export default {
  name: 'UpdateGender',
  data () {
    return {
      columns: ['男', '女'],
      index: 0
    }
  },
  props: {
    gender: {
      type: Number,
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
        await UpdateProfile({
          gender: this.index
        })
        this.$toast.success('更新成功')
        // 关闭弹层更新视图
        this.$emit('close')
        this.$emit('update:gender', this.index)
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    },
    onChange (picker, value, index) {
      this.index = index
    }
  },
  computed: {}
}
</script>

<style lang='less' scoped>
</style>
