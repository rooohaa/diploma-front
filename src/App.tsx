import { PrivateRoutes } from "components/system"
import { Assistant, Main, Profile, SignIn, SignUp, TaskTracker } from "pages"
import { Activity } from "pages/Activity"
import {
  Award,
  Education,
  ProfessionalSkill,
  WorkExperience,
} from "pages/Career"
import { Review, Assessment } from "pages/Psychometric"
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

          <Route path="psychometric/*" element={<Outlet />}>
            <Route path="review" element={<Review />} />
            <Route path="assessment" element={<Assessment />} />
          </Route>

          <Route path="career/*" element={<Outlet />}>
            <Route path="education" element={<Education />} />
            <Route path="work-experience" element={<WorkExperience />} />
            <Route path="professional-skill" element={<ProfessionalSkill />} />
            <Route path="award" element={<Award />} />
          </Route>

          <Route path="activity" element={<Activity />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
