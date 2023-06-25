import styled from "@emotion/styled"

export const FooterWrapper = styled.footer`
  background-color: #333;
  padding: 16px 0;

  .footer-text {
    color: #fff;
    font-size: 14px;
  }

  nav > ul {
    list-style: none;
    display: flex;
    align-items: center;
    column-gap: 16px;

    a {
      color: #fff;
      font-size: 13px;
    }
  }
`
