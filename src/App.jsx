import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import KineticMatrix from './KineticMatrix';
import Percentages from './Percentages';
import ProbabilityQuest from './birthday-paradox';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kinetic-matrix" element={<KineticMatrix />} />
        <Route path="/percentages" element={<Percentages />} />
        <Route path="/probability" element={<ProbabilityQuest />} />
      </Routes>
    </BrowserRouter>
  );
}
