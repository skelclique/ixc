import { useEffect, useState } from 'react'
import { api } from './lib/axios'

import { Clock, SpinnerGap, UserPlus } from 'phosphor-react'
import { differenceInSeconds, format } from 'date-fns'

import './styles/global.css'
import { ptBR } from 'date-fns/locale'

interface DataProps {
  lastUpdate: {
    date: string
    count: number
  }
  nextUpdate: string
}

export function App() {
  const [data, setData] = useState<DataProps | null>(null)
  const [active, setActive] = useState(false)
  const [amountSecondsRemaining, setAmountSecondsRemaining] = useState(0)

  async function fetchData() {
    const response = await api.get('/')

    setData(response.data)
    setAmountSecondsRemaining(
      differenceInSeconds(new Date(response.data.nextUpdate), new Date()),
    )
    setActive(true)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    let cycleInterval: number
    if (active && data) {
      cycleInterval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(data.nextUpdate),
          new Date(),
        )

        if (secondsDifference <= 1) {
          clearInterval(cycleInterval)
          setActive(false)
          fetchData()
        } else {
          setAmountSecondsRemaining((state) => state - 1)
        }
      }, 1000)
    }

    return () => {
      clearInterval(cycleInterval)
    }
  }, [active])

  if (!data) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <SpinnerGap className="text-2xl animate-spin" />
      </div>
    )
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
      <div className="bg-white flex flex-col items-center justify-center rounded-lg px-16 py-8 gap-2 border border-neutral-100">
        <div className="flex items-center text-gray-700 font-mono">
          <span className="text-7xl">00</span>
          <span className="text-5xl">:</span>
          <span className="text-7xl">
            {String(amountSecondsRemaining).padStart(2, '0')}
          </span>
        </div>
        <div className="text-xs font-mono">próxima atualização</div>
      </div>
      <div className="flex gap-8">
        <div className="flex items-center gap-1.5">
          <UserPlus className="text-xl" />
          <span title="clientes adicionados" className="text-sm">
            {data.lastUpdate.count}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="text-xl" />
          <span
            className="text-sm"
            title={format(
              new Date(data.lastUpdate.date),
              'dd/MM/yyyy HH:mm:ss',
              {
                locale: ptBR,
              },
            )}
          >
            {format(new Date(data.lastUpdate.date), 'HH:mm:ss', {
              locale: ptBR,
            })}
          </span>
        </div>
      </div>
    </div>
  )
}
