import { Container, Flex, Loader, Text } from "@mantine/core"
import { Briefcase, X } from "tabler-icons-react"
import { CareerCardItem } from "components/ui/CareerCardItem"
import { CareerCard } from "components/ui/CareerCard"
import { IWorkExperience, WorkExperienceModal } from "./WorkExperienceModal"
import { useDisclosure } from "@mantine/hooks"
import { useMe } from "hooks/useMe"
import { useEffect, useState } from "react"
import { supabase } from "supabaseClient"
import { showNotification } from "@mantine/notifications"
import { formatDate } from "utils/helpers"

const WorkExperience: React.FC = () => {
  const user = useMe()
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false)
  const [loading, { open: openLoading, close: closeLoading }] =
    useDisclosure(true)
  const [workExperiences, setWorkExperiences] = useState<IWorkExperience[]>([])
  const [initialValues, setInitialValues] = useState<IWorkExperience | null>(
    null
  )

  useEffect(() => {
    if (user) {
      fetchWorkExperience()
    }
  }, [user])

  const fetchWorkExperience = async () => {
    openLoading()

    const { data, error } = await supabase
      .from("work_experience")
      .select("id, company_name, position, description, start_date, end_date")
      .eq("student_id", user?.id)

    if (error) {
      showError(error.message)
    } else {
      setWorkExperiences(data)
    }

    closeLoading()
  }

  const handleCreate = async (workExperience: IWorkExperience) => {
    const { error } = await supabase.from("work_experience").insert([
      {
        student_id: user?.id,
        ...workExperience,
      },
    ])

    if (error) {
      showError(error.message)
      return
    }

    const copy = [...workExperiences]
    copy.push(workExperience)
    setWorkExperiences(copy)
    closeModal()
  }

  const handleUpdate = async (workExperience: IWorkExperience) => {
    const { id, ...updateData } = workExperience

    const { error } = await supabase
      .from("work_experience")
      .update([updateData])
      .eq("id", id)

    if (error) {
      showError(error.message)
      return
    }

    const copy = [...workExperiences]
    const index = copy.findIndex(({ id }) => id === workExperience.id)
    copy[index] = workExperience
    setWorkExperiences(copy)
    closeModal()
  }

  const handleDelete = async (workExperienceId: string) => {
    const { error } = await supabase
      .from("work_experience")
      .delete()
      .eq("id", workExperienceId)

    if (error) {
      showError(error.message)
      return
    }

    const copy = workExperiences.filter(({ id }) => id !== workExperienceId)
    setWorkExperiences(copy)
    closeModal()
  }

  const showError = (message: string) => {
    showNotification({
      color: "red",
      message,
      icon: <X />,
      autoClose: 2000,
    })
  }

  const handleAdd = () => {
    openModal()

    if (initialValues) {
      setInitialValues(null)
    }
  }

  const handleInitialValues = (id: string) => {
    const workExperience = workExperiences.find((item) => item.id === id)

    if (workExperience) {
      openModal()
      setInitialValues(workExperience)
    }
  }

  const renderItems = (item: IWorkExperience) => {
    const { id, company_name, position, description, start_date, end_date } =
      item
    const startDate = formatDate(start_date, "MMM YYYY")
    const endDate = formatDate(end_date, "MMM YYYY")

    const content = {
      id,
      title: company_name,
      subtitle: position,
      duriation: `${startDate} - ${endDate}`,
      extra: description,
    }

    return (
      <CareerCardItem key={id} content={content} onEdit={handleInitialValues} />
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
            title="Work experience"
            icon={<Briefcase />}
            onAdd={handleAdd}
          >
            {workExperiences.length ? (
              workExperiences.map(renderItems)
            ) : (
              <Text ta="center">Go ahead and add your work experience</Text>
            )}
          </CareerCard>
        </Container>
      )}

      <WorkExperienceModal
        opened={opened}
        initialValues={initialValues}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onClose={closeModal}
      />
    </>
  )
}

export { WorkExperience }
