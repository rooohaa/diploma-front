import { PrivateRoutes } from "components/system"
import { Assistant, Main, Profile, SignIn, SignUp, TaskTracker } from "pages"
import { Career } from "pages/Career"
import { Outlet, Route, Routes } from "react-router-dom"

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      <Route element={<PrivateRoutes redirectPath="/sign-in" />}>
        <Route path="dashboard/*" element={<Outlet />}>
          <Route path="profile" element={<Profile />} />
          <Route path="task-tracker" element={<TaskTracker />} />
          <Route path="assistant" element={<Assistant />} />
          <Route path="career" element={<Career />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
