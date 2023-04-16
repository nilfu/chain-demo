import { Input, Button, VStack, HStack, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'

export default function Exchange() {
  const toast = useToast()
  const [apiKey, setApikey] = useState<string>(
    'nR5zitdSEoIlbNMrWlaO8vtPqbp3kg3p83C8058g8JPDV273SJ003Ms3Bq6Uz5aF',
  )
  const [secretKey, setSecretKey] = useState<string>(
    'CEpWtjO2hIW3L0ybNf80V7YgBOxwusJEJbaIasVhSxGhReDk1b86TlK4KnhY3f1h',
  )
  const [proxy, setProxy] = useState<string>('7890')
  const [min, setMin] = useState<number>(0)
  const [max, setMax] = useState<number>(1)
  const [address, setAddress] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const importData = async () => {
    try {
      const res = await axios.post(`/api/upload/xlsx`)
    } catch (e) {
      toast({
        title: '上传失败',
        status: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const submit = async () => {
    try {
      const res = await axios.post(`/api/exchange/coin`, {
        apiKey,
        secretKey,
        proxy,
        min,
        max,
        address,
      })
    } catch (e) {
      toast({
        title: '提交失败',
        status: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section>
      <VStack gap={2}>
        <div className="flex w-full items-center justify-between gap-2">
          <p className="w-24">apiKey</p>
          <Input
            placeholder="请输入apiKey"
            value={apiKey}
            onChange={(e) => setApikey(e.target.value)}
          />
        </div>
        <div className="flex w-full items-center justify-between gap-2">
          <p className="w-24">secretKey</p>
          <Input
            placeholder="请输入secretKey"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
          />
        </div>
        <div className="flex w-full items-center justify-between gap-2">
          <p className="w-24">代理地址</p>
          <Input
            placeholder="请输入代理地址"
            value={proxy}
            onChange={(e) => setProxy(e.target.value)}
          />
        </div>
        <div className="flex w-full items-center justify-between gap-2">
          <p className="w-24">最大值</p>
          <Input
            placeholder="请输入最大值"
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
          />
        </div>
        <div className="flex w-full items-center justify-between gap-2">
          <p className="w-24">最小值</p>
          <Input
            placeholder="请输入最小值"
            value={min}
            onChange={(e) => setMin(Number(e.target.value))}
          />
        </div>
        <div className="flex w-full items-center justify-between gap-2">
          <p className="w-24">转账地址</p>
          <Input
            placeholder="请输入转账地址"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <HStack>
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            onClick={importData}
          >
            上传表格
          </Button>
          <Button disabled={isLoading} isLoading={isLoading} onClick={submit}>
            提交
          </Button>
        </HStack>
      </VStack>
    </section>
  )
}
