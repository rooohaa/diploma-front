import { TTaskStatus } from "types/task-tracker"

export const getColor = (status: TTaskStatus) => {
  switch (status) {
    case "todo":
      return "#f9dfc8"
    case "progress":
      return "#c8ebf8"
    case "completed":
      return "#c9f9cd"
    default:
      return "#efefef"
  }
}
