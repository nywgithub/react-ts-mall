import { axios, host } from "./axios";

export const getUser = () => {
  return axios({
    url: `${host}/user/info.do`,
    method: 'get'
  })
}

export const getAccount = () => {
  return axios({
    url: `${host}/user/accounts.do`,
    method: 'get'
  })
}
