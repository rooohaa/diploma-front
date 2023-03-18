import { selectUser } from "~/store/reducers/authReducer"
import { useAppSelector } from "./useAppSelector"

export function useAuth() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

  return isLoggedIn
}
