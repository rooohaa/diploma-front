import { Avatar, Menu } from "@mantine/core"
import { showNotification } from "@mantine/notifications"
import { useAppSelector } from "hooks/useAppSelector"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { resetUser } from "store/reducers/authReducer"
import {
  resetPersonalInfo,
  selectPersonalInfo,
} from "store/reducers/personReducer"
import { supabase } from "supabaseClient"
import { LayoutDashboard, Logout } from "tabler-icons-react"
import { getUserInitials } from "utils/avatar"

const UserAvatar: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const personalInfo = useAppSelector(selectPersonalInfo)

  const { firstName = "", lastName = "" } = personalInfo || {}
  const initials = getUserInitials(firstName, lastName)

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if (!error) {
      // reset user and personal info
      dispatch(resetUser())
      dispatch(resetPersonalInfo())

      showNotification({
        color: "blue",
        message: "Successfully logged out",
        autoClose: 5000,
      })
    }
  }

  const handleNavigate = (path: string) => navigate(path)

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Avatar
          src={null}
          alt="User avatar"
          variant="filled"
          color="m-orange"
          radius="xl"
          sx={{ cursor: "pointer" }}
        >
          {initials}
        </Avatar>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>
          {firstName} {lastName}
        </Menu.Label>

        <Menu.Item
          icon={<LayoutDashboard size={14} />}
          onClick={() => handleNavigate("/dashboard/profile")}
        >
          My Dashboard
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Actions</Menu.Label>

        <Menu.Item
          color="red"
          icon={<Logout size={14} />}
          onClick={handleLogout}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export { UserAvatar }
