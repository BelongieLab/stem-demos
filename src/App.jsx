import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import KineticMatrix from './KineticMatrix';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kinetic-matrix" element={<KineticMatrix />} />
      </Routes>
    </BrowserRouter>
  );
}