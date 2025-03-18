import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';
import { scan } from 'react-scan';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

scan({ enabled: import.meta.env.DEV });

const system = createSystem(defaultConfig);
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={system}>
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
