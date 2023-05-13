import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Text,
  Title,
} from "@mantine/core"
import axios from "axios"
import { useAppSelector } from "hooks/useAppSelector"
import { useMe } from "hooks/useMe"
import { useEffect, useState } from "react"
import { selectPersonalInfo } from "store/reducers/personReducer"
import { supabase } from "supabaseClient"
import {
  BrandFlightradar24,
  BuildingBank,
  Globe,
  MicroscopeOff,
  Scale,
  Star,
} from "tabler-icons-react"
import { getUserInitials } from "utils/avatar"

interface IEducation {
  university_name: string
  major: string
  degree: string
}

interface IAcademicInfo {
  faculty: string
  gpa: number
  advisor: string
}

const Profile: React.FC = () => {
  const user = useMe()
  const personalInfo = useAppSelector(selectPersonalInfo)
  const [loading, setLoading] = useState(false)
  const [education, setEducation] = useState<IEducation[]>([])
  const [academicInfo, setAcademicInfo] = useState<IAcademicInfo[]>([])

  const {
    firstName = "",
    lastName = "",
    email = "",
    phoneNumber = "",
  } = personalInfo || {}
  const initials = getUserInitials(firstName, lastName)

  useEffect(() => {
    if (user) {
      fetchInfo()
    }
  }, [user])

  const fetchInfo = async () => {
    try {
      const [education, academicInfo] = await Promise.all([
        fetchEducation(),
        fetchAcademicInformation(),
      ])

      setEducation(education)
      setAcademicInfo(academicInfo)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchEducation = async (): Promise<IEducation[]> => {
    const { data, error } = await supabase
      .from("education")
      .select("university_name, major, degree")
      .eq("student_id", user!.id)

    if (error) {
      throw new Error(error.message)
    }

    return data
  }

  const fetchAcademicInformation = async (): Promise<IAcademicInfo[]> => {
    const { data, error } = await supabase
      .from("academic_information")
      .select("faculty, gpa, advisor")
      .eq("student_id", user!.id)

    if (error) {
      throw new Error(error.message)
    }

    return data
  }

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
    <Card shadow="md" p="md" radius="md">
      <Flex py="md" justify="space-between">
        <Flex gap="md" align="center">
          <Avatar
            size={80}
            src={null}
            alt="User avatar"
            color="red"
            radius="lg"
          >
            {initials}
          </Avatar>

          <Flex direction="column">
            <Title order={2}>
              {lastName} {firstName}
            </Title>
            <Text>{email}</Text>
            <Text>{phoneNumber}</Text>
          </Flex>
        </Flex>

        <Button
          variant="light"
          color="red"
          loading={loading}
          onClick={handleDownloadResume}
        >
          Download resume
        </Button>
      </Flex>

      <Box py="md">
        <Title mb="sm" order={4}>
          Education:
        </Title>

        <Flex direction="column" gap={8}>
          {education.map(({ university_name, major, degree }, idx) => (
            <Flex key={idx} gap={8} wrap="wrap">
              <Badge
                variant="gradient"
                size="lg"
                h="auto"
                sx={{ padding: "5px 10px", textTransform: "none" }}
                gradient={{ from: "orange", to: "red" }}
                leftSection={<BuildingBank size={24} />}
              >
                {university_name}
              </Badge>

              <Badge
                variant="gradient"
                size="lg"
                h="auto"
                sx={{ padding: "5px 10px", textTransform: "none" }}
                gradient={{ from: "orange", to: "red" }}
                leftSection={<MicroscopeOff size={24} />}
              >
                {major}
              </Badge>

              <Badge
                variant="gradient"
                size="lg"
                h="auto"
                sx={{ padding: "5px 10px", textTransform: "none" }}
                gradient={{ from: "orange", to: "red" }}
                leftSection={<Star size={24} />}
              >
                {degree}
              </Badge>
            </Flex>
          ))}
        </Flex>
      </Box>

      <Box py="md">
        <Title mb="sm" order={4}>
          Academic info:
        </Title>

        <Flex direction="column" gap={8}>
          {academicInfo.map(({ faculty, gpa, advisor }, idx) => (
            <Flex key={idx} gap={8} wrap="wrap">
              <Badge
                variant="gradient"
                size="lg"
                h="auto"
                sx={{ padding: "5px 10px", textTransform: "none" }}
                gradient={{ from: "orange", to: "red" }}
                leftSection={<Globe size={24} />}
              >
                {faculty}
              </Badge>

              <Badge
                variant="gradient"
                size="lg"
                h="auto"
                sx={{ padding: "5px 10px", textTransform: "none" }}
                gradient={{ from: "orange", to: "red" }}
                leftSection={<Scale size={24} />}
              >
                {gpa}
              </Badge>

              <Badge
                variant="gradient"
                size="lg"
                h="auto"
                sx={{ padding: "5px 10px", textTransform: "none" }}
                gradient={{ from: "orange", to: "red" }}
                leftSection={<BrandFlightradar24 size={24} />}
              >
                {advisor}
              </Badge>
            </Flex>
          ))}
        </Flex>
      </Box>
    </Card>
  )
}

export { Profile }
