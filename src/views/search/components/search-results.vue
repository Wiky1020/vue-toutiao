<template>
  <div class="search-results">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
  error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell v-for="(item,i) in list" :key="i" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20,
      error: false
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () {},
  methods: {
    async onLoad () {
      // 1.发送接口获取数据
      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })
        // 2.将数据存储到数组中
        const { results } = data.data
        this.list.push(...results)
        // 3.将加载完毕loading设置为false
        this.loading = false
        // 4.判断数据是否加载完毕
        if (results.lenght) {
          // 如果没有加载完毕，则加载下一页数据
          this.page++
        } else {
          // 加载完毕将finished设置为true
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  },
  computed: {}
}
</script>

<style lang="less" scoped></style>
