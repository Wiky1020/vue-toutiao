<template>
  <div class='search-suggestion'>
     <van-cell  icon="search" v-for="(item,i) in suggestions" :key="i" @click="$emit('search',item)">
      <!-- <span slot="title">{{lightStr(item)}}</span> -->
      <span slot="title" v-html='lightStr(item)' ></span>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  data () {
    return {
      suggestions: []
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () {
    this.getSearchSuggestions()
  },
  methods: {
    async getSearchSuggestions () {
      try {
        const { data } = await getSearchSuggestion(this.searchText)
        this.suggestions = data.data.options
      } catch (err) {
        this.$toast('获取失败')
      }
    },
    // 让搜索的高亮
    lightStr (item) {
      const redStr = `<span style='color:red;'>${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return item.replace(reg, redStr)
    }
  },
  computed: {
  },
  watch: {
    // 监听searchText的变化 防抖
    searchText: {
      handler: debounce(function (val) {
        this.getSearchSuggestions(val)
      }, 1000)
    }
  }
}
</script>

<style lang='less' scoped>
</style>
