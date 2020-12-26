<template>
  <div class='update-birthday'>
    <van-datetime-picker
  v-model="currentDate"
  type="date"
  :min-date="minDate"
  :max-date="maxDate"
  @cancel='$emit("close")'
  @confirm='onConfirm'
/>
  </div>
</template>

<script>
import { UpdateProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  data () {
    return {
      minDate: new Date(1940, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.birthday)
    }
  },
  props: {
    birthday: {
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
      const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
      try {
        await UpdateProfile({
          birthday: currentDate
        })
        this.$toast.success('更新成功')
        // 关闭弹层更新视图
        this.$emit('close')
        this.$emit('update:birthday', currentDate)
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
  },
  computed: {}
}
</script>

<style lang='less' scoped>
</style>
