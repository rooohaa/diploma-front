import axios from "axios"
import { useEffect, useState } from "react"

interface IAdvice {
  id: number
  advice: string
}

export function useDailyAdvice(adviceSeen: boolean) {
  const [loading, setLoading] = useState(false)
  const [advice, setAdvice] = useState<IAdvice | null>(null)

  useEffect(() => {
    if (!adviceSeen) {
      fetchDailyAdvice()
    }
  }, [])

  const fetchDailyAdvice = async () => {
    setLoading(true)

    try {
      const { data, status } = await axios.get(
        "https://api.adviceslip.com/advice"
      )

      if (status === 200) {
        setAdvice(data.slip)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return { advice, loading }
}
