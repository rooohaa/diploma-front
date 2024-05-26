import { Box, Button, Modal, TextInput, Textarea } from "@mantine/core"
import { DatePicker } from "@mantine/dates"
import { useForm } from "@mantine/form"
import dayjs from "dayjs"
import { useEffect } from "react"
import { dateRule, requiredRule } from "utils/formRules"
import { formatDate } from "utils/helpers"
import { v4 as uuid } from "uuid"

export interface IAward {
  id: string
  award_name: string
  description: string
  issuer: string
  date: Date | string | null
}

interface IAwardModalProps {
  opened: boolean
  initialValues: IAward | null
  onCreate: (data: IAward) => void
  onUpdate: (data: IAward) => void
  onDelete: (id: string) => void
  onClose: () => void
}

const AwardModal: React.FC<IAwardModalProps> = ({
  opened,
  initialValues,
  onCreate,
  onUpdate,
  onDelete,
  onClose,
}) => {
  const form = useForm<IAward>({
    initialValues: {
      id: "",
      award_name: "",
      description: "",
      issuer: "",
      date: "",
    },
    validate: {
      award_name: requiredRule,
      description: requiredRule,
      issuer: requiredRule,
      date: dateRule,
    },
  })

  const isEdit = initialValues !== null
  const title = isEdit ? "Update award" : "Add award"

  useEffect(() => {
    if (initialValues) {
      const { date } = initialValues

      form.setValues({
        ...initialValues,
        date: dayjs(date).toDate(),
      })
    } else {
      form.reset()
    }
  }, [initialValues])

  const handleSubmit = (values: IAward) => {
    const data = {
      ...values,
      date: formatDate(values.date),
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
            placeholder="Enter award name"
            label="Award"
            {...form.getInputProps("award_name")}
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
          <TextInput
            withAsterisk
            placeholder="Enter issuer"
            label="Issuer"
            {...form.getInputProps("issuer")}
          />
        </Box>

        <Box sx={{ marginBottom: "16px" }}>
          <DatePicker
            placeholder="Enter date"
            label="Date"
            required
            hideOutsideDates
            {...form.getInputProps("date")}
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

export { AwardModal }
