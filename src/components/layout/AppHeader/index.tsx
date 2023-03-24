import { Avatar, Button, Container, Flex, Menu } from "@mantine/core"
import { Link, useNavigate } from "react-router-dom"
import { HeaderWrapper } from "./style"
import { useDisclosure } from "@mantine/hooks"
import { useAuth } from "hooks/useAuth"
import { LayoutDashboard, Logout } from "tabler-icons-react"
import { supabase } from "supabaseClient"
import { showNotification } from "@mantine/notifications"
import { useAppDispatch } from "hooks/useAppDispatch"
import { resetUser } from "store/reducers/authReducer"
import {
  resetPersonalInfo,
  selectPersonalInfo,
} from "store/reducers/personReducer"
import { useAppSelector } from "hooks/useAppSelector"
import { getUserInitials } from "utils/avatar"
import { AppLogoLink } from "components/ui"
import { ContactUsModal } from "components/domain"

interface IAppHeaderProps {
  isAuth?: boolean
}

const AppHeader: React.FC<IAppHeaderProps> = ({ isAuth = false }) => {
  // Contact us modal state
  const [opened, { open, close }] = useDisclosure(false)
  const auth = useAuth()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const personalInfo = useAppSelector(selectPersonalInfo)

  const { firstName = "", lastName = "" } = personalInfo || {}
  const initials = getUserInitials(firstName, lastName)

  const handleNavigate = (path: string) => navigate(path)

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if (!error) {
      // reset user and personal info
      dispatch(resetUser())
      dispatch(resetPersonalInfo())

      showNotification({
        color: "blue",
        message: "Successfully logged out",
        autoClose: 5000,
      })
    }
  }

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

                    {auth ? (
                      <Menu shadow="md" width={200}>
                        <Menu.Target>
                          <Avatar
                            src={null}
                            alt="User avatar"
                            color="red"
                            radius="xl"
                            sx={{ cursor: "pointer" }}
                          >
                            {initials}
                          </Avatar>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Label>
                            {firstName} {lastName}
                          </Menu.Label>

                          <Menu.Item
                            icon={<LayoutDashboard size={14} />}
                            onClick={() => handleNavigate("/dashboard/profile")}
                          >
                            My Dashboard
                          </Menu.Item>

                          <Menu.Divider />

                          <Menu.Label>Actions</Menu.Label>

                          <Menu.Item
                            color="red"
                            icon={<Logout size={14} />}
                            onClick={handleLogout}
                          >
                            Logout
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    ) : (
                      <Button component={Link} to="/sign-in" radius="lg">
                        Sign in
                      </Button>
                    )}
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
