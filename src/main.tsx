import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import 'normalize.css';
import './index.css';
import { Header } from './components/header/Header';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Header />
    <App />
  </React.StrictMode>,
);
