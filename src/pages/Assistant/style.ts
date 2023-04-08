import styled from "@emotion/styled"

export const AssistantSection = styled.section`
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 16px;

  position: relative;

  .chat-container {
    width: 100%;
    flex: 1;
    overflow-y: auto;

    display: flex;
    flex-direction: column;
    row-gap: 16px;
  }

  .chat-form {
    padding: 16px;

    border-top: 1px solid #f8f8f8;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background-color: #fff;

    width: 100%;
    display: flex;
    align-items: center;
    column-gap: 8px;
  }
`
