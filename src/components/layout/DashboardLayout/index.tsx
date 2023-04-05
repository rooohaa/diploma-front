import { AppShell, Header, Flex } from "@mantine/core"
import { AppLogoLink } from "components/ui"
import { DailyAdviceModal, UserAvatar } from "components/domain"
import { NavigationBar } from "./NavigationBar"

interface IDashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout: React.FC<IDashboardLayoutProps> = ({ children }) => {
  return (
    <AppShell
      padding="md"
      navbar={<NavigationBar />}
      header={
        <Header height={60} p="xs">
          <Flex align="center" justify="space-between">
            <AppLogoLink />

            <UserAvatar />
          </Flex>
        </Header>
      }
    >
      {children}

      <DailyAdviceModal />
    </AppShell>
  )
}

export { DashboardLayout }
