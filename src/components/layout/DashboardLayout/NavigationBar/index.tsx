import { Navbar } from "@mantine/core"
import { NavBarLink } from "components/ui"
import { links } from "./mock"

const NavigationBar: React.FC = () => {
  return (
    <Navbar width={{ base: 300 }} p="xs">
      <Navbar.Section>
        {links.map((link) => (
          <NavBarLink {...link} key={link.label} />
        ))}
      </Navbar.Section>
    </Navbar>
  )
}

export { NavigationBar }
