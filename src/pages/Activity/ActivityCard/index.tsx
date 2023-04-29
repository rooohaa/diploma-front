import { Flex, ActionIcon, Text, Badge, Tooltip, Avatar } from "@mantine/core"
import { Plus, Check } from "tabler-icons-react"
import { formatDate } from "utils/helpers"
import styled from "@emotion/styled"
import { IActivity } from ".."
import { useMe } from "hooks/useMe"
import { getUserInitials } from "utils/avatar"
import { useState } from "react"
import { supabase } from "supabaseClient"
import { showNotification } from "@mantine/notifications"

const ActivityCardWrapper = styled.div`
  background-color: #fff;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 0px 8px;
  border-radius: 8px;

  padding: 20px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 8px;
`

interface IActivityCardProps {
  activity: IActivity
  onClubJoin: () => void
}

const ActivityCard: React.FC<IActivityCardProps> = ({
  activity,
  onClubJoin,
}) => {
  const user = useMe()
  const [loading, setLoading] = useState(false)
  const { name, description, tags, created_at, member, id } = activity
  const isParticipant = !!member.find((m) => m.student_id === user?.id)

  const handleJoinClub = async () => {
    setLoading(true)

    try {
      const { error } = await supabase
        .from("member")
        .insert([{ student_id: user?.id, club_id: id }])

      if (!error) {
        showNotification({
          title: "Successfully joined!",
          message: `Now, you are member of ${name}!`,
          autoClose: 5000,
          color: "teal",
          icon: <Check />,
        })
        onClubJoin()
      }
    } catch (err) {
      console.error(err)
      alert("Service error.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ActivityCardWrapper>
      <Flex
        direction="row"
        align="center"
        justify="space-between"
        sx={{ width: "100%" }}
      >
        <Text fz="xl" fw={600}>
          {name}
        </Text>

        {isParticipant ? (
          <Tooltip label="Already joined!">
            <ActionIcon variant="light" color="green">
              <Check />
            </ActionIcon>
          </Tooltip>
        ) : (
          <Tooltip label="Join the club">
            <ActionIcon
              variant="light"
              color="blue"
              loading={loading}
              onClick={handleJoinClub}
            >
              <Plus />
            </ActionIcon>
          </Tooltip>
        )}
      </Flex>

      <Text c="dimmed">{description}</Text>

      <Flex direction="row" align="center" columnGap={8}>
        {tags.map((tag) => (
          <Badge key={tag} color="blue">
            {tag}
          </Badge>
        ))}
      </Flex>

      <Flex
        direction="row"
        align="center"
        justify="space-between"
        sx={{ width: "100%" }}
      >
        <Flex direction="row" align="center" columnGap={8}>
          <Text fw={600} size="sm">
            Participants:
          </Text>

          {member.length > 0 ? (
            <Avatar.Group spacing="sm">
              {member.map(
                ({ personal_information: { first_name, last_name } }) => (
                  <Tooltip label={`${first_name} ${last_name}`}>
                    <Avatar src={null} radius="xl" color="indigo">
                      {getUserInitials(first_name, last_name)}
                    </Avatar>
                  </Tooltip>
                )
              )}
            </Avatar.Group>
          ) : (
            <Text size="sm">No participants yet. Join us!</Text>
          )}
        </Flex>

        <Text c="dimmed" fw={700} size="sm" sx={{ alignSelf: "flex-end" }}>
          Created: {formatDate(created_at)}
        </Text>
      </Flex>
    </ActivityCardWrapper>
  )
}

export { ActivityCard }
