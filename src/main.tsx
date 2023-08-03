import ReactDOM from 'react-dom/client';
import './index.css';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { MantineProvider } from '@mantine/core';
import { App } from './app/App';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

const theme = extendTheme({ colors });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider theme={theme}>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
  </ChakraProvider>
);
