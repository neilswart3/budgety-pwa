import { useLocation } from 'react-router';

export const Breadcrumbs: React.FC = () => {
  const { pathname } = useLocation();

  return <div>{pathname}</div>;
};
