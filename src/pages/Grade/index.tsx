import {
  Box,
  Card,
  Flex,
  Text,
  Title,
  ThemeIcon,
  Badge,
  Button,
  Drawer,
  TextInput,
  Select,
  NumberInput,
  ActionIcon,
  Tooltip,
  Alert,
  LoadingOverlay,
  Loader,
  Notification,
  Center,
} from "@mantine/core"
import { Link } from "react-router-dom"
import {
  AlertCircle,
  Check,
  Plus,
  QuestionMark,
  Trash,
  X,
} from "tabler-icons-react"
import { useDisclosure } from "@mantine/hooks"
import { useForm } from "@mantine/form"
import { dateRule, requiredRule } from "utils/formRules"
import { formatDate } from "utils/helpers"
import { DatePicker } from "@mantine/dates"
import { forwardRef, useEffect, useState } from "react"
import { v4 as uuid } from "uuid"
import { showNotification } from "@mantine/notifications"
import { supabase } from "supabaseClient"
import { useMe } from "hooks/useMe"

export interface ISubject {
  id: string
  title: string
  description?: string
  status: TStatus | null
  gradingCriteria: {
    id: string
    type: string | null
    weight: number | null
    deadline: Date | string
    completion?: number | null
  }[]
  goal: number | null
}

type TStatus = "low" | "normal" | "urgent"

export const mapStatusToColor = {
  urgent: "red",
  normal: "yellow",
  low: "blue",
}

export const Grade: React.FC = () => {
  const user = useMe()
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [data, setData] = useState<ISubject[]>([])

  const form = useForm<ISubject>({
    initialValues: {
      id: "",
      title: "",
      description: "",
      status: null,
      gradingCriteria: [
        {
          id: uuid(),
          type: "",
          weight: null,
          deadline: "",
        },
      ],
      goal: null,
    },
    validate: {
      title: requiredRule,
      status: (value: string | null) => (!value ? "Required field" : null),
      gradingCriteria: {
        type: (value) => (!value ? "Required field" : null),
        weight: (value) => {
          if (!value) {
            return "Required field"
          }

          if (value > 100) {
            return "Value should not be more than 100 points"
          }

          return null
        },
        deadline: dateRule,
      },
      goal: (value) => {
        if (!value) {
          return "Required field"
        }

        if (value > 100) {
          return "Value should not be more than 100 points"
        }

        return null
      },
    },
  })

  useEffect(() => {
    if (user) {
      fetchData()
    }
  }, [user])

  const fetchData = async () => {
    setFetching(true)

    try {
      const { data } = await supabase
        .from("grade")
        .select("*")
        .eq("student_id", user?.id)

      setData(
        data?.map((result) => {
          return {
            id: result.id,
            title: result.title,
            completion: result.completion,
            description: result.description,
            goal: result.goal,
            gradingCriteria: JSON.parse(result.criteria),
            status: result.status,
          }
        }) as ISubject[]
      )
    } catch (err) {
      console.error(err)
    } finally {
      setFetching(false)
    }
  }

  const handleSubmit = async (values: ISubject) => {
    if (overallWeight < 100 || overallWeight > 100) {
      showNotification({
        message: "Please fill grading criteria for overall 100 points match",
        autoClose: 5000,
        color: "yellow",
        icon: <Check />,
      })
      return
    }

    setLoading(true)

    try {
      const { error, data } = await supabase.from("grade").insert([
        {
          title: values.title,
          description: values.description,
          status: values.status,
          student_id: user?.id,
          goal: values.goal,
          criteria: JSON.stringify(
            values.gradingCriteria.map((item) => {
              return {
                ...item,
                deadline: formatDate(item.deadline),
                completion: null,
              }
            })
          ),
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

      closeModal()
      form.reset()
      fetchData()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const SelectItem = forwardRef<
    HTMLDivElement,
    { value: TStatus; label: TStatus }
  >(({ label, value, ...props }, ref) => (
    <Box ref={ref} {...props}>
      <Badge color={mapStatusToColor[value]} variant="filled">
        {label}
      </Badge>
    </Box>
  ))

  const overallWeight = form.values.gradingCriteria.reduce((prev, current) => {
    return prev + Number(current.weight ?? 0)
  }, 0)

  const isAddButtonDisable =
    overallWeight >= 100 ||
    form.values.gradingCriteria.some(
      ({ type, weight }) => !type || !weight || Number(weight) > 100
    )

  return (
    <>
      <Box>
        <Flex justify="flex-end" mb={12}>
          <Button leftIcon={<Plus />} onClick={openModal}>
            Create
          </Button>
        </Flex>

        {fetching ? (
          <Flex justify="center" align="center" w="100%" h="100%">
            <Loader />
          </Flex>
        ) : data.length && !fetching ? (
          <Flex direction="column" gap={15}>
            {data.map(
              ({ id, title, description, status, goal, gradingCriteria }) => {
                const overallCompletion = gradingCriteria.reduce(
                  (prev, current) => {
                    return prev + Number(current.completion ?? 0)
                  },
                  0
                )
                return (
                  <Card
                    to={`/dashboard/grade/${id}`}
                    component={Link}
                    key={id}
                    shadow="xs"
                    p="md"
                    radius="md"
                    sx={{ cursor: "pointer" }}
                  >
                    <Flex gap={10}>
                      <Box sx={{ flex: 1 }}>
                        <Title order={5}>{title}</Title>
                        <Text fz="sm" mb={10}>
                          {description}
                        </Text>
                        <Flex gap={5}>
                          <Badge
                            // @ts-ignore
                            color={mapStatusToColor[status]}
                            variant="filled"
                          >
                            {status}
                          </Badge>
                        </Flex>
                      </Box>

                      {Number(overallCompletion) >= Number(goal) ? (
                        <ThemeIcon
                          color="green"
                          variant="light"
                          radius="xl"
                          size="xl"
                        >
                          <Check size={25} color="green" />
                        </ThemeIcon>
                      ) : (
                        <ThemeIcon
                          color="orange"
                          variant="light"
                          radius="xl"
                          size="xl"
                        >
                          <Text
                            color="orange"
                            weight={700}
                            align="center"
                            size="sm"
                          >
                            {Number(overallCompletion)}%
                          </Text>
                        </ThemeIcon>
                      )}
                    </Flex>
                  </Card>
                )
              }
            )}
          </Flex>
        ) : (
          <Center>
            <Notification
              icon={<QuestionMark size={18} />}
              color="blue"
              disallowClose
            >
              There are no data, let's create it
            </Notification>
          </Center>
        )}
      </Box>

      <Drawer
        opened={opened}
        onClose={closeModal}
        title="Add new subject"
        position="right"
        padding="md"
        size="xl"
        styles={{
          drawer: {
            overflow: "auto",
          },
        }}
      >
        <Box
          component="form"
          onSubmit={form.onSubmit(handleSubmit)}
          sx={{ position: "relative" }}
        >
          <LoadingOverlay visible={loading} overlayBlur={1} />

          <Box sx={{ marginBottom: "16px" }}>
            <TextInput
              withAsterisk
              placeholder="Enter title"
              label="Title"
              {...form.getInputProps("title")}
            />
          </Box>

          <Box sx={{ marginBottom: "16px" }}>
            <TextInput
              placeholder="Enter description"
              label="Description"
              {...form.getInputProps("description")}
            />
          </Box>

          <Box sx={{ marginBottom: "16px" }}>
            <Alert
              icon={<AlertCircle size={16} />}
              title="Attention"
              color="blue"
              mb="sm"
            >
              You should add overall 100 points of weight.
            </Alert>
            <Flex direction="column" gap={8}>
              {overallWeight ? (
                <Text>Current weight: {overallWeight}</Text>
              ) : null}

              {form.values.gradingCriteria.map((item, index) => {
                return (
                  <Flex gap={8} key={item.id}>
                    <DatePicker
                      placeholder="Enter deadline"
                      label="Deadline"
                      required
                      hideOutsideDates
                      {...form.getInputProps(
                        `gradingCriteria.${index}.deadline`
                      )}
                    />

                    <Select
                      label="Type"
                      placeholder="Select type"
                      withAsterisk
                      data={[
                        { value: "homework", label: "Home work" },
                        { value: "quiz", label: "Quiz" },
                        { value: "midterm", label: "Midterm" },
                        { value: "final", label: "Final exam" },
                      ]}
                      {...form.getInputProps(`gradingCriteria.${index}.type`)}
                    />

                    <NumberInput
                      withAsterisk
                      label="Weight (points)"
                      placeholder="Enter weight"
                      {...form.getInputProps(`gradingCriteria.${index}.weight`)}
                    />

                    <Tooltip label="Delete">
                      <ActionIcon
                        color="red"
                        variant="filled"
                        radius="xl"
                        disabled={form.values.gradingCriteria.length === 1}
                        sx={{ position: "relative", top: 25 }}
                        onClick={() =>
                          form.removeListItem("gradingCriteria", index)
                        }
                      >
                        <Trash size={18} />
                      </ActionIcon>
                    </Tooltip>
                  </Flex>
                )
              })}

              <Box>
                <Button
                  variant="outline"
                  leftIcon={<Plus size={18} />}
                  size="xs"
                  disabled={isAddButtonDisable}
                  onClick={() =>
                    form.insertListItem("gradingCriteria", {
                      id: uuid(),
                      type: null,
                      weight: null,
                    })
                  }
                >
                  Add criteria
                </Button>
              </Box>
            </Flex>
          </Box>

          <Box sx={{ marginBottom: "16px" }}>
            <NumberInput
              type="number"
              withAsterisk
              label="Completion goal (points)"
              placeholder="Enter your goal"
              {...form.getInputProps("goal")}
            />
          </Box>

          <Box sx={{ marginBottom: "16px" }}>
            <Select
              label="Status"
              withAsterisk
              itemComponent={SelectItem}
              placeholder="Select status"
              data={[
                { value: "urgent", label: "urgent" },
                { value: "normal", label: "normal" },
                { value: "low", label: "low" },
              ]}
              {...form.getInputProps("status")}
            />
          </Box>

          <Button type="submit" fullWidth>
            Save
          </Button>
        </Box>
      </Drawer>
    </>
  )
}
