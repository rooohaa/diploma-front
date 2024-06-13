import { Box, Image, Tabs } from "@mantine/core"
import { useState } from "react"
import {
  Activity,
  Album,
  Award,
  AwardOff,
  Book2,
  Moneybag,
} from "tabler-icons-react"

type AnalysisTabValue =
  | "grades"
  | "work"
  | "clubs"
  | "award"
  | "education"
  | "salary"

export const Analysis: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<AnalysisTabValue>("grades")

  return (
    <Tabs
      value={currentTab}
      onTabChange={(value) => setCurrentTab(value as AnalysisTabValue)}
    >
      <Tabs.List>
        <Tabs.Tab value="grades" icon={<Album size={18} />}>
          Grades
        </Tabs.Tab>
        <Tabs.Tab value="work" icon={<Moneybag size={18} />}>
          Work experience
        </Tabs.Tab>
        <Tabs.Tab value="clubs" icon={<Activity size={18} />}>
          Clubs
        </Tabs.Tab>
        <Tabs.Tab value="education" icon={<Book2 size={18} />}>
          Education
        </Tabs.Tab>
        <Tabs.Tab value="award" icon={<Award size={18} />}>
          Award
        </Tabs.Tab>
        <Tabs.Tab value="salary" icon={<Moneybag size={18} />}>
          Salary
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="grades" pt="xs">
        <Box sx={{ width: 700, margin: "0 auto" }}>
          <Image
            radius="md"
            src="/assets/images/analysis/grade_distribution.png"
            alt="grades graph"
          />
        </Box>
      </Tabs.Panel>
      <Tabs.Panel value="work" pt="xs">
        <Box sx={{ width: 850, margin: "0 auto" }}>
          <Image
            radius="md"
            src="/assets/images/analysis/work_experience_timeline.png"
            alt="work graph"
          />
        </Box>
      </Tabs.Panel>
      <Tabs.Panel value="clubs" pt="xs">
        <Box sx={{ width: 850, margin: "0 auto" }}>
          <Image
            radius="md"
            src="/assets/images/analysis/clubs_joined.png"
            alt="clubs graph"
          />
        </Box>
      </Tabs.Panel>
      <Tabs.Panel value="education" pt="xs">
        <Box sx={{ width: 850, margin: "0 auto" }}>
          <Image
            radius="md"
            src="/assets/images/analysis/education_timeline.png"
            alt="education graph"
          />
        </Box>
      </Tabs.Panel>
      <Tabs.Panel value="award" pt="xs">
        <Box sx={{ width: 600, margin: "0 auto" }}>
          <Image
            radius="md"
            src="/assets/images/analysis/award_frequency.png"
            alt="award graph"
          />
        </Box>
      </Tabs.Panel>
      <Tabs.Panel value="salary" pt="xs">
        <Box sx={{ width: 850, margin: "0 auto", marginBottom: 20 }}>
          <Image
            radius="md"
            src="/assets/images/analysis/student_salary_ranges.png"
            alt="salary graph"
          />
        </Box>

        <Box sx={{ width: 850, margin: "0 auto" }}>
          <Image
            radius="md"
            src="/assets/images/analysis/student_exp_salary.png"
            alt="salary range graph"
          />
        </Box>
      </Tabs.Panel>
    </Tabs>
  )
}
