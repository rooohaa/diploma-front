import { AppHeader } from '../AppHeader';

interface IAppLayoutProps {
  isAuthHeader?: boolean;
  children: React.ReactNode;
}

const AppLayout: React.FC<IAppLayoutProps> = ({
  children,
  isAuthHeader = false,
}) => {
  return (
    <>
      <AppHeader isAuth={isAuthHeader} />
      <main>{children}</main>
    </>
  );
};

export { AppLayout };
