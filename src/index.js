import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import OrbitingSubsectors from "./OrbitingSubsectors"
import App from "./App";
import Test from './Test.tsx';
import DragEvent from './DragEvent';
import SemiCircle from './SemiCircle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <OrbitingSubsectors/>
  </React.StrictMode>
);

