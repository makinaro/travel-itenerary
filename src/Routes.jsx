import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './assets/components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Calendar from './pages/Calendar';
import Settings from './pages/Settings';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NewEvent from './pages/NewEvent';
import EditPlan from './pages/editPlan';
import ProtectedRoute from './assets/components/Layout/ProtectedRoute'; // Corrected path
import LoadingPage from './assets/components/Layout/LoadingPage';

const AppRoutes = () => {
  console.log("Rendering AppRoutes");

  return (
    <Routes>
      {/* Redirect '/' to '/dashboard' */}
      <Route path="/" element={<Navigate to="/dashboard" />} />

      {/* Routes wrapped in Layout that need authentication */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/calendar" element={<ProtectedRoute element={<Calendar />} />} />
        <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
        <Route path="/newEvent" element={<ProtectedRoute element={<NewEvent />} />} />
        <Route path="/editPlan" element={<ProtectedRoute element={<EditPlan />} />} />
      </Route>

      {/* Routes without Sidebar and no authentication check */}
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* EXTRA ROUTES */}
      <Route path="/loading" element={<LoadingPage />} />
      
    </Routes>
  );
};

export default AppRoutes;
