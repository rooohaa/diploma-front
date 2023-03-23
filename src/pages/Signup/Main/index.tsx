import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { showNotification } from "@mantine/notifications"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useAppDispatch } from "hooks/useAppDispatch"
import { setUser } from "store/reducers/authReducer"
import { supabase } from "supabaseClient"
import { IMainFormValues } from "types/sign-up"
import { emailRule, passwordRule } from "utils/formRules"
import { FormWrapper } from "../FormWrapper"

interface IMainProps {
  onSubmit: () => void
}

const Main: React.FC<IMainProps> = ({ onSubmit }) => {
  const [loading, setLoading] = useState(false)
  const form = useForm<IMainFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: emailRule,
      password: passwordRule,
    },
  })
  const dispatch = useAppDispatch()

  // Sign up (auth table)
  const handleSubmit = async ({ email, password }: IMainFormValues) => {
    setLoading(true)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      showNotification({
        message: error.message,
        autoClose: 5000,
        color: "red",
      })
    } else {
      // Implement signup
      const { user, session } = data

      if (user && session) {
        dispatch(setUser({ user, session }))

        // Go to next step;
        onSubmit()
      }
    }
  }

  return (
    <FormWrapper imagePath="sign-up_main.png">
      <Flex direction="column" justify="center" sx={{ width: "50%" }}>
        <Card shadow="xs" radius="md" withBorder>
          <Title sx={{ textAlign: "center", marginBottom: "28px" }}>
            Sign up
          </Title>

          <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
            <Box sx={{ marginBottom: "16px" }}>
              <TextInput
                type="email"
                placeholder="Enter email"
                label="Email"
                {...form.getInputProps("email")}
              />
            </Box>

            <Box sx={{ marginBottom: "16px" }}>
              <PasswordInput
                placeholder="Enter password"
                label="Password"
                description="Password must be more than 6 character"
                {...form.getInputProps("password")}
              />
            </Box>

            <Button
              type="submit"
              size="md"
              variant="filled"
              fullWidth
              loading={loading}
            >
              Next
            </Button>
          </Box>

          <Center sx={{ marginTop: "16px", gap: "10px" }}>
            <Text sx={{ textAlign: "center" }}>Already have an account?</Text>
            <Link to="/sign-in" style={{ textDecoration: "none" }}>
              <Text variant="link">Sign In</Text>
            </Link>
          </Center>
        </Card>
      </Flex>
    </FormWrapper>
  )
}

export { Main }
