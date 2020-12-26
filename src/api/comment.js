//  文章评论
import request from '@/utils/request'
// 评论列表
export const getComment = (params) => {
  return request({
    method: 'get',
    url: '/app/v1_0/comments',
    params
  })
}
// 点赞评论
export const LikedComment = (target) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target
    }
  })
}
// 取消点赞评论
export const delLikedComment = (target) => {
  return request({
    method: 'delete',
    url: `/app/v1_0/comment/likings/${target}`
  })
}
// 添加评论
export const addComment = (data) => {
  return request({
    method: 'post',
    url: '/app/v1_0/comments',
    data
  })
}
