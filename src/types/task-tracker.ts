import { Dayjs } from "dayjs"

export interface ITask {
  id: string
  title: string
  description: string
  deadline: Date | string | null
  status: TTaskStatus
}

export type TTaskStatus = "todo" | "progress" | "completed"

export interface ITaskModalValue {
  mode: "create" | "update"
  value: ITask
}
