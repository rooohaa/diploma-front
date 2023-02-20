import { Routes, Route, Link } from 'react-router-dom';
import { Button, Flex, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useState } from 'react';

const App: React.FC = () => {
  const [counter, setCounter] = useState(0);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div
            className="App"
            style={{
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div>
              <Flex direction="column" align="center" gap={20}>
                <Title order={1}>Count is: {counter}</Title>

                <Flex gap={20}>
                  <Button
                    variant="gradient"
                    size="lg"
                    onClick={() => setCounter((prev) => prev + 1)}
                  >
                    Increment +
                  </Button>

                  <Button
                    variant="light"
                    size="lg"
                    onClick={() => {
                      showNotification({
                        title: 'Hello World!',
                        message: 'Blablablabla',
                        color: 'green',
                      });
                    }}
                  >
                    Say Hello
                  </Button>

                  <Button
                    variant="gradient"
                    size="lg"
                    onClick={() => setCounter((prev) => prev - 1)}
                  >
                    Decrement -
                  </Button>
                </Flex>

                <Button
                  component={Link}
                  to="/login"
                  size="lg"
                  variant="default"
                >
                  Login
                </Button>
              </Flex>
            </div>
          </div>
        }
      />

      <Route
        path="/login"
        element={
          <>
            <div>Login page.</div>

            <Button component={Link} to="/" size="lg" variant="default">
              Go back
            </Button>
          </>
        }
      />
    </Routes>
  );
};

export default App;
