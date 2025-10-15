// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './Components/Register';
import UserDashboard from './UserInteraction/UserDashboard';
import RequestQuoteForm from './UserInteraction/UserRequestQuoteForm';
import UserMyQuotes from './UserInteraction/UserMyQuotes';
import ProductListing from './UserInteraction/ProductListing';
import PaymentPage from './UserInteraction/PaymentPage';
import QuoteDetails from './UserInteraction/QuoteDetails';
import TrackOrderDetails from './UserInteraction/TrackOrderDetails';
import AdminDashboard from './Admininteraction/Dashboard';
import AdminTrackStatus from './Admininteraction/AdminTrackStatus';
import ManageProduct from './Admininteraction/ManageProducts';
import QuoteManagement from './Admininteraction/QuoteManagement';
import PaymentVerification from './Admininteraction/PaymentVerification';
import ViewOrders from './Admininteraction/ViewOrders';
import AdminTrackOrder from './Admininteraction/AdminTrackOrder';
import LoginPage from './Components/Loginpage';
import ProtectedRoute from "./Components/ProtectedRoute "

// Main App Component
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* User Routes */}
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/requestquote" element={<RequestQuoteForm />} />
        <Route path="/myquotes" element={<UserMyQuotes />} />
        <Route path="/productlist" element={<ProductListing />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/quote/:id" element={<QuoteDetails />} />
        <Route path="/trackorder" element={<TrackOrderDetails />} />
        <Route path="/trackorder/:id" element={<TrackOrderDetails />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admintrack" element={<AdminTrackStatus />} />
          <Route path="/track-order/:id" element={<AdminTrackOrder />} />
          <Route path="/manageproduct" element={<ManageProduct />} />
          <Route path="/quotmanage" element={<QuoteManagement />} />
          <Route path="/paymentverify" element={<PaymentVerification />} />
          <Route path="/ordersadmin" element={<ViewOrders />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
