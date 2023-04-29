import { Flex, Loader, Container, Autocomplete, Box } from "@mantine/core"
import { useEffect, useState } from "react"
import { supabase } from "supabaseClient"
import { Search } from "tabler-icons-react"
import { ActivityCard } from "./ActivityCard"

export interface IActivity {
  id: number
  name: string
  description: string
  created_at: string
  tags: string[]
  member: any[]
}

const Activity: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [clubs, setClubs] = useState<IActivity[]>([])
  // Club name search query
  const [clubName, setClubName] = useState("")

  // All club names for autocomplete
  const clubNames = clubs.map((club) => club.name)

  // Filtered clubs
  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(clubName.toLowerCase())
  )

  // Clubs fetching
  useEffect(() => {
    fetchActivities()
  }, [])

  const fetchActivities = async () => {
    setLoading(true)

    try {
      let { data, error } = await supabase.from("club").select(`
          id, 
          name, 
          description, 
          created_at, 
          tags,
          member (
            student_id,
            personal_information (
             first_name,
             last_name 
            )
          )
        `)

      if (!error) setClubs(data as IActivity[])
    } catch (err) {
      console.error(err)
      alert("Service error.")
    } finally {
      setLoading(false)
    }
  }

  return loading ? (
    <Flex justify="center" align="center" w="100%" h="100%">
      <Loader />
    </Flex>
  ) : (
    <Container size="xl">
      <Box sx={{ marginBottom: "16px" }}>
        <Autocomplete
          placeholder="Select / Search club"
          icon={<Search size={16} />}
          data={clubNames}
          limit={100}
          value={clubName}
          onChange={(val) => setClubName(val)}
        />
      </Box>

      <Flex direction="column" align="center" rowGap={24}>
        {filteredClubs.map((club) => (
          <ActivityCard
            key={club.id}
            activity={club}
            onClubJoin={() => {
              fetchActivities()
            }}
          />
        ))}
      </Flex>
    </Container>
  )
}

export { Activity }
