import { ActionIcon, Card, Flex, Title, Tooltip } from "@mantine/core"
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

        <Tooltip label="Add info">
          <ActionIcon variant="filled" color="m-orange" onClick={onAdd}>
            <Plus />
          </ActionIcon>
        </Tooltip>
      </Flex>

      {children}
    </Card>
  )
}

export { CareerCard }
