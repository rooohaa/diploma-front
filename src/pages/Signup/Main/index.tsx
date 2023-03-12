import {
  Box,
  Button,
  Flex,
  PasswordInput,
  TextInput,
  Title,
  Center,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormWrapper } from '../FormWrapper';
import { Link } from 'react-router-dom';
import { IMainFormValues } from '~/types/sign-up';

interface IMainProps {
  onSubmit: (values: IMainFormValues) => void;
}

const Main: React.FC<IMainProps> = ({ onSubmit }) => {
  const form = useForm<IMainFormValues>({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = (values: IMainFormValues) => {
    onSubmit(values);
  };

  return (
    <FormWrapper imagePath="sign-up_main.png">
      <Flex direction="column" justify="center" sx={{ width: '50%' }}>
        <Title sx={{ textAlign: 'center', marginBottom: '50px' }}>
          Sign up
        </Title>

        <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
          <Box sx={{ marginBottom: '20px' }}>
            <TextInput
              type="email"
              placeholder="Write your Email"
              label="Email"
              {...form.getInputProps('email')}
            />
          </Box>

          <Box sx={{ marginBottom: '20px' }}>
            <PasswordInput
              placeholder="Write your password"
              label="Password"
              description="Password must be more than 6 character"
              {...form.getInputProps('password')}
            />
          </Box>

          <Box sx={{ marginBottom: '20px' }}>
            <PasswordInput
              placeholder="Confirm your password "
              label="Confrim password"
              {...form.getInputProps('confirmPassword')}
            />
          </Box>

          <Button type="submit" size="lg" variant="filled" fullWidth>
            Next
          </Button>
        </Box>

        <Center sx={{ marginTop: '20px', gap: '10px' }}>
          <Text sx={{ textAlign: 'center' }}>Already have an account?</Text>
          <Link to="/sign-in" style={{ textDecoration: 'none' }}>
            <Text variant="link">Sign In</Text>
          </Link>
        </Center>
      </Flex>
    </FormWrapper>
  );
};

export { Main };
