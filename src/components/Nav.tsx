import Link from 'next/link'
import { useRouter } from 'next/router'

export const Nav = () => {
  const { route } = useRouter()
  return (
    <nav className="flex items-center justify-center">
      <Link
        className={`px-4 py-6 ${route === '/create-wallet' ? 'font-bold' : ''}`}
        href="/create-wallet"
      >
        创建钱包
      </Link>
      <Link
        className={`px-4 py-6 ${route === '/exchange' ? 'font-bold' : ''}`}
        href="/exchange"
      >
        提币
      </Link>
    </nav>
  )
}
