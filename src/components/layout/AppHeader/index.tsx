import { Button, Container, Flex } from "@mantine/core"
import { Link } from "react-router-dom"
import { AppLogoLink, ContactUsModal } from "components"
import { HeaderWrapper } from "./style"
import { useDisclosure } from "@mantine/hooks"

interface IAppHeaderProps {
  isAuth?: boolean
}

const AppHeader: React.FC<IAppHeaderProps> = ({ isAuth = false }) => {
  // Contact us modal state
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <HeaderWrapper>
      <Container size="lg" style={{ width: "100%" }}>
        <div className="app-header-inner">
          <AppLogoLink />

          {!isAuth ? (
            <nav className="app-nav">
              <ul>
                <li>
                  <Link className="app-nav-link" to="/how-it-works">
                    How it works
                  </Link>
                </li>

                <li>
                  <Link className="app-nav-link" to="/about">
                    About us
                  </Link>
                </li>

                <li>
                  <Flex columnGap={16}>
                    <Button variant="outline" radius="lg" onClick={open}>
                      Contact us
                    </Button>

                    <Button component={Link} to="/sign-in" radius="lg">
                      Sign in
                    </Button>
                  </Flex>
                </li>
              </ul>
            </nav>
          ) : null}
        </div>
      </Container>

      {/* Contact us modal */}
      <ContactUsModal opened={opened} close={close} />
    </HeaderWrapper>
  )
}

export { AppHeader }
