import { Box, Checkbox, Title, Alert } from "@mantine/core"
import React from "react"
import { AlertCircle } from "tabler-icons-react"

interface IAssessmentSelectProps {
  title: string
  value: string[]
  errors: number[]
  position: number
  type: string
  onSelect: (position: number, type: string) => (values: string[]) => void
}

const styles = {
  input: {
    cursor: "pointer",
  },
  label: {
    cursor: "pointer",
  },
}

const AssessmentSelectComponent: React.FC<IAssessmentSelectProps> = ({
  title,
  value,
  position,
  type,
  errors,
  onSelect,
}) => {
  return (
    <Box>
      <Title order={4} size={20} mb="lg" fw={600}>
        {title}
      </Title>

      <Checkbox.Group
        offset={0}
        size="sm"
        value={value}
        orientation="vertical"
        onChange={onSelect(position, type)}
      >
        <Checkbox
          value="3"
          radius="lg"
          color="green"
          label="Strongly agree"
          styles={styles}
        />
        <Checkbox
          value="2"
          radius="lg"
          color="green"
          label="Agree"
          styles={styles}
        />
        <Checkbox
          value="1"
          radius="lg"
          color="green"
          label="Slightly agree"
          styles={styles}
        />
        <Checkbox
          value="0"
          radius="lg"
          color="gray"
          label="Neutral"
          styles={styles}
        />
        <Checkbox
          value="-1"
          radius="lg"
          color="red"
          label="Slightly disagree"
          styles={styles}
        />
        <Checkbox
          value="-2"
          radius="lg"
          color="red"
          label="Disagree"
          styles={styles}
        />
        <Checkbox
          value="-3"
          radius="lg"
          color="red"
          label="Strongly disagree"
          styles={styles}
        />
      </Checkbox.Group>

      {errors.includes(position) ? (
        <Alert icon={<AlertCircle size={16} />} color="yellow" my="md">
          Please select one of the answer...
        </Alert>
      ) : null}
    </Box>
  )
}

export const AssessmentSelect = React.memo(AssessmentSelectComponent)
