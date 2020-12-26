<template>
  <div class="userInfo">
    <van-nav-bar
      title="个人信息"
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />
    <input type="file" hidden ref='file' @change="onChange">
    <van-cell title="头像" is-link  @click="$refs.file.click()">
      <van-image
      class="img"
        fit="cover"
        round
        :src="userInfo.photo"
      />
    </van-cell>
    <van-cell title="昵称" is-link :value="userInfo.name" @click="updateNameshow=true">
    </van-cell>
    <van-cell title="性别" is-link :value="userInfo.gender?'女':'男'" @click="updateGendershow=true" >
    </van-cell>
    <van-cell title="生日" is-link :value="userInfo.birthday" @click="updateBirthdayshow=true">
    </van-cell>
    <!-- 设置昵称 -->
     <van-popup v-model="updateNameshow" position="bottom" :style="{ height: '100%' }" >
        <UpdateName  @close='updateNameshow=false' v-if="updateNameshow" :name.sync='userInfo.name' />
      </van-popup>
        <!-- 设置性别 -->
     <van-popup v-model="updateGendershow" position="bottom" :style="{ height: '40%' }" >
       <UpdateGender :gender.sync='userInfo.gender' @close='updateGendershow=false' v-if="updateGendershow" />
      </van-popup>
      <!-- 设置生日 -->
     <van-popup v-model="updateBirthdayshow" position="bottom" :style="{ height: '40%' }" >
     <UpdateBirthday @close='updateBirthdayshow=false' v-if="updateBirthdayshow" :birthday.sync='userInfo.birthday' />
     </van-popup>
           <!-- 设置头像 -->
     <van-popup v-model="updatePhotoshow" position="bottom" :style="{ height: '100%' }" >
       <UpdatePhoto @close='updatePhotoshow=false' :img='img' @update-img='userInfo.photo=$event' v-if="updatePhotoshow" />
     </van-popup>
  </div>
</template>

<script>
import UpdatePhoto from './components/update-photo'
import UpdateBirthday from './components/update-birthday'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import { getUserProfile } from '@/api/user'
export default {
  name: 'UserProfile',
  data () {
    return {
      userInfo: {},
      updateNameshow: false,
      updateGendershow: false,
      updateBirthdayshow: false,
      updatePhotoshow: false,
      img: ''
    }
  },
  created () {
    this.getProfile()
  },
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  methods: {
    async getProfile () {
      try {
        const { data } = await getUserProfile()
        this.userInfo = data.data
      } catch (err) {
        this.$toast.fail('获取用户失败')
      }
    },
    // 监听头像的变化
    onChange () {
      const data = this.$refs.file.files[0]
      this.img = window.URL.createObjectURL(data)
      this.updatePhotoshow = true
      this.$refs.file.value = ''
    }
  },
  computed: {}
}
</script>

<style lang="less" scoped>
.img{
  width: 90px;
  height: 90px;

}
/deep/.van-popup{
  background-color: #f3f5f7;
}
</style>
