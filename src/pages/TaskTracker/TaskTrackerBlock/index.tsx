import { Flex } from "@mantine/core"
import { ITask, TTaskStatus } from "types/task-tracker"
import { TaskTrackerCard } from "./TaskTrackerCard"

interface ITaskTrackerBlockProps {
  tasks: ITask[]
  onTaskClick: (id: string) => void
}

const TaskTrackerBlock: React.FC<ITaskTrackerBlockProps> = ({
  tasks,
  onTaskClick,
}) => {
  return (
    <Flex direction="column" gap={8}>
      {tasks.map((task) => (
        <TaskTrackerCard key={task.id} content={task} onClick={onTaskClick} />
      ))}
    </Flex>
  )
}

export { TaskTrackerBlock }
