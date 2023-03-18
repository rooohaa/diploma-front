import { Box, Button, Text } from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Check } from "tabler-icons-react"
import { useAppDispatch } from "~/hooks/useAppDispatch"
import { useMe } from "~/hooks/useMe"
import { setUser } from "~/store/reducers/authReducer"
import { setPersonalInfo } from "~/store/reducers/personReducer"
import { supabase } from "~/supabaseClient"
import { IPerson } from "~/types/person"

const Last: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()
  const user = useMe()

  useEffect(() => {
    setLoading(true)

    fetchPersonalInfo()
      .then(() => {
        showNotification({
          title: "Successfully signed up!",
          message: "Now, you are ready to start your journey!",
          autoClose: 5000,
          color: "teal",
          icon: <Check />,
        })
      })
      .finally(() => setLoading(false))
  }, [])

  const fetchPersonalInfo = async () => {
    const { data: personalInfo } = await supabase
      .from("personal_information")
      .select("*")
      .eq("student_id", user?.id)

    const { birthdate, first_name, last_name, phone_number, email } =
      personalInfo![0]

    const person: IPerson = {
      firstName: first_name,
      lastName: last_name,
      birthdate,
      phoneNumber: phone_number,
      email,
    }

    dispatch(setPersonalInfo({ person }))
  }

  return (
    <Box>
      <Box sx={{ margin: "50px 0", textAlign: "center" }}>
        <img
          src="/assets/images/sign-up_last.png"
          alt="Congratulation"
          style={{ maxHeight: "400px", height: "100%", objectFit: "cover" }}
        />
      </Box>

      <Box sx={{ marginBottom: "20px" }}>
        <Text ta="center">
          You can <em>edit</em> your profile anytime!
        </Text>
      </Box>

      <Box sx={{ marginBottom: "20px" }}>
        <Button
          to="/dashboard"
          component={Link}
          size="lg"
          maw={500}
          m="auto"
          fullWidth
          variant="gradient"
          gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
          uppercase
          radius="xl"
          disabled={loading}
        >
          Done
        </Button>
      </Box>
    </Box>
  )
}

export { Last }
