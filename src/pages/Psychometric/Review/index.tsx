import {
  Box,
  Button,
  Container,
  Flex,
  Loader,
  Text,
  Title,
} from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import { useMe } from "hooks/useMe"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "supabaseClient"
import { X } from "tabler-icons-react"

interface IReview {
  id: string
  type: string
  career: string
  relationship: string
  education: string
  strengthsAndWeaknesses: string
  personalGrowth: string
}

const Review: React.FC = () => {
  const user = useMe()
  const [loading, setLoading] = useState(true)
  const [review, setReview] = useState<IReview | null>(null)

  useEffect(() => {
    if (user) {
      fetchData()
    }
  }, [user])

  const fetchData = async () => {
    setLoading(true)

    const { data: assessmentData, error: assessmentError } = await supabase
      .from("psychometric_assessment")
      .select("id, type")
      .eq("student_id", user!.id)

    if (assessmentError) {
      showError(assessmentError.message)
      return
    }

    if (assessmentData.length) {
      const { data: adviceData, error: adviceError } = await supabase
        .from("psychometric_advices")
        .select(
          ` career,
        relationship,
        education,
        strengthsAndWeaknesses,
          personalGrowth
        `
        )
        .eq("id", assessmentData[0].type)

      if (adviceError) {
        showError(adviceError.message)
        return
      }

      setReview({
        ...assessmentData[0],
        ...adviceData[0],
      })
    }

    setLoading(false)
  }

  const showError = (message: string) => {
    showNotification({
      color: "red",
      message,
      icon: <X />,
      autoClose: 2000,
    })
  }

  const renderReview = () => {
    if (loading) {
      return <Loader />
    }

    if (review) {
      return (
        <>
          <Box mb="md">
            <Title>{review?.type}</Title>
            <Text>Your psychometric type</Text>
          </Box>

          <Box mb="md">
            <Title order={4} ta="left" mb="sm" color="indigo">
              Career
            </Title>
            <Text ta="left">{review?.career}</Text>
          </Box>

          <Box mb="md">
            <Title order={4} ta="left" mb="sm" color="pink">
              Relationship
            </Title>
            <Text ta="left">{review?.relationship}</Text>
          </Box>

          <Box mb="md">
            <Title order={4} ta="left" mb="sm" color="green">
              Education
            </Title>
            <Text ta="left">{review?.education}</Text>
          </Box>

          <Box mb="md">
            <Title order={4} ta="left" mb="sm" color="violet">
              Strengths and Weaknesses
            </Title>
            <Text ta="left">{review?.strengthsAndWeaknesses}</Text>
          </Box>

          <Box mb="md">
            <Title order={4} ta="left" mb="sm" color="orange">
              Personal growth
            </Title>
            <Text ta="left">{review?.personalGrowth}</Text>
          </Box>
        </>
      )
    }

    return (
      <>
        <Title order={2} mb="md">
          You didn't take the test so go ahead!
        </Title>

        <img src="/assets/images/assessment-begin.png" alt="assessment-begin" />
      </>
    )
  }

  return (
    <Container size="md" ta="center">
      <Flex>
        <Box ta="center" w="100%">
          {renderReview()}
        </Box>

        <Button
          component={Link}
          to={{
            pathname: `/dashboard/psychometric/assessment`,
            search: review?.id ? `lastId=${review.id}` : "",
          }}
        >
          Take the test
        </Button>
      </Flex>
    </Container>
  )
}

export { Review }
