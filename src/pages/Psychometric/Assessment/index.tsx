import { Box, Button, Container, Group, Loader, Progress } from "@mantine/core"
import { cleanNotifications, showNotification } from "@mantine/notifications"
import { useMe } from "hooks/useMe"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { supabase } from "supabaseClient"
import { AlertCircle, X } from "tabler-icons-react"
import { AssessmentSelect } from "./AssessmentSelect"

const defaultSum = {
  E: 0,
  I: 0,
  N: 0,
  S: 0,
  T: 0,
  J: 0,
  F: 0,
  P: 0,
}

const PAGE_SIZE = 10

interface IQuestion {
  id: string
  position: number
  type: string
  question: string
}

interface IValues {
  [key: number]: string[]
}

interface ISum {
  [key: string]: number
}

const Assessment: React.FC = () => {
  const user = useMe()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [questions, setQuestions] = useState<IQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState<number[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(10)
  const [values, setValues] = useState<IValues>({})
  const [totalSum, setTotalSum] = useState<ISum>(defaultSum)

  useEffect(() => {
    fetchTotal()
  }, [])

  useEffect(() => {
    fetchQuestions()
  }, [page])

  const fetchTotal = async () => {
    const { count, error } = await supabase
      .from("psychometric_questions")
      .select("*", { count: "exact", head: true })

    if (error) {
      showError(error.message)
    } else {
      setTotal(count ? count : 0)
    }
  }

  const fetchQuestions = async () => {
    setLoading(true)
    const startIndex = (page - 1) * PAGE_SIZE
    const endIndex = page * PAGE_SIZE - 1

    const { data, error } = await supabase
      .from("psychometric_questions")
      .select("*")
      .order("position")
      .range(startIndex, endIndex)

    if (error) {
      showError(error.message)
    } else {
      setQuestions(data as IQuestion[])
    }

    setLoading(false)
  }

  const progress = useMemo(() => {
    if (total) {
      return ((page - 1) / Math.ceil(total / PAGE_SIZE)) * 100
    }

    return 0
  }, [page, total])

  const handleSelectValues = useCallback(
    (position: number, type: string) => (values: string[]) => {
      if (!values.length) {
        return
      }

      setValues((prevValues) => ({
        ...prevValues,
        [position]: values.length > 1 ? [values[1]] : values,
      }))

      setTotalSum((prevSum) => {
        const [prev, current] = values

        return {
          ...prevSum,
          [type]: current
            ? prevSum[type] - Number(prev) + Number(current)
            : prevSum[type] + Number(prev),
        }
      })
    },
    []
  )

  const handleNext = () => {
    const hasError = questions.filter(({ position }) => !values[position])
    const errors = hasError.map(({ position }) => position)

    if (errors.length) {
      setErrors(errors)
      showNotification({
        color: "yellow",
        message: "Answer to all all question",
        icon: <AlertCircle size={20} />,
        autoClose: 2000,
      })
      return
    }

    setPage((prevPage) => prevPage + 1)
  }

  const handlePrev = () => {
    setPage((prevPage) => prevPage - 1)
  }

  const handleSubmit = async () => {
    showNotification({
      color: "blue",
      message: "Wait a second calculating your assessment...",
      loading: true,
      autoClose: false,
    })

    const result: string[] = []
    const pairs = [
      ["E", "I"],
      ["N", "S"],
      ["F", "T"],
      ["J", "P"],
    ]

    pairs.forEach((pair) => {
      const [first, second] = pair
      const decision = totalSum[first] > totalSum[second] ? first : second
      result.push(decision)
    })

    const payload: {
      id?: string
      student_id: string
      type: string
    } = {
      student_id: user!.id,
      type: result.join(""),
    }

    const id = params.get("lastId")

    if (id) {
      payload.id = id
    }

    const { error } = await supabase
      .from("psychometric_assessment")
      .upsert(payload)

    if (error) {
      showError(error.message)
    } else {
      navigate("/dashboard/psychometric/review/")
    }

    cleanNotifications()
  }

  const showError = (message: string) => {
    showNotification({
      color: "red",
      message,
      icon: <X />,
      autoClose: 2000,
    })
  }

  return (
    <Container size="sm">
      {loading ? (
        <Box ta="center">
          <Loader color="red" />
        </Box>
      ) : (
        <Box>
          <Progress
            value={progress}
            label={`${progress}%`}
            size="xl"
            radius="sm"
            mb="lg"
          />

          {questions.map(({ id, question, type, position }) => (
            <Box mb="lg" key={id}>
              <AssessmentSelect
                title={question}
                position={position}
                type={type}
                errors={errors}
                value={values[position]}
                onSelect={handleSelectValues}
              />
            </Box>
          ))}

          <Group position="center" mt="xl">
            {page !== 1 ? (
              <Button color="red" onClick={handlePrev}>
                Previous
              </Button>
            ) : null}

            {page === total / PAGE_SIZE ? (
              <Button color="red" onClick={handleSubmit}>
                Submit
              </Button>
            ) : (
              <Button color="red" onClick={handleNext}>
                Next
              </Button>
            )}
          </Group>
        </Box>
      )}
    </Container>
  )
}

export { Assessment }
