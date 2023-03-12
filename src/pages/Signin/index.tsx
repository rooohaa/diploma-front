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
import { Link } from "react-router-dom"
import { AppLayout } from "~/components"
import { emailRule, passwordRule } from "~/utils/formRules"

interface ISignInFormValues {
  email: string
  password: string
}

const SignIn: React.FC = () => {
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

  const handleSubmit = (values: ISignInFormValues) => {
    console.log(values)
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
