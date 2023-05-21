import axios from 'axios'
import 'dotenv/config'

export const api = axios.create({
  baseURL: 'https://ixc.raimax.com.br/webservice/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Basic ' +
      Buffer.from(process.env.IXC_API_TOKEN || '').toString('base64'),
    get: {
      ixcsoft: 'listar',
    },
  },
})
