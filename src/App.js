import React from 'react';
// import { Register } from './components/Register';
import  Navbar  from './components/layouts/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import { Register } from './components/Register';
import Historique from './components/Historique';
import Compte from './components/Compte';


function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>}/>
      <Route path='/historique/:numero_compte' element={<Historique/>}/>
      <Route path='/compte' element={<Compte/>}/>

    </Routes>
    
    </>
  );
}

export default App;
