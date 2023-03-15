import { Routes, Route } from "react-router-dom"
import { DashboardLayout } from "./components/layout/DashboardLayout"
import { Main, SignUp, SignIn } from "./pages"

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route
        path="/dashboard"
        element={
          <DashboardLayout>
            <div>app here</div>
          </DashboardLayout>
        }
      />
    </Routes>
  )
}

export default App
