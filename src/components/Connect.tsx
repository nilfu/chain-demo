import { useAccount, useConnect, useDisconnect } from 'wagmi'

import { InjectedConnector } from 'wagmi/connectors/injected'

export const Connect = () => {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  if (isConnected)
    return (
      <div>
        地址:{address}
        <button onClick={() => disconnect()}>断开连接</button>
      </div>
    )
  return <button onClick={() => connect()}>连接钱包</button>
}
