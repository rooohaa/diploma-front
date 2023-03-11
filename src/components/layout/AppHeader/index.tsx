import { Button, Container } from '@mantine/core';
import { Link } from 'react-router-dom';
import { AppLogoLink } from 'components';
import { HeaderWrapper } from './style';

interface IAppHeaderProps {
  isAuth?: boolean;
}

const AppHeader: React.FC<IAppHeaderProps> = ({ isAuth = false }) => {
  return (
    <HeaderWrapper>
      <Container size="lg" style={{ width: '100%' }}>
        <div className="app-header-inner">
          <AppLogoLink />

          {!isAuth ? (
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
                  <Button component={Link} to="/sign-in" radius="lg">
                    Sign-in
                  </Button>
                </li>
              </ul>
            </nav>
          ) : null}
        </div>
      </Container>
    </HeaderWrapper>
  );
};

export { AppHeader };
