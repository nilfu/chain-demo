import { useState } from 'react'
import { ethers } from 'ethers'
import { utils, writeFile } from 'xlsx'
import {
  Input,
  Button,
  HStack,
  Stack,
  VStack,
  Box,
  useClipboard,
  Card,
} from '@chakra-ui/react'

export default function CreateWallet() {
  const [generateNum, setGenerateNum] = useState<number>(10)
  const [wallets, setWallets] = useState<ethers.Wallet[]>([])
  const { onCopy, value, setValue, hasCopied } = useClipboard('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const generate = () => {
    const _wallets: ethers.Wallet[] = []
    setIsLoading(true)
    setTimeout(() => {
      for (let i = 0; i < generateNum; i++) {
        const wallet = ethers.Wallet.createRandom()
        _wallets.push(wallet)
      }
      setWallets(_wallets)
      setIsLoading(false)
    }, 300)
  }

  const exports = () => {
    const book = utils.book_new()
    const data = wallets.map(
      ({ address, publicKey, privateKey, mnemonic: { phrase } }) => ({
        address,
        publicKey,
        privateKey,
        phrase,
      }),
    )
    const sheet = utils.json_to_sheet(data)
    sheet['!cols'] = [
      {
        wch: 50,
      },
      {
        wch: 140,
      },
      {
        wch: 70,
      },
      {
        wch: 80,
      },
    ]
    utils.book_append_sheet(book, sheet)
    writeFile(book, 'demo.xlsx')
  }

  return (
    <section>
      <HStack>
        <Input
          type="number"
          value={generateNum}
          placeholder="请输入生成数量"
          max={100}
          onChange={(e) => {
            setGenerateNum(Number(e.target.value))
          }}
        />
        <Button onClick={generate} disabled={isLoading} isLoading={isLoading}>
          批量生成
        </Button>
        {wallets.length > 0 && <Button onClick={exports}>下载表格</Button>}
      </HStack>
      {wallets.length > 0 &&
        wallets.map((wallet) => {
          return (
            <Card key={wallet.address} className="my-2 space-y-2 p-4">
              <div className="flex items-center gap-2">
                <p className="w-12">地址</p>
                <Input className="flex-1" value={wallet.address} readOnly />
                <Button
                  onClick={() => {
                    setValue(wallet.address)
                    onCopy()
                  }}
                >
                  {hasCopied && value === wallet.address ? '复制成功!' : '复制'}
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <p className="w-12">公钥</p>
                <Input className="flex-1" value={wallet.publicKey} readOnly />
                <Button
                  onClick={() => {
                    setValue(wallet.publicKey)
                    onCopy()
                  }}
                >
                  {hasCopied && value === wallet.publicKey
                    ? '复制成功!'
                    : '复制'}
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <p className="w-12">私钥</p>
                <Input className="flex-1" value={wallet.privateKey} readOnly />
                <Button
                  onClick={() => {
                    setValue(wallet.privateKey)
                    onCopy()
                  }}
                >
                  {hasCopied && value === wallet.privateKey
                    ? '复制成功!'
                    : '复制'}
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <p className="w-12">助记词</p>
                <Input
                  className="flex-1"
                  value={wallet.mnemonic.phrase}
                  readOnly
                />
                <Button
                  onClick={() => {
                    setValue(wallet.mnemonic.phrase)
                    onCopy()
                  }}
                >
                  {hasCopied && value === wallet.mnemonic.phrase
                    ? '复制成功!'
                    : '复制'}
                </Button>
              </div>
            </Card>
          )
        })}
    </section>
  )
}
