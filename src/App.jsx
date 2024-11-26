import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './Routes';

const App = () => {
  console.log("Main component is rendering");
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
