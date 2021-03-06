import request from '@/utils/request'

const baseURL = 'http://localhost:3000'
export function fetchList(params) {
  return request({
    params,
    url: `${baseURL}/playlist/list`,
    method: 'get'
  })
}
export function fetchById(params) {
  return request({
    params,
    url: `${baseURL}/playlist/getById`,
    method: 'get'
  })
}
export function updatePlaylist(params) {
  return request({
    url: `${baseURL}/playlist/updatePlaylist`,
    data:{
      ...params
    },
    method: 'post'
  })
}
export function deleteList(params) {
  return request({
    params,
    url: `${baseURL}/playlist/deleteList`,
    method: 'get'
  })
}

