import dayjs from "dayjs"

export function formatDate(date: string | null | Date, format = "YYYY-MM-DD") {
  if (!date) {
    return "---"
  }

  return dayjs(date).format(format)
}
