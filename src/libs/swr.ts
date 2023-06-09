import { SWRConfiguration } from 'swr'
import axios from 'axios'

const fetcher = async (url: string) => {
  return (await axios.get(url)).data
}

export const options: SWRConfiguration = {
  refreshInterval: 3000,
  fetcher,
}
