<template>
  <div class='update-photo'>
    <img :src="img" alt="" class="img" ref="imgs">
    <div class="bottom">
      <span class="left" @click="$emit('close')" >取消</span>
      <span class="right" @click="onConfirm">完成</span>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { UpdatePhoto } from '@/api/user'
export default {
  name: 'UpdatePhoto',
  data () {
    return {
      cropper: null
    }
  },
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  created () {},
  methods: {
    onConfirm () {
      this.$toast.loading({
        message: '上传中...',
        forbidClick: true
      })
      try {
        this.cropper.getCroppedCanvas().toBlob(async (blob) => {
          const formData = new FormData()
          formData.append('photo', blob)
          const { data } = await UpdatePhoto(formData)
          console.log(data)
          this.$emit('close')
          this.$emit('update-img', data.data.photo)
          this.$toast.success('上传成功')
        })
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }

  },
  mounted () {
    const image = this.$refs.imgs
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  computed: {}
}
</script>

<style lang='less' scoped>
.update-photo{
  height: 100%;
  background: #000;
  .img{
    max-width: 100%;
  }
.bottom{
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  .left,.right{
    width: 100px;
    height: 100px;
    font-size: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    color:#fff;
  }
  }
}

</style>
