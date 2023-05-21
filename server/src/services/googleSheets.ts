import { GoogleSpreadsheet } from 'google-spreadsheet'
import 'dotenv/config'

const credentials = require('../../credentials.json')

export async function syncDocument() {
  const document = new GoogleSpreadsheet(
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
  )

  await document.useServiceAccountAuth({
    client_email: credentials.client_email,
    private_key: credentials.private_key.replace(/\\n/g, '\n'),
  })

  await document.loadInfo()

  return document
}

export async function syncSheet(title: string) {
  const document = await syncDocument()

  const sheet = document.sheetsByTitle[title]

  return sheet
}
