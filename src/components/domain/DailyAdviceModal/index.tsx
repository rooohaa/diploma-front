import { Blockquote, Button, Flex, Loader, Modal, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useDailyAdvice } from "hooks/useDailyAdvice"
import { useState } from "react"

const DailyAdviceModal: React.FC = () => {
  // Check if advice was seen for today already
  const [adviceSeen] = useState(() => {
    const today = new Date().getDate()
    const adviceSeenDay = localStorage.getItem("adviceSeenDay")

    if (adviceSeenDay) {
      if (+adviceSeenDay === today) {
        return true
      } else {
        localStorage.removeItem("adviceSeenDay")
        return false
      }
    }

    return false
  })

  const [opened, { close }] = useDisclosure(!adviceSeen)
  const { advice, loading } = useDailyAdvice(adviceSeen)

  const handleClose = () => {
    localStorage.setItem("adviceSeenDay", new Date().getDate().toString())
    close()
  }

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      withCloseButton={false}
      centered
    >
      {loading ? (
        <Flex align="center" justify="center">
          <Loader />
        </Flex>
      ) : (
        <Flex direction="column" align="center" rowGap={4}>
          <Text
            fw={700}
            tt="uppercase"
            align="center"
            variant="gradient"
            gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
          >
            Daily Advice #{advice?.id}
          </Text>

          <Blockquote cite="– Someone unknown">{advice?.advice}</Blockquote>

          <Button
            size="md"
            fullWidth
            variant="gradient"
            gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
            radius="md"
            onClick={handleClose}
          >
            Got it!
          </Button>
        </Flex>
      )}
    </Modal>
  )
}

export { DailyAdviceModal }
