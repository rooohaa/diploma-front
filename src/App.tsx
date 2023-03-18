import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { DashboardLayout } from "./components/layout/DashboardLayout"
import { useAppDispatch } from "./hooks/useAppDispatch"
import { useMe } from "./hooks/useMe"
import { Main, SignUp, SignIn } from "./pages"
import { setUser } from "./store/reducers/authReducer"
import { supabase } from "./supabaseClient"

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
        dispatch(setUser({ session: data.session, user: data.session.user }))
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
