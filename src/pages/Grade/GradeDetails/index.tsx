import { useNavigate, useParams } from "react-router-dom"
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Center,
  Drawer,
  Flex,
  Loader,
  LoadingOverlay,
  NumberInput,
  RingProgress,
  Select,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
} from "@mantine/core"
import { ISubject, mapStatusToColor } from ".."
import { ArrowBack, Check, DatabaseOff, Pencil, X } from "tabler-icons-react"
import { useEffect, useMemo, useState } from "react"
import { supabase } from "supabaseClient"
import { useForm } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { formatDate } from "utils/helpers"
import { showNotification } from "@mantine/notifications"

const mapColor = {
  homework: "violet",
  quiz: "green",
  midterm: "yellow",
  final: "indigo",
}

const mapTypeName = {
  homework: "Home work",
  quiz: "Quiz",
  midterm: "Midterm",
  final: "Final exam",
}

export const GradeDetails: React.FC = () => {
  const { id: paramId } = useParams()
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false)
  const navigate = useNavigate()
  const [fetching, setFetching] = useState(true)
  const [loading, setLoading] = useState(false)
  const [
    { id: gradeId, title, description, status, goal, gradingCriteria },
    setData,
  ] = useState<ISubject>({
    id: "",
    title: "",
    description: "",
    status: null,
    goal: null,
    gradingCriteria: [],
  })

  const form = useForm<{
    criteriaId: string
    completion: number | null
    gradingCriteria: ISubject["gradingCriteria"]
  }>({
    initialValues: {
      criteriaId: "",
      completion: null,
      gradingCriteria: [],
    },
    validate: {
      completion: (value, values) => {
        if (!value) {
          return "Required field"
        }

        const selectedValue = values.gradingCriteria.find(
          (item) => item.id === values.criteriaId
        )?.weight

        if (Number(value) > Number(selectedValue)) {
          return `Value should not be more than  ${Number(
            selectedValue
          )} points`
        }

        return null
      },
    },
    validateInputOnChange: ["completion"],
  })

  useEffect(() => {
    const fetchDetails = async () => {
      setFetching(true)

      try {
        const { data } = await supabase
          .from("grade")
          .select("*")
          .eq("id", paramId)
        const result = data?.[0]

        if (result) {
          setData({
            id: result.id,
            title: result.title,
            description: result.description,
            goal: result.goal,
            gradingCriteria: JSON.parse(result.criteria),
            status: result.status,
          })
          form.setFieldValue("gradingCriteria", JSON.parse(result.criteria))
        }
      } catch (err) {
        console.error(err)
      } finally {
        setFetching(false)
      }
    }
    fetchDetails()
  }, [paramId])

  const progressValues = useMemo(() => {
    return gradingCriteria.map(({ type, weight, completion, deadline }) => {
      return {
        value: completion || 0,
        color:
          // @ts-ignore
          mapColor[type],
        tooltip: `Type: ${
          // @ts-ignore
          mapTypeName[type]
        }, completion is ${completion} points out of ${weight} points, deadline: ${formatDate(
          deadline,
          "MMM D, YYYY"
        )}`,
      }
    })
  }, [gradingCriteria])

  const overallCompletion = gradingCriteria.reduce((prev, current) => {
    return prev + Number(current.completion ?? 0)
  }, 0)

  const selectedCriteria = gradingCriteria.find(
    (item) => item.id === form.values.criteriaId
  )

  const minCompleteValues = useMemo(() => {
    const remainingWeight = gradingCriteria.reduce((prev, current) => {
      if (current.completion === null) {
        return prev + Number(current.weight)
      }

      return prev
    }, 0)

    const achiveScore = goal! - overallCompletion
    const minimumPercentage = achiveScore / remainingWeight

    return gradingCriteria.map(({ weight, type, completion }) => {
      const minValue = weight! * minimumPercentage

      return {
        completion,
        weight,
        minValue,
        type,
        canReach: minValue <= weight!,
      }
    })
  }, [gradingCriteria, overallCompletion])

  const isGoalUnreachable = minCompleteValues.some((item) => !item.canReach)

  const handleSubmit = async (values: {
    criteriaId: string
    completion: number | null
  }) => {
    setLoading(true)

    const payload = gradingCriteria.map((item) => {
      if (item.id === values.criteriaId) {
        return {
          ...item,
          completion: values.completion,
        }
      }

      return item
    })

    try {
      const { error } = await supabase
        .from("grade")
        .update({ criteria: JSON.stringify(payload) })
        .eq("id", gradeId)

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
      setData((prevState) => ({ ...prevState, gradingCriteria: payload }))
      form.setFieldValue("gradingCriteria", payload)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const resetData = async () => {
    setFetching(true)

    const payload = gradingCriteria.map((item) => ({
      ...item,
      completion: null,
    }))

    try {
      const { error } = await supabase
        .from("grade")
        .update({ criteria: JSON.stringify(payload) })
        .eq("id", gradeId)

      if (error) {
        showNotification({
          color: "red",
          message: error.message,
          icon: <X />,
          autoClose: 2000,
        })
        return
      }

      setData((prevState) => ({ ...prevState, gradingCriteria: payload }))
      form.setFieldValue("gradingCriteria", payload)
    } catch (err) {
      console.error(err)
    } finally {
      setFetching(false)
    }
  }

  return (
    <>
      <Box>
        {fetching ? (
          <Flex justify="center" align="center" w="100%" h="100%">
            <Loader />
          </Flex>
        ) : (
          <Box>
            <Flex mb={50} gap={20}>
              <Box sx={{ flex: 1 }}>
                <Flex gap={16} align="center">
                  <Title order={2}>{title}</Title>
                  <Badge
                    size="lg"
                    // @ts-ignore
                    color={mapStatusToColor[status]}
                    variant="filled"
                  >
                    {status}
                  </Badge>
                </Flex>
                {description ? <Text>{description}</Text> : null}
              </Box>
              <Tooltip label="Return back">
                <ActionIcon
                  mb={20}
                  color="orange"
                  variant="filled"
                  onClick={() => navigate(-1)}
                >
                  <ArrowBack />
                </ActionIcon>
              </Tooltip>
            </Flex>

            <Center sx={{ flexDirection: "column" }}>
              <Badge size="md" color="orange" variant="filled" mb={8}>
                Your goal is {goal} %
              </Badge>
              <Text>Your overall subject grading completion</Text>
              <RingProgress
                size={250}
                thickness={25}
                label={
                  <Center>
                    {overallCompletion >= goal! ? (
                      <ThemeIcon
                        color="green"
                        variant="light"
                        size={80}
                        sx={{ borderRadius: "100%" }}
                      >
                        <Check size={40} color="green" />
                      </ThemeIcon>
                    ) : (
                      <ThemeIcon
                        color="orange"
                        variant="light"
                        size={80}
                        sx={{ borderRadius: "100%" }}
                      >
                        <Text
                          color="orange"
                          weight={700}
                          align="center"
                          size="xl"
                        >
                          {overallCompletion}%
                        </Text>
                      </ThemeIcon>
                    )}
                  </Center>
                }
                sections={progressValues}
              />

              <Box mb="sm" sx={{ textAlign: "center" }}>
                {isGoalUnreachable ? (
                  <Text>
                    Your goal is unreachable, try your best for the next time!
                  </Text>
                ) : (
                  <>
                    {overallCompletion < goal! ? (
                      <>
                        <Text>Your minimum values</Text>
                        {minCompleteValues
                          .filter((item) => item.completion === null)
                          .map(({ minValue, type, weight }, index) => {
                            return (
                              <Box key={index}>
                                {/* @ts-ignore */}
                                {mapTypeName[type]} - {minValue.toFixed(2)}/
                                {weight}
                                points
                              </Box>
                            )
                          })}
                      </>
                    ) : (
                      <Text>You achieved your goal!</Text>
                    )}
                  </>
                )}
              </Box>

              <Flex gap={8}>
                <Button leftIcon={<Pencil />} onClick={openModal}>
                  Add grade
                </Button>
                <Button
                  color="red"
                  leftIcon={<DatabaseOff />}
                  onClick={resetData}
                >
                  Reset
                </Button>
              </Flex>
            </Center>
          </Box>
        )}
      </Box>

      <Drawer
        opened={opened}
        onClose={closeModal}
        title="Edit grading criteria"
        position="right"
        padding="md"
        size="lg"
      >
        <Box
          component="form"
          onSubmit={form.onSubmit(handleSubmit)}
          sx={{ position: "relative" }}
        >
          <LoadingOverlay visible={loading} overlayBlur={1} />

          <Box sx={{ marginBottom: "16px" }}>
            <Select
              label="Grading criteria"
              withAsterisk
              placeholder="Select grading criteria"
              data={gradingCriteria
                .filter((item) => item.completion === null)
                .map(({ id, type, weight, deadline }) => ({
                  value: id,
                  label: `${
                    // @ts-ignore
                    mapTypeName[type]
                  }, weight is ${weight} points, ${formatDate(
                    deadline,
                    "MMM D, YYYY"
                  )}`,
                }))}
              {...form.getInputProps("criteriaId")}
            />
          </Box>

          {form.values.criteriaId ? (
            <Box sx={{ marginBottom: "16px" }}>
              <NumberInput
                type="number"
                withAsterisk
                label={`Your completion (points) out of ${
                  selectedCriteria?.weight ?? ""
                } points`}
                placeholder="Enter your completion"
                {...form.getInputProps("completion")}
              />
            </Box>
          ) : null}

          <Button type="submit" fullWidth>
            Save
          </Button>
        </Box>
      </Drawer>
    </>
  )
}
