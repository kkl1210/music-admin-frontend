import request from '@/utils/request'

const baseURL = 'http://localhost:3000'
export function fetchList(params) {
  return request({
    params,
    url: `${baseURL}/bloglist/list`,
    method: 'get'
  })
}
export function deleteList(params) {
  return request({
    data: {
      ...params
    },
    url: `${baseURL}/bloglist/deleteList`,
    method: 'post'
  })
}
