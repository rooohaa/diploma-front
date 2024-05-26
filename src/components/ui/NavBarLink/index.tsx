import { NavLink } from "@mantine/core"
import React from "react"
import { Link, useLocation } from "react-router-dom"

interface NavBarLinkProps {
  label: string
  path: string
  icon?: React.ReactNode
  color?: string
  children?: React.ReactNode
}

const NavBarLink: React.FC<NavBarLinkProps> = ({
  label,
  path,
  icon,
  children,
}) => {
  const location = useLocation()

  return (
    <NavLink
      color="m-orange"
      variant="filled"
      label={label}
      icon={icon}
      sx={{ borderRadius: 8 }}
      component={Link}
      to={path}
      active={location.pathname === path}
    >
      {children}
    </NavLink>
  )
}

export { NavBarLink }
