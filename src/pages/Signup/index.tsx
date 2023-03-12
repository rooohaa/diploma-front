import { Container } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleMoveNext = () => {
    if (currentStep < forms.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/');
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

  const renderForms = () => {
    switch (forms[currentStep]) {
      case 'main':
        return <Main onSubmit={handleSubmit} />;
      case 'personal-info':
        return <PersonalInfo onSubmit={handleSubmit} />;
      case 'academic-performance':
        return <AcademicPermormance onSubmit={handleSubmit} />;
      case 'last':
        return <Last />;
      default:
        return null;
    }
  };

  return (
    <AppLayout isAuthHeader={true}>
      <Container size="lg">{renderForms()}</Container>
    </AppLayout>
  );
};

export { SignUp };
