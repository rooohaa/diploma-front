import { ActionIcon, Input } from "@mantine/core"
import { AssistantSection } from "./style"
import { Send, X } from "tabler-icons-react"
import { useState } from "react"
import { showNotification } from "@mantine/notifications"
import { v4 as uuid } from "uuid"
import { ChatMessage } from "./ChatMessage"
import axios from "axios"
import { AssistantInfo } from "./AssistantInfo"

export type TMessage = {
  id: string
  text: string
  sender: "user" | "bot"
}

const Assistant: React.FC = () => {
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<TMessage[]>([])

  const handleSendMessage = async () => {
    if (!prompt.trim()) {
      showNotification({
        message: "Message is empty. Type something..",
        autoClose: 2000,
        color: "red",
        icon: <X />,
      })
      return
    }

    const message: TMessage = {
      id: uuid(),
      text: prompt,
      sender: "user",
    }

    setMessages((prevMessages) => [...prevMessages, message])
    setPrompt("")

    setLoading(true)

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/prompt`,
        { prompt }
      )
      if (true) {
        const { response } = res.data
        const botMessage: TMessage = {
          id: uuid(),
          text: response.trim(),
          sender: "bot",
        }

        setMessages((prevMessages) => [...prevMessages, botMessage])
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AssistantSection>
      <div className="chat-container">
        {messages.length > 0 ? (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        ) : (
          <AssistantInfo onQuestionClick={(question) => setPrompt(question)} />
        )}
      </div>

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
