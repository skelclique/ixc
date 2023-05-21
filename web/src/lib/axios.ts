import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://172.14.0.97:4751',
})
