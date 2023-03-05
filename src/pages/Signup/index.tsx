import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { AppLayout } from '~/components';

const SignUp: React.FC = () => {
  return (
    <AppLayout>
      <div>Signup page.</div>

      <Button component={Link} to="/" size="lg" variant="default">
        Go back
      </Button>
    </AppLayout>
  );
};

export { SignUp };
