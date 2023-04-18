import { Container } from "@mantine/core"
import { Puzzle } from "tabler-icons-react"
import { InfoItem } from "../InfoItem"
import { InfoSection } from "../InfoSection"

const ProfessionalSkill: React.FC = () => {
  return (
    <Container size="md">
      <InfoSection title="Professional Skill" icon={<Puzzle />}>
        <InfoItem
          title="Suleyman Demirel University"
          subtile="Bachelor's degree, Computer Science"
          duriation="сент. 2019 г. - июнь 2023 г."
        />
      </InfoSection>
    </Container>
  )
}

export { ProfessionalSkill }
