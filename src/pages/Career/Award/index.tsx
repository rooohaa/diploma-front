import { Container } from "@mantine/core"
import { Award as AwardIcon } from "tabler-icons-react"
import { CareerCardItem } from "components/ui/CareerCardItem"
import { CareerCard } from "components/ui/CareerCard"

const Award: React.FC = () => {
  return (
    <Container size="md">
      <CareerCard title="Award" icon={<AwardIcon />} onAdd={() => {}}>
        <CareerCardItem
          content={{ id: "test", title: "test", subtitle: "test" }}
          onEdit={() => {}}
        />
      </CareerCard>
    </Container>
  )
}

export { Award }
