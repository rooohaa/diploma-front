import { Button, Flex, Grid, Stack } from "@mantine/core"
import { useState } from "react"
import { ITask, ITaskModalValue, TTaskStatus } from "types/task-tracker"
import { TaskTrackerWrapper } from "./style"
import { TaskTrackerBlock } from "./TaskTrackerBlock"
import { modalDefaultValues, TaskTrackerModal } from "./TaskTrackerModal"
import { useDisclosure } from "@mantine/hooks"
import { Card, Text, Box, Paper } from "@mantine/core"
import { getColor } from "utils/task-tracker"

interface IBlock {
  type: TTaskStatus
  name: string
}

const blocks: IBlock[] = [
  {
    type: "todo",
    name: "Todo",
  },
  {
    type: "progress",
    name: "In Progress",
  },
  {
    type: "completed",
    name: "Completed",
  },
]

const TaskTracker: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const [tasks, setTasks] = useState<ITask[]>([])

  const [modalValues, setModalValues] = useState<ITaskModalValue>({
    mode: "create",
    value: modalDefaultValues,
  })

  const filterTasks = (type: TTaskStatus) => {
    return tasks.filter(({ status }) => status === type)
  }

  const handleCreate = () => {
    setModalValues({
      mode: "create",
      value: modalDefaultValues,
    })

    open()
  }

  const handleUpdate = (cardId: string) => {
    const task = tasks.find(({ id }) => id === cardId)

    if (task) {
      setModalValues({
        mode: "update",
        value: task,
      })

      open()
    }
  }

  const handleSave = (task: ITask, isEdit: boolean) => {
    const copy = [...tasks]

    if (!isEdit) {
      copy.push(task)
    } else {
      const index = tasks.findIndex(({ id }) => id === task.id)
      copy[index] = task
    }

    setTasks(copy)
  }

  return (
    <>
      <Box ta="right" mb="sm">
        <Button onClick={handleCreate}>Create</Button>
      </Box>

      <TaskTrackerWrapper>
        <Grid>
          {blocks.map(({ type, name }) => (
            <Grid.Col key={type} span={4}>
              <Card radius="md">
                <Flex justify="space-between" align="center">
                  <Text fw={500}>{name}</Text>

                  <Paper
                    w={12}
                    h={12}
                    radius="lg"
                    shadow="sm"
                    bg={getColor(type)}
                  />
                </Flex>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        <Grid>
          {blocks.map(({ type }) => (
            <Grid.Col key={type} span={4}>
              <TaskTrackerBlock
                tasks={filterTasks(type)}
                onTaskClick={handleUpdate}
              />
            </Grid.Col>
          ))}
        </Grid>
      </TaskTrackerWrapper>

      <TaskTrackerModal
        opened={opened}
        formValues={modalValues}
        onClose={close}
        onSave={handleSave}
      />
    </>
  )
}

export { TaskTracker }
