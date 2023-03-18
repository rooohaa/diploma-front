import {
  Button,
  Flex,
  Container,
  Box,
  Title,
  TextInput,
  PasswordInput,
  Text,
  Center,
  Card,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { showNotification } from "@mantine/notifications"
import { Link, useNavigate } from "react-router-dom"
import { AppLayout } from "~/components"
import { useAppDispatch } from "~/hooks/useAppDispatch"
import { setUser } from "~/store/reducers/authReducer"
import { supabase } from "~/supabaseClient"
import { emailRule, passwordRule } from "~/utils/formRules"

interface ISignInFormValues {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const form = useForm<ISignInFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: emailRule,
      password: passwordRule,
    },
  })

  // Login
  const handleSubmit = async (values: ISignInFormValues) => {
    const { email, password } = values
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      showNotification({
        autoClose: 5000,
        color: "red",
        message: error.message,
      })
    } else {
      if (data.session && data.user) {
        dispatch(
          setUser({
            session: data.session,
            user: data.user,
          })
        )
        navigate("/dashboard")
      }
    }
  }

  return (
    <AppLayout isAuthHeader={true}>
      <Container size="lg">
        <Box sx={{ paddingTop: "100px" }}>
          <Flex gap={50}>
            <Box sx={{ width: "50%" }}>
              <img
                src="/assets/images/sign-in.png"
                alt="SignIn intro"
                style={{
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>

            <Flex direction="column" justify="center" sx={{ width: "50%" }}>
              <Card shadow="xs" radius="md" withBorder>
                <Title sx={{ textAlign: "center", marginBottom: "28px" }}>
                  Sign in
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

                  <Button type="submit" size="md" variant="filled" fullWidth>
                    Sign in
                  </Button>
                </Box>

                <Center sx={{ marginTop: "20px", gap: "10px" }}>
                  <Text sx={{ textAlign: "center" }}>
                    Don’t have an account?
                  </Text>
                  <Link to="/sign-up" style={{ textDecoration: "none" }}>
                    <Text variant="link">Sign Up</Text>
                  </Link>
                </Center>
              </Card>
            </Flex>
          </Flex>
        </Box>
      </Container>
    </AppLayout>
  )
}

export { SignIn }
