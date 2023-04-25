import { Button } from "@mantine/core"
import axios from "axios"
import { useMe } from "hooks/useMe"
import { useState } from "react"

const Profile: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const user = useMe()

  const handleDownloadResume = async () => {
    setLoading(true)
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/resume/pdf/`,
        {
          params: {
            userId: user?.id,
          },
          responseType: "arraybuffer",
        }
      )

      if (res.status === 200) {
        const blob = new Blob([res.data], { type: "application/pdf" })

        const link = document.createElement("a")
        link.href = window.URL.createObjectURL(blob)
        link.download = "resume.pdf"
        link.click()
      }
    } catch (error) {
      console.error(error)
      alert("Service error, try later...")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div>Authenticated as : {user?.email}</div>
      <Button loading={loading} onClick={handleDownloadResume}>
        Download resume
      </Button>
    </>
  )
}

export { Profile }
