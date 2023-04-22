import { Navbar } from "@mantine/core"
import { NavBarLink } from "components/ui"
import { TLink, links } from "./mock"

const NavigationBar: React.FC = () => {
  const renderSublinks = (link: TLink) => {
    const sublinks = link.sublinks

    if (sublinks) {
      return sublinks.map((sublink) => (
        <NavBarLink {...sublink} key={sublink.label} />
      ))
    }

    return null
  }

  return (
    <Navbar width={{ base: 300 }} p="xs">
      <Navbar.Section>
        {links.map((link) => {
          return (
            <NavBarLink {...link} key={link.label}>
              {renderSublinks(link)}
            </NavBarLink>
          )
        })}
      </Navbar.Section>
    </Navbar>
  )
}

export { NavigationBar }
