import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { AppLayout } from '~/components';

const Login: React.FC = () => {
  return (
    <AppLayout>
      <div>Login page.</div>

      <Button component={Link} to="/" size="lg" variant="default">
        Go back
      </Button>
    </AppLayout>
  );
};

export { Login };
