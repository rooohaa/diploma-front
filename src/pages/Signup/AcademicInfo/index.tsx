import {
  Box,
  Button,
  Flex,
  Text,
  TextInput,
  Title,
  NumberInput,
  Card,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { useState } from "react"
import { useAppSelector } from "hooks/useAppSelector"
import { selectUser } from "store/reducers/authReducer"
import { supabase } from "supabaseClient"
import { IAcademicPerformanceFormValues } from "types/sign-up"
import { FormWrapper } from "../FormWrapper"

interface IAcademicInfoProps {
  onSubmit: () => void
}

const AcademicInfo: React.FC<IAcademicInfoProps> = ({ onSubmit }) => {
  const user = useAppSelector(selectUser)
  const [loading, setLoading] = useState(false)
  const form = useForm<IAcademicPerformanceFormValues>({
    initialValues: {
      advisor: "",
      faculty: "",
      gpa: "",
    },
  })

  const handleSubmit = async (values: IAcademicPerformanceFormValues) => {
    const payload = {
      ...values,
      student_id: user?.id,
    }

    setLoading(true)

    const { error } = await supabase
      .from("academic_information")
      .insert([payload])

    setLoading(false)

    if (!error) {
      onSubmit()
    }
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
              <TextInput
                placeholder="Enter faculty"
                label="Faculty"
                required
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
                required
                {...form.getInputProps("gpa")}
              />
            </Box>

            <Box sx={{ marginBottom: "16px" }}>
              <TextInput
                placeholder="Enter your advisor name"
                label="Advisor"
                required
                {...form.getInputProps("advisor")}
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

export { AcademicInfo }
