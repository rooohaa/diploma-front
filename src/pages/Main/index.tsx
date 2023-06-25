import { Container, Flex, Title, Text, Button } from "@mantine/core"
import { Link } from "react-router-dom"
import { AppLayout } from "components/layout"
import { MainSection, HowItWorksSection, HowItWorksCard } from "./style"
import { blocks } from "./mock"

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
                The one stop solution for digital ID cards and self-development
                for students.
              </Text>

              <Button size="lg" component={Link} to="/dashboard">
                Explore
              </Button>
            </Flex>

            <img src="/assets/images/mindmeld-intro.png" alt="MindMeld slide" />
          </div>
        </Container>
      </MainSection>

      <HowItWorksSection id="how-it-works">
        <Container size="lg">
          <Title color="#2a3240" order={2} sx={{ marginBottom: "24px" }}>
            How It Works
          </Title>

          <div className="grid">
            {blocks.map(({ icon, title, descr }) => (
              <HowItWorksCard key={title}>
                <Flex align="center" columnGap="16px">
                  <div className="icon-wrap">{icon}</div>

                  <Text fz="lg" fw={500}>
                    {title}
                  </Text>
                </Flex>

                <Text c="dimmed" sx={{ marginTop: "8px" }}>
                  {descr}
                </Text>
              </HowItWorksCard>
            ))}
          </div>
        </Container>
      </HowItWorksSection>
    </AppLayout>
  )
}

export { Main }
