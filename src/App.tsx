import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SellPhone from './pages/SellPhone';
import HowItWorks from './pages/HowItWorks';
import FAQ from './pages/FAQ';
import ScrollToTop from './components/ScrollToTop';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import About from './pages/About';
import Contact from './pages/Contact';
import { AdminProvider } from './admin/AdminContext';
import AdminGuard from './admin/AdminGuard';
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminOrders from './admin/pages/AdminOrders';
import AdminOrderDetail from './admin/pages/AdminOrderDetail';
import AdminDevices from './admin/pages/AdminDevices';
import AdminDeviceForm from './admin/pages/AdminDeviceForm';
import AdminPricing from './admin/pages/AdminPricing';
import AdminUtilities from './admin/pages/AdminUtilities';
import AdminApiGateway from './admin/pages/AdminApiGateway';
import AdminPartners from './admin/pages/AdminPartners';
import CounterOfferReview from './pages/CounterOfferReview';

function AdminRoutes() {
  return (
    <AdminProvider>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route path="" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
        <Route path="orders" element={<AdminGuard><AdminOrders /></AdminGuard>} />
        <Route path="orders/:id" element={<AdminGuard><AdminOrderDetail /></AdminGuard>} />
        <Route path="devices" element={<AdminGuard><AdminDevices /></AdminGuard>} />
        <Route path="devices/new" element={<AdminGuard><AdminDeviceForm /></AdminGuard>} />
        <Route path="devices/edit/:id" element={<AdminGuard><AdminDeviceForm /></AdminGuard>} />
        <Route path="pricing" element={<AdminGuard><AdminPricing /></AdminGuard>} />
        <Route path="utilities" element={<AdminGuard><AdminUtilities /></AdminGuard>} />
        <Route path="api-gateway" element={<AdminGuard><AdminApiGateway /></AdminGuard>} />
        <Route path="partners" element={<AdminGuard><AdminPartners /></AdminGuard>} />
      </Routes>
    </AdminProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* ── Public website ── */}
        <Route path="/" element={<Home />} />
        <Route path="/sell" element={<SellPhone />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/counter-offer/:token" element={<CounterOfferReview />} />

        {/* ── Admin Panel (AdminProvider only loads here) ── */}
        <Route path="/admin-cashmymobile/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
