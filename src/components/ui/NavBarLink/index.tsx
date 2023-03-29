import { NavLink } from "@mantine/core"
import React from "react"
import { Link, useLocation } from "react-router-dom"

interface NavBarLinkProps {
  label: string
  path: string
  icon?: React.ReactNode
  color?: string
}

const NavBarLink: React.FC<NavBarLinkProps> = ({ label, path, icon }) => {
  const location = useLocation()

  return (
    <NavLink
      color="red"
      label={label}
      icon={icon}
      component={Link}
      to={path}
      active={location.pathname === path}
    />
  )
}

export { NavBarLink }
