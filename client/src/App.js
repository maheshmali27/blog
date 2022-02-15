import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Posts from './components/Posts/Posts';
import { Admin, AdminPosts, AdminUsers, AddPost, UpdatePost, AddUser, UpdateUser, Auth, MyAcconut } from './Pages';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Box maxWidth="lg" sx={{margin: '20px auto', padding: '10px'}}>
          <Routes>
            <Route exact path='/' element={<Posts />} />
            <Route exact path='/posts' element={<Posts />} />
            <Route exact path='/auth' element={<Auth />} />
            <Route exact path='/myaccount' element={<MyAcconut />} />
            <Route exact path='/admin/' element={<Admin />} />
            <Route exact path='/admin/posts' element={<AdminPosts />} />
            <Route exact path='/admin/add/post' element={<AddPost />} />
            <Route exact path='/admin/edit/post/:postID' element={<UpdatePost />} />
            <Route exact path='/admin/users' element={<AdminUsers />} />
            <Route exact path='/admin/add/user' element={<AddUser />} />
            <Route exact path='/admin/edit/user/:username' element={<UpdateUser />} />
          </Routes>
        </Box>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
