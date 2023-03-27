import {
  Box,
  Button,
  Modal,
  SegmentedControl,
  Textarea,
  TextInput,
} from "@mantine/core"
import { DatePicker } from "@mantine/dates"
import { useForm } from "@mantine/form"
import dayjs from "dayjs"
import { useEffect } from "react"
import { ITask, ITaskModalValue } from "types/task-tracker"
import { dateRule, requiredRule } from "utils/formRules"
import { v4 as uuid } from "uuid"

interface ITaskTrackerModalProps {
  opened: boolean
  formValues: ITaskModalValue
  onClose: () => void
  onSave: (task: ITask) => void
  onDelete: (id: string) => void
}

export const modalDefaultValues: ITask = {
  id: "",
  title: "",
  description: "",
  deadline: new Date(),
  status: "todo",
}

const TaskTrackerModal: React.FC<ITaskTrackerModalProps> = ({
  opened,
  formValues,
  onClose,
  onSave,
  onDelete,
}) => {
  const isEdit = formValues.mode === "update"
  const id = formValues.value.id

  const form = useForm<ITask>({
    initialValues: modalDefaultValues,
    validate: {
      title: requiredRule,
      description: requiredRule,
      deadline: dateRule,
    },
  })

  useEffect(() => {
    if (!opened) {
      form.reset()
    }
  }, [opened])

  useEffect(() => {
    const { deadline, status } = formValues.value

    if (!isEdit) {
      form.setValues({ status })
      return
    }

    form.setValues({
      ...formValues.value,
      deadline: dayjs(deadline).toDate(),
    })
  }, [formValues])

  const handleSubmit = (values: ITask) => {
    const data = {
      ...values,
      deadline: dayjs(values.deadline).format("YYYY-MM-DD"),
    }

    if (!isEdit) {
      data.id = uuid()
    }

    onSave(data)
    onClose()
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isEdit ? "Update task" : "Create task"}
      centered
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box sx={{ marginBottom: "16px" }}>
          <TextInput
            withAsterisk
            placeholder="Enter title"
            label="Title"
            {...form.getInputProps("title")}
          />
        </Box>

        <Box sx={{ marginBottom: "16px" }}>
          <Textarea
            withAsterisk
            minRows={4}
            maxRows={6}
            placeholder="Enter description"
            label="Description"
            {...form.getInputProps("description")}
          />
        </Box>

        <Box sx={{ marginBottom: "16px" }}>
          <DatePicker
            placeholder="Enter deadline"
            label="Deadline"
            required
            hideOutsideDates
            minDate={new Date()}
            {...form.getInputProps("deadline")}
          />
        </Box>

        <Box sx={{ marginBottom: "16px" }}>
          <SegmentedControl
            disabled={!isEdit}
            fullWidth
            data={[
              { label: "Todo", value: "todo" },
              { label: "In Progress", value: "progress" },
              { label: "Completed", value: "completed" },
            ]}
            {...form.getInputProps("status")}
          />
        </Box>

        <Button type="submit" fullWidth>
          Save
        </Button>

        {isEdit ? (
          <Button
            mt="xs"
            fullWidth
            variant="outline"
            onClick={() => onDelete(id)}
          >
            Delete
          </Button>
        ) : null}
      </form>
    </Modal>
  )
}

export { TaskTrackerModal }
