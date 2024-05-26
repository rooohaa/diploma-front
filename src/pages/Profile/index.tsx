import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Loader,
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
  Download,
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
  const [downloading, setDownloading] = useState(false)
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
    setLoading(true)

    try {
      const [education, academicInfo] = await Promise.all([
        fetchEducation(),
        fetchAcademicInformation(),
      ])

      setEducation(education)
      setAcademicInfo(academicInfo)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
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
    setDownloading(true)
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
      setDownloading(false)
    }
  }

  return (
    <Card shadow="md" p="md" radius="md">
      <Flex py="xs" justify="space-between">
        <Avatar
          size={60}
          alt="User avatar"
          variant="filled"
          color="m-orange"
          radius="xl"
        />
        <Button
          leftIcon={<Download />}
          loading={downloading}
          onClick={handleDownloadResume}
        >
          Download resume
        </Button>
      </Flex>

      <Flex direction="column">
        <Title order={2}>
          {lastName} {firstName}
        </Title>
        <Text>{email}</Text>
        <Text>{phoneNumber}</Text>
      </Flex>

      {loading ? (
        <Flex justify="center" align="center" w="100%" h="100%">
          <Loader />
        </Flex>
      ) : (
        <>
          {education.length ? (
            <Box py="xs">
              <Title mb="sm" order={4}>
                Education:
              </Title>

              <Flex direction="column" gap={8}>
                {education.map(({ university_name, major, degree }, idx) => (
                  <Flex key={idx} gap={8} wrap="wrap">
                    <Badge
                      variant="filled"
                      sx={{
                        textTransform: "none",
                        span: {
                          maxHeight: "100%",
                        },
                      }}
                      leftSection={<BuildingBank size={18} />}
                    >
                      {university_name}
                    </Badge>

                    <Badge
                      variant="filled"
                      sx={{
                        textTransform: "none",
                        span: {
                          maxHeight: "100%",
                        },
                      }}
                      leftSection={<MicroscopeOff size={18} />}
                    >
                      {major}
                    </Badge>

                    <Badge
                      variant="filled"
                      sx={{
                        textTransform: "none",
                        span: {
                          maxHeight: "100%",
                        },
                      }}
                      leftSection={<Star size={18} />}
                    >
                      {degree}
                    </Badge>
                  </Flex>
                ))}
              </Flex>
            </Box>
          ) : null}
          {academicInfo.length ? (
            <Box py="xs">
              <Title mb="sm" order={4}>
                Academic info:
              </Title>

              <Flex direction="column" gap={8}>
                {academicInfo.map(({ faculty, gpa, advisor }, idx) => (
                  <Flex key={idx} gap={8} wrap="wrap">
                    <Badge
                      variant="filled"
                      sx={{
                        textTransform: "none",
                        span: {
                          maxHeight: "100%",
                        },
                      }}
                      leftSection={<Globe size={18} />}
                    >
                      {faculty}
                    </Badge>

                    <Badge
                      variant="filled"
                      sx={{
                        textTransform: "none",
                        span: {
                          maxHeight: "100%",
                        },
                      }}
                      leftSection={<Scale size={18} />}
                    >
                      {gpa}
                    </Badge>

                    <Badge
                      variant="filled"
                      sx={{
                        textTransform: "none",
                        span: {
                          maxHeight: "100%",
                        },
                      }}
                      leftSection={<BrandFlightradar24 size={18} />}
                    >
                      {advisor}
                    </Badge>
                  </Flex>
                ))}
              </Flex>
            </Box>
          ) : null}
        </>
      )}
    </Card>
  )
}

export { Profile }
