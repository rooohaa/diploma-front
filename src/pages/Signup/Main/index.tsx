import {
  Box,
  Button,
  Flex,
  PasswordInput,
  TextInput,
  Title,
  Center,
  Text,
  Card,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { FormWrapper } from "../FormWrapper"
import { Link } from "react-router-dom"
import { IMainFormValues } from "~/types/sign-up"
import { emailRule, passwordRule } from "~/utils/formRules";
import { supabase } from "~/supabaseClient";
import { showNotification } from "@mantine/notifications";

interface IMainProps {
  onSubmit: (values: IMainFormValues) => void
}

const Main: React.FC<IMainProps> = ({ onSubmit }) => {
  const form = useForm<IMainFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: emailRule,
      password: passwordRule,
    }
  })

  // Sign up (auth table)
  const handleSubmit = async (values: IMainFormValues) => {
    const { data, error } = await supabase.auth.signUp({
      ...values
    });

    if (error) {
      showNotification({
        message: error.message,
        autoClose: 5000,
        color: "red",
      });
    } else {
      // Implement signup
      const { user, session } = data;
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

            <Button type="submit" size="md" variant="filled" fullWidth>
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
