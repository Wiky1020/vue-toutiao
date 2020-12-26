<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="黑马头条">
      <van-icon name="arrow-left" slot="left" @click="$router.back()" />
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="articleList.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleList.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleList.aut_photo"
          />
          <div slot="title" class="user-name">{{ articleList.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ articleList.pubdate | relativeTime }}
          </div>
          <!-- 用户关注 -->
          <FollowUser class="follow-btn" :followed.sync='articleList.is_followed' :userId='articleList.aut_id' />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="articleList.content"
          ref="conentRef"
        ></div>
        <van-divider>正文结束</van-divider>

        <!-- 文章评论列表 -->
        <ArticleComment  :source='this.articleId'  @update-count='totalCount=$event' :list='commentList' @openReply='openReply'/>
            <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small" @click="updateArticleshow=true"
        >写评论</van-button
      >
      <van-icon name="comment-o" :info="totalCount" color="#777" />
      <!-- 收藏文章 -->
      <CollectArticle :collected.sync='articleList.is_collected' :articleId='articleList.art_id' />
      <!-- 点赞文章 -->
      <LikedArticle  :liked.sync='articleList.attitude'  :articleId='articleList.art_id' />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
      </div>

      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="getArticleList"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  <!-- 发表评论弹出层 -->
  <van-popup v-model="updateArticleshow" position="bottom" >
    <ArticlePost  :target='articleList.art_id' @close='onClose' v-if="updateArticleshow" />
  </van-popup>
       <!-- 回复评论弹出层 -->
  <van-popup v-model="updateReplyshow" position="bottom" :style="{ height: '100%' }" >
  <ArticleReply @close='updateReplyshow=false'  v-if="updateReplyshow" :comment='commentItem'  />
  </van-popup>
  </div>
</template>

<script>
import ArticleReply from './components/article-reply'
import LikedArticle from '../../components/liked-article'
import CollectArticle from '../../components/collect-article'
import { getArticleById } from '@/api/article'
import './github-markdown.css'
import { ImagePreview } from 'vant'
import FollowUser from '@/components/followed-user/index'
import ArticleComment from './components/article-comment'
import ArticlePost from './components/article-post'
export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    CollectArticle,
    LikedArticle,
    ArticleComment,
    ArticlePost,
    ArticleReply
  },
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      articleList: [],
      loading: true,
      errStatus: null,
      totalCount: 0,
      updateArticleshow: false,
      commentList: [],
      updateReplyshow: false,
      commentItem: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getArticleList()
  },
  mounted () {},
  methods: {
    async getArticleList () {
      this.loading = true
      try {
        const { data } = await getArticleById(this.articleId)
        this.articleList = data.data
        setTimeout(() => {
          this.ImagePrevew()
        }, 0)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
      }
      this.loading = false
    },
    ImagePrevew () {
      const content = this.$refs.conentRef
      const img = content.querySelectorAll('img')
      const images = []
      img.forEach((item, i) => {
        images.push(item.src)
        item.onclick = function () {
          ImagePreview({
            images,
            startPosition: i
          })
        }
      })
    },
    openReply (data) {
      this.updateReplyshow = true
      this.commentItem = data
    },
    onClose (data) {
      this.updateArticleshow = false
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
