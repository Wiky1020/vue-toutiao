<template>
  <div class='search-container'>
    <!-- 搜索 -->
<form action="/" >
  <van-search
    class="search-form"
    v-model="searchText"
    show-action
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="onCancel"
    @focus="isShowResult = false"
  />
</form>
<!-- 搜索结果 -->
<SearchResult v-if="isShowResult" :searchText='searchText'  />
<!-- 搜索建议 -->
<SearchSuggestion v-else-if="searchText" :searchText='searchText' @search='onSearch($event)' />
<!-- 搜索历史 -->
<SearchHistory  v-else :SearchHistory='SearchHistory' @search='onSearch($event)' @clear='SearchHistory=[]' />

  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-results'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'Search',
  data () {
    return {
      searchText: '',
      isShowResult: false, // 控制搜索结果是否显示
      SearchHistory: getItem('TOUTIAO_HISTORY') || []// 保存历史数据
    }
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  created () {},
  methods: {
    onSearch (val) {
      this.searchText = val
      // 将数据存储到数组中
      // 判断是否有重复数据
      const index = this.SearchHistory.indexOf(val)
      console.log(index)
      if (index !== -1) {
        this.SearchHistory.splice(index, 1)
      }
      this.SearchHistory.unshift(val)
      // this.SearchHistory.unshift(val)
      setItem('TOUTIAO_HISTORY', this.SearchHistory)
      this.isShowResult = true
    },
    onCancel () {
      this.$router.back()
      console.log('取消')
    }
  },
  computed: {
  }

}
</script>

<style lang='less' scoped>
.search-form{
  background-color:  #5babfb;
  /deep/ .van-search__action{
    color: #fff;
  }
}
</style>
