import React from 'react';
import logo from './logo.svg';
import './App.css';
import Title from './components/Title/Title'
import Filter from './components/Filter/Filter';
import Todolist from './components/Todolist/Todolist';
import { Divider } from 'antd';

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
      <Title></Title>
      <Filter></Filter>
      <Divider></Divider>
      <Todolist></Todolist>
    </div>
  );
}

export default App;
