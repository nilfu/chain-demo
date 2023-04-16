import { Input, Button, HStack, VStack } from '@chakra-ui/react'
import { useState } from 'react'
export default function Exchange() {
  const [apiKey, setApikey] = useState<string>(
    'nR5zitdSEoIlbNMrWlaO8vtPqbp3kg3p83C8058g8JPDV273SJ003Ms3Bq6Uz5aF',
  )
  const [secretKey, setSecretKey] = useState<string>(
    'CEpWtjO2hIW3L0ybNf80V7YgBOxwusJEJbaIasVhSxGhReDk1b86TlK4KnhY3f1h',
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)

  return (
    <section>
      <VStack gap={2}>
        <Input
          placeholder="请输入apiKey"
          value={apiKey}
          onChange={(e) => setApikey(e.target.value)}
        />
        <Input
          placeholder="请输入secretKey"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
        />
        <Button>提交</Button>
      </VStack>
    </section>
  )
}
