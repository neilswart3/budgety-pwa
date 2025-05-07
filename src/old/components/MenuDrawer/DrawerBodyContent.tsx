import { routeMeta } from '@/routes';
import { Button } from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';

interface Props {
  onClose: () => void;
}

export const DrawerBodyContent: React.FC<Props> = ({ onClose }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const active = useMemo(
    () =>
      pathname === '/' ? 'dashboard' : pathname.split('/').filter(Boolean)[0],
    [pathname]
  );

  const handleClick = useCallback(
    (id: string) => {
      navigate(`/${id === 'dashboard' ? '' : id}`);
      onClose();
    },
    [navigate, onClose]
  );

  return (
    <>
      {Object.entries(routeMeta).map(([id, { icon: Icon, label, slug }]) => (
        <Button
          key={`drawer-link-${slug}`}
          w="full"
          variant={active === id ? 'subtle' : 'ghost'}
          rounded={0}
          py={4}
          justifyContent="start"
          display="flex"
          height="unset"
          onClick={() => handleClick(slug)}
        >
          <Icon />
          {label}
        </Button>
      ))}
    </>
  );
};
