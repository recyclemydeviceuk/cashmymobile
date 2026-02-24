import { useState, useMemo } from 'react';
import {
  Plus, Search, Pencil, Trash2, Smartphone, X, Save, AlertCircle,
  ToggleLeft, ToggleRight, ChevronDown, Upload, Image,
} from 'lucide-react';
import AdminLayout from '../AdminLayout';
import { useAdmin } from '../AdminContext';
import type { Device } from '../types';

export default function AdminDevices() {
  const { 
    devices, addDevice, updateDevice, deleteDevice
  } = useAdmin();
  const [search, setSearch] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Device | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return devices.filter(d => {
      if (brandFilter && d.brand !== brandFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return d.fullName.toLowerCase().includes(q) || d.brand.toLowerCase().includes(q);
      }
      return true;
    });
  }, [devices, search, brandFilter]);

  const brands = [...new Set(devices.map(d => d.brand))].sort();

  return (
    <AdminLayout title="Devices" subtitle="Manage device catalogue for pricing and orders">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search devices..."
              className="pl-9 pr-4 py-2 text-sm border border-gray-700 rounded-xl bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 w-48"
            />
          </div>
          <div className="relative">
            <select
              value={brandFilter}
              onChange={e => setBrandFilter(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-700 rounded-xl bg-gray-800 text-gray-300 focus:outline-none focus:border-red-500"
            >
              <option value="">All Brands</option>
              {brands.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>
          <span className="text-sm text-gray-500">{filtered.length} devices</span>
        </div>
        <button
          onClick={() => { setEditing(null); setShowModal(true); }}
          className="flex items-center gap-1.5 px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Device
        </button>
      </div>

      {/* Brand tabs */}
      <div className="flex gap-2 flex-wrap mb-4">
        <BrandTab active={!brandFilter} label="All" count={devices.length} onClick={() => setBrandFilter('')} />
        {brands.map(b => (
          <BrandTab key={b} active={brandFilter === b} label={b} count={devices.filter(d => d.brand === b).length} onClick={() => setBrandFilter(b)} />
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="bg-gray-900 rounded-2xl border border-gray-800 py-16 text-center">
          <Smartphone className="w-12 h-12 mx-auto text-gray-700 mb-3" />
          <p className="text-gray-500 font-medium">No devices found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(device => (
            <div key={device.id} className={`bg-gray-900 rounded-2xl border ${device.isActive ? 'border-gray-800' : 'border-gray-800 opacity-50'} p-4 hover:border-gray-700 hover:shadow-lg hover:shadow-black/20 transition-all group`}>
              {/* Icon */}
              <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center mb-3">
                <Smartphone className="w-5 h-5 text-gray-500" />
              </div>
              <div className="mb-3">
                <p className="font-semibold text-white text-sm leading-tight">{device.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{device.brand} · {device.category}</p>
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => updateDevice(device.id, { isActive: !device.isActive })}
                  className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${device.isActive ? 'text-emerald-400' : 'text-gray-600'}`}
                >
                  {device.isActive
                    ? <ToggleRight className="w-5 h-5" />
                    : <ToggleLeft className="w-5 h-5" />
                  }
                  {device.isActive ? 'Active' : 'Inactive'}
                </button>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => { setEditing(device); setShowModal(true); }}
                    className="p-1.5 rounded-lg text-gray-600 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setConfirmDelete(device.id)}
                    className="p-1.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <DeviceModal
          device={editing}
          onClose={() => { setShowModal(false); setEditing(null); }}
          onSave={(d) => {
            if (editing) updateDevice(editing.id, d);
            else addDevice(d as Omit<Device, 'id' | 'createdAt'>);
            setShowModal(false); setEditing(null);
          }}
        />
      )}

      {/* Confirm Delete */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="font-bold text-white text-center mb-1">Delete Device?</h3>
            <p className="text-sm text-gray-500 text-center mb-5">This will remove the device from the catalogue.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2.5 rounded-xl border border-gray-700 text-sm font-semibold text-gray-400 hover:bg-gray-800">Cancel</button>
              <button onClick={() => { deleteDevice(confirmDelete); setConfirmDelete(null); }} className="flex-1 py-2.5 rounded-xl bg-red-600 text-sm font-semibold text-white hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

function BrandTab({ active, label, count, onClick }: { active: boolean; label: string; count: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${active ? 'border-red-500 bg-red-500/10 text-red-400' : 'border-gray-700 bg-gray-900 text-gray-500 hover:bg-gray-800'}`}
    >
      {label} <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${active ? 'bg-red-500/20 text-red-400' : 'bg-gray-800 text-gray-500'}`}>{count}</span>
    </button>
  );
}

function DeviceModal({ device, onClose, onSave }: {
  device: Device | null;
  onClose: () => void;
  onSave: (d: Partial<Device>) => void;
}) {
  const { storageOptions, conditions, networks, brands, categories } = useAdmin();
  
  const activeStorages = storageOptions.filter(s => s.isActive);
  const activeConditions = conditions.filter(c => c.isActive);
  const activeNetworks = networks.filter(n => n.isActive);
  const activeBrands = brands.filter(b => b.isActive);
  const activeCategories = categories.filter(c => c.isActive);

  const [form, setForm] = useState({
    brand: device?.brand || (activeBrands[0]?.name || 'Apple'),
    name: device?.name || '',
    fullName: device?.fullName || '',
    category: device?.category || (activeCategories[0]?.name || 'iPhone'),
    storage: device?.storage || (activeStorages[0]?.name || ''),
    network: device?.network || (activeNetworks[0]?.name || ''),
    condition: device?.condition || (activeConditions[0]?.name || ''),
    imageUrl: device?.imageUrl || '',
    isActive: device?.isActive ?? true,
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState(device?.imageUrl || '');
  const [showPricing, setShowPricing] = useState(false);
  
  // Pricing grid: network -> storage -> condition -> price
  type PriceGrid = Record<string, Record<string, Record<string, string>>>;
  const [pricingGrid, setPricingGrid] = useState<PriceGrid>(() => {
    const grid: PriceGrid = {};
    if (device?.defaultPricing && device.defaultPricing.length > 0) {
      device.defaultPricing.forEach(entry => {
        if (!grid[entry.network]) grid[entry.network] = {};
        if (!grid[entry.network][entry.storage]) grid[entry.network][entry.storage] = {};
        grid[entry.network][entry.storage]['New / Mint'] = String(entry.gradeNew || '');
        grid[entry.network][entry.storage]['Good'] = String(entry.gradeGood || '');
        grid[entry.network][entry.storage]['Broken / Faulty'] = String(entry.gradeBroken || '');
      });
    }
    return grid;
  });
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>(
    activeNetworks.length > 0 ? [activeNetworks[0]?.name] : []
  );

  const set = (k: string, v: unknown) => setForm(p => ({ ...p, [k]: v }));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In production, upload file to server here
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleNetwork = (name: string) => {
    setSelectedNetworks(prev => {
      if (prev.includes(name)) {
        if (prev.length === 1) return prev;
        return prev.filter(n => n !== name);
      } else {
        return [...prev, name];
      }
    });
  };

  const setPriceValue = (network: string, storage: string, condition: string, val: string) => {
    setPricingGrid(prev => {
      const updated = { ...prev };
      if (!updated[network]) updated[network] = {};
      if (!updated[network][storage]) updated[network][storage] = {};
      updated[network][storage][condition] = val;
      return updated;
    });
  };

  const handleSave = () => {
    const errs: string[] = [];
    if (!form.brand.trim()) errs.push('Brand is required');
    if (!form.name.trim()) errs.push('Name is required');
    if (!form.category.trim()) errs.push('Category is required');
    if (errs.length > 0) { setErrors(errs); return; }
    if (!form.fullName.trim()) form.fullName = `${form.brand} ${form.name}`;
    
    // Build defaultPricing array from pricing grid
    const defaultPricing: NonNullable<Device['defaultPricing']> = [];
    Object.entries(pricingGrid).forEach(([network, storages]) => {
      Object.entries(storages).forEach(([storage, conditions]) => {
        const gradeNew = parseFloat(conditions['New / Mint'] || '0') || 0;
        const gradeGood = parseFloat(conditions['Good'] || '0') || 0;
        const gradeBroken = parseFloat(conditions['Broken / Faulty'] || '0') || 0;
        if (gradeNew > 0 || gradeGood > 0 || gradeBroken > 0) {
          defaultPricing.push({ network, storage, gradeNew, gradeGood, gradeBroken });
        }
      });
    });
    
    const saveData = {
      ...form,
      imageUrl: imagePreview || form.imageUrl,
      defaultPricing: defaultPricing.length > 0 ? defaultPricing : undefined,
    };
    
    onSave(saveData);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4 overflow-y-auto py-8">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl my-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h2 className="font-bold text-white">{device ? 'Edit Device' : 'Add Device'}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-gray-800">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {errors.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 space-y-1">
              {errors.map(e => (
                <div key={e} className="flex items-center gap-2 text-sm text-red-400">
                  <AlertCircle className="w-3.5 h-3.5" /> {e}
                </div>
              ))}
            </div>
          )}
          {/* Device Photo Upload */}
          <div>
            <label className="text-xs font-semibold text-gray-400 block mb-2">Device Photo</label>
            <div className="flex items-center gap-4">
              {imagePreview ? (
                <div className="relative w-24 h-24 rounded-xl border border-gray-700 overflow-hidden bg-gray-800 flex-shrink-0">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                  <button
                    onClick={() => { setImagePreview(''); set('imageUrl', ''); }}
                    className="absolute top-1 right-1 p-1 bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-700 bg-gray-800/50 flex items-center justify-center flex-shrink-0">
                  <Image className="w-8 h-8 text-gray-600" />
                </div>
              )}
              <div className="flex-1">
                <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800 hover:bg-gray-750 text-sm font-semibold text-gray-300 cursor-pointer transition-all">
                  <Upload className="w-4 h-4" />
                  {imagePreview ? 'Change Photo' : 'Upload Photo'}
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                <p className="text-xs text-gray-600 mt-1.5">or enter URL below</p>
              </div>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-400 block mb-1">Image URL</label>
            <input 
              value={form.imageUrl} 
              onChange={e => { set('imageUrl', e.target.value); setImagePreview(e.target.value); }} 
              className={inputCls} 
              placeholder="https://..." 
            />
          </div>

          {/* Device Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-400 block mb-1">Brand *</label>
              <select value={form.brand} onChange={e => set('brand', e.target.value)} className={inputCls}>
                {activeBrands.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-400 block mb-1">Category *</label>
              <select value={form.category} onChange={e => set('category', e.target.value)} className={inputCls}>
                {activeCategories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-400 block mb-1">Model Name *</label>
            <input value={form.name} onChange={e => set('name', e.target.value)} className={inputCls} placeholder="iPhone 16 Pro Max" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-400 block mb-1">Full Name (for display)</label>
            <input value={form.fullName} onChange={e => set('fullName', e.target.value)} className={inputCls} placeholder="Auto-generated if blank" />
          </div>

          {/* Device Specifications */}
          <div className="border-t border-gray-800 pt-4 mt-2">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Device Specifications</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-400 block mb-1">Storage</label>
                <select value={form.storage} onChange={e => set('storage', e.target.value)} className={inputCls}>
                  <option value="">Select...</option>
                  {activeStorages.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 block mb-1">Network</label>
                <select value={form.network} onChange={e => set('network', e.target.value)} className={inputCls}>
                  <option value="">Select...</option>
                  {activeNetworks.map(n => <option key={n.id} value={n.name}>{n.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 block mb-1">Condition</label>
                <select value={form.condition} onChange={e => set('condition', e.target.value)} className={inputCls}>
                  <option value="">Select...</option>
                  {activeConditions.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-2">Default values - can configure full pricing matrix below</p>
          </div>

          {/* Pricing Configuration Section */}
          <div className="border-t border-gray-800 pt-4 mt-2">
            <button
              type="button"
              onClick={() => setShowPricing(!showPricing)}
              className="flex items-center justify-between w-full text-left mb-3"
            >
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pricing Configuration</h3>
                <p className="text-xs text-gray-600 mt-0.5">Set prices by network, storage & condition</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showPricing ? 'rotate-180' : ''}`} />
            </button>
            
            {showPricing && (
              <div className="space-y-4">
                {/* Network Selection */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Networks</span>
                    <button
                      type="button"
                      onClick={() => setSelectedNetworks(activeNetworks.map(n => n.name))}
                      className="text-xs text-red-400 hover:text-red-300 font-medium"
                    >
                      Select All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeNetworks.map(n => {
                      const isSelected = selectedNetworks.includes(n.name);
                      return (
                        <button
                          key={n.id}
                          type="button"
                          onClick={() => toggleNetwork(n.name)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                            isSelected
                              ? 'bg-red-600 border-red-500 text-white'
                              : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500'
                          }`}
                        >
                          {isSelected && <span className="mr-1">✓</span>}
                          {n.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Pricing Grid for First Selected Network */}
                {selectedNetworks.length > 0 && activeStorages.length > 0 && activeConditions.length > 0 && (
                  <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-800">
                    <p className="text-xs text-amber-400/80 font-medium mb-3">
                      ⚡ Setting prices for {selectedNetworks.length} network{selectedNetworks.length > 1 ? 's' : ''}: {selectedNetworks.join(', ')}
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-separate" style={{ borderSpacing: '0 6px' }}>
                        <thead>
                          <tr>
                            <th className="text-left pb-1 pr-4 text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[100px]">
                              Condition
                            </th>
                            {activeStorages.map(s => (
                              <th key={s.id} className="pb-1 px-2 text-center min-w-[110px]">
                                <span className="inline-block px-2 py-1 rounded-lg bg-gray-800 border border-gray-700 text-xs font-bold text-gray-300">
                                  {s.name}
                                </span>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {activeConditions.map(cond => {
                            const condColor = cond.name === 'New / Mint' 
                              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                              : cond.name === 'Good'
                              ? 'bg-blue-500/15 text-blue-400 border-blue-500/30'
                              : 'bg-red-500/15 text-red-400 border-red-500/30';
                            
                            return (
                              <tr key={cond.id}>
                                <td className="py-1 pr-4">
                                  <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold border ${condColor}`}>
                                    {cond.name}
                                  </span>
                                </td>
                                {activeStorages.map(stor => {
                                  const network = selectedNetworks[0];
                                  const value = pricingGrid[network]?.[stor.name]?.[cond.name] || '';
                                  return (
                                    <td key={stor.id} className="py-1 px-2">
                                      <div className="flex items-center border border-gray-700/80 rounded-lg overflow-hidden focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500/20" style={{ backgroundColor: '#000' }}>
                                        <span className="pl-2 pr-1 text-xs font-bold text-gray-500 select-none">£</span>
                                        <input
                                          type="number"
                                          min={0}
                                          placeholder="0"
                                          value={value}
                                          onChange={e => {
                                            // Update all selected networks
                                            selectedNetworks.forEach(net => {
                                              setPriceValue(net, stor.name, cond.name, e.target.value);
                                            });
                                          }}
                                          className="w-full py-2 pr-2 text-white text-sm font-semibold placeholder-gray-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                          style={{ backgroundColor: '#000', colorScheme: 'dark' }}
                                        />
                                      </div>
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-800/60 rounded-xl">
            <span className="text-sm font-semibold text-gray-300">Active in catalogue</span>
            <button
              type="button"
              onClick={() => set('isActive', !form.isActive)}
              className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${form.isActive ? 'text-emerald-600' : 'text-gray-400'}`}
            >
              {form.isActive ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
              {form.isActive ? 'Active' : 'Inactive'}
            </button>
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 pb-6">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-700 text-sm font-semibold text-gray-400 hover:bg-gray-800">Cancel</button>
          <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-sm font-semibold text-white">
            <Save className="w-4 h-4" /> {device ? 'Save Changes' : 'Add Device'}
          </button>
        </div>
      </div>
    </div>
  );
}

const inputCls = 'w-full px-3 py-2 text-sm border border-gray-700 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all';
