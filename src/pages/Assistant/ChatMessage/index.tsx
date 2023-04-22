import { Avatar } from "@mantine/core"
import { ChatMessageWrapper } from "./style"
import { useAppSelector } from "hooks/useAppSelector"
import { selectPersonalInfo } from "store/reducers/personReducer"
import { getUserInitials } from "utils/avatar"
import { Robot } from "tabler-icons-react"
import { TypeAnimation } from "react-type-animation"
import { TMessage } from ".."

interface IChatMessageProps {
  message: TMessage
}

const ChatMessage: React.FC<IChatMessageProps> = ({ message }) => {
  const personalInfo = useAppSelector(selectPersonalInfo)

  const { firstName = "", lastName = "" } = personalInfo || {}
  const initials = getUserInitials(firstName, lastName)

  const { sender, text } = message
  const isBot = sender === "bot"

  const renderSenderAvatar = () => {
    return !isBot ? (
      <Avatar
        className="avatar"
        src={null}
        alt={firstName + lastName}
        color="red"
        size="sm"
      >
        {initials}
      </Avatar>
    ) : (
      <Avatar className="avatar" src={null} color="red" size="sm">
        <Robot />
      </Avatar>
    )
  }

  return (
    <ChatMessageWrapper isBot={isBot}>
      {renderSenderAvatar()}

      <div className="message">
        {isBot ? (
          <TypeAnimation sequence={[text]} cursor={false} speed={60} />
        ) : (
          text
        )}
      </div>
    </ChatMessageWrapper>
  )
}

export { ChatMessage }
