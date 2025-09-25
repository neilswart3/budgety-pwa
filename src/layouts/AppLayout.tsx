import { Breadcrumbs, Footer, Header } from '@/components';
import { Box, Container, Grid, GridItem, Stack } from '@chakra-ui/react';
import { Outlet } from 'react-router';

export const AppLayout: React.FC = () => (
  <Grid h="100vh" gridTemplateRows="auto 1fr">
    <GridItem as="header">
      <Header />
    </GridItem>
    <GridItem as="main" overflowY="auto">
      <Stack h="full" gap={12} pt={2}>
        <Container flexGrow={1}>
          <Breadcrumbs />
          <Outlet />
        </Container>
        <Box as="footer" pos="sticky" bottom={0}>
          <Footer />
        </Box>
      </Stack>
    </GridItem>
  </Grid>
);
