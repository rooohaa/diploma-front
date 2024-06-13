import { Tabs } from "@mantine/core"
import { useState } from "react"
import { Album, Moneybag } from "tabler-icons-react"

type AnalysisTabValue = "grades" | "salary"

export const Analysis: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<AnalysisTabValue>("grades")

  return (
    <Tabs
      value={currentTab}
      onTabChange={(value) => setCurrentTab(value as AnalysisTabValue)}
      variant="default"
    >
      <Tabs.List>
        <Tabs.Tab value="grades" icon={<Album size={14} />}>
          Grades
        </Tabs.Tab>
        <Tabs.Tab value="salary" icon={<Moneybag size={14} />}>
          Salary
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="grades" pt="xs">
        Grades tab content
      </Tabs.Panel>

      <Tabs.Panel value="salary" pt="xs">
        Salary tab content
      </Tabs.Panel>
    </Tabs>
  )
}
