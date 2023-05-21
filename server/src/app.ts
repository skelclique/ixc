/* eslint-disable camelcase */
import { fetchContactSupport } from './services/contactSupportService'
import { fetchReturnSupport } from './services/supportReturn'
import { fetchCostumerName } from './services/costumerName'
import { syncSheet } from './services/googleSheets'
import { addSeconds } from 'date-fns'

interface ContactSupportProps {
  id: string
  name: string
  subject: 'CONTATO SUPORTE' | 'RETORNO'
}

let lastUpdate = {
  date: new Date().toISOString(),
  count: 0,
}

let nextUpdate = addSeconds(new Date(), 30).toISOString()

export async function updateGoogleSheets() {
  const servicesContactSupport = await fetchContactSupport()
  const servicesReturnSupport = await fetchReturnSupport()
  const sheet = await syncSheet('HOJE')

  const contactSupport: ContactSupportProps[] = []

  if (servicesContactSupport) {
    for (const serviceCall of servicesContactSupport) {
      const { id_cliente } = serviceCall

      contactSupport.push({
        id: id_cliente,
        name: await fetchCostumerName(id_cliente),
        subject: 'CONTATO SUPORTE',
      })
    }
  }

  if (servicesReturnSupport) {
    for (const serviceCall of servicesReturnSupport) {
      const { id_cliente } = serviceCall

      contactSupport.push({
        id: id_cliente,
        name: await fetchCostumerName(id_cliente),
        subject: 'RETORNO',
      })
    }
  }

  let counter = 0

  if (contactSupport.length) {
    const rows = await sheet.getRows()

    for (const serviceCall of contactSupport) {
      const alreadyOnSheet = rows.find((row) => row.ID === serviceCall.id)

      if (!alreadyOnSheet) {
        await sheet.addRow({
          ID: serviceCall.id,
          CLIENTE: serviceCall.name,
          'OBS.': serviceCall.subject,
        })

        counter++
      }
    }
  }

  lastUpdate = {
    date: new Date().toISOString(),
    count: counter,
  }

  nextUpdate = addSeconds(new Date(), 30).toISOString()
}

export function handleLog() {
  return {
    lastUpdate,
    nextUpdate,
  }
}

export async function main() {
  updateGoogleSheets()

  setInterval(() => {
    updateGoogleSheets()
  }, 30000)
}
