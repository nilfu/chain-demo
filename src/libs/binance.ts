import { Spot } from '@binance/connector'
import tunnel from 'tunnel'

let agent: any
let client: any

export const initAgent = () => {
  agent = tunnel.httpsOverHttp({
    proxy: {
      host: '127.0.0.1',
      port: Number('10087'),
    },
  })
}

export const initClient = (apiKey: any, secretKey: any) => {
  client = new Spot(apiKey, secretKey, {
    baseURL: 'https://api.binance.com',
  })
}

export const account = () => {
  return client.account()
}

export const withdraw = async (address: any, amount: any) => {
  return client.withdraw('ETH', address, amount, {
    network: 'ETH',
    walletType: 0,
  })
}
