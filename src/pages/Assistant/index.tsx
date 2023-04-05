import { ActionIcon, Input } from "@mantine/core"
import { AssistantSection } from "./style"
import { Send, X } from "tabler-icons-react"
import { useState } from "react"
import { showNotification } from "@mantine/notifications"

const Assistant: React.FC = () => {
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!prompt.trim()) {
      showNotification({
        message: "Message is empty. Type something :)",
        autoClose: 2000,
        color: "red",
        icon: <X />,
      })
      return
    }

    console.log("Message is: ", prompt)
  }

  return (
    <AssistantSection>
      <div className="chat-container"></div>

      <div className="chat-form">
        <Input
          size="md"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage()
            }
          }}
          placeholder="Send a message..."
          sx={{ width: "100%" }}
        />

        <ActionIcon
          size="xl"
          variant="light"
          color="red"
          loading={loading}
          onClick={handleSendMessage}
        >
          <Send />
        </ActionIcon>
      </div>
    </AssistantSection>
  )
}

export { Assistant }
