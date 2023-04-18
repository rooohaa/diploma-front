import { Container } from "@mantine/core"
import { Award as AwardIcon } from "tabler-icons-react"
import { InfoItem } from "../InfoItem"
import { InfoSection } from "../InfoSection"

const Award: React.FC = () => {
  return (
    <Container size="md">
      <InfoSection title="Award" icon={<AwardIcon />}>
        <InfoItem
          title="Suleyman Demirel University"
          subtile="Bachelor's degree, Computer Science"
          duriation="сент. 2019 г. - июнь 2023 г."
        />
      </InfoSection>
    </Container>
  )
}

export { Award }
