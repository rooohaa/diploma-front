import { Container, Divider } from "@mantine/core"
import { Book2 } from "tabler-icons-react"
import { InfoItem } from "../InfoItem"
import { InfoSection } from "../InfoSection"

const Education: React.FC = () => {
  return (
    <Container size="md">
      <InfoSection title="Education" icon={<Book2 />}>
        <InfoItem
          title="Suleyman Demirel University"
          subtile="Bachelor's degree, Computer Science"
          duriation="сент. 2019 г. - июнь 2023 г."
        />

        <Divider my="xs" />

        <InfoItem
          title="Suleyman Demirel University"
          subtile="Bachelor's degree, Computer Science"
          duriation="сент. 2019 г. - июнь 2023 г."
        />
      </InfoSection>
    </Container>
  )
}

export { Education }
