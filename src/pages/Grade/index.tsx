import {
  Box,
  Card,
  Flex,
  Text,
  Title,
  ThemeIcon,
  Badge,
  Button,
} from "@mantine/core"
import { Link } from "react-router-dom"
import { Check, Plus } from "tabler-icons-react"
import { mockData } from "./mock"
import dayjs from "dayjs"

export const mapStatusToColor = {
  urgent: "red",
  normal: "yellow",
  slow: "blue",
}

export const Grade: React.FC = () => {
  return (
    <Box>
      <Flex justify="flex-end" mb={12}>
        <Button leftIcon={<Plus />} onClick={() => {}}>
          Create
        </Button>
      </Flex>
      <Flex direction="column" gap={15}>
        {mockData.map(
          ({ id, title, description, deadline, status, completion }) => {
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
                      <Badge variant="filled">
                        {dayjs(deadline).format("MMMM D, YYYY")}
                      </Badge>
                    </Flex>
                  </Box>

                  {completion === "100" ? (
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
                        {completion}%
                      </Text>
                    </ThemeIcon>
                  )}
                </Flex>
              </Card>
            )
          }
        )}
      </Flex>
    </Box>
  )
}
