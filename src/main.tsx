import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { MantineProvider } from '@mantine/core';
import { App } from './app/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
  </BrowserRouter>
);
