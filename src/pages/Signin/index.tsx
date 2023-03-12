import {
  Button,
  Flex,
  Container,
  Box,
  Title,
  TextInput,
  PasswordInput,
  Text,
  Center,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link } from 'react-router-dom';
import { AppLayout } from '~/components';

interface ISignInFormValues {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const form = useForm<ISignInFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = (values: ISignInFormValues) => {
    console.log(values);
  };

  return (
    <AppLayout isAuthHeader={true}>
      <Container size="lg">
        <Box sx={{ paddingTop: '100px' }}>
          <Flex gap={50}>
            <Box sx={{ width: '50%' }}>
              <img
                src="/assets/images/sign-in.png"
                alt="SignIn intro"
                style={{
                  width: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>

            <Flex direction="column" justify="center" sx={{ width: '50%' }}>
              <Title sx={{ textAlign: 'center', marginBottom: '50px' }}>
                Sign in
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

                <Button type="submit" size="lg" variant="filled" fullWidth>
                  Sign in
                </Button>
              </Box>

              <Center sx={{ marginTop: '20px', gap: '10px' }}>
                <Text sx={{ textAlign: 'center' }}>Don’t have an account?</Text>
                <Link to="/sign-up" style={{ textDecoration: 'none' }}>
                  <Text variant="link">Sign Up</Text>
                </Link>
              </Center>
            </Flex>
          </Flex>
        </Box>
      </Container>
    </AppLayout>
  );
};

export { SignIn };
