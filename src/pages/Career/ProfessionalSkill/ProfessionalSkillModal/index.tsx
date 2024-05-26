import { Box, Button, Drawer, Modal, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useEffect } from "react"
import { requiredRule } from "utils/formRules"
import { v4 as uuid } from "uuid"

export interface IProfessionalSkill {
  id: string
  skill_name: string
}

interface IProfessionalSkillModalProps {
  opened: boolean
  onClose: () => void
  onCreate: (data: IProfessionalSkill) => void
}

const ProfessionalSkillModal: React.FC<IProfessionalSkillModalProps> = ({
  opened,
  onCreate,
  onClose,
}) => {
  const form = useForm<IProfessionalSkill>({
    initialValues: {
      id: "",
      skill_name: "",
    },
    validate: {
      skill_name: requiredRule,
    },
  })

  useEffect(() => {
    form.reset()
  }, [opened])

  const handleSubmit = (values: IProfessionalSkill) => {
    const payload = {
      ...values,
      id: uuid(),
    }

    onCreate(payload)
  }

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Add Skills"
      position="right"
      padding="md"
      size="lg"
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box sx={{ marginBottom: "16px" }}>
          <TextInput
            withAsterisk
            placeholder="Enter skill name"
            label="Skill"
            {...form.getInputProps("skill_name")}
          />
        </Box>

        <Button type="submit" fullWidth>
          Save
        </Button>
      </form>
    </Drawer>
  )
}

export { ProfessionalSkillModal }
