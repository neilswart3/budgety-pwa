import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router';
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';
import { scan } from 'react-scan';

scan({ enabled: import.meta.env.DEV });

const system = createSystem(defaultConfig);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <ThemeProvider attribute="class">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ChakraProvider>
  </StrictMode>
);
