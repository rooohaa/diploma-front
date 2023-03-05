import { Link } from 'react-router-dom';

const AppLogoLink: React.FC = () => {
  return (
    <Link to="/">
      <img
        style={{
          width: '112px',
          height: '36px',
          objectFit: 'contain',
        }}
        src="/assets/images/logo.png"
        alt="MindMeld"
      />
    </Link>
  );
};

export { AppLogoLink };
