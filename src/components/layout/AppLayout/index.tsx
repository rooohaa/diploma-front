import { AppHeader } from '../AppHeader';

interface IAppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<IAppLayoutProps> = ({ children }) => {
  return (
    <>
      <AppHeader />
      <main>{children}</main>
    </>
  );
};

export { AppLayout };
