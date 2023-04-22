import { Box, Button, Modal, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
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

  const handleSubmit = (values: IProfessionalSkill) => {
    const payload = {
      ...values,
      id: uuid(),
    }

    onCreate(payload)
  }

  return (
    <Modal opened={opened} onClose={onClose} title="Add Skills" centered>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box sx={{ marginBottom: "16px" }}>
          <TextInput
            withAsterisk
            placeholder="Enter skill name"
            label="Skill"
            {...form.getInputProps("skill_name")}
          />
        </Box>

        <Button color="red" type="submit" fullWidth>
          Save
        </Button>
      </form>
    </Modal>
  )
}

export { ProfessionalSkillModal }
