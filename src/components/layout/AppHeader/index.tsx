import { Button, Container } from '@mantine/core';
import { Link } from 'react-router-dom';
import { HeaderWrapper } from './style';

const AppHeader: React.FC = () => {
  return (
    <HeaderWrapper>
      <Container size="lg" style={{ width: '100%' }}>
        <div className="app-header-inner">
          <Link to="/">
            <img
              className="app-logo"
              src="/src/assets/images/logo.png"
              alt="MindMeld"
            />
          </Link>

          <nav className="app-nav">
            <ul>
              <li>
                <Link className="app-nav-link" to="/how-it-works">
                  How it works
                </Link>
              </li>

              <li>
                <Link className="app-nav-link" to="/about">
                  About us
                </Link>
              </li>

              <li>
                <Link className="app-nav-link" to="/contacts">
                  Contacts
                </Link>
              </li>

              <li>
                <Button component={Link} to="/sign-up" radius="lg">
                  Sign up
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </HeaderWrapper>
  );
};

export { AppHeader };
