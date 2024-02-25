import React from 'react';
import './App.css';
import Title from './components/Title/Title'
import Filter from './components/Filter/Filter';
import Todolist from './components/Todolist/Todolist';
import ChangeLanguage from './components/ChangeLanguage/ChangLanguage';
import Login from './components/Login/Login';
import { Divider } from 'antd';
import Homepage from './pages/Homepage';
import Register from './components/Register/Register';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <div
      style={{
        width: 500,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 20,
        boxShadow: '0 0 10px 4px #bfbfbf',
        borderRadius: 5,
        height: '90vh',
      }}
    >
      {/* <ChangeLanguage></ChangeLanguage>
      <Title></Title>
      <Filter></Filter>
      <Divider></Divider>
      <Todolist></Todolist> */}
      <ChangeLanguage></ChangeLanguage>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register/>}></Route>
        </Routes>
      </Router>
    </div>

  );
}

export default App;
