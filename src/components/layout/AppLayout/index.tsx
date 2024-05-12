import { Box, Flex } from "@mantine/core"
import { AppFooter } from "../AppFooter"
import { AppHeader } from "../AppHeader"

interface IAppLayoutProps {
  isAuthHeader?: boolean
  children: React.ReactNode
}

const AppLayout: React.FC<IAppLayoutProps> = ({
  children,
  isAuthHeader = false,
}) => {
  return (
    <Flex direction="column" mih="100vh">
      <AppHeader isAuth={isAuthHeader} />
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>
      <AppFooter />
    </Flex>
  )
}

export { AppLayout }
