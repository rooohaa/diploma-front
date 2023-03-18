import { Box, Button, Card, Flex, Text, TextInput, Title } from "@mantine/core"
import { DatePicker } from "@mantine/dates"
import { useForm } from "@mantine/form"
import dayjs from "dayjs"
import { useState } from "react"
import { useAppSelector } from "~/hooks/useAppSelector"
import { selectUser } from "~/store/reducers/authReducer"
import { supabase } from "~/supabaseClient"
import { IPersonalInfoFormValues } from "~/types/sign-up"
import { FormWrapper } from "../FormWrapper"

interface IPersonalInfoProps {
  onSubmit: () => void
}

const PersonalInfo: React.FC<IPersonalInfoProps> = ({ onSubmit }) => {
  const [loading, setLoading] = useState(false)
  const form = useForm<IPersonalInfoFormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      birthdate: null,
      phoneNumber: "",
    },
  })
  const user = useAppSelector(selectUser)

  const handleSubmit = async (values: IPersonalInfoFormValues) => {
    const { firstName, lastName, birthdate, phoneNumber } = values

    const payload = {
      student_id: user?.id,
      email: user?.email,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      birthdate: dayjs(birthdate).format("YYYY-MM-DD"),
    }

    setLoading(true)

    const { error } = await supabase
      .from("personal_information")
      .insert([payload])

    setLoading(false)

    if (!error) {
      onSubmit()
    }
  }

  return (
    <FormWrapper imagePath="sign-up_personal-info.png">
      <Flex direction="column" justify="center" sx={{ width: "50%" }}>
        <Card shadow="xs" radius="md" withBorder>
          <Box sx={{ textAlign: "center", marginBottom: "28px" }}>
            <Title>Sign up</Title>

            <Text fz="lg" component="h3">
              Personal information
            </Text>
          </Box>

          <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
            <Box sx={{ marginBottom: "16px" }}>
              <TextInput
                placeholder="Enter firstname"
                label="First Name"
                required
                {...form.getInputProps("firstName")}
              />
            </Box>

            <Box sx={{ marginBottom: "16px" }}>
              <TextInput
                placeholder="Enter lastname"
                label="Last Name"
                required
                {...form.getInputProps("lastName")}
              />
            </Box>

            <Box sx={{ marginBottom: "16px" }}>
              <TextInput
                placeholder="Enter phone number"
                label="Phone Number"
                required
                {...form.getInputProps("phoneNumber")}
              />
            </Box>

            <Box sx={{ marginBottom: "16px" }}>
              <DatePicker
                placeholder="Enter birthdate"
                label="Birth Date"
                required
                {...form.getInputProps("birthdate")}
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
        </Card>
      </Flex>
    </FormWrapper>
  )
}

export { PersonalInfo }
