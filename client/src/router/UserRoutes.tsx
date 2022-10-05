import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProjectPage from '../pages/user/ProjectPage';
import HomePage from '../pages/HomePage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import CreateProjectPage from '../pages/user/CreateProjectPage';
import ProjectsPage from '../pages/user/ProjectsPage';
import UpdateProjectPage from '../pages/user/UpdateProjectPage';
import ProfilePage from '../pages/user/ProfilePage';

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/projects/update/:id' element={<UpdateProjectPage />} />
      <Route path='/projects/create' element={<CreateProjectPage />} />
      <Route path='/projects/:id' element={<ProjectPage />} />
      <Route path='/projects' element={<ProjectsPage />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/sign-up' element={<SignUpPage />} />
      <Route path='/sign-in' element={<SignInPage />} />
      <Route path='/' element={<HomePage />} />
    </Routes>
  );
};

export default UserRoutes;
