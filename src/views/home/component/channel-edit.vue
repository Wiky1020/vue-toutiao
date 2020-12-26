<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false" class="channel-text">
      <van-button size="mini" round type="danger" plain class="edit-btn" @click="closeBtn=!closeBtn"
        >{{closeBtn?'完成':'编辑'}}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="(item, i) in channels"
        :key="i"
        @click="updateChannel(item,i)"
      >
        <span
          slot="text"
          class="text"
          :class="{ active: activeIndex == i }"
          >{{ item.name }}</span
        >
        <van-icon slot="icon"  name="close" v-show="closeBtn && choiceID.indexOf(item.id)==-1" />
      </van-grid-item>
    </van-grid>
    <van-cell title="频道推荐" :border="false" class="channel-text"></van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        class="channel-item"
        v-for="(item,i) in recommends"
        :key="i"
        icon="plus"
        @click="addChannel(item)"
      >
      <span slot="text" class="text" >{{item.name}}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannel, getAddChannel, getDeleteChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  data () {
    return {
      allChannels: [],
      closeBtn: false,
      choiceID: [0]
    }
  },
  props: {
    channels: {
      type: Array,
      required: true
    },
    activeIndex: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getAllChannels()
  },
  methods: {
    async getAllChannels () {
      try {
        const { data } = await getAllChannel()
        this.allChannels = data.data.channels
        console.log(this.recommends)
      } catch (err) {
        this.$toast('获取所有频道列表失败')
      }
    },
    // 添加频道
    async addChannel (item) {
      this.channels.push(item)
      // 先判断用户是否登录
      if (this.user) {
        // 登录状态
        // 调用接口保存数据
        try {
          await getAddChannel({
            id: item.id,
            seq: this.channels.length
          })
        } catch (err) {
          this.$toast('添加失败')
        }
      } else {
        // 未登录状态
        // 存储到数据库
        setItem('TOUTIAO_CHANNELS', this.channels)
      }
    },
    // 删除切换频道
    updateChannel (item, i) {
      // 判断状态
      // 如果是推荐不允许删除

      if (this.closeBtn) {
        if (this.choiceID.indexOf(item.id) !== -1) {
          return
        }
        // 编辑状态删除
        this.channels.splice(i, 1)
        this.deleteChannel(item, i)
      } else {
        // 切换频道
        this.$emit('update', i)
      }
    },
    // 定义一个删除的状态的方法
    async  deleteChannel (item, i) {
      if (this.user) {
        // 登录状态
        try {
          await getDeleteChannel(item.id)
        } catch (err) {
          this.$toast('删除失败')
        }
      } else {
        // 未登录状态
        setItem('TOUTIAO_CHANNELS', this.channels)
      }
    }
  },
  computed: {
    ...mapState(['user']),
    recommends () {
      return this.allChannels.filter((item) => {
        return !this.channels.find((items) => {
          return items.id === item.id
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding-top: 90px;
  .edit-btn {
    width: 90px;
  }
  .channel-text {
    font-size: 30px;
  }
  .channel-item {
     width: 160px;
    height: 86px;
    /deep/ .van-grid-item__content {
      background-color: #f5f5f6;
      .van-grid-item__text,
      .text {
        white-space: nowrap;
        color: #222;
        font-size: 26px;
      }
      .active {
        color: red;
      }
      /deep/.van-grid-item__icon-wrapper{
        position: unset;
      }
      /deep/ .van-icon-close {
      position: absolute;
      right: -10px;
      top: -10px;
      font-size: 34px;
      color: #ccc;
    }
    }

  }
  /deep/.recommend-grid {
    .van-grid-item__content {
      flex-direction: row;
      color: #222;
      .van-grid-item__icon {
        font-size: 26px;
      }
      .van-grid-item__text {
        font-size: 28px;
        margin-top: 0;
      }
    }
  }
}
</style>
