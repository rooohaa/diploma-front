import {
  Box,
  Button,
  Text,
} from '@mantine/core';
import { Link } from 'react-router-dom';

const Last: React.FC = () => {
  return (
    <Box>
      <Box sx={{ margin: '50px 0', textAlign: 'center' }}>
        <img
          src="/assets/images/sign-up_last.png"
          alt="Congratulation"
          style={{ maxHeight: '400px', height: '100%', objectFit: 'cover' }}
        />
      </Box>

      <Box sx={{ marginBottom: '20px' }}>
        <Text ta="center">
          You can <em>edit</em> your profile anytime!
        </Text>
      </Box>

      <Box sx={{ marginBottom: '20px' }}>
        <Button
          to="/"
          component={Link}
          size="lg"
          maw={500}
          variant="filled"
          m="auto"
          fullWidth
        >
          Done
        </Button>
      </Box>
    </Box>
  );
};

export { Last };
