import React from "react"
import { ThemeIcon, UnstyledButton, Group, Text } from "@mantine/core"
import { Link } from "react-router-dom"

interface NavBarLinkProps {
  label: string
  path: string
  icon?: React.ReactNode
  color?: string
}

const NavBarLink: React.FC<NavBarLinkProps> = ({
  label,
  path,
  icon,
  color,
}) => {
  return (
    <UnstyledButton
      to={path}
      component={Link}
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.black,
        backgroundColor: theme.white,
        "&:hover": {
          backgroundColor: theme.colors.gray[0],
        },
      })}
    >
      <Group>
        {icon ? (
          <ThemeIcon color={color} variant="light">
            {icon}
          </ThemeIcon>
        ) : null}

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  )
}

export { NavBarLink }
