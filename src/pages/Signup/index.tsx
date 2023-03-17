import { Box, Container, Stepper } from "@mantine/core"
import { useState } from "react"
import { AppLayout } from "~/components"
import { AcademicInfo } from "./AcademicInfo"
import { Last } from "./Last"
import { Main } from "./Main"
import { PersonalInfo } from "./PersonalInfo"

const forms = ["main", "personal-info", "academic-performance", "last"]

const SignUp: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0)

  const handleMoveNext = () => {
    if (currentStep < forms.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  return (
    <AppLayout isAuthHeader={true}>
      <Container size="lg">
        <Box sx={{ marginTop: "20px" }}>
          <Stepper
            active={currentStep}
            onStepClick={setCurrentStep}
            allowNextStepsSelect={false}
          >
            <Stepper.Step label="Create an account">
              <Main onSubmit={handleMoveNext} />
            </Stepper.Step>

            <Stepper.Step label="Personal information">
              <PersonalInfo onSubmit={handleMoveNext} />
            </Stepper.Step>

            <Stepper.Step label="Academic information">
              <AcademicInfo onSubmit={handleMoveNext} />
            </Stepper.Step>

            <Stepper.Completed>
              <Last />
            </Stepper.Completed>
          </Stepper>
        </Box>
      </Container>
    </AppLayout>
  )
}

export { SignUp }
