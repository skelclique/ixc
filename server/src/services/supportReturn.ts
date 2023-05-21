import { ServiceCall } from '../@types/serviceCalls'
import { api } from '../lib/axios'

const requestReturnSupport = JSON.stringify({
  qtype: 'su_oss_chamado.id_assunto',
  query: '45',
  oper: '=',
  grid_param: '[{"TB": "su_oss_chamado.status", "OP": "=", "P": "A"}]',
})

export async function fetchReturnSupport() {
  const response = await api({
    url: 'su_oss_chamado',
    data: requestReturnSupport,
  })

  const responseData: ServiceCall[] = response.data.registros

  return responseData
}
