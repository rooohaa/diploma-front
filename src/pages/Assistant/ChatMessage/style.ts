import styled from "@emotion/styled"

export const ChatMessageWrapper = styled.div<{ isBot: boolean }>`
  width: 100%;
  display: flex;
  align-items: flex-end;
  column-gap: 8px;
  justify-content: ${(props) => (!props.isBot ? "flex-end" : "flex-start")};

  .message {
    white-space: pre-line;
    padding: 12px;
    max-width: 60%;

    border-radius: ${(props) =>
      !props.isBot ? "8px 8px 0px 8px" : "8px 8px 8px 0px"};

    color: ${(props) => (!props.isBot ? "#fff" : "#333")};
    background-color: ${(props) => (!props.isBot ? "#dd7456" : "#f4f4f4")};

    order: ${(props) => (!props.isBot ? 0 : 1)};
  }

  .avatar {
    order: ${(props) => (!props.isBot ? 1 : 0)};
  }
`
