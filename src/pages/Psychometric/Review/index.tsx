import { Badge, Button, Container, Text, Title } from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import { useMe } from "hooks/useMe"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "supabaseClient"
import { X } from "tabler-icons-react"

interface IPersonality {
  id: string
  answer: string
  type: string
}

const Review: React.FC = () => {
  const user = useMe()
  const [personality, setPersonality] = useState<IPersonality | null>(null)
  console.log(personality)
  useEffect(() => {
    if (user) {
      fetchPersonality()
    }
  }, [user])

  const fetchPersonality = async () => {
    const { data, error } = await supabase
      .from("psychometric_assesment")
      .select("*")
      .eq("student_id", user!.id)

    if (error) {
      showError(error.message)
    } else {
      setPersonality(data[0] as IPersonality)
    }
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
    <Container size="sm" ta="center">
      {personality ? (
        <Title order={3} mb="lg">
          {personality.answer}
        </Title>
      ) : (
        <Text mb="lg">You didn't take the test so go ahead!</Text>
      )}

      <Button
        variant="light"
        color="red"
        component={Link}
        to="/dashboard/psychometric/assessment"
      >
        Take the test
      </Button>
    </Container>
  )
}

export { Review }
