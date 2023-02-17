import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from './components/Sidebar';
import Plankton1 from './components/Plankton1';
import Plankton2 from './components/Plankton2';
import Home from './components/Home';

const GenerativeArt: React.FC<Props> = ({ targetPage }) => {
  const [target, setTarget] = useState(targetPage);
  return (
    <div className="App">
      <Sidebar target={target} setTarget={setTarget}/>
      {target==='' ?
      <Home/>
      : target==='plankton1' ?
      <Plankton1/>
      : target==='plankton2' ?
      <Plankton2/>
      : <></>
      }
    </div>
  )
}

type Props = {
  targetPage: string;
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GenerativeArt targetPage='' />} />
        <Route path="/plankton1" element={<GenerativeArt targetPage='plankton1' />} />
        <Route path="/plankton2" element={<GenerativeArt targetPage='plankton2' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
