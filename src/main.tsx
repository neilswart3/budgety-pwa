import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';
import { scan } from 'react-scan';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { themeSystem } from '@/theme';

scan({ enabled: import.meta.env.DEV });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * (60 * 1000), // 10 mins
      //   cacheTime: 15 * (60 * 1000), // 15 mins
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={themeSystem}>
        <ThemeProvider attribute="class">
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);
