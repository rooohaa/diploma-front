import { Button, Flex, Text, Title } from "@mantine/core"
import { ArrowRight } from "tabler-icons-react"
import { capabilities, examples } from "./mock"
import { AssistantInfoWrapper, CapabilitiesGrid, CapabilityCard } from "./style"

interface IAssistantInfoProps {
  onQuestionClick: (question: string) => void
}

const AssistantInfo: React.FC<IAssistantInfoProps> = ({ onQuestionClick }) => {
  return (
    <AssistantInfoWrapper>
      <Title order={2} align="center" opacity={0.7}>
        Start your conversation with AI Assistant
      </Title>

      <Text c="dimmed" sx={{ margin: "16px 0" }}>
        Our AI Assistant is integrated with Chat GPT API. You can ask him
        anything you want and use it for your learning purposes. Below you can
        see it's capabilities and some examples which you can try.
      </Text>

      <CapabilitiesGrid>
        <div>
          <Title
            order={3}
            align="center"
            opacity={0.7}
            sx={{ marginBottom: "16px" }}
          >
            Examples
          </Title>

          <Flex direction="column" align="center" rowGap="8px">
            {examples.map((question) => (
              <Button
                fullWidth
                key={question}
                variant="gradient"
                gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
                sx={{ height: "53.5px", maxWidth: "360px", width: "100%" }}
                rightIcon={<ArrowRight />}
                onClick={() => onQuestionClick(question)}
              >
                {question}
              </Button>
            ))}
          </Flex>
        </div>

        <div>
          <Title
            order={3}
            align="center"
            opacity={0.7}
            sx={{ marginBottom: "16px" }}
          >
            Capabilities
          </Title>

          <Flex direction="column" align="center" rowGap="8px">
            {capabilities.map((c) => (
              <CapabilityCard key={c}>{c}</CapabilityCard>
            ))}
          </Flex>
        </div>
      </CapabilitiesGrid>
    </AssistantInfoWrapper>
  )
}

export { AssistantInfo }
