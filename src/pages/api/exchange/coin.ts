import { NextApiRequest, NextApiResponse } from 'next'

import { account, initAgent, initClient, withdraw } from '@/libs/binance'

type Response<T> =
  | {
      code: number
      message: string
      data?: T
    }
  | {
      result: any
    }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<any>>,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  try {
    const { apiKey, secretKey, minTime, maxTime, address } = req.body

    initAgent()
    initClient(apiKey, secretKey)

    let result: any[] = []
    const arr = address.split(/[(\r\n)\r\n]+/)
    for (let item of arr) {
      const time = (maxTime - minTime) * Math.random()
      const [addr, amount] = item.split(',')
      try {
        setTimeout(async () => {
          const res = await withdraw(addr, amount)
          if (res) {
            result.push(`${addr},${amount}`)
          }
        }, time)
      } catch (error) {
        result.push(`${addr},fail`)
      }
    }

    return res.status(200).json({ result })
  } catch (err) {
    console.error('Error', err)
    return res.status(500).json({ code: 500, message: '未知错误' })
  }
}
