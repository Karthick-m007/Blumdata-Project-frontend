import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './Admininteraction/Dashboard';
import UserDashboard from './UserInteraction/UserDashboard';
import RequestQuoteForm from './UserInteraction/UserRequestquotForm';
import UserMyQuotes from './UserInteraction/UserMyQuotes';
import TrackProductStatus from './UserInteraction/TrackProductStatus';
import AdminTrackStatus from './Admininteraction/AdminTrackstatus';
import ProductListing from './UserInteraction/ProductListing';
import PaymentPage from './UserInteraction/PaymentPage';
import ManageProduct from './Admininteraction/ManageProducts';
import QuoteManagement from './Admininteraction/QuoteManagement';
import PaymentVerification from './Admininteraction/PaymentVerification';
import ViewOrders from './Admininteraction/AdminviewOrders';
import QuoteDetails from './UserInteraction/QuoteDetails';
import TrackOrder from './UserInteraction/TrackOrder';
import TrackOrderDetails from './UserInteraction/TrackOrder';
import LoginPage from './Components/Loginpage';
import RegisterPage from './Components/Register';
import ProtectedRoute from './Components/ProtectedRoute ';  // Import the ProtectedRoute
import AdminTrackOrder from './Admininteraction/AdminTrackstatus';

function App() {
  return (
    <div>
      {/* Routes configuration */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Public routes */}
        <Route path='/userdashboard' element={<UserDashboard />} />
        <Route path='/requestquote' element={<RequestQuoteForm />} />
        <Route path='/myquotes' element={<UserMyQuotes />} />
        {/* <Route path='/trackproduct' element={<TrackProductStatus />} /> */}
        <Route path='/productlist' element={<ProductListing />} />
        <Route path='/payment' element={<PaymentPage />} />
        <Route path="/quote/:id" element={<QuoteDetails />} />
        <Route path="/trackorder" element={<TrackOrderDetails />} />
        <Route path="/trackorder/:id" element={<TrackOrderDetails />} />

        {/* (only accessible if logged in as admin) */}
        <Route element={<ProtectedRoute />}>
          <Route path='/adminlogin' element={<Dashboard />} />
          <Route path='/admintrack' element={<AdminTrackStatus />} />
          <Route path="/track-order/:id" element={<AdminTrackOrder />} />
          <Route path='/manageproduct' element={<ManageProduct />} />
          <Route path='/quotmanage' element={<QuoteManagement />} />
          <Route path='/paymentverify' element={<PaymentVerification />} />
          <Route path='/ordersadmin' element={<ViewOrders />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
