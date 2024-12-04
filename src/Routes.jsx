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
import editPlan from './pages/editPlan';

const AppRoutes = () => {
  console.log("Rendering AppRoutes");

  return (
    <Routes>
      {/* Redirect '/' to '/dashboard' */}
      <Route path="/" element={<Navigate to="/dashboard" />} />

      {/*Adds the ASidebar using the layout file */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/NewEvent" element={<NewEvent />} />
        <Route path="/editPlan" element={<editPlan />} />
      </Route>

      {/* Routes without Sidebar */}
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
