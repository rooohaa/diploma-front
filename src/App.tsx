import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { DashboardLayout } from "./components/layout/DashboardLayout"
import { useAppDispatch } from "./hooks/useAppDispatch"
import { useMe } from "./hooks/useMe"
import { Main, SignUp, SignIn } from "./pages"
import { setUser } from "./store/reducers/authReducer"
import { setPersonalInfo } from "./store/reducers/personReducer"
import { supabase } from "./supabaseClient"
import { IPerson } from "./types/person"

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const user = useMe()

  useEffect(() => {
    auth()
  }, [])

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

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route
        path="/dashboard"
        element={
          <DashboardLayout>
            {!!user ? (
              <div>Authenticated as : {user.email}</div>
            ) : (
              <div>not authenticated</div>
            )}
          </DashboardLayout>
        }
      />
    </Routes>
  )
}

export default App
