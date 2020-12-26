<template>
  <div class="search-history">
    <van-cell>
      <span slot="title">历史记录</span>
      <div slot="default">
        <div v-if="showIcon">
          <span @click="$emit('clear')">全部删除</span>&nbsp;&nbsp;
          <span @click="showIcon=false">完成</span>
        </div>
        <van-icon name="delete" v-else  @click="showIcon=true" />
      </div>
    </van-cell>
    <van-cell v-for="(item,i) in SearchHistory" :key="i" @click="deleteHistory(item,i)">
      <span slot="title">{{item}}</span>
      <van-icon name="close" v-show="showIcon" />
    </van-cell>
  </div>
</template>

<script>
import { setItem } from '@/utils/storage'
export default {
  name: 'SearchHistory',
  data () {
    return {
      showIcon: false
    }
  },
  props: {
    SearchHistory: {
      type: Array,
      required: true
    }
  },
  created () {},
  methods: {
    // 删除频道
    deleteHistory (item, i) {
      if (this.showIcon) {
        // 删除状态
        this.SearchHistory.splice(i, 1)
        setItem('TOUTIAO_HISTORY', this.SearchHistory)
      } else {
        // 未删除状态
        this.$emit('search', item)
      }
    }
  },
  computed: {}
}
</script>

<style lang="less" scoped></style>
