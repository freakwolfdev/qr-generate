import { StrictMode } from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import QRGenerate from './QRGenarate';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <QRGenerate />
  </StrictMode>,
);
