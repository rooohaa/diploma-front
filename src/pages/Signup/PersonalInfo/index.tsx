import { Box, Button, Card, Flex, Text, TextInput, Title } from "@mantine/core"
import { DatePicker } from "@mantine/dates"
import { useForm } from "@mantine/form"
import { IPersonalInfoFormValues } from "~/types/sign-up"
import { FormWrapper } from "../FormWrapper"

interface IPersonalInfoProps {
  onSubmit: (values: IPersonalInfoFormValues) => void
}

const PersonalInfo: React.FC<IPersonalInfoProps> = ({ onSubmit }) => {
  const form = useForm<IPersonalInfoFormValues>({
    initialValues: {
      fullName: "",
      lastName: "",
      birthDate: "",
      phoneNumber: "",
    },
  })

  const handleSubmit = (values: IPersonalInfoFormValues) => {
    onSubmit(values)
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
                placeholder="Enter fullname"
                label="Full Name"
                {...form.getInputProps("fullName")}
              />
            </Box>

            <Box sx={{ marginBottom: "16px" }}>
              <TextInput
                placeholder="Enter phone number"
                label="Phone Number"
                {...form.getInputProps("phoneNumber")}
              />
            </Box>

            <Box sx={{ marginBottom: "16px" }}>
              <DatePicker
                placeholder="Enter birthdate"
                label="Birth Date"
                {...form.getInputProps("birthDate")}
              />
            </Box>

            <Button type="submit" size="md" variant="filled" fullWidth>
              Next
            </Button>
          </Box>
        </Card>
      </Flex>
    </FormWrapper>
  )
}

export { PersonalInfo }
