import { Container } from "@mantine/core"
import { Briefcase } from "tabler-icons-react"
import { CareerCardItem } from "components/ui/CareerCardItem"
import { CareerCard } from "components/ui/CareerCard"

const WorkExperience: React.FC = () => {
  return (
    <Container size="md">
      <CareerCard title="Work experience" icon={<Briefcase />} onAdd={() => {}}>
        <CareerCardItem
          content={{ id: "test", title: "test", subtitle: "test" }}
          onEdit={() => {}}
        />
      </CareerCard>
    </Container>
  )
}

export { WorkExperience }
