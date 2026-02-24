import { useState } from 'react';
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
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const applePhones = [
  { name: 'iPhone 17', price: 460 },
  { name: 'iPhone 17 Pro', price: 675 },
  { name: 'iPhone 17 Pro Max', price: 740 },
  { name: 'iPhone 16 Pro Max', price: 655 },
  { name: 'iPhone 16 Pro', price: 555 },
  { name: 'iPhone 16 Plus', price: 450 },
  { name: 'iPhone 16', price: 425 },
  { name: 'iPhone 15 Pro Max', price: 495 },
  { name: 'iPhone 15 Pro', price: 440 },
  { name: 'iPhone 15 Plus', price: 385 },
  { name: 'iPhone 15', price: 360 },
  { name: 'iPhone 14 Pro Max', price: 405 },
  { name: 'iPhone 14 Pro', price: 365 },
  { name: 'iPhone 14 Plus', price: 305 },
  { name: 'iPhone 14', price: 275 },
  { name: 'iPhone 13 Pro Max', price: 310 },
  { name: 'iPhone 13 Pro', price: 280 },
  { name: 'iPhone 13 Mini', price: 200 },
  { name: 'iPhone 13', price: 220 },
  { name: 'iPhone 12 Pro Max', price: 235 },
  { name: 'iPhone 12 Pro', price: 210 },
  { name: 'iPhone 12 Mini', price: 145 },
  { name: 'iPhone 12', price: 170 },
  { name: 'iPhone 11 Pro Max', price: 185 },
  { name: 'iPhone 11 Pro', price: 165 },
  { name: 'iPhone 11', price: 135 },
];

const samsungPhones = [
  { name: 'Galaxy S25 Ultra', price: 580 },
  { name: 'Galaxy S25 Plus', price: 440 },
  { name: 'Galaxy S25', price: 400 },
  { name: 'Galaxy S24 Ultra', price: 525 },
  { name: 'Galaxy S24 Plus', price: 370 },
  { name: 'Galaxy S24', price: 340 },
  { name: 'Galaxy S23 Ultra', price: 410 },
  { name: 'Galaxy S23 Plus', price: 290 },
  { name: 'Galaxy S23', price: 265 },
  { name: 'Galaxy S23 FE', price: 200 },
  { name: 'Galaxy S22 Ultra', price: 330 },
  { name: 'Galaxy S22 Plus', price: 230 },
  { name: 'Galaxy S22', price: 215 },
];

const storageOptions = [
  { label: '128GB', multiplier: 0.85 },
  { label: '256GB', multiplier: 0.9 },
  { label: '512GB', multiplier: 0.95 },
  { label: '1TB', multiplier: 1.0 },
];

const networkOptions = [
  { label: 'Unlocked', desc: 'Works with any UK network', multiplier: 1.0, badge: 'Best Price', color: 'green' },
  { label: 'EE', desc: 'Locked to EE network', multiplier: 0.95, badge: null, color: 'blue' },
  { label: 'O2', desc: 'Locked to O2 network', multiplier: 0.95, badge: null, color: 'blue' },
  { label: 'Vodafone', desc: 'Locked to Vodafone network', multiplier: 0.95, badge: null, color: 'blue' },
  { label: 'Three', desc: 'Locked to Three network', multiplier: 0.95, badge: null, color: 'blue' },
  { label: 'Sky Mobile', desc: 'Locked to Sky Mobile', multiplier: 0.92, badge: null, color: 'blue' },
  { label: 'Virgin Mobile', desc: 'Locked to Virgin Mobile', multiplier: 0.92, badge: null, color: 'blue' },
  { label: 'iD Mobile', desc: 'Locked to iD Mobile', multiplier: 0.92, badge: null, color: 'blue' },
];


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

function Step1({ onSelect }: { onSelect: (p: { name: string; price: number }) => void }) {
  const [query, setQuery] = useState('');
  const [brand, setBrand] = useState<'all' | 'apple' | 'samsung'>('all');

  const allPhones = [
    ...applePhones.map((p) => ({ ...p, brand: 'apple' as const })),
    ...samsungPhones.map((p) => ({ ...p, brand: 'samsung' as const })),
  ];

  const filtered = allPhones.filter((p) => {
    const matchesBrand = brand === 'all' || p.brand === brand;
    const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase());
    return matchesBrand && matchesQuery;
  });

  const filteredApple = filtered.filter((p) => p.brand === 'apple');
  const filteredSamsung = filtered.filter((p) => p.brand === 'samsung');

  const isSearching = query.trim().length > 0;

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
                  {filteredApple.map((phone) => (
                    <button key={phone.name} onClick={() => onSelect(phone)}
                      className="group bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 text-left hover:border-red-400 hover:shadow-xl active:scale-95 transition-all duration-200 shadow-sm">
                      <div className="w-full flex items-center justify-center bg-gray-50 rounded-xl mb-2 sm:mb-3 overflow-hidden" style={{height: '80px'}}>
                        <img
                          src="https://zennara-storage.s3.ap-south-1.amazonaws.com/device-images/1771189550215-default%20(1).png"
                          alt={phone.name}
                          className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-red-700 mb-1 leading-tight">{phone.name}</div>
                      <div className="text-xs sm:text-sm font-bold text-red-600">Up to £{phone.price}</div>
                    </button>
                  ))}
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
                  {filteredSamsung.map((phone) => (
                    <button key={phone.name} onClick={() => onSelect(phone)}
                      className="group bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 text-left hover:border-red-400 hover:shadow-xl active:scale-95 transition-all duration-200 shadow-sm">
                      <div className="w-full flex items-center justify-center bg-gray-50 rounded-xl mb-2 sm:mb-3 overflow-hidden" style={{height: '80px'}}>
                        <img
                          src="https://zennara-storage.s3.ap-south-1.amazonaws.com/device-images/1771189550215-default%20(1).png"
                          alt={phone.name}
                          className="h-full w-auto object-contain group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-red-700 mb-1 leading-tight">{phone.name}</div>
                      <div className="text-xs sm:text-sm font-bold text-red-600">Up to £{phone.price}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Step2({ phone, onSelect, onBack }: { phone: { name: string; price: number }; onSelect: (s: { label: string; multiplier: number }) => void; onBack: () => void }) {
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
            const price = Math.round(phone.price * opt.multiplier);
            return (
              <button key={opt.label} onClick={() => onSelect(opt)}
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
                  <div className="text-base sm:text-2xl font-extrabold text-gray-900 group-hover:text-red-700 transition-colors leading-tight">{opt.label}</div>
                  <div className="text-[10px] sm:text-xs text-gray-500 sm:mb-3">Storage</div>
                </div>
                {/* Price badge — right side on mobile, bottom on sm+ */}
                <div className="relative flex-shrink-0 sm:w-full">
                  <div className="bg-red-600 group-hover:bg-red-700 text-white text-xs sm:text-sm font-bold px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-colors whitespace-nowrap sm:w-full sm:text-center">
                    Up to £{price}
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
  phone: { name: string; price: number };
  storage: { label: string; multiplier: number };
  onSelect: (n: { label: string; multiplier: number }) => void;
  onBack: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const basePrice = Math.round(phone.price * storage.multiplier);

  return (
    <div className="bg-gray-50 min-h-full">
      <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 py-8 sm:py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <button onClick={onBack} className="flex items-center gap-1.5 text-red-200 hover:text-white mb-5 sm:mb-6 transition-colors text-sm font-medium">
            <ChevronLeft className="w-4 h-4" /> Back to Storage Selection
          </button>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-3 sm:mb-4 border border-white/20">
              <Smartphone className="w-3.5 h-3.5 flex-shrink-0" /> {phone.name} · {storage.label}
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
          {networkOptions.map((net) => {
            const price = Math.round(basePrice * net.multiplier);
            const isSelected = selected === net.label;
            return (
              <button
                key={net.label}
                onClick={() => setSelected(net.label)}
                className={`relative group bg-white border-2 rounded-2xl p-4 sm:p-5 text-left transition-all duration-200 shadow-sm ${
                  isSelected
                    ? 'border-red-500 shadow-lg shadow-red-100'
                    : 'border-gray-200 hover:border-red-300 hover:shadow-md'
                }`}
              >
                {net.badge && (
                  <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                    {net.badge}
                  </span>
                )}
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
                    }`}>{net.label}</div>
                    <div className="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-tight">{net.desc}</div>
                  </div>
                  <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                    isSelected ? 'border-red-600 bg-red-600' : 'border-gray-300'
                  }`}>
                    {isSelected && <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full" />}
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <span className={`text-xs sm:text-sm font-bold ${
                    isSelected ? 'text-red-600' : 'text-gray-700'
                  }`}>Up to £{price}</span>
                  {net.multiplier < 1.0 && (
                    <span className="text-[10px] text-gray-400 ml-1.5">({Math.round((1 - net.multiplier) * 100)}% less than unlocked)</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {selected && (
          <button
            onClick={() => {
              const n = networkOptions.find((x) => x.label === selected)!;
              onSelect({ label: n.label, multiplier: n.multiplier });
            }}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:bg-red-700 text-white py-3.5 sm:py-4 rounded-2xl font-bold text-sm sm:text-base transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2"
          >
            Continue with <span className="underline underline-offset-2">{selected}</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

function Step4Condition({ phone, storage, network, onSelect, onBack }: {
  phone: { name: string; price: number };
  storage: { label: string; multiplier: number };
  network: { label: string; multiplier: number };
  onSelect: (c: { label: string; multiplier: number; description: string }) => void;
  onBack: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const basePrice = Math.round(phone.price * storage.multiplier * network.multiplier);

  const conditionConfig = [
    {
      label: 'NEW',
      multiplier: 1.0,
      description: 'Brand new or like new — fully functional, no wear, screen intact, battery perfect',
      bullets: ['Screen fully intact, no cracks', 'All buttons & features work', 'Battery holds charge perfectly', 'No scratches or marks'],
      color: 'green',
      badge: 'Best Price',
      bgHover: 'hover:border-green-400',
      activeBorder: 'border-green-500',
      activeShadow: 'shadow-green-100',
      badgeBg: 'bg-green-100 text-green-700',
      iconBg: 'bg-green-50',
      iconColor: 'text-green-600',
      priceBg: 'bg-green-600',
    },
    {
      label: 'GOOD',
      multiplier: 0.65,
      description: 'Fully functional with visible wear — minor scratches, battery degradation',
      bullets: ['Screen has minor scratches or marks', 'All core features work', 'Battery drains a little faster', 'Visible wear on body'],
      color: 'amber',
      badge: 'Good Value',
      bgHover: 'hover:border-amber-400',
      activeBorder: 'border-amber-500',
      activeShadow: 'shadow-amber-100',
      badgeBg: 'bg-amber-100 text-amber-700',
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      priceBg: 'bg-amber-500',
    },
    {
      label: 'BROKEN',
      multiplier: 0.35,
      description: 'Cracked screen, not turning on, or major functional problems',
      bullets: ['Cracked or shattered screen', 'Not powering on', 'Major hardware faults', 'Water damage present'],
      color: 'red',
      badge: 'Still Paid',
      bgHover: 'hover:border-red-400',
      activeBorder: 'border-red-500',
      activeShadow: 'shadow-red-100',
      badgeBg: 'bg-red-100 text-red-700',
      iconBg: 'bg-red-50',
      iconColor: 'text-red-500',
      priceBg: 'bg-red-500',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-full">
      <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 py-8 sm:py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <button onClick={onBack} className="flex items-center gap-1.5 text-red-200 hover:text-white mb-5 sm:mb-6 transition-colors text-sm font-medium">
            <ChevronLeft className="w-4 h-4" /> Back to Network Selection
          </button>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-3 sm:mb-4 border border-white/20">
              <Smartphone className="w-3.5 h-3.5 flex-shrink-0" /> {phone.name} · {storage.label} · {network.label}
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
            { icon: Clock, title: 'Paid in 24hrs', desc: 'After we receive it', bg: 'bg-green-50', color: 'text-green-600' },
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
          {conditionConfig.map((cond) => {
            const price = Math.round(basePrice * cond.multiplier);
            const isSelected = selected === cond.label;
            return (
              <button key={cond.label} onClick={() => setSelected(cond.label)}
                className={`w-full bg-white border-2 rounded-2xl p-4 sm:p-5 text-left transition-all duration-200 shadow-sm ${
                  isSelected
                    ? `${cond.activeBorder} shadow-lg ${cond.activeShadow}`
                    : `border-gray-200 ${cond.bgHover} hover:shadow-md`
                }`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 sm:mb-2 flex-wrap">
                      <span className="text-base sm:text-lg font-extrabold text-gray-900">{cond.label}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cond.badgeBg}`}>{cond.badge}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3 leading-relaxed">{cond.description}</p>
                    <ul className="space-y-1">
                      {cond.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-xs text-gray-600">
                          <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cond.priceBg}`} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className={`${cond.priceBg} text-white text-lg sm:text-xl font-extrabold px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl`}>
                      £{price}
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
          <button onClick={() => { const c = conditionConfig.find((x) => x.label === selected)!; onSelect({ label: c.label, multiplier: c.multiplier, description: c.description }); }}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:bg-red-700 text-white py-3.5 sm:py-4 rounded-2xl font-bold text-sm sm:text-base transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2">
            Continue with <span className="underline underline-offset-2">{selected}</span> condition
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

function Step5Details({ phone, storage, network, condition, onBack }: {
  phone: { name: string; price: number };
  storage: { label: string; multiplier: number };
  network: { label: string; multiplier: number };
  condition: { label: string; multiplier: number; description: string };
  onBack: () => void;
}) {
  const finalPrice = Math.round(phone.price * storage.multiplier * network.multiplier * condition.multiplier);
  const [postage, setPostage] = useState<'print' | 'pack'>('print');
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', address: '', postcode: '', accountName: '', sortCode: '', bankAccount: '' });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value });
  const inputClass = "w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-400 transition-all bg-white placeholder-gray-400 text-gray-900";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  // Generate stable 6-char alphanumeric order number once
  const [orderNumber] = useState(() => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  });

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
                <p className="text-[11px] text-red-200 mt-0.5">Paid within 24hrs of receipt</p>
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
                    <span className="text-[10px] font-semibold bg-red-50 text-red-600 px-2 py-0.5 rounded-full">{storage.label}</span>
                    <span className="text-[10px] font-semibold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{network.label}</span>
                    <span className="text-[10px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{condition.label}</span>
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
                { icon: Clock, color: 'bg-green-50 text-green-600', step: '4', title: 'Get Paid in 24hrs', desc: `£${finalPrice} sent straight to your bank account` },
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
              <span className="truncate">{phone.name} · {storage.label} · {network.label} · {condition.label}</span>
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
                <p className="text-[10px] text-red-200 mt-0.5">Paid within 24 hours</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-white leading-tight">{phone.name}</p>
                <p className="text-[10px] text-red-200 mt-0.5">{storage.label} · {condition.label}</p>
              </div>
            </div>
            <div className="px-4 py-3 grid grid-cols-2 gap-x-3 gap-y-2">
              {[
                { icon: Mail, text: 'Free label emailed', color: 'text-red-600 bg-red-50' },
                { icon: Clock, text: 'Paid in 24 hours', color: 'text-green-600 bg-green-50' },
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
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">

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

              <button type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3.5 sm:py-4 rounded-2xl font-bold text-sm sm:text-base transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2">
                Complete Order — Get £{finalPrice}
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
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
                  <p className="text-xs text-red-200 mt-1">Paid within 24 hours</p>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Device</span>
                    <span className="font-semibold text-gray-800 text-right">{phone.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Storage</span>
                    <span className="font-semibold text-gray-800">{storage.label}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Network</span>
                    <span className="font-semibold text-gray-800">{network.label}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Condition</span>
                    <span className="font-semibold text-gray-800">{condition.label}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-3">
                {[
                  { icon: Mail, text: 'Free prepaid label emailed', color: 'text-red-600 bg-red-50' },
                  { icon: Shield, text: 'Data wiped securely', color: 'text-red-600 bg-red-50' },
                  { icon: Clock, text: 'Paid within 24 hours', color: 'text-green-600 bg-green-50' },
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
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState<{ name: string; price: number } | null>(null);
  const [storage, setStorage] = useState<{ label: string; multiplier: number } | null>(null);
  const [network, setNetwork] = useState<{ label: string; multiplier: number } | null>(null);
  const [condition, setCondition] = useState<{ label: string; multiplier: number; description: string } | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Header />
      <StepIndicator currentStep={step} />
      <main className="flex-1 bg-gray-50">
        {step === 1 && (
          <Step1 onSelect={(p) => { setPhone(p); setStep(2); }} />
        )}
        {step === 2 && phone && (
          <Step2 phone={phone} onSelect={(s) => { setStorage(s); setStep(3); }} onBack={() => setStep(1)} />
        )}
        {step === 3 && phone && storage && (
          <Step3Network phone={phone} storage={storage} onSelect={(n) => { setNetwork(n); setStep(4); }} onBack={() => setStep(2)} />
        )}
        {step === 4 && phone && storage && network && (
          <Step4Condition phone={phone} storage={storage} network={network} onSelect={(c) => { setCondition(c); setStep(5); }} onBack={() => setStep(3)} />
        )}
        {step === 5 && phone && storage && network && condition && (
          <Step5Details phone={phone} storage={storage} network={network} condition={condition} onBack={() => setStep(4)} />
        )}
      </main>
      <Footer />
    </div>
  );
}
