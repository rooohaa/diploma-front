import { Container, Flex, Loader, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { showNotification } from "@mantine/notifications"
import { CareerCard } from "components/ui/CareerCard"
import { CareerCardItem } from "components/ui/CareerCardItem"
import { useMe } from "hooks/useMe"
import { useEffect, useState } from "react"
import { supabase } from "supabaseClient"
import { Book2, X } from "tabler-icons-react"
import { formatDate } from "utils/helpers"
import { EducationModal, IEducation } from "./EducationModal"

const Education: React.FC = () => {
  const user = useMe()
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false)
  const [loading, { open: openLoading, close: closeLoading }] =
    useDisclosure(true)
  const [educations, setEducations] = useState<IEducation[]>([])
  const [initialValues, setInitialValues] = useState<IEducation | null>(null)

  useEffect(() => {
    if (user) {
      fetchEducations()
    }
  }, [user])

  const fetchEducations = async () => {
    openLoading()

    const { data, error } = await supabase
      .from("education")
      .select("id, university_name, major, degree, start_date, end_date")
      .eq("student_id", user?.id)

    if (error) {
      showNotification({
        color: "red",
        message: error.message,
        icon: <X />,
        autoClose: 3000,
      })
    } else {
      setEducations(data)
    }

    closeLoading()
  }

  const showError = (message: string) => {
    showNotification({
      color: "red",
      message,
      icon: <X />,
      autoClose: 2000,
    })
  }

  const handleCreate = async (education: IEducation) => {
    const { error } = await supabase.from("education").insert([
      {
        student_id: user?.id,
        ...education,
      },
    ])

    if (error) {
      showError(error.message)
      return
    }

    const copy = [...educations]
    copy.push(education)
    setEducations(copy)
    closeModal()
  }

  const handleUpdate = async (education: IEducation) => {
    const { id, ...updateData } = education

    const { error } = await supabase
      .from("education")
      .update([updateData])
      .eq("id", id)

    if (error) {
      showError(error.message)
      return
    }

    const copy = [...educations]
    const index = copy.findIndex(({ id }) => id === education.id)
    copy[index] = education
    setEducations(copy)
    closeModal()
  }

  const handleDelete = async (educationId: string) => {
    const { error } = await supabase
      .from("education")
      .delete()
      .eq("id", educationId)

    if (error) {
      showError(error.message)
      return
    }

    const copy = educations.filter(({ id }) => id !== educationId)
    setEducations(copy)
    closeModal()
  }

  const handleAdd = () => {
    openModal()

    if (initialValues) {
      setInitialValues(null)
    }
  }

  const handleInitialValues = (id: string) => {
    const education = educations.find((item) => item.id === id)

    if (education) {
      openModal()
      setInitialValues(education)
    }
  }

  const renderEducationItems = (item: IEducation) => {
    const { id, university_name, major, degree, start_date, end_date } = item
    const startDate = formatDate(start_date, "MMM YYYY")
    const endDate = formatDate(end_date, "MMM YYYY")

    const content = {
      id,
      title: university_name,
      subtitle: `${degree}, ${major}`,
      duriation: `${startDate} - ${endDate}`,
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
          <CareerCard title="Education" icon={<Book2 />} onAdd={handleAdd}>
            {educations.length ? (
              educations.map(renderEducationItems)
            ) : (
              <Text ta="center">Go ahead and add your education</Text>
            )}
          </CareerCard>
        </Container>
      )}

      <EducationModal
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

export { Education }
