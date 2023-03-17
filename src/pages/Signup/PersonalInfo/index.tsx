import { Box, Button, Card, Flex, NumberInput, Text, TextInput, Title } from "@mantine/core"
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
      age: null,
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
              <NumberInput
                placeholder="Enter age"
                label="Age"
                min={18}
                max={100}
                {...form.getInputProps("age")}
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
