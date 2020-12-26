import request from '@/utils/request'
// 登录
export const getAllChannel = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/channels'
  })
}
// 添加用户
export const getAddChannel = (channel) => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: { channels: [channel] }
  })
}
// 删除用户
export const getDeleteChannel = (id) => {
  return request({
    method: 'DELETE',
    url: '/app/v1_0/user/channels/' + id
  })
}
