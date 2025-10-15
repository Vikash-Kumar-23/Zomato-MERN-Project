import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserRegister from '../pages/UserRegister';
import UserLogin from '../pages/UserLogin';
import FoodPartnerRegister from '../pages/FoodPartnerRegister';
import FoodPartnerLogin from '../pages/FoodPartnerLogin';
import Home from '../pages/general/Home'; // Import the Home component

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Add route for Home component */}
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/foodpartner/register" element={<FoodPartnerRegister />} />
      <Route path="/foodpartner/login" element={<FoodPartnerLogin />} />
      {/* Add other routes here */}
    </Routes>
  );
};

export default AppRoutes;