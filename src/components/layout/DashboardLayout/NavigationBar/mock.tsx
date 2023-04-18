import { UserCircle, Notes, Robot, Compass } from "tabler-icons-react"

export type TLink = {
  label: string
  icon: React.ReactNode
  path: string
  sublinks?: {
    label: string
    path: string
  }[]
}

export const links: TLink[] = [
  {
    label: "Profile",
    icon: <UserCircle />,
    path: "/dashboard/profile",
  },
  {
    label: "Task tracker",
    icon: <Notes />,
    path: "/dashboard/task-tracker",
  },
  {
    label: "AI Assistant",
    icon: <Robot />,
    path: "/dashboard/assistant",
  },
  {
    label: "Career",
    icon: <Compass />,
    path: "/dashboard/career",
    sublinks: [
      { label: "Education", path: "/dashboard/career/education" },
      { label: "Work experience", path: "/dashboard/career/work-experience" },
      {
        label: "Professional skills",
        path: "/dashboard/career/professional-skill",
      },
      { label: "Award", path: "/dashboard/career/award" },
    ],
  },
]
