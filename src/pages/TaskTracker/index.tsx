import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  LoadingOverlay,
  Paper,
  Text,
  Title,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { showNotification } from "@mantine/notifications"
import { useMe } from "hooks/useMe"
import { useEffect, useState } from "react"
import { supabase } from "supabaseClient"
import { X } from "tabler-icons-react"
import { ITask, ITaskModalValue, TTaskStatus } from "types/task-tracker"
import { getColor } from "utils/task-tracker"
import { TaskTrackerWrapper } from "./style"
import { TaskTrackerBlock } from "./TaskTrackerBlock"
import { modalDefaultValues, TaskTrackerModal } from "./TaskTrackerModal"

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
  const user = useMe()
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false)
  const [visible, { open: openLoading, close: closeLoading }] =
    useDisclosure(false)
  const [tasks, setTasks] = useState<ITask[]>([])
  const [modalValues, setModalValues] = useState<ITaskModalValue>({
    mode: "create",
    value: modalDefaultValues,
  })

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    openLoading()

    const { data, error } = await supabase
      .from("task")
      .select("id, title, description, deadline, status")
      .eq("student_id", user?.id)

    if (error) {
      showNotification({
        color: "red",
        message: error.message,
        icon: <X />,
        autoClose: 3000,
      })
      return
    }

    closeLoading()
    setTasks(data)
  }

  const filterTasks = (type: TTaskStatus) => {
    return tasks.filter(({ status }) => status === type)
  }

  const openCreate = () => {
    setModalValues({
      mode: "create",
      value: modalDefaultValues,
    })

    openModal()
  }

  const openUpdate = (cardId: string) => {
    const task = tasks.find(({ id }) => id === cardId)

    if (task) {
      setModalValues({
        mode: "update",
        value: task,
      })

      openModal()
    }
  }

  const handleCreate = async (task: ITask) => {
    const { id, title, description, deadline, status } = task

    const { error } = await supabase.from("task").insert([
      {
        id,
        student_id: user?.id,
        title,
        description,
        deadline,
        status,
      },
    ])

    if (error) {
      showNotification({
        color: "red",
        message: error.message,
        icon: <X />,
        autoClose: 2000,
      })
      return
    }

    const copy = [...tasks]
    copy.push(task)
    setTasks(copy)
  }

  const handleUpdate = async (task: ITask) => {
    const { id, title, description, deadline, status } = task

    const { error } = await supabase
      .from("task")
      .update([
        {
          title,
          description,
          deadline,
          status,
        },
      ])
      .eq("id", id)

    if (error) {
      showNotification({
        color: "red",
        message: error.message,
        icon: <X />,
        autoClose: 2000,
      })
      return
    }

    const copy = [...tasks]
    const index = tasks.findIndex(({ id }) => id === task.id)
    copy[index] = task
    setTasks(copy)
  }

  const handleDelete = async (taskId: string) => {
    const { error } = await supabase.from("task").delete().eq("id", taskId)

    if (error) {
      showNotification({
        color: "red",
        message: error.message,
        icon: <X />,
        autoClose: 2000,
      })
      return
    }

    const copy = tasks.filter(({ id }) => id !== taskId)
    setTasks(copy)

    closeModal()
  }

  const handleSave = (task: ITask) => {
    if (modalValues.mode === "create") {
      handleCreate(task)
    } else {
      handleUpdate(task)
    }
  }

  return (
    <>
      <Box ta="right" mb="sm">
        <Button onClick={openCreate}>Create</Button>
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

        {tasks.length ? (
          <Grid>
            {blocks.map(({ type }) => (
              <Grid.Col key={type} span={4}>
                <TaskTrackerBlock
                  tasks={filterTasks(type)}
                  onTaskClick={openUpdate}
                />
              </Grid.Col>
            ))}
          </Grid>
        ) : (
          <Box sx={{ marginTop: "150px" }}>
            <Title order={3} ta="center">
              Hey!
            </Title>
            <Text ta="center">Add tasks to manage your goals!!!</Text>
          </Box>
        )}
      </TaskTrackerWrapper>

      <LoadingOverlay visible={visible} overlayBlur={2} />

      <TaskTrackerModal
        opened={opened}
        formValues={modalValues}
        onClose={closeModal}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </>
  )
}

export { TaskTracker }
