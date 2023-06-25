import { Container, Flex } from "@mantine/core"
import { FooterWrapper } from "./style"
import { AppLogoLink } from "components/ui"

const AppFooter: React.FC = () => {
  return (
    <FooterWrapper>
      <Container size="lg">
        <Flex justify="space-between">
          <Flex align="center">
            <AppLogoLink />
            <p className="footer-text">MindMeld &copy; Copyright 2023</p>
          </Flex>

          <nav>
            <ul>
              <li>
                <a href="#">Terms & Conditions</a>
              </li>

              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </nav>
        </Flex>
      </Container>
    </FooterWrapper>
  )
}

export { AppFooter }
