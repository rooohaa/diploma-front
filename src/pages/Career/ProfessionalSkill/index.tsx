import { Container } from "@mantine/core"
import { Puzzle } from "tabler-icons-react"
import { CareerCardItem } from "components/ui/CareerCardItem"
import { CareerCard } from "components/ui/CareerCard"

const ProfessionalSkill: React.FC = () => {
  return (
    <Container size="md">
      <CareerCard title="Professional Skill" icon={<Puzzle />} onAdd={() => {}}>
        <CareerCardItem
          content={{ id: "test", title: "test", subtitle: "test" }}
          onEdit={() => {}}
        />
      </CareerCard>
    </Container>
  )
}

export { ProfessionalSkill }
