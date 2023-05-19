import axios from 'axios'
require('dotenv').config()

const token = process.env.TOKEN_IXC

export const api = axios.create({
  baseURL: 'https://ixc.raimax.com.br/webservice/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Basic ' + Buffer.from(token || '').toString('base64'),
  },
})
