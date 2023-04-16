import { ReactNode } from 'react'
import { Header } from './Header'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container mx-auto h-screen">
      <Header />
      {children}
    </div>
  )
}
