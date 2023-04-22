import { ActionIcon, Box, Flex, Text, Title } from "@mantine/core"
import { Pencil } from "tabler-icons-react"
import { InfoItemWrapper } from "./style"

interface ICareerCardItemProps {
  content: {
    id: string
    title: string
    subtitle?: string
    duriation?: string
    extra?: string
  }
  onEdit: (id: string) => void
}

const CareerCardItem: React.FC<ICareerCardItemProps> = ({
  content,
  onEdit,
}) => {
  const { id, title, subtitle, duriation, extra } = content

  return (
    <InfoItemWrapper>
      <Flex justify="space-between" align="center" p="xs">
        <Box>
          <Title order={5} fw={500}>
            {title}
          </Title>

          {subtitle ? <Text fz="sm">{subtitle}</Text> : null}

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

        <ActionIcon variant="light" color="red" onClick={() => onEdit(id)}>
          <Pencil />
        </ActionIcon>
      </Flex>
    </InfoItemWrapper>
  )
}

export { CareerCardItem }
