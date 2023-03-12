import { Box, Flex } from '@mantine/core';

interface IFormWrapperProps {
  children: React.ReactNode;
  imagePath: string;
}
const FormWrapper: React.FC<IFormWrapperProps> = ({ imagePath, children }) => {
  return (
    <Box sx={{ paddingTop: '50px' }}>
      <Flex gap={50}>
        <Box sx={{ width: '50%' }}>
          <img
            src={`/assets/images/${imagePath}`}
            alt="Sign up side image"
            style={{
              width: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>

        {children}
      </Flex>
    </Box>
  );
};

export { FormWrapper };
