<template>
  <div class="article-item">
    <van-cell :to="`/article/${article.art_id}`">
      <!-- 顶部标题 -->
      <div slot="title" class="title van-multi-ellipsis--l2">
        {{ article.title }}
      </div>
      <!-- 底部文本+图 -->
      <div slot="label" class="bottom">
        <!-- 显示三张图片 -->
        <div class="label-img-item" v-if="article.cover.type === 3">
          <van-image
            class="img-item"
            v-for="(img, i) in article.cover.images"
            :key="i"
            :src="img"
            fit="contain"
          />
        </div>
        <!-- 底部文本 -->
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
      <!-- 加载图片 -->
      <van-image
        slot="default"
        v-if="article.cover.type === 1"
        class="right-img"
        fit="cover"
        :src="article.cover.images[0]"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  created () {},
  methods: {},
  computed: {}
}
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  /deep/ .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 10px;
  }
  .right-img {
    width: 232px;
    height: 146px;
  }
  .bottom {
    span {
      font-size: 22px;
      color: #b4b4b4;
      margin-right: 25px;
    }
  }
  .label-img-item{
    display: flex;
    padding: 30px 0;
    .img-item{
      flex: 1;
      height: 146px;
        &:not(:last-child) {
        padding-right: 4px;
      }
    }
  }
}
</style>
