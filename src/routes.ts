import { FastifyInstance } from 'fastify'
import { api } from './axios'

import { GoogleSpreadsheet } from 'google-spreadsheet'

require('dotenv').config()

const credentials = require('../credentials.json')

const spreadsheetId = process.env.SPREADSHEETID

interface ContactSupport {
  id: string
  name: string
  subject: string
}

async function fetchContactSupport() {
  const fetchContactSupport = await api.get('/su_oss_chamado', {
    headers: {
      ixcsoft: 'listar',
    },
    data: JSON.stringify({
      qtype: 'su_oss_chamado.id_assunto',
      query: '73',
      oper: '=',
      page: '1',
      rp: '200',
      sortname: 'su_oss_chamado.status',
      sortorder: 'asc',
      grid_param: '[{"TB": "su_oss_chamado.status", "OP": "=", "P": "A"}]',
    }),
  })

  const contactSupportData = fetchContactSupport.data.registros

  const filteredContactSupport = contactSupportData.filter(
    (item: any) => item.status === 'a'.toUpperCase(),
  )

  return filteredContactSupport
}

async function fetchSupportReturn() {
  const fetchSupportReturn = await api.get('/su_oss_chamado', {
    headers: {
      ixcsoft: 'listar',
    },
    data: {
      qtype: 'su_oss_chamado.id_assunto',
      query: '45',
      oper: '=',
      page: '1',
      rp: '200',
      sortname: 'su_oss_chamado.status',
      sortorder: 'asc',
    },
  })

  const supportReturnData = fetchSupportReturn.data.registros

  const filteredSupportReturnData = supportReturnData.filter(
    (item: any) => item.status === 'a'.toUpperCase(),
  )

  return filteredSupportReturnData
}

async function fetchCostumerName(id: string) {
  const fetchClient = await api.get('/cliente', {
    headers: {
      ixcsoft: 'listar',
    },
    data: {
      qtype: 'cliente.id',
      query: id,
      oper: '=',
      page: '1',
      rp: '20',
      sortname: 'cliente.id',
      sortorder: 'desc',
    },
  })

  const clientData = fetchClient.data.registros

  return clientData[0].razao
}

async function updateSheet() {
  console.log('fetching data...')
  const contactSupport: ContactSupport[] = []
  const filteredContactSupport = await fetchContactSupport()
  const filteredSupportReturnData = await fetchSupportReturn()

  const document = new GoogleSpreadsheet(spreadsheetId)

  await document.useServiceAccountAuth({
    client_email: credentials.client_email,
    private_key: credentials.private_key.replace(/\\n/g, '\n'),
  })

  await document.loadInfo()

  const sheet = document.sheetsByTitle.HOJE

  for (const serviceCall of filteredContactSupport) {
    contactSupport.push({
      id: serviceCall.id_cliente,
      name: '',
      subject: 'CONTATO SUPORTE',
    })
  }

  for (const serviceCall of filteredSupportReturnData) {
    contactSupport.push({
      id: serviceCall.id_cliente,
      name: '',
      subject: 'RETORNO',
    })
  }

  for (const serviceCall of contactSupport) {
    const name = await fetchCostumerName(serviceCall.id)

    serviceCall.name = name
  }

  let countNewCostumers = 0

  for (const serviceCall of contactSupport) {
    await sheet.getRows().then((rows) => {
      const rowFounded = rows.find((row) => row.CLIENTE === serviceCall.name)

      if (!rowFounded) {
        sheet.addRow({
          CLIENTE: serviceCall.name,
          'OBS.': serviceCall.subject,
        })
        countNewCostumers++
      }
    })
  }

  console.log('spreadsheet updated!')
  console.log('costumers added: ' + countNewCostumers)
}

async function main() {
  await updateSheet()

  setInterval(async () => {
    await updateSheet()
  }, 300000)
}

export async function routes(app: FastifyInstance) {}

main()
