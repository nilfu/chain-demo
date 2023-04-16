import { Connect } from './Connect'
import { Nav } from './Nav'

export const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <Nav />
      <Connect />
    </header>
  )
}
