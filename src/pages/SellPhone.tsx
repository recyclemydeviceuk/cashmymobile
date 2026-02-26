import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  CheckCircle2,
  ChevronLeft,
  Mail,
  Package,
  Search,
  Clock,
  Shield,
  TrendingUp,
  Printer,
  Box,
  AlertCircle,
  Smartphone,
  HardDrive,
  Lock,
  Zap,
  BadgeCheck,
  User,
  MapPin,
  CreditCard,
  ArrowRight,
  X,
  Wifi,
  Signal,
  Loader2,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { orderApi, CreateOrderPayload, deviceApi, utilitiesApi, pricingApi, Device, StorageOption, Network, DeviceCondition } from '../api';


interface SelectedPhone {
  id: string;
  name: string;
  maxPrice: number;
}

interface SelectedStorage {
  id: string;
  name: string;
  value: string;
}

interface SelectedNetwork {
  id: string;
  name: string;
  value: string;
}

interface SelectedCondition {
  id: string;
  name: string;
  value: string;
  description?: string;
}


function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = [
    { label: 'Select Phone', icon: Smartphone },
    { label: 'Storage', icon: HardDrive },
    { label: 'Network', icon: Wifi },
    { label: 'Condition', icon: BadgeCheck },
    { label: 'Your Details', icon: User },
  ];
  return (
    <div className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-3xl mx-auto px-3 sm:px-4 py-3 sm:py-5">
        <div className="flex items-center justify-between">
          {steps.map(({ label, icon: Icon }, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < currentStep;
            const isActive = stepNum === currentStep;
            return (
              <div key={stepNum} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className={`w-8 h-8 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300
                    ${ isCompleted
                        ? 'bg-gradient-to-br from-red-500 to-red-700 text-white shadow-md shadow-red-200'
                        : isActive
                        ? 'bg-gradient-to-br from-red-500 to-red-700 text-white shadow-md shadow-red-200 ring-2 sm:ring-4 ring-red-100'
                        : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                    }`}>
                    {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5 sm:w-5 sm:h-5" /> : <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5" />}
                  </div>
                  <span className={`mt-1 sm:mt-2 text-[10px] sm:text-xs font-semibold whitespace-nowrap transition-colors duration-300 hidden xs:block sm:block ${
                    isActive ? 'text-red-600' : isCompleted ? 'text-gray-700' : 'text-gray-400'
                  }`}>
                    {label}
                  </span>
                  <span className={`mt-1 text-[9px] font-semibold transition-colors duration-300 sm:hidden ${
                    isActive ? 'text-red-600' : isCompleted ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {label.split(' ')[0]}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className="flex-1 mx-1.5 sm:mx-3 mb-4 sm:mb-5">
                    <div className="h-0.5 sm:h-1 rounded-full overflow-hidden bg-gray-100">
                      <div className={`h-full rounded-full transition-all duration-500 ${
                        stepNum < currentStep ? 'w-full bg-gradient-to-r from-red-500 to-red-600' : 'w-0'
                      }`} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Step1({ onSelect, initialBrand }: { onSelect: (p: SelectedPhone) => void; initialBrand?: 'all' | 'apple' | 'samsung' }) {
  const [query, setQuery] = useState('');
  const [brand, setBrand] = useState<'all' | 'apple' | 'samsung'>(initialBrand || 'all');
  const [devices, setDevices] = useState<Device[]>([]);
  const [deviceMaxPrices, setDeviceMaxPrices] = useState<{ [deviceId: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        setLoading(true);
        const [devicesRes, pricingRes] = await Promise.all([
          deviceApi.getAllDevices({ isActive: true }),
          pricingApi.getAllPricing()
        ]);
        if (devicesRes.success && devicesRes.data?.devices) {
          setDevices(devicesRes.data.devices);
        }
        if (pricingRes.success && pricingRes.data?.pricing) {
          const maxPrices: { [deviceId: string]: number } = {};
          pricingRes.data.pricing.forEach(p => {
            const id = p.deviceId;
            const max = Math.max(p.gradeNew, p.gradeGood, p.gradeBroken);
            if (!maxPrices[id] || maxPrices[id] < max) maxPrices[id] = max;
          });
          setDeviceMaxPrices(maxPrices);
        }
      } catch (err: any) {
        console.error('Error fetching devices:', err);
        setError('Failed to load devices. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchDevices();
  }, []);

  const filtered = devices.filter((device) => {
    const matchesBrand = brand === 'all' || device.brand.toLowerCase() === brand;
    const matchesQuery = device.fullName.toLowerCase().includes(query.toLowerCase()) || device.name.toLowerCase().includes(query.toLowerCase());
    return matchesBrand && matchesQuery;
  });

  const filteredApple = filtered.filter((d) => d.brand.toLowerCase() === 'apple');
  const filteredSamsung = filtered.filter((d) => d.brand.toLowerCase() === 'samsung');

  const isSearching = query.trim().length > 0;

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-full flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-red-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading devices...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-full flex items-center justify-center py-20">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="text-gray-800 font-bold text-lg mb-2">Error Loading Devices</p>
          <p className="text-gray-600 text-sm mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-full">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 py-8 sm:py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-xs font-semibold px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-5 border border-white/20">
            <Zap className="w-3.5 h-3.5 flex-shrink-0" /> Instant Quote — No Obligation
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 sm:mb-3 tracking-tight">Select Your Device</h1>
          <p className="text-red-200 text-sm sm:text-lg font-medium">Choose your phone model to get an instant quote</p>
          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4 sm:mt-6 flex-wrap">
            {[{ icon: Shield, text: 'Safe & Secure' }, { icon: Zap, text: 'Instant Quote' }, { icon: Lock, text: 'Data Wiped' }].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-red-200 text-xs sm:text-sm">
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" /><span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search + Filter Bar */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search iPhone 16, Galaxy S24..."
                className="w-full pl-10 pr-10 py-2.5 sm:py-3 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-400 bg-gray-50 placeholder-gray-400 text-gray-900 transition-all"
              />
              {query && (
                <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {/* Brand filter tabs */}
            <div className="flex gap-2 flex-shrink-0">
              {([
                { value: 'all', label: 'All Brands' },
                { value: 'apple', label: 'Apple' },
                { value: 'samsung', label: 'Samsung' },
              ] as const).map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setBrand(value)}
                  className={`flex-1 sm:flex-none px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all border-2 whitespace-nowrap ${
                    brand === value
                      ? 'bg-red-600 border-red-600 text-white shadow-md shadow-red-200'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-600'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          {/* Results count */}
          {(isSearching || brand !== 'all') && (
            <p className="text-xs text-gray-500 mt-2">
              {filtered.length === 0
                ? 'No devices found'
                : `${filtered.length} device${filtered.length !== 1 ? 's' : ''} found`}
              {query && <span className="text-red-500 font-medium"> for "{query}"</span>}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7 text-gray-400" />
            </div>
            <p className="text-gray-700 font-semibold mb-1">No devices found</p>
            <p className="text-sm text-gray-500">Try a different search term or brand filter</p>
            <button onClick={() => { setQuery(''); setBrand('all'); }} className="mt-4 text-red-600 text-sm font-semibold hover:underline">
              Clear filters
            </button>
          </div>
        ) : (
          <>
            {/* Apple Section */}
            {filteredApple.length > 0 && (brand === 'all' || brand === 'apple') && (
              <div className="mb-8 sm:mb-10">
                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">Apple iPhone</h2>
                    <p className="text-xs text-gray-500">{filteredApple.length} model{filteredApple.length !== 1 ? 's' : ''} available</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3">
                  {filteredApple.map((device) => {
                    const maxPrice = deviceMaxPrices[device._id];
                    return (
                      <button key={device._id} onClick={() => onSelect({ id: device._id, name: device.fullName, maxPrice: maxPrice || 0 })}
                        className="group bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 text-left hover:border-red-400 hover:shadow-xl active:scale-95 transition-all duration-200 shadow-sm">
                        <div className="w-full flex items-center justify-center bg-gray-50 rounded-xl mb-2 sm:mb-3 overflow-hidden" style={{height: '80px'}}>
                          <img
                            src={device.imageUrl || "https://zennara-storage.s3.ap-south-1.amazonaws.com/device-images/1771189550215-default%20(1).png"}
                            alt={device.fullName}
                            className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-red-700 mb-1 leading-tight">{device.fullName}</div>
                        <div className="text-xs sm:text-sm font-bold text-red-600">{maxPrice ? `Up to £${maxPrice}` : 'Get Quote'}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Samsung Section */}
            {filteredSamsung.length > 0 && (brand === 'all' || brand === 'samsung') && (
              <div>
                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">Samsung Galaxy</h2>
                    <p className="text-xs text-gray-500">{filteredSamsung.length} model{filteredSamsung.length !== 1 ? 's' : ''} available</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3">
                  {filteredSamsung.map((device) => {
                    const maxPrice = deviceMaxPrices[device._id];
                    return (
                      <button key={device._id} onClick={() => onSelect({ id: device._id, name: device.fullName, maxPrice: maxPrice || 0 })}
                        className="group bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 text-left hover:border-red-400 hover:shadow-xl active:scale-95 transition-all duration-200 shadow-sm">
                        <div className="w-full flex items-center justify-center bg-gray-50 rounded-xl mb-2 sm:mb-3 overflow-hidden" style={{height: '80px'}}>
                          <img
                            src={device.imageUrl || "https://zennara-storage.s3.ap-south-1.amazonaws.com/device-images/1771189550215-default%20(1).png"}
                            alt={device.fullName}
                            className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-red-700 mb-1 leading-tight">{device.fullName}</div>
                        <div className="text-xs sm:text-sm font-bold text-red-600">{maxPrice ? `Up to £${maxPrice}` : 'Get Quote'}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Step2({ phone, onSelect, onBack }: { phone: SelectedPhone; onSelect: (s: SelectedStorage) => void; onBack: () => void }) {
  const [storageOptions, setStorageOptions] = useState<StorageOption[]>([]);
  const [pricingData, setPricingData] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [storageRes, pricingRes] = await Promise.all([
          utilitiesApi.getStorageOptions(),
          pricingApi.getPricingByDevice(phone.id)
        ]);
        
        if (storageRes.success && storageRes.data?.storageOptions) {
          setStorageOptions(storageRes.data.storageOptions.filter(s => s.isActive));
        }
        
        if (pricingRes.success && pricingRes.data?.pricing) {
          const prices: { [key: string]: number } = {};
          pricingRes.data.pricing.forEach(p => {
            const key = `${p.storage}`;
            const maxPrice = Math.max(p.gradeNew, p.gradeGood, p.gradeBroken);
            if (!prices[key] || prices[key] < maxPrice) {
              prices[key] = maxPrice;
            }
          });
          setPricingData(prices);
        }
      } catch (err) {
        console.error('Error fetching storage options:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [phone.id]);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-full flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-red-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading storage options...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gray-50 min-h-full">
      <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 py-8 sm:py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <button onClick={onBack} className="flex items-center gap-1.5 text-red-200 hover:text-white mb-5 sm:mb-6 transition-colors text-sm font-medium">
            <ChevronLeft className="w-4 h-4" /> Back to Phone Selection
          </button>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-3 sm:mb-4 border border-white/20">
              <Smartphone className="w-3.5 h-3.5 flex-shrink-0" /> {phone.name}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2">Select Storage Capacity</h1>
            <p className="text-red-200 text-sm sm:text-base">Choose the storage size of your device</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-5">
          {storageOptions.map((opt) => {
            const price = pricingData[opt.value] || 0;
            return (
              <button key={opt._id} onClick={() => onSelect({ id: opt._id, name: opt.name, value: opt.value })}
                className="group bg-white border-2 border-gray-200 rounded-2xl active:scale-95 transition-all duration-200 shadow-sm relative overflow-hidden hover:border-red-500 hover:shadow-xl
                           flex sm:flex-col items-center sm:items-center gap-3 sm:gap-0
                           px-4 py-3 sm:p-6 text-left sm:text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                {/* Icon */}
                <div className="relative w-10 h-10 sm:w-14 sm:h-14 bg-red-50 group-hover:bg-red-100 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 sm:mx-auto sm:mb-4 transition-colors">
                  <HardDrive className="w-5 h-5 sm:w-7 sm:h-7 text-red-600" />
                </div>
                {/* Text block */}
                <div className="relative flex-1 sm:flex-none">
                  <div className="text-base sm:text-2xl font-extrabold text-gray-900 group-hover:text-red-700 transition-colors leading-tight">{opt.name}</div>
                  <div className="text-[10px] sm:text-xs text-gray-500 sm:mb-3">Storage</div>
                </div>
                {/* Price badge — right side on mobile, bottom on sm+ */}
                <div className="relative flex-shrink-0 sm:w-full">
                  <div className="bg-red-600 group-hover:bg-red-700 text-white text-xs sm:text-sm font-bold px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-colors whitespace-nowrap sm:w-full sm:text-center">
                    {price > 0 ? `Up to £${price}` : 'Get Quote'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-5 sm:mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              <span className="font-semibold text-gray-800">Not sure about storage?</span> Check Settings → General → About on your iPhone, or Settings → About on Samsung.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step3Network({ phone, storage, onSelect, onBack }: {
  phone: SelectedPhone;
  storage: SelectedStorage;
  onSelect: (n: SelectedNetwork) => void;
  onBack: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [networks, setNetworks] = useState<Network[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNetworks = async () => {
      try {
        setLoading(true);
        const response = await utilitiesApi.getNetworks();
        if (response.success && response.data?.networks) {
          setNetworks(response.data.networks.filter(n => n.isActive));
        }
      } catch (err) {
        console.error('Error fetching networks:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNetworks();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-full flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-red-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading network options...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-full">
      <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 py-8 sm:py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <button onClick={onBack} className="flex items-center gap-1.5 text-red-200 hover:text-white mb-5 sm:mb-6 transition-colors text-sm font-medium">
            <ChevronLeft className="w-4 h-4" /> Back to Storage Selection
          </button>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-3 sm:mb-4 border border-white/20">
              <Smartphone className="w-3.5 h-3.5 flex-shrink-0" /> {phone.name} · {storage.name}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2">Select Network</h1>
            <p className="text-red-200 text-sm sm:text-base">Is your device locked to a specific carrier?</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 sm:py-8">
        {/* Info tip */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3 sm:p-4 mb-5 sm:mb-6 flex gap-3">
          <Signal className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            <span className="font-semibold text-blue-700">Tip:</span> Check Settings → General → About (iPhone) or Settings → About → SIM Status (Samsung) to confirm your network lock status.
          </p>
        </div>

        {/* Network grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 mb-6">
          {networks.map((net) => {
            const isSelected = selected === net._id;
            return (
              <button
                key={net._id}
                onClick={() => setSelected(net._id)}
                className={`relative group bg-white border-2 rounded-2xl p-4 sm:p-5 text-left transition-all duration-200 shadow-sm ${
                  isSelected
                    ? 'border-red-500 shadow-lg shadow-red-100'
                    : 'border-gray-200 hover:border-red-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected ? 'bg-red-100' : 'bg-gray-100 group-hover:bg-red-50'
                  }`}>
                    <Wifi className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      isSelected ? 'text-red-600' : 'text-gray-500 group-hover:text-red-500'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`font-bold text-sm sm:text-base leading-tight transition-colors ${
                      isSelected ? 'text-red-700' : 'text-gray-900'
                    }`}>{net.name}</div>
                    <div className="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-tight">{net.value}</div>
                  </div>
                  <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                    isSelected ? 'border-red-600 bg-red-600' : 'border-gray-300'
                  }`}>
                    {isSelected && <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {selected && (
          <button
            onClick={() => {
              const n = networks.find((x) => x._id === selected)!;
              onSelect({ id: n._id, name: n.name, value: n.value });
            }}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:bg-red-700 text-white py-3.5 sm:py-4 rounded-2xl font-bold text-sm sm:text-base transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2"
          >
            Continue with <span className="underline underline-offset-2">{networks.find(n => n._id === selected)?.name}</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

function Step4Condition({ phone, storage, network, onSelect, onBack }: {
  phone: SelectedPhone;
  storage: SelectedStorage;
  network: SelectedNetwork;
  onSelect: (c: SelectedCondition & { price: number }) => void;
  onBack: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [conditions, setConditions] = useState<DeviceCondition[]>([]);
  const [pricing, setPricing] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [conditionsRes, pricingRes] = await Promise.all([
          utilitiesApi.getDeviceConditions(),
          pricingApi.getPricingByDevice(phone.id)
        ]);
        
        if (conditionsRes.success && conditionsRes.data?.deviceConditions) {
          setConditions(conditionsRes.data.deviceConditions.filter(c => c.isActive));
        }
        
        if (pricingRes.success && pricingRes.data?.pricing) {
          const priceMap: { [key: string]: number } = {};
          const allPricing = pricingRes.data.pricing;
          
          // Normalize values for matching (lowercase, trim)
          const normalizedStorage = storage.value.toLowerCase().trim();
          const normalizedNetwork = network.value.toLowerCase().trim();
          
          console.log('DEBUG storage.value:', storage.value, '| network.value:', network.value);
          console.log('DEBUG normalized:', normalizedStorage, '|', normalizedNetwork);
          console.log('DEBUG pricing sample:', allPricing[0]);
          
          allPricing.forEach(p => {
            const pStorage = (p.storage || '').toLowerCase().trim();
            const pNetwork = (p.network || '').toLowerCase().trim();
            
            // Try exact match first, then normalized match
            const storageMatch = p.storage === storage.value || pStorage === normalizedStorage;
            const networkMatch = p.network === network.value || pNetwork === normalizedNetwork;
            
            if (storageMatch && networkMatch) {
              priceMap['NEW'] = p.gradeNew;
              priceMap['GOOD'] = p.gradeGood;
              priceMap['BROKEN'] = p.gradeBroken;
              console.log('DEBUG: Price match found!', priceMap);
            }
          });
          
          // If no exact match, try fuzzy matching as fallback
          if (Object.keys(priceMap).length === 0) {
            console.log('DEBUG: No exact match, trying fuzzy match...');
            allPricing.forEach(p => {
              const pStorage = (p.storage || '').toLowerCase().replace(/\s+/g, '').trim();
              const pNetwork = (p.network || '').toLowerCase().replace(/[-_\s]/g, '').trim();
              const fuzzyStorage = normalizedStorage.replace(/\s+/g, '');
              const fuzzyNetwork = normalizedNetwork.replace(/[-_\s]/g, '');
              
              if (pStorage === fuzzyStorage && pNetwork === fuzzyNetwork) {
                priceMap['NEW'] = p.gradeNew;
                priceMap['GOOD'] = p.gradeGood;
                priceMap['BROKEN'] = p.gradeBroken;
                console.log('DEBUG: Fuzzy match found!', priceMap);
              }
            });
          }
          
          setPricing(priceMap);
          
          if (Object.keys(priceMap).length === 0) {
            console.warn('WARNING: No pricing found for', storage.value, network.value);
          }
        }
      } catch (err) {
        console.error('Error fetching conditions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [phone.id, storage.value, network.value]);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-full flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-red-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading condition options...</p>
        </div>
      </div>
    );
  }

  const getConditionConfig = (value: string) => {
    const configs: { [key: string]: any } = {
      'NEW': {
        badge: 'Best Price',
        bgHover: 'hover:border-green-400',
        activeBorder: 'border-green-500',
        activeShadow: 'shadow-green-100',
        badgeBg: 'bg-green-100 text-green-700',
        priceBg: 'bg-green-600',
      },
      'GOOD': {
        badge: 'Good Value',
        bgHover: 'hover:border-amber-400',
        activeBorder: 'border-amber-500',
        activeShadow: 'shadow-amber-100',
        badgeBg: 'bg-amber-100 text-amber-700',
        priceBg: 'bg-amber-500',
      },
      'BROKEN': {
        badge: 'Still Paid',
        bgHover: 'hover:border-red-400',
        activeBorder: 'border-red-500',
        activeShadow: 'shadow-red-100',
        badgeBg: 'bg-red-100 text-red-700',
        priceBg: 'bg-red-500',
      },
    };
    return configs[value] || configs['GOOD'];
  };


  return (
    <div className="bg-gray-50 min-h-full">
      <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 py-8 sm:py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <button onClick={onBack} className="flex items-center gap-1.5 text-red-200 hover:text-white mb-5 sm:mb-6 transition-colors text-sm font-medium">
            <ChevronLeft className="w-4 h-4" /> Back to Network Selection
          </button>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-3 sm:mb-4 border border-white/20">
              <Smartphone className="w-3.5 h-3.5 flex-shrink-0" /> {phone.name} · {storage.name} · {network.name}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2">Select Device Condition</h1>
            <p className="text-red-200 text-sm sm:text-base">Be honest for an accurate quote — we verify on arrival</p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 sm:py-8">
        {/* Trust badges */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5 sm:mb-8">
          {[
            { icon: Shield, title: 'Data Wiped', desc: 'Military-grade erasure', bg: 'bg-red-50', color: 'text-red-600' },
            { icon: Clock, title: 'Fast Payment', desc: 'After we receive it', bg: 'bg-green-50', color: 'text-green-600' },
            { icon: TrendingUp, title: 'Price Match', desc: 'Beat any genuine quote', bg: 'bg-red-50', color: 'text-red-600' },
          ].map(({ icon: Icon, title, desc, bg, color }) => (
            <div key={title} className="bg-white border border-gray-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center shadow-sm">
              <div className={`w-8 h-8 sm:w-9 sm:h-9 ${bg} rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-1.5 sm:mb-2`}>
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${color}`} />
              </div>
              <div className="text-[11px] sm:text-xs font-bold text-gray-800 mb-0.5 leading-tight">{title}</div>
              <div className="text-[10px] sm:text-xs text-gray-500 leading-tight hidden sm:block">{desc}</div>
            </div>
          ))}
        </div>

        {/* Condition cards */}
        <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-6">
          {conditions.map((cond) => {
            const config = getConditionConfig(cond.value);
            const price = pricing[cond.value] || 0;
            const isSelected = selected === cond._id;
            return (
              <button key={cond._id} onClick={() => setSelected(cond._id)}
                className={`w-full bg-white border-2 rounded-2xl p-4 sm:p-5 text-left transition-all duration-200 shadow-sm ${
                  isSelected
                    ? `${config.activeBorder} shadow-lg ${config.activeShadow}`
                    : `border-gray-200 ${config.bgHover} hover:shadow-md`
                }`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 sm:mb-2 flex-wrap">
                      <span className="text-base sm:text-lg font-extrabold text-gray-900">{cond.name}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${config.badgeBg}`}>{config.badge}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3 leading-relaxed">{cond.description || `Device in ${cond.name.toLowerCase()} condition`}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className={`${config.priceBg} text-white text-lg sm:text-xl font-extrabold px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl`}>
                      {price > 0 ? `£${price}` : 'Quote'}
                    </div>
                    <div className="text-[10px] sm:text-xs text-gray-400 mt-1">instant quote</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Important notice */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-3 sm:p-4 mb-5 sm:mb-6 flex gap-3">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            <span className="font-semibold text-blue-700">Important:</span> If the condition doesn't match your selection on arrival, we may revise the quote before processing payment.
          </p>
        </div>

        {selected && (
          <button onClick={() => { 
            const c = conditions.find((x) => x._id === selected)!; 
            const price = pricing[c.value] || 0;
            onSelect({ id: c._id, name: c.name, value: c.value, description: c.description, price }); 
          }}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:bg-red-700 text-white py-3.5 sm:py-4 rounded-2xl font-bold text-sm sm:text-base transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2">
            Continue with <span className="underline underline-offset-2">{conditions.find(c => c._id === selected)?.name}</span> condition
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

function Step5Details({ phone, storage, network, condition, onBack }: {
  phone: SelectedPhone;
  storage: SelectedStorage;
  network: SelectedNetwork;
  condition: SelectedCondition & { price: number };
  onBack: () => void;
}) {
  const finalPrice = condition.price;
  const [postage, setPostage] = useState<'print' | 'pack'>('print');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', address: '', postcode: '', accountName: '', sortCode: '', bankAccount: '' });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value });
  const inputClass = "w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-400 transition-all bg-white placeholder-gray-400 text-gray-900";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  if (submitted) {
    const orderDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const postageLabel = postage === 'print' ? 'Print Our Label' : 'Send a Pack From Us';

    return (
      <div className="bg-gray-50 min-h-full py-6 sm:py-10 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Success Header */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl px-5 py-8 sm:py-10 text-center mb-5 shadow-xl shadow-green-200">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">Order Confirmed!</h1>
            <p className="text-green-100 text-sm">We'll email your prepaid label within minutes</p>
            {/* Order number badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/30 text-white text-sm font-bold px-4 py-2 rounded-full mt-4 tracking-widest">
              Order #{orderNumber}
            </div>
          </div>

          {/* Price & Device Summary */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4">
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-5 py-5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold text-red-200 uppercase tracking-wide">Your Payout</p>
                <p className="text-4xl font-extrabold text-white">£{finalPrice}</p>
                <p className="text-[11px] text-red-200 mt-0.5">Paid via UK bank transfer</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-red-200">Placed on</p>
                <p className="text-sm font-bold text-white">{orderDate}</p>
              </div>
            </div>

            {/* Device Details */}
            <div className="px-5 py-4 border-b border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Device</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-16 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-gray-100">
                  <img
                    src="https://zennara-storage.s3.ap-south-1.amazonaws.com/device-images/1771189550215-default%20(1).png"
                    alt={phone.name}
                    className="h-14 w-auto object-contain"
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{phone.name}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-[10px] font-semibold bg-red-50 text-red-600 px-2 py-0.5 rounded-full">{storage.name}</span>
                    <span className="text-[10px] font-semibold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{network.name}</span>
                    <span className="text-[10px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{condition.name}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Details */}
            <div className="px-5 py-4 border-b border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Your Details</p>
              <div className="space-y-2">
                {[
                  { label: 'Name', value: form.fullName },
                  { label: 'Email', value: form.email },
                  { label: 'Phone', value: form.phone },
                  { label: 'Address', value: `${form.address}, ${form.postcode}` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start justify-between gap-4 text-sm">
                    <span className="text-gray-500 flex-shrink-0 w-16">{label}</span>
                    <span className="font-semibold text-gray-800 text-right break-all">{value || '—'}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bank Details */}
            <div className="px-5 py-4 border-b border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Payment To</p>
              <div className="space-y-2">
                {[
                  { label: 'Account', value: form.accountName },
                  { label: 'Sort Code', value: form.sortCode },
                  { label: 'Acc. No.', value: `••••${form.bankAccount.slice(-4)}` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-semibold text-gray-800">{value || '—'}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Postage */}
            <div className="px-5 py-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Postage</p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-amber-50 rounded-lg flex items-center justify-center">
                  <Package className="w-3.5 h-3.5 text-amber-600" />
                </div>
                <span className="text-sm font-semibold text-gray-800">{postageLabel}</span>
                <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full ml-auto">FREE</span>
              </div>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 mb-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">What Happens Next</p>
            <div className="space-y-3">
              {[
                { icon: Mail, color: 'bg-red-50 text-red-600', step: '1', title: 'Check Your Email', desc: 'Your free prepaid shipping label is on its way' },
                { icon: Package, color: 'bg-amber-50 text-amber-600', step: '2', title: 'Pack & Post', desc: 'Drop it at any post office — completely free' },
                { icon: Search, color: 'bg-red-50 text-red-600', step: '3', title: 'We Inspect It', desc: 'Our team verifies the condition of your device' },
                { icon: Clock, color: 'bg-green-50 text-green-600', step: '4', title: 'Get Paid Fast', desc: `£${finalPrice} sent straight to your bank account` },
              ].map(({ icon: Icon, color, step, title, desc }) => (
                <div key={step} className="flex items-start gap-3">
                  <div className={`w-8 h-8 ${color} rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800">{title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                  </div>
                  <span className="text-[10px] font-bold text-gray-300 flex-shrink-0 mt-1">0{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Security note */}
          <div className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 mb-5">
            <Shield className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-500 leading-relaxed">
              Your data is encrypted and your bank details are only used for this payment. Questions? Call <span className="text-red-500 font-semibold">+44 20 7123 4567</span>
            </p>
          </div>

          <a href="/" className="block w-full bg-red-600 hover:bg-red-700 text-white text-center py-3.5 rounded-2xl font-bold transition-all shadow-lg shadow-red-200 text-sm">
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-full">
      {/* Gradient header */}
      <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 py-8 sm:py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <button onClick={onBack} className="flex items-center gap-1.5 text-red-200 hover:text-white mb-5 transition-colors text-sm font-medium">
            <ChevronLeft className="w-4 h-4" /> Back to Condition Selection
          </button>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-3 border border-white/20 max-w-xs mx-auto">
              <Smartphone className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{phone.name} · {storage.name} · {network.name} · {condition.name}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2">Complete Your Order</h1>
            <p className="text-red-200 text-sm sm:text-base">Fill in your details to finalise the sale</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-5 sm:py-8">
        {/* Mobile-only order summary — shown above form */}
        <div className="md:hidden mb-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-4 py-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold text-red-200">Your Quote</p>
                <p className="text-3xl font-extrabold text-white">£{finalPrice}</p>
                <p className="text-[10px] text-red-200 mt-0.5">Paid via UK bank transfer</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-white leading-tight">{phone.name}</p>
                <p className="text-[10px] text-red-200 mt-0.5">{storage.name} · {condition.name}</p>
              </div>
            </div>
            <div className="px-4 py-3 grid grid-cols-2 gap-x-3 gap-y-2">
              {[
                { icon: Mail, text: 'Free label emailed', color: 'text-red-600 bg-red-50' },
                { icon: Clock, text: 'Fast bank transfer', color: 'text-green-600 bg-green-50' },
                { icon: Shield, text: 'Data wiped', color: 'text-red-600 bg-red-50' },
                { icon: Lock, text: 'Encrypted & private', color: 'text-red-600 bg-red-50' },
              ].map(({ icon: Icon, text, color }) => (
                <div key={text} className="flex items-center gap-2">
                  <div className={`w-6 h-6 ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-3 h-3" />
                  </div>
                  <span className="text-[11px] text-gray-600 font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">

          {/* Form column */}
          <div className="md:col-span-2">
            <form onSubmit={async (e) => { 
              e.preventDefault(); 
              setLoading(true);
              setError(null);
              
              try {
                const orderPayload: CreateOrderPayload = {
                  customerName: form.fullName,
                  customerPhone: form.phone,
                  customerEmail: form.email,
                  customerAddress: form.address,
                  postcode: form.postcode,
                  deviceId: phone.id,
                  deviceName: phone.name,
                  network: network.value,
                  deviceGrade: condition.value as 'NEW' | 'GOOD' | 'BROKEN',
                  storage: storage.value,
                  offeredPrice: finalPrice,
                  postageMethod: postage === 'print' ? 'label' : 'postbag',
                  payoutDetails: {
                    accountName: form.accountName,
                    sortCode: form.sortCode,
                    accountNumber: form.bankAccount,
                  },
                };

                const response = await orderApi.createOrder(orderPayload);
                
                if (response.success && response.data?.order) {
                  setOrderNumber(response.data.order.orderNumber);
                  setSubmitted(true);
                } else {
                  setError(response.error || 'Failed to create order. Please try again.');
                }
              } catch (err: any) {
                console.error('Order submission error:', err);
                setError(err.response?.data?.error || err.message || 'Failed to submit order. Please try again.');
              } finally {
                setLoading(false);
              }
            }} className="space-y-4">

              {/* Personal Details */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-red-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">Personal Details</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className={labelClass}>Full Name <span className="text-red-500">*</span></label>
                    <input type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder="John Doe" required className={inputClass} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Email Address <span className="text-red-500">*</span></label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" required className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Phone Number <span className="text-red-500">*</span></label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="07123 456789" required className={inputClass} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-red-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">Your Address</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className={labelClass}>Address <span className="text-red-500">*</span></label>
                    <textarea name="address" value={form.address} onChange={handleChange} placeholder="123 High Street, London" required rows={3}
                      className={`${inputClass} resize-none`} />
                  </div>
                  <div>
                    <label className={labelClass}>Postcode <span className="text-red-500">*</span></label>
                    <input type="text" name="postcode" value={form.postcode} onChange={handleChange} placeholder="SW1A 1AA" required className={inputClass} />
                  </div>
                </div>
              </div>

              {/* Bank Details */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-4 h-4 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">Bank Details</h3>
                </div>
                <p className="text-xs text-gray-500 mb-4 ml-10">UK bank account for payment transfer</p>
                <div className="space-y-3">
                  <div>
                    <label className={labelClass}>Account Name <span className="text-red-500">*</span></label>
                    <input type="text" name="accountName" value={form.accountName} onChange={handleChange} placeholder="John Doe" required className={inputClass} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Sort Code <span className="text-red-500">*</span></label>
                      <input type="text" name="sortCode" value={form.sortCode} onChange={handleChange} placeholder="12-34-56" required className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Account Number <span className="text-red-500">*</span></label>
                      <input type="text" name="bankAccount" value={form.bankAccount} onChange={handleChange} placeholder="12345678" required className={inputClass} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Postage */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Package className="w-4 h-4 text-amber-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">Postage Option</h3>
                </div>
                <div className="space-y-2.5">
                  {[{ value: 'print' as const, icon: Printer, title: 'Print Our Label', desc: "We'll email you a free prepaid label to print at home" },
                    { value: 'pack' as const, icon: Box, title: 'Send a Pack From Us', desc: "We'll post you a free prepaid packaging kit" }]
                    .map(({ value, icon: Icon, title, desc }) => (
                    <label key={value} onClick={() => setPostage(value)}
                      className={`flex items-center gap-3 border-2 rounded-2xl p-3 sm:p-4 cursor-pointer transition-all ${
                        postage === value ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}>
                      <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        postage === value ? 'bg-red-100' : 'bg-gray-100'
                      }`}>
                        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${postage === value ? 'text-red-600' : 'text-gray-500'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs sm:text-sm font-bold text-gray-800">{title}</div>
                        <div className="text-xs text-gray-500 mt-0.5 leading-tight">{desc}</div>
                      </div>
                      <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        postage === value ? 'border-red-600 bg-red-600' : 'border-gray-300'
                      }`}>
                        {postage === value && <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full" />}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-red-800 mb-1">Order Submission Failed</p>
                    <p className="text-xs text-red-600">{error}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setError(null)}
                    className="text-red-400 hover:text-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 sm:py-4 rounded-2xl font-bold text-sm sm:text-base transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    Processing Order...
                  </>
                ) : (
                  <>
                    Complete Order — Get £{finalPrice}
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </>
                )}
              </button>

              <div className="bg-gray-50 rounded-2xl border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">Your Information is Safe</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-2">
                  Your personal information is encrypted and only used to process your order. We'll never share your details with third parties.
                </p>
                <p className="text-xs text-gray-400">
                  By completing this order, you agree to our terms and conditions. Questions? Call us on{' '}
                  <span className="text-red-500 font-medium">+44 20 7123 4567</span>
                </p>
              </div>
            </form>
          </div>

          {/* Sidebar: Order Summary — desktop only */}
          <div className="hidden md:block md:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-br from-red-600 to-red-700 p-5 text-white">
                  <p className="text-xs font-semibold text-red-200 mb-1">Your Quote</p>
                  <p className="text-4xl font-extrabold">£{finalPrice}</p>
                  <p className="text-xs text-red-200 mt-1">Paid via UK bank transfer</p>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Device</span>
                    <span className="font-semibold text-gray-800 text-right break-words">{phone.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Storage</span>
                    <span className="font-semibold text-gray-800">{storage.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Network</span>
                    <span className="font-semibold text-gray-800">{network.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Condition</span>
                    <span className="font-semibold text-gray-800">{condition.name}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
                {[
                  { icon: Mail, text: 'Free prepaid label emailed', color: 'text-red-600 bg-red-50' },
                  { icon: Shield, text: 'Data wiped securely', color: 'text-red-600 bg-red-50' },
                  { icon: Clock, text: 'Fast bank transfer', color: 'text-green-600 bg-green-50' },
                  { icon: Lock, text: 'Encrypted & private', color: 'text-red-600 bg-red-50' },
                ].map(({ icon: Icon, text, color }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs text-gray-600 font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SellPhone() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState<SelectedPhone | null>(null);
  const [storage, setStorage] = useState<SelectedStorage | null>(null);
  const [network, setNetwork] = useState<SelectedNetwork | null>(null);
  const [condition, setCondition] = useState<(SelectedCondition & { price: number }) | null>(null);

  const initialBrand = searchParams.get('brand') as 'apple' | 'samsung' | null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Header />
      <StepIndicator currentStep={step} />
      <main className="flex-1 bg-gray-50">
        {step === 1 && (
          <Step1 
            onSelect={(p) => { setPhone(p); setStep(2); }} 
            initialBrand={initialBrand || 'all'}
          />
        )}
        {step === 2 && phone && (
          <Step2 phone={phone} onSelect={(s) => { setStorage(s); setStep(3); }} onBack={() => { setStep(1); setPhone(null); }} />
        )}
        {step === 3 && phone && storage && (
          <Step3Network phone={phone} storage={storage} onSelect={(n) => { setNetwork(n); setStep(4); }} onBack={() => { setStep(2); setStorage(null); }} />
        )}
        {step === 4 && phone && storage && network && (
          <Step4Condition phone={phone} storage={storage} network={network} onSelect={(c) => { setCondition(c); setStep(5); }} onBack={() => { setStep(3); setNetwork(null); }} />
        )}
        {step === 5 && phone && storage && network && condition && (
          <Step5Details phone={phone} storage={storage} network={network} condition={condition} onBack={() => { setStep(4); setCondition(null); }} />
        )}
      </main>
      <Footer />
    </div>
  );
}
