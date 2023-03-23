import { PrivateRoutes } from "components/system"
import { useMe } from "hooks/useMe"
import { Main, SignIn, SignUp } from "pages"
import { Outlet, Route, Routes } from "react-router-dom"

const App: React.FC = () => {
  const user = useMe()

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      <Route element={<PrivateRoutes redirectPath="/sign-in" />}>
        <Route path="dashboard/*" element={<Outlet />}>
          <Route
            path="user"
            element={<div>Authenticated as : {user?.email}</div>}
          />
          <Route path="task-tracker" element={<div>task-tracker</div>} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
