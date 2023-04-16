import { NextApiRequest, NextApiResponse } from 'next'

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
    return res.status(200).json({ data: [1, 2, 3] })
  } catch (err) {
    console.error('Error', err)
    return res.status(500).json({ code: 500, message: '未知错误' })
  }
}
