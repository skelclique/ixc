import { ServiceCall } from '../@types/serviceCalls'
import { api } from '../lib/axios'

const requestContactSupport = JSON.stringify({
  qtype: 'su_oss_chamado.id_assunto',
  query: '73',
  oper: '=',
  grid_param: '[{"TB": "su_oss_chamado.status", "OP": "=", "P": "A"}]',
})

export async function fetchContactSupport() {
  const response = await api({
    url: 'su_oss_chamado',
    data: requestContactSupport,
  })

  const responseData: ServiceCall[] = response.data.registros

  return responseData
}
