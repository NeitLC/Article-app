import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector } from 'react-redux';

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
      <Router>
        <div>
          <ToastContainer />
          <Header />
          <Routes>
            <Route
              path='/'
              element={user ? <Main /> : <Navigate to="/login" />}
            />
            <Route path='/login' element={<LoginForm />} />
          </Routes>
          <Footer />
        </div>
      </Router>
  );
}

export default App;
