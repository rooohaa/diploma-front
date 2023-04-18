import { Container } from "@mantine/core"
import { Briefcase } from "tabler-icons-react"
import { InfoItem } from "../InfoItem"
import { InfoSection } from "../InfoSection"

const WorkExperience: React.FC = () => {
  return (
    <Container size="md">
      <InfoSection title="Work experience" icon={<Briefcase />}>
        <InfoItem
          title="Suleyman Demirel University"
          subtile="Bachelor's degree, Computer Science"
          duriation="сент. 2019 г. - июнь 2023 г."
        />
      </InfoSection>
    </Container>
  )
}

export { WorkExperience }
