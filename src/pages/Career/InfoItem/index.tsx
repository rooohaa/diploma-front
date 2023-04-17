import { Box, Text, Title } from "@mantine/core"

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
  )
}

export { InfoItem }
