import { AppShell, Navbar, Header } from "@mantine/core"
import { AppLogoLink } from "components/ui"

interface IDashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout: React.FC<IDashboardLayoutProps> = ({ children }) => {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} p="xs">
          <div>navbar</div>
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
