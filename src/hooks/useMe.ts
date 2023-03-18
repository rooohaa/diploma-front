import { selectUser } from "~/store/reducers/authReducer"
import { useAppSelector } from "./useAppSelector"

export function useMe() {
  const user = useAppSelector(selectUser)

  return user
}
