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
import AdminPricing from './admin/pages/AdminPricing';
import AdminUtilities from './admin/pages/AdminUtilities';
import AdminApiGateway from './admin/pages/AdminApiGateway';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AdminProvider>
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

          {/* ── Admin Panel ── */}
          <Route path="/admin-cashmymobile/login" element={<AdminLogin />} />
          <Route path="/admin-cashmymobile" element={<AdminGuard><AdminDashboard /></AdminGuard>} />
          <Route path="/admin-cashmymobile/orders" element={<AdminGuard><AdminOrders /></AdminGuard>} />
          <Route path="/admin-cashmymobile/orders/:id" element={<AdminGuard><AdminOrderDetail /></AdminGuard>} />
          <Route path="/admin-cashmymobile/devices" element={<AdminGuard><AdminDevices /></AdminGuard>} />
          <Route path="/admin-cashmymobile/pricing" element={<AdminGuard><AdminPricing /></AdminGuard>} />
          <Route path="/admin-cashmymobile/utilities" element={<AdminGuard><AdminUtilities /></AdminGuard>} />
          <Route path="/admin-cashmymobile/api-gateway" element={<AdminGuard><AdminApiGateway /></AdminGuard>} />
        </Routes>
      </AdminProvider>
    </BrowserRouter>
  );
}

export default App;
