import { api } from '../lib/axios'

export async function fetchCostumerName(id: string) {
  const response = await api({
    url: 'cliente',
    data: {
      qtype: 'cliente.id',
      oper: '=',
      query: id,
    },
  })

  return response.data.registros[0].razao
}
