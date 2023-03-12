import {
  Box,
  Button,
  Flex,
  Select,
  Text,
  TextInput,
  Title,
  NumberInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IAcademicPerformanceFormValues } from '~/types/sign-up';
import { FormWrapper } from '../FormWrapper';

interface IAcademicPermormanceProps {
  onSubmit: (values: IAcademicPerformanceFormValues) => void;
}

const majorOptions = [
  { value: 'associate', label: 'Associate degree' },
  { value: 'bachelor', label: "Bachelor's degree" },
  { value: 'master', label: "Master's degree" },
  { value: 'doctoral', label: 'Doctoral degree' },
];

const AcademicPermormance: React.FC<IAcademicPermormanceProps> = ({
  onSubmit,
}) => {
  const form = useForm<IAcademicPerformanceFormValues>({
    initialValues: {
      major: '',
      faculty: '',
      gpa: '',
    },
  });

  const handleSubmit = (values: IAcademicPerformanceFormValues) => {
    onSubmit(values);
  };

  return (
    <FormWrapper imagePath="sign-up_academic-performance.png">
      <Flex direction="column" justify="center" sx={{ width: '50%' }}>
        <Box sx={{ textAlign: 'center', marginBottom: '50px' }}>
          <Title>Sign up</Title>

          <Text fz="lg" component="h3">
            Academic performance
          </Text>
        </Box>

        <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
          <Box sx={{ marginBottom: '20px' }}>
            <Select
              label="Major"
              placeholder="Pick your Major in university"
              data={majorOptions}
            />
          </Box>

          <Box sx={{ marginBottom: '20px' }}>
            <TextInput
              placeholder="Write your Faculty"
              label="Faculty"
              {...form.getInputProps('faculty')}
            />
          </Box>

          <Box sx={{ marginBottom: '20px' }}>
            <NumberInput
              placeholder="Write your GPA"
              label="GPA"
              precision={2}
              min={0}
              max={4}
              {...form.getInputProps('gpa')}
            />
          </Box>

          <Button type="submit" size="lg" variant="filled" fullWidth>
            Next
          </Button>
        </Box>
      </Flex>
    </FormWrapper>
  );
};

export { AcademicPermormance };
