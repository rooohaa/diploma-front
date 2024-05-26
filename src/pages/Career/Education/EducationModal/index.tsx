import { Box, Button, Modal, TextInput } from "@mantine/core"
import { DatePicker } from "@mantine/dates"
import { useForm } from "@mantine/form"
import dayjs from "dayjs"
import { useEffect } from "react"
import { dateRule, requiredRule } from "utils/formRules"
import { formatDate } from "utils/helpers"
import { v4 as uuid } from "uuid"

export interface IEducation {
  id: string
  university_name: string
  major: string
  degree: string
  start_date: Date | string | null
  end_date: Date | string | null
}

interface IEducationModalProps {
  opened: boolean
  initialValues: IEducation | null
  onCreate: (data: IEducation) => void
  onUpdate: (data: IEducation) => void
  onDelete: (id: string) => void
  onClose: () => void
}

const EducationModal: React.FC<IEducationModalProps> = ({
  opened,
  initialValues,
  onCreate,
  onUpdate,
  onDelete,
  onClose,
}) => {
  const form = useForm<IEducation>({
    initialValues: {
      id: "",
      university_name: "",
      major: "",
      degree: "",
      start_date: "",
      end_date: "",
    },
    validate: {
      university_name: requiredRule,
      major: requiredRule,
      degree: requiredRule,
      start_date: dateRule,
      end_date: dateRule,
    },
  })

  const isEdit = initialValues !== null
  const title = isEdit ? "Update education" : "Add education"

  useEffect(() => {
    if (initialValues) {
      const { start_date, end_date } = initialValues

      form.setValues({
        ...initialValues,
        start_date: dayjs(start_date).toDate(),
        end_date: dayjs(end_date).toDate(),
      })
    } else {
      form.reset()
    }
  }, [initialValues])

  const handleSubmit = (values: IEducation) => {
    const data = {
      ...values,
      start_date: formatDate(values.start_date),
      end_date: formatDate(values.end_date),
    }

    if (!isEdit) {
      data.id = uuid()
      onCreate(data)
    } else {
      onUpdate(data)
    }
  }

  return (
    <Modal opened={opened} onClose={onClose} title={title} centered>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box sx={{ marginBottom: "16px" }}>
          <TextInput
            withAsterisk
            placeholder="Enter university name"
            label="University"
            {...form.getInputProps("university_name")}
          />
        </Box>

        <Box sx={{ marginBottom: "16px" }}>
          <TextInput
            withAsterisk
            placeholder="Enter major"
            label="Major"
            {...form.getInputProps("major")}
          />
        </Box>

        <Box sx={{ marginBottom: "16px" }}>
          <TextInput
            withAsterisk
            placeholder="Enter degree"
            label="Degree"
            {...form.getInputProps("degree")}
          />
        </Box>

        <Box sx={{ marginBottom: "16px" }}>
          <DatePicker
            placeholder="Enter start date"
            label="Start Date"
            required
            hideOutsideDates
            {...form.getInputProps("start_date")}
          />
        </Box>

        <Box sx={{ marginBottom: "16px" }}>
          <DatePicker
            placeholder="Enter end date"
            label="End Date"
            required
            hideOutsideDates
            {...form.getInputProps("end_date")}
          />
        </Box>

        <Button type="submit" fullWidth>
          Save
        </Button>

        {isEdit ? (
          <Button
            color="red"
            mt="xs"
            fullWidth
            variant="outline"
            onClick={() => onDelete(initialValues.id)}
          >
            Delete
          </Button>
        ) : null}
      </form>
    </Modal>
  )
}

export { EducationModal }
