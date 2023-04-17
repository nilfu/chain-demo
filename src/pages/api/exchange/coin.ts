import { NextApiRequest, NextApiResponse } from 'next'

import { Spot } from '@binance/connector'
import tunnel from 'tunnel'
import { account, initAgent, initClient } from '@/libs/binance'

type Response<T> =
  | {
      code: number
      message: string
      data?: T
    }
  | {
      data: any
    }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<null>>,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  try {
    const { apiKey, secretKey, proxy, min, max, address } = req.body

    initAgent(proxy)
    initClient(apiKey, secretKey)

    try {
      const res = await account()
      console.log(res)
    } catch (e) {
      console.log(e)
    }

    return res.status(200).json({ data: [1, 2] })
  } catch (err) {
    console.error('Error', err)
    return res.status(500).json({ code: 500, message: '未知错误' })
  }
}
