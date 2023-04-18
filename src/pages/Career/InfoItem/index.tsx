import { ActionIcon, Box, Flex, Text, Title } from "@mantine/core"
import { Pencil } from "tabler-icons-react"
import { InfoItemWrapper } from "./style"

interface IInfoItemProps {
  title: string
  subtile?: string
  duriation?: string
  extra?: string
}

const InfoItem: React.FC<IInfoItemProps> = ({
  title,
  subtile,
  duriation,
  extra,
}) => {
  return (
    <InfoItemWrapper>
      <Flex justify="space-between" align="center" p="xs">
        <Box>
          <Title order={5} fw={500}>
            {title}
          </Title>

          {subtile ? <Text fz="sm">{subtile}</Text> : null}

          {duriation ? (
            <Text fz="sm" color="gray">
              {duriation}
            </Text>
          ) : null}

          {extra ? (
            <Text fz="sm" mt="sm">
              {extra}
            </Text>
          ) : null}
        </Box>

        <ActionIcon variant="light" color="red">
          <Pencil />
        </ActionIcon>
      </Flex>
    </InfoItemWrapper>
  )
}

export { InfoItem }
