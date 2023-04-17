import { ActionIcon, Box, Flex, Title } from "@mantine/core"
import { Pencil, Plus } from "tabler-icons-react"
import { CareerInfoSectionWrapper } from "./style"

interface IInfoSectionProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}

const InfoSection: React.FC<IInfoSectionProps> = ({
  title,
  icon,
  children,
}) => {
  return (
    <CareerInfoSectionWrapper>
      <Flex justify="space-between" align="center" mb="lg">
        <Flex align="center" gap={4}>
          {icon}

          <Title order={3} fw={600}>
            {title}
          </Title>
        </Flex>

        <Flex gap="md">
          <ActionIcon variant="light" color="red">
            <Plus />
          </ActionIcon>
          <ActionIcon variant="light" color="red">
            <Pencil />
          </ActionIcon>
        </Flex>
      </Flex>

      {children}
    </CareerInfoSectionWrapper>
  )
}

export { InfoSection }
