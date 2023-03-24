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
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AppLayout } from "components/layout"
import { useAppDispatch } from "hooks/useAppDispatch"
import { setUser } from "store/reducers/authReducer"
import { setPersonalInfo } from "store/reducers/personReducer"
import { supabase } from "supabaseClient"
import { IPerson } from "types/person"
import { emailRule, passwordRule } from "utils/formRules"

interface ISignInFormValues {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState(false)
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

    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      showNotification({
        autoClose: 5000,
        color: "red",
        message: error.message,
      })
    } else {
      if (data.session && data.user) {
        // fetch personal info then set user & personal info in store
        const { data: personalInfo, error: personalInfoErr } = await supabase
          .from("personal_information")
          .select("*")
          .eq("student_id", data.user.id)

        const { birthdate, first_name, last_name, phone_number, email } =
          personalInfo![0]

        const person: IPerson = {
          firstName: first_name,
          lastName: last_name,
          birthdate,
          phoneNumber: phone_number,
          email,
        }

        dispatch(
          setUser({
            session: data.session,
            user: data.user,
          })
        )
        dispatch(setPersonalInfo({ person }))

        navigate("/dashboard/profile")
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

                  <Button
                    type="submit"
                    size="md"
                    variant="filled"
                    fullWidth
                    loading={loading}
                  >
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
