import {
  Container,
  Badge,
  Flex,
  Loader,
  Text,
  Button,
  ActionIcon,
} from "@mantine/core"
import { Puzzle, X } from "tabler-icons-react"
import { CareerCard } from "components/ui/CareerCard"
import {
  IProfessionalSkill,
  ProfessionalSkillModal,
} from "./ProfessionalSkillModal"
import { useMe } from "hooks/useMe"
import { useDisclosure } from "@mantine/hooks"
import { useEffect, useState } from "react"
import { supabase } from "supabaseClient"
import { showNotification } from "@mantine/notifications"

const ProfessionalSkill: React.FC = () => {
  const user = useMe()
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false)
  const [loading, { open: openLoading, close: closeLoading }] =
    useDisclosure(true)
  const [skills, setSkills] = useState<IProfessionalSkill[]>([])

  useEffect(() => {
    if (user) {
      fetchSkills()
    }
  }, [user])

  const fetchSkills = async () => {
    openLoading()

    const { data, error } = await supabase
      .from("professional_skill")
      .select("id, skill_name")
      .eq("student_id", user?.id)

    if (error) {
      showError(error.message)
    } else {
      setSkills(data)
    }

    closeLoading()
  }

  const handleCreate = async (skill: IProfessionalSkill) => {
    const { error } = await supabase.from("professional_skill").insert([
      {
        student_id: user?.id,
        ...skill,
      },
    ])

    if (error) {
      showError(error.message)
      return
    }

    const copy = [...skills]
    copy.push(skill)
    setSkills(copy)
    closeModal()
  }

  const handleDelete = async (skillId: string) => {
    const { error } = await supabase
      .from("professional_skill")
      .delete()
      .eq("id", skillId)

    if (error) {
      showError(error.message)
      return
    }

    const copy = skills.filter(({ id }) => id !== skillId)
    setSkills(copy)
  }

  const showError = (message: string) => {
    showNotification({
      color: "red",
      message,
      icon: <X />,
      autoClose: 2000,
    })
  }

  const renderItems = (item: IProfessionalSkill) => {
    const { id, skill_name } = item

    return (
      <Badge
        key={id}
        variant="gradient"
        size="lg"
        sx={{ paddingRight: 3, textTransform: "none" }}
        gradient={{ from: "orange", to: "red" }}
        rightSection={
          <ActionIcon
            size="xs"
            color="yellow"
            radius="xl"
            variant="subtle"
            onClick={() => handleDelete(id)}
          >
            <X size={13} />
          </ActionIcon>
        }
      >
        {skill_name}
      </Badge>
    )
  }

  return (
    <>
      {loading ? (
        <Flex justify="center" align="center" w="100%" h="100%">
          <Loader />
        </Flex>
      ) : (
        <Container size="md">
          <CareerCard
            title="Professional Skill"
            icon={<Puzzle />}
            onAdd={openModal}
          >
            {skills.length ? (
              <Flex mt="md" gap={8} wrap="wrap">
                {skills.map(renderItems)}
              </Flex>
            ) : (
              <Text ta="center">
                Go ahead and add your work professional skill
              </Text>
            )}
          </CareerCard>
        </Container>
      )}

      <ProfessionalSkillModal
        opened={opened}
        onCreate={handleCreate}
        onClose={closeModal}
      />
    </>
  )
}

export { ProfessionalSkill }
