import request from '@/utils/request'
// 登录
export const login = (data) => {
  return request({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 发送验证码

export const sendSms = (mobile) => {
  return request({
    method: 'get',
    url: '/app/v1_0/sms/codes/' + mobile
  })
}

// 获取用户自己的信息
export const getUserInfo = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user'
  })
}

// 获取频道列表
export const getUserChannel = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
// 关注用户
export const onFollowedUser = (target) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target
    }
  })
}
// 取消关注用户
export const deleteFollowedUser = (target) => {
  return request({
    method: 'delete',
    url: `/app/v1_0/user/followings/${target}`
  })
}

// 获取用户个人资料
export const getUserProfile = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user/profile'
  })
}
// 编辑
export const UpdateProfile = (data) => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  })
}

// 编辑
export const UpdatePhoto = (data) => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data
  })
}
