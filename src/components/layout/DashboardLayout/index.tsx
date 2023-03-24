import { AppShell, Navbar, Header } from "@mantine/core"
import { AppLogoLink, NavBarLink } from "components/ui"
import { Notes, UserCircle } from "tabler-icons-react"

interface IDashboardLayoutProps {
  children: React.ReactNode
}

const links = [
  {
    color: "#ffffff",
    label: "Profile",
    icon: <UserCircle />,
    path: "/dashboard/profile",
  },
  {
    color: "#ffffff",
    label: "Task traker",
    icon: <Notes />,
    path: "/dashboard/task-tracker",
  },
]

const DashboardLayout: React.FC<IDashboardLayoutProps> = ({ children }) => {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} p="xs">
          <Navbar.Section>
            {links.map((link) => (
              <NavBarLink {...link} key={link.label} />
            ))}
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <AppLogoLink />
        </Header>
      }
    >
      {children}
    </AppShell>
  )
}

export { DashboardLayout }
