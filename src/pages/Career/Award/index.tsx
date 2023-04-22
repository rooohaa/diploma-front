import { Container, Flex, Loader, Text } from "@mantine/core"
import { Award as AwardIcon, X } from "tabler-icons-react"
import { CareerCardItem } from "components/ui/CareerCardItem"
import { CareerCard } from "components/ui/CareerCard"
import { AwardModal, IAward } from "./AwardModal"
import { useDisclosure } from "@mantine/hooks"
import { useEffect, useState } from "react"
import { useMe } from "hooks/useMe"
import { supabase } from "supabaseClient"
import { showNotification } from "@mantine/notifications"
import { formatDate } from "utils/helpers"

const Award: React.FC = () => {
  const user = useMe()
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false)
  const [loading, { open: openLoading, close: closeLoading }] =
    useDisclosure(true)
  const [awards, setAwards] = useState<IAward[]>([])
  const [initialValues, setInitialValues] = useState<IAward | null>(null)

  useEffect(() => {
    if (user) {
      fetchAwards()
    }
  }, [user])

  const fetchAwards = async () => {
    openLoading()

    const { data, error } = await supabase
      .from("award")
      .select("id, award_name, description, issuer, date")
      .eq("student_id", user?.id)

    if (error) {
      showError(error.message)
    } else {
      setAwards(data)
    }

    closeLoading()
  }

  const handleCreate = async (award: IAward) => {
    const { error } = await supabase.from("award").insert([
      {
        student_id: user?.id,
        ...award,
      },
    ])

    if (error) {
      showError(error.message)
      return
    }

    const copy = [...awards]
    copy.push(award)
    setAwards(copy)
    closeModal()
  }

  const handleUpdate = async (award: IAward) => {
    const { id, ...updateData } = award

    const { error } = await supabase
      .from("award")
      .update([updateData])
      .eq("id", id)

    if (error) {
      showError(error.message)
      return
    }

    const copy = [...awards]
    const index = copy.findIndex(({ id }) => id === award.id)
    copy[index] = award
    setAwards(copy)
    closeModal()
  }

  const handleDelete = async (awardId: string) => {
    const { error } = await supabase.from("award").delete().eq("id", awardId)

    if (error) {
      showError(error.message)
      return
    }

    const copy = awards.filter(({ id }) => id !== awardId)
    setAwards(copy)
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
    const award = awards.find((item) => item.id === id)

    if (award) {
      openModal()
      setInitialValues(award)
    }
  }

  const renderItems = (item: IAward) => {
    const { id, award_name, description, issuer, date } = item
    const awardDate = formatDate(date, "DD MMM YYYY")

    const content = {
      id,
      title: award_name,
      subtitle: issuer,
      duriation: awardDate,
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
          <CareerCard title="Award" icon={<AwardIcon />} onAdd={handleAdd}>
            {awards.length ? (
              awards.map(renderItems)
            ) : (
              <Text ta="center">Go ahead and add your award</Text>
            )}
          </CareerCard>
        </Container>
      )}

      <AwardModal
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

export { Award }
