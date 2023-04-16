import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { WagmiConfig } from 'wagmi'
import { client } from '@/libs/wagmi'
import { Layout } from '@/components/Layout'
import { ChakraProvider } from '@chakra-ui/react'
import { options } from '@/libs/swr'
import { SWRConfig } from 'swr'

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return (
    <WagmiConfig client={client}>
      <ChakraProvider>
        <SWRConfig value={options}>
          {mounted && (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </SWRConfig>
      </ChakraProvider>
    </WagmiConfig>
  )
}
