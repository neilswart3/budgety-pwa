import {
  Container,
  Grid,
  GridItem,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router';
import { MenuDrawer } from '../';
import { HeaderTitle } from './HeaderTitle';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isDashboard = useMemo(
    () => !pathname.split('/').filter(Boolean).length,
    [pathname]
  );

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Container>
        <Grid gridTemplateColumns="1fr auto 1fr" py={3}>
          <GridItem>
            {!isDashboard && (
              <IconButton
                aria-label="Back"
                variant="ghost"
                rounded="full"
                onClick={handleBack}
              >
                <IoChevronBackSharp />
              </IconButton>
            )}
          </GridItem>

          <GridItem as={HStack}>
            <HeaderTitle />
          </GridItem>

          <GridItem as={HStack} justifyContent="end">
            <MenuDrawer />
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};
