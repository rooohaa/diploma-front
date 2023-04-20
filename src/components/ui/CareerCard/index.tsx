import { ActionIcon, Card, Flex, Title } from "@mantine/core"
import { Plus } from "tabler-icons-react"

interface ICareerCardProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  onAdd: () => void
}

const CareerCard: React.FC<ICareerCardProps> = ({
  title,
  icon,
  children,
  onAdd,
}) => {
  return (
    <Card shadow="xs" p="md" radius="md">
      <Flex justify="space-between" align="center" p="xs">
        <Flex align="center" gap={4}>
          {icon}

          <Title order={3} fw={600}>
            {title}
          </Title>
        </Flex>

        <Flex gap="md">
          <ActionIcon variant="light" color="red" onClick={onAdd}>
            <Plus />
          </ActionIcon>
        </Flex>
      </Flex>

      {children}
    </Card>
  )
}

export { CareerCard }
