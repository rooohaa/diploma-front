import { ActionIcon, Flex, Title } from "@mantine/core"
import { Plus } from "tabler-icons-react"
import { InfoSectionWrapper } from "./style"

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
    <InfoSectionWrapper>
      <Flex justify="space-between" align="center" p="xs">
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
        </Flex>
      </Flex>

      {children}
    </InfoSectionWrapper>
  )
}

export { InfoSection }
