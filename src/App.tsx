import { PrivateRoutes } from "components/system"
import { Assistant, Main, Profile, SignIn, SignUp, TaskTracker } from "pages"
import {
  Award,
  Education,
  ProfessionalSkill,
  WorkExperience,
} from "pages/Career"
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

          <Route path="career/*" element={<Outlet />}>
            <Route path="education" element={<Education />} />
            <Route path="work-experience" element={<WorkExperience />} />
            <Route path="professional-skill" element={<ProfessionalSkill />} />
            <Route path="award" element={<Award />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
