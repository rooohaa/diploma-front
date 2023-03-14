import {
  Box,
  Button,
  Flex,
  Select,
  Text,
  TextInput,
  Title,
  NumberInput,
  Card,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { IAcademicPerformanceFormValues } from "~/types/sign-up"
import { FormWrapper } from "../FormWrapper"
import { majorOptions } from "./mock"

interface IAcademicInfoProps {
  onSubmit: (values: IAcademicPerformanceFormValues) => void
}

const AcademicInfo: React.FC<IAcademicInfoProps> = ({ onSubmit }) => {
  const form = useForm<IAcademicPerformanceFormValues>({
    initialValues: {
      major: "",
      faculty: "",
      gpa: "",
    },
  })

  const handleSubmit = (values: IAcademicPerformanceFormValues) => {
    onSubmit(values)
  }

  return (
    <FormWrapper imagePath="sign-up_academic-performance.png">
      <Flex direction="column" justify="center" sx={{ width: "50%" }}>
        <Card shadow="xs" radius="md" withBorder>
          <Box sx={{ textAlign: "center", marginBottom: "28px" }}>
            <Title>Sign up</Title>

            <Text fz="lg" component="h3">
              Academic performance
            </Text>
          </Box>

          <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
            <Box sx={{ marginBottom: "16px" }}>
              <Select
                label="Major"
                placeholder="Pick major"
                data={majorOptions}
                searchable
                nothingFound="Major not found"
              />
            </Box>

            <Box sx={{ marginBottom: "16px" }}>
              <TextInput
                placeholder="Enter faculty"
                label="Faculty"
                {...form.getInputProps("faculty")}
              />
            </Box>

            <Box sx={{ marginBottom: "16px" }}>
              <NumberInput
                placeholder="Enter GPA"
                label="GPA"
                precision={2}
                min={0}
                max={4}
                {...form.getInputProps("gpa")}
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

export { AcademicInfo }
