import { Box, Button, Flex, Text, TextInput, Title } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IPersonalInfoFormValues } from '~/types/sign-up';
import { FormWrapper } from '../FormWrapper';

interface IPersonalInfoProps {
  onSubmit: (values: IPersonalInfoFormValues) => void;
}

const PersonalInfo: React.FC<IPersonalInfoProps> = ({ onSubmit }) => {
  const form = useForm<IPersonalInfoFormValues>({
    initialValues: {
      fullName: '',
      lastName: '',
      birthDate: '',
      phoneNumber: '',
    },
  });

  const handleSubmit = (values: IPersonalInfoFormValues) => {
    onSubmit(values);
  };

  return (
    <FormWrapper imagePath="sign-up_personal-info.png">
      <Flex direction="column" justify="center" sx={{ width: '50%' }}>
        <Box sx={{ textAlign: 'center', marginBottom: '28px' }}>
          <Title>Sign up</Title>

          <Text fz="lg" component="h3">
            Personal information
          </Text>
        </Box>

        <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
          <Box sx={{ marginBottom: '16px' }}>
            <TextInput
              placeholder="Write your Full Name"
              label="Full Name"
              {...form.getInputProps('fullName')}
            />
          </Box>

          <Box sx={{ marginBottom: '16px' }}>
            <TextInput
              placeholder="Write your Last Name"
              label="Last Name"
              {...form.getInputProps('lastName')}
            />
          </Box>

          <Box sx={{ marginBottom: '16px' }}>
            <TextInput
              placeholder="Write your Phone Number"
              label="Phone Number"
              {...form.getInputProps('phoneNumber')}
            />
          </Box>

          <Box sx={{ marginBottom: '16px' }}>
            <DatePicker
              placeholder="Pick your Birth Date"
              label="Birth Date"
              {...form.getInputProps('birthDate')}
            />
          </Box>

          <Button type="submit" size="md" variant="filled" fullWidth>
            Next
          </Button>
        </Box>
      </Flex>
    </FormWrapper>
  );
};

export { PersonalInfo };
