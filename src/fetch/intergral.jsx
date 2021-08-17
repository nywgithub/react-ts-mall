import { axios, host } from "./axios";

export const getPoints = (query) => {
  return axios({
    url: `${host}/integral/account.do`,
    method: 'get',
    params: query
  })
}
export const addIntergral = (params) => {
  return axios({
    url: `${host}/integral/add.do`,
    method: 'post',
    params,
  })
}
export const getInvite = (query) => {
  return axios({
    url: `${host}/integral/invite/detail.do`,
    method: 'get',
    params: query
  })
}
export const getTask = (query) => {
  return axios({
    url: `${host}/integral/task`,
    method: 'get',
    params: query
  })
}
export const getDetail = (query) => {
  return axios({
    url: `${host}/integral/detail.do`,
    method: 'get',
    params: query
  })
}



