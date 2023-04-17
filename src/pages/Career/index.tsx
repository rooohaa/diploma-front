import { Award, Book2, Briefcase, Puzzle } from "tabler-icons-react"
import { InfoItem } from "./InfoItem"
import { InfoSection } from "./InfoSection"
import { Container, Flex } from "@mantine/core"

const Career: React.FC = () => {
  return (
    <Container size="md">
      <Flex direction="column" gap="sm">
        <InfoSection title="Education" icon={<Book2 />}>
          <InfoItem
            title="Suleyman Demirel University"
            subtile="Bachelor's degree, Computer Science"
            duriation="сент. 2019 г. - июнь 2023 г."
          />
        </InfoSection>

        <InfoSection title="Work experience" icon={<Briefcase />}>
          <InfoItem
            title="Suleyman Demirel University"
            subtile="Bachelor's degree, Computer Science"
            duriation="сент. 2019 г. - июнь 2023 г."
          />
        </InfoSection>

        <InfoSection title="Professional skills" icon={<Puzzle />}>
          <InfoItem
            title="Suleyman Demirel University"
            subtile="Bachelor's degree, Computer Science"
            duriation="сент. 2019 г. - июнь 2023 г."
          />
        </InfoSection>

        <InfoSection title="Award" icon={<Award />}>
          <InfoItem
            title="Suleyman Demirel University"
            subtile="Bachelor's degree, Computer Science"
            duriation="сент. 2019 г. - июнь 2023 г."
          />
        </InfoSection>
      </Flex>
    </Container>
  )
}

export { Career }
