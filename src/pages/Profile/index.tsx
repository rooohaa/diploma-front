import { useMe } from "hooks/useMe"

const Profile: React.FC = () => {
  const user = useMe()

  return <div>Authenticated as : {user?.email}</div>
}

export { Profile }
