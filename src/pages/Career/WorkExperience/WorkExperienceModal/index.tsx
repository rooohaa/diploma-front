import { Box, Button, Modal, TextInput, Textarea } from "@mantine/core"
import { DatePicker } from "@mantine/dates"
import { useForm } from "@mantine/form"
import dayjs from "dayjs"
import { useEffect } from "react"
import { dateRule, requiredRule } from "utils/formRules"
import { formatDate } from "utils/helpers"
import { v4 as uuid } from "uuid"

export interface IWorkExperience {
  id: string
  company_name: string
  position: string
  description: string
  start_date: Date | string | null
  end_date: Date | string | null
}

interface IWorkExperienceModalProps {
  opened: boolean
  initialValues: IWorkExperience | null
  onCreate: (data: IWorkExperience) => void
  onUpdate: (data: IWorkExperience) => void
  onDelete: (id: string) => void
  onClose: () => void
}

const WorkExperienceModal: React.FC<IWorkExperienceModalProps> = ({
  opened,
  initialValues,
  onCreate,
  onUpdate,
  onDelete,
  onClose,
}) => {
  const form = useForm<IWorkExperience>({
    initialValues: {
      id: "",
      company_name: "",
      position: "",
      description: "",
      start_date: "",
      end_date: "",
    },
    validate: {
      company_name: requiredRule,
      position: requiredRule,
      description: requiredRule,
      start_date: dateRule,
      end_date: dateRule,
    },
  })

  const isEdit = initialValues !== null
  const title = isEdit ? "Update work experience" : "Add work experience"

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

  const handleSubmit = (values: IWorkExperience) => {
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
            placeholder="Enter company name"
            label="Company name"
            {...form.getInputProps("company_name")}
          />
        </Box>

        <Box sx={{ marginBottom: "16px" }}>
          <TextInput
            withAsterisk
            placeholder="Enter position"
            label="Position"
            {...form.getInputProps("position")}
          />
        </Box>

        <Box sx={{ marginBottom: "16px" }}>
          <Textarea
            withAsterisk
            placeholder="Enter description"
            label="Description"
            {...form.getInputProps("description")}
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

        <Button color="red" type="submit" fullWidth>
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

export { WorkExperienceModal }
