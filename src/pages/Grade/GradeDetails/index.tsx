import { useParams } from "react-router-dom"
import { mockData } from "../mock"
import {
  Badge,
  Box,
  Center,
  Flex,
  RingProgress,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core"
import { mapStatusToColor } from ".."
import dayjs from "dayjs"
import { Check } from "tabler-icons-react"

export const GradeDetails: React.FC = () => {
  const { id } = useParams()

  const { title, description, status, completion, deadline } =
    mockData.find((item) => item.id === Number(id)) || {}

  return (
    <Box>
      <Box mb={50}>
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
        <Text>{description}</Text>
      </Box>

      <Center sx={{ flexDirection: "column" }}>
        <Text>Your progress</Text>
        <RingProgress
          size={250}
          thickness={20}
          label={
            <Center>
              {completion === "100" ? (
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
                  <Text color="orange" weight={700} align="center" size="xl">
                    {completion}%
                  </Text>
                </ThemeIcon>
              )}
            </Center>
          }
          sections={[
            { value: 40, color: "indigo", tooltip: "Some progress" },
            { value: 25, color: "orange", tooltip: "Some progress" },
            { value: 15, color: "green", tooltip: "Some progress" },
          ]}
        />
        <Text>Till {dayjs(deadline).format("MMMM D, YYYY")}</Text>
      </Center>
    </Box>
  )
}
