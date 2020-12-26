import request from '@/utils/request'
// 登录
export const getArticle = (params) => {
  return request({
    method: 'get',
    url: '/app/v1_1/articles',
    params
  })
}

// 根据文章id获取文章
export const getArticleById = (articleId) => {
  return request({
    method: 'get',
    url: '/app/v1_0/articles/' + articleId
  })
}
// 收藏文章
export const collectedArticle = (target) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target
    }
  })
}
// 取消关注用户
export const deleteArticle = (target) => {
  return request({
    method: 'delete',
    url: `/app/v1_0/article/collections/${target}`
  })
}
// 点赞文章
export const LikedArticle = (target) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target
    }
  })
}
// 取消点赞
export const delLikedArticle = (target) => {
  return request({
    method: 'delete',
    url: `/app/v1_0/article/likings/${target}`
  })
}
