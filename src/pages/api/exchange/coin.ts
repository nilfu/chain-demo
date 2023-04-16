import { NextApiRequest, NextApiResponse } from 'next'

import { Spot } from '@binance/connector'
import tunnel from 'tunnel'

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
    const agent = tunnel.httpsOverHttp({
      proxy: {
        host: '127.0.0.1',
        port: Number(proxy),
      },
    })
    const client = new Spot(apiKey, secretKey, {
      baseURL: 'https://api.binance.com',
      httpsAgent: agent,
    })

    client
      .account()
      .then((account) => {
        console.log(account)
      })
      .catch((error) => {
        console.log(error)
      })

    return res.status(200).json({ data: [1, 2] })
  } catch (err) {
    console.error('Error', err)
    return res.status(500).json({ code: 500, message: '未知错误' })
  }
}
