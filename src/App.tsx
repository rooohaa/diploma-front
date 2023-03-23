import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { useAppDispatch } from "hooks/useAppDispatch"
import { useMe } from "hooks/useMe"
import { Main, SignUp, SignIn } from "pages"
import { setUser } from "store/reducers/authReducer"
import { setPersonalInfo } from "store/reducers/personReducer"
import { supabase } from "supabaseClient"
import { IPerson } from "types/person"
import { PrivateRoutes } from "components/system"

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const user = useMe()

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

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      <Route element={<PrivateRoutes redirectPath="/sign-in" />}>
        <Route
          path="/dashboard"
          element={
            <>
              {!!user ? (
                <div>Authenticated as : {user.email}</div>
              ) : (
                <div>not authenticated</div>
              )}
            </>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
