import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-garamond/400-italic.css';

import '@fontsource/plus-jakarta-sans/300.css';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/500.css';
import '@fontsource/plus-jakarta-sans/600.css';

import './styles/tokens.css';
import './index.css';

import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Elemento #root não encontrado no documento.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
