import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "hooks/useAuth"
import { DashboardLayout } from "~/components/layout/DashboardLayout"

interface IPrivateRoutesProps {
  redirectPath: string
}

const PrivateRoutes: React.FC<IPrivateRoutesProps> = ({ redirectPath }) => {
  const auth = useAuth()

  if (!auth) {
    return <Navigate to={redirectPath} />
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  )
}

export { PrivateRoutes }
