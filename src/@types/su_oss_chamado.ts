export type SuOSSChamado = {
  mensagem_resposta: string
  data_hora_analise: string
  data_hora_encaminhado: string
  data_hora_assumido: string
  data_hora_execucao: string
  id_contrato_kit: string
  preview: string
  data_agenda_final: string
  id: string
  tipo: 'C' | 'E'
  id_filial: string
  id_wfl_tarefa: string
  status_sla: string
  data_abertura: string
  melhor_horario_agenda: string
  liberado: string
  status: 'A' | 'AN' | 'EN' | 'AS' | 'AG' | 'DS' | 'EX' | 'F' | 'RAG'
  id_cliente: string
  id_assunto: string
  setor: string
  id_cidade: string
  id_tecnico: string
  prioridade: 'C' | 'A' | 'N' | 'B'
  mensagem: string
  protocolo: string
  endereco: string
  complemento: string
  bairro: string
  impresso: string
  data_inicio: string
  data_agenda: string
  latitude: string
  data_final: string
  longitude: string
  data_fechamento: string
  valor_total_comissao: string
  valor_total: string
  id_wfl_param_os: string
  idx: string
  id_su_diagnostico: string
  id_estrutura: string
  id_login: string
  valor_outras_despesas: string
  data_prazo_limite: string
  gera_comissao: string
  data_reservada: string
  valor_unit_comissao: string
  id_ticket: string
  origem_endereco: 'C' | 'L' | 'CC' | 'M'
  justificativa_sla_atrasado: string
  origem_endereco_estrutura: string
  data_reagendar: string
  data_prev_final: string
  origem_cadastro: string
  referencia: string
  apartamento: string
  bloco: string
  ultima_atualizacao: string
  id_condominio: string
}
