import {
  Input,
  Button,
  HStack,
  useToast,
  Card,
  CardBody,
  Stack,
  Textarea,
} from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'
import * as xlsx from 'xlsx'

export default function Exchange() {
  const toast = useToast()
  const [apiKey, setApikey] = useState<string>(
    'nR5zitdSEoIlbNMrWlaO8vtPqbp3kg3p83C8058g8JPDV273SJ003Ms3Bq6Uz5aF',
  )
  const [secretKey, setSecretKey] = useState<string>(
    'CEpWtjO2hIW3L0ybNf80V7YgBOxwusJEJbaIasVhSxGhReDk1b86TlK4KnhY3f1h',
  )
  const [min, setMin] = useState<number>(0)
  const [max, setMax] = useState<number>(1)
  const [minTime, setMinTime] = useState<number>(0)
  const [maxTime, setMaxTime] = useState<number>(1)
  const [step, setStep] = useState<number>(0)
  const [address, setAddress] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [ret, setRet] = useState<any[]>([])

  const randomCoin = () => {
    const addArr = address.split(/[(\r\n)\r\n]+/)
    const temp = []
    for (let item of addArr) {
      if (item.includes(',')) {
        item = item.split(',')[0]
      }
      let count = ((max - min) * Math.random()).toFixed(step)
      item = item + `,${count}`
      temp.push(item)
    }
    setAddress(temp.join('\n'))
  }

  const readerExcel = (file: File) => {
    const fileReader = new FileReader()
    fileReader.readAsBinaryString(file)
    fileReader.onload = (event: any) => {
      try {
        const fileData = event.target.result
        const workbook = xlsx.read(fileData, {
          type: 'binary',
        })
        const wsname = workbook.SheetNames[0]
        const sheetJson = xlsx.utils.sheet_to_json(workbook.Sheets[wsname])
        byFile(sheetJson)
      } catch (e) {
        console.log(e)
        return false
      }
    }
  }

  const exportExcel = (
    array: any[],
    sheetName = '表1',
    fileName = '1.xlsx',
  ) => {
    const jsonWorkSheet = xlsx.utils.json_to_sheet(array)
    const workBook = {
      SheetNames: [sheetName],
      Sheets: {
        [sheetName]: jsonWorkSheet,
      },
    }
    return xlsx.writeFile(workBook, fileName)
  }

  const byFile = async (data: any) => {
    try {
      const res = await axios.post(`/api/upload/xlsx`, data)
      console.log(res)
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
        minTime,
        maxTime,
        address,
      })
      if (res.data.result) {
        setRet(res.data.result)
        // setRet([
        //   { address: '0x4E577819A23e81e4C1bf8F23CC5947AaEA3F37Ea', amount: 1 },
        // ])
      }
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
    <Card>
      <CardBody>
        <Stack gap={2}>
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
          <div className="flex w-full items-center justify-start gap-2">
            <p className="w-24">随机金额</p>
            <Input
              w={'20'}
              placeholder="请输入最小值"
              value={min}
              onChange={(e) => setMin(Number(e.target.value))}
            />
            -
            <Input
              w={'20'}
              placeholder="请输入最大值"
              value={max}
              onChange={(e) => setMax(Number(e.target.value))}
            />
            <p className="w-18 ml-4">小数点</p>
            <Input
              w={'20'}
              placeholder="请输入小数点"
              value={step}
              onChange={(e) => setStep(Number(e.target.value))}
            />
            <Button onClick={randomCoin}>生成随机金额</Button>
            <p className="ml-4 w-24">随机延迟(秒)</p>
            <Input
              w={'20'}
              placeholder="请输入最小值"
              value={minTime}
              onChange={(e) => setMinTime(Number(e.target.value))}
            />
            -
            <Input
              w={'20'}
              placeholder="请输入最大值"
              value={maxTime}
              onChange={(e) => setMaxTime(Number(e.target.value))}
            />
          </div>
          <div className="flex w-full items-center justify-between gap-2">
            <p className="w-24">转账地址</p>
            <Textarea
              placeholder="请输入转账地址"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={10}
            />
          </div>
          <HStack justifyContent={'flex-end'}>
            <Button
              disabled={isLoading}
              isLoading={isLoading}
              onClick={() => exportExcel(ret)}
            >
              下载表格
            </Button>
            {/* <input type="file" onChange={(e) => upload(e)} /> */}
            <Button disabled={isLoading} isLoading={isLoading} onClick={submit}>
              提币
            </Button>
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  )
}
