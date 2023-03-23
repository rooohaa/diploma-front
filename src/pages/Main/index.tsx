import { Flex } from "@mantine/core"
import { Container, Title, Text, Button } from "@mantine/core"
import { Link } from "react-router-dom"
import { AppLayout } from "components/layout"
import { MainSection } from "./style"

const Main: React.FC = () => {
  return (
    <AppLayout>
      <MainSection>
        <Container size="lg">
          <div className="section-inner">
            <Flex
              direction="column"
              align="flex-start"
              gap="xl"
              sx={{ maxWidth: "500px", paddingTop: "60px" }}
            >
              <Title color="#2A3240" order={1}>
                Student ID Card Management System
              </Title>

              <Text fz="xl" color="#2A3240">
                The one stop solution for digital ID cards and printed ID cards
                for academic institutions.
              </Text>

              <Button size="lg" component={Link} to="/dashboard">
                Explore
              </Button>
            </Flex>

            <img src="/assets/images/mindmeld-intro.png" alt="MindMeld slide" />
          </div>
        </Container>
      </MainSection>
    </AppLayout>
  )
}

export { Main }
