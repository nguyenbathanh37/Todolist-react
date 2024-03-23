import React from 'react';
import './App.css';
import Title from './components/Title/Title'
import Filter from './components/Filter/Filter';
import Todolist from './components/Todolist/Todolist';
import ChangeLanguage from './components/ChangeLanguage/ChangLanguage';
import Welcome from './components/Welcome/Welcome';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import UpdatePassword from './components/UpdatePassword/UpdatePassword';
import { Divider, Row, Col } from 'antd';
import MenuNavigate from './components/MenuNavigate/MenuNavigate';
import Homepage from './pages/Homepage';
import Register from './components/Register/Register';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFullname, selectIsLoggin } from './components/Login/authSlice';

function App() {
  const fullname = useSelector(selectFullname)
  const isLoggin = useSelector(selectIsLoggin)
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <MenuNavigate />
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
            height: '92vh',
          }}
        >
          {
            isLoggin ?
              <Row justify={"space-between"}>
                <Col>
                  <ChangeLanguage />
                </Col>
                <Col>
                  <Welcome fullname={fullname} />
                  <Logout />
                </Col>
              </Row>
              :
              <ChangeLanguage />
          }
          <Routes>
            <Route path='/' element={<Homepage />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/forgot-password' element={<ForgotPassword />}></Route>
            <Route path='/update-password' element={<UpdatePassword />}></Route>
          </Routes>

        </div>
      </div>
    </Router>

  );
}

export default App;
