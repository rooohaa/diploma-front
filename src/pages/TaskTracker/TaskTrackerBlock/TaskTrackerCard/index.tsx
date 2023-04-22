import { Box, Card, Text, Title } from "@mantine/core"
import dayjs from "dayjs"
import { ArrowUpRightCircle } from "tabler-icons-react"
import { ITask } from "types/task-tracker"
import { getColor } from "utils/task-tracker"

interface ITaskTrackerCardProps {
  content: ITask
  onClick: (id: string) => void
}

const TaskTrackerCard: React.FC<ITaskTrackerCardProps> = ({
  content,
  onClick,
}) => {
  const { id, title, deadline, status } = content

  return (
    <Card
      key={id}
      radius="md"
      pos="relative"
      bg={getColor(status)}
      sx={{
        cursor: "pointer",
      }}
      onClick={() => onClick(id)}
    >
      <Title order={3} fw={600} mb="md" w="80%">
        {title}
      </Title>

      <Text fw={500}>Deadline: {dayjs(deadline).format("DD/MM/YYYY")}</Text>

      <Box pos="absolute" top={10} right={10}>
        <ArrowUpRightCircle color="gray" />
      </Box>
    </Card>
  )
}

export { TaskTrackerCard }
