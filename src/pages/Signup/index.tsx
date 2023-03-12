import { Box, Container, Stepper } from '@mantine/core';
import { useState } from 'react';
import { AppLayout } from '~/components';
import {
  IAcademicPerformanceFormValues,
  IMainFormValues,
  IPersonalInfoFormValues,
} from '~/types/sign-up';
import { AcademicPermormance } from './AcademicPerformance';
import { Last } from './Last';
import { Main } from './Main';
import { PersonalInfo } from './PersonalInfo';

interface IFormData extends IMainFormValues, IPersonalInfoFormValues {}

const forms = ['main', 'personal-info', 'academic-performance', 'last'];

const SignUp: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<IFormData | {}>({});

  const handleMoveNext = () => {
    if (currentStep < forms.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = (
    values:
      | IMainFormValues
      | IPersonalInfoFormValues
      | IAcademicPerformanceFormValues
  ) => {
    setFormData({ ...formData, ...values });
    handleMoveNext();
  };

  return (
    <AppLayout isAuthHeader={true}>
      <Container size="lg">
        <Box sx={{ marginTop: '20px' }}>
          <Stepper
            active={currentStep}
            onStepClick={setCurrentStep}
            allowNextStepsSelect={false}
          >
            <Stepper.Step label="Create an account">
              <Main onSubmit={handleSubmit} />
            </Stepper.Step>
            <Stepper.Step label="Personal information">
              <PersonalInfo onSubmit={handleSubmit} />
            </Stepper.Step>
            <Stepper.Step label="Academic permormance">
              <AcademicPermormance onSubmit={handleSubmit} />
            </Stepper.Step>
            <Stepper.Completed>
              <Last />;
            </Stepper.Completed>
          </Stepper>
        </Box>
      </Container>
    </AppLayout>
  );
};

export { SignUp };
