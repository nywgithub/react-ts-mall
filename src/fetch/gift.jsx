import { axios, host } from "./axios";

export const getInfo = (query) => {
  return axios({
    url: `${host}/gift/info.do`,
    method: 'get',
    params: query
  })
}
export const getTop = (query) => {
  return axios({
    url: `${host}/gift/info/topN.do`,
    method: 'get',
    params: query
  })
}
export const getAddress = () => {
  return axios({
    url: `${host}/user/address.do`,
    method: 'get'
  })
}

export const Exchange = (data) => {
  return axios({
    url: `${host}/gift/exchange.do`,
    method: 'post',
    data
  })
}
