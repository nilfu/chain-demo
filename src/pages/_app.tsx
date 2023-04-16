import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import { WagmiConfig } from 'wagmi'
import { client } from '@/libs/wagmi'
import { Layout } from '@/components/Layout'
import { ChakraProvider } from '@chakra-ui/react'

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return (
    <WagmiConfig client={client}>
      <ChakraProvider>
        {mounted && (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </ChakraProvider>
    </WagmiConfig>
  )
}
