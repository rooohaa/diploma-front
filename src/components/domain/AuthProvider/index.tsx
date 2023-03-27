import { useAppDispatch } from "hooks/useAppDispatch"
import { useEffect } from "react"
import { setUser } from "store/reducers/authReducer"
import { setPersonalInfo } from "store/reducers/personReducer"
import { supabase } from "supabaseClient"
import { IPerson } from "types/person"

interface IAuthProviderProps {
  children: React.ReactElement
}

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    auth()
  }, [])

  // authorize if session exists on page reload
  const auth = async () => {
    const { data, error } = await supabase.auth.getSession()

    if (!error) {
      if (data.session) {
        const { data: personalInfo, error: personalInfoErr } = await supabase
          .from("personal_information")
          .select("*")
          .eq("student_id", data.session.user.id)

        const { birthdate, first_name, last_name, phone_number, email } =
          personalInfo![0]

        const person: IPerson = {
          firstName: first_name,
          lastName: last_name,
          birthdate,
          phoneNumber: phone_number,
          email,
        }

        dispatch(setUser({ session: data.session, user: data.session.user }))
        dispatch(setPersonalInfo({ person }))
      }
    }
  }

  return children
}

export { AuthProvider }
