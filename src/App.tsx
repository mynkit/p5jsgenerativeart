import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Plankton1 from './components/Plankton1';
import Plankton2 from './components/Plankton2';
import Plankton3 from './components/Plankton3';
import Home from './components/Home';

const GenerativeArt: React.FC<Props> = ({ targetPage }) => {
  const [target, setTarget] = useState(targetPage);
  const [start, setStart] = useState(false);
  return (
    <div className="App">
      {target==='' ?
      <Home setTarget={setTarget} setStart={setStart}/>
      : target==='plankton1' ?
      <Plankton1 start={start} setTarget={setTarget}/>
      : target==='plankton2' ?
      <Plankton2 start={start} setTarget={setTarget}/>
      : target==='plankton3' ?
      <Plankton3 start={start} setTarget={setTarget}/>
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
        <Route path="/plankton3" element={<GenerativeArt targetPage='plankton3' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
