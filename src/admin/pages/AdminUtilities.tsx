import { useState } from 'react';
import { Plus, Pencil, Trash2, Save, X, GripVertical, ToggleLeft, ToggleRight, Settings } from 'lucide-react';
import AdminLayout from '../AdminLayout';
import { useAdmin } from '../AdminContext';
import type { UtilityItem } from '../types';

type Tab = 'storage' | 'conditions' | 'networks' | 'brands' | 'categories' | 'orderStatuses' | 'paymentStatuses';

interface UtilityCRUD {
  add: (name: string, extra?: { value?: string; color?: string }) => void;
  update: (id: string, updates: Partial<UtilityItem>) => void;
  remove: (id: string) => void;
  reorder: (items: UtilityItem[]) => void;
}

interface TabConfig {
  label: string;
  items: UtilityItem[];
  crud: UtilityCRUD;
  description: string;
  hasColor?: boolean;
}

export default function AdminUtilities() {
  const { 
    storageOptions, storageOptionsCRUD, 
    conditions, conditionsCRUD, 
    networks, networksCRUD,
    brands, brandsCRUD,
    categories, categoriesCRUD,
    orderStatuses, orderStatusesCRUD,
    paymentStatuses, paymentStatusesCRUD,
  } = useAdmin();
  const [tab, setTab] = useState<Tab>('storage');

  const tabConfig: Record<Tab, TabConfig> = {
    storage: {
      label: 'Storage Options',
      items: storageOptions,
      crud: storageOptionsCRUD,
      description: 'Storage sizes shown to customers during the quoting process.',
    },
    conditions: {
      label: 'Device Conditions',
      items: conditions,
      crud: conditionsCRUD,
      description: 'Device condition grades used when quoting and receiving devices.',
    },
    networks: {
      label: 'Networks / Carriers',
      items: networks,
      crud: networksCRUD,
      description: 'Network carriers that devices can be locked to.',
    },
    brands: {
      label: 'Device Brands',
      items: brands,
      crud: brandsCRUD,
      description: 'Mobile phone and device brand manufacturers.',
    },
    categories: {
      label: 'Device Categories',
      items: categories,
      crud: categoriesCRUD,
      description: 'Device type categories for organizing products.',
    },
    orderStatuses: {
      label: 'Order Statuses',
      items: orderStatuses,
      crud: orderStatusesCRUD,
      description: 'Order workflow statuses shown on the orders page.',
      hasColor: true,
    },
    paymentStatuses: {
      label: 'Payment Statuses',
      items: paymentStatuses,
      crud: paymentStatusesCRUD,
      description: 'Payment statuses used to track order payment.',
      hasColor: true,
    },
  };

  const { label, items, crud, description, hasColor } = tabConfig[tab];

  return (
    <AdminLayout title="Utilities" subtitle="Manage dropdown values used throughout the admin and frontend">
      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(Object.entries(tabConfig) as [Tab, typeof tabConfig[Tab]][]).map(([key, cfg]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${tab === key ? 'bg-red-600 text-white border-red-600 shadow-sm' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`}
          >
            {cfg.label}
            <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${tab === key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
              {cfg.items.length}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {/* Section header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-red-500" />
              <h2 className="font-bold text-gray-900">{label}</h2>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{description}</p>
          </div>
        </div>

        {/* Items list */}
        <UtilityList
          items={items}
          crud={crud}
          hasColor={hasColor}
        />
      </div>
    </AdminLayout>
  );
}

const COLOR_OPTIONS = [
  { label: 'Blue', value: 'bg-blue-100 text-blue-700' },
  { label: 'Purple', value: 'bg-purple-100 text-purple-700' },
  { label: 'Indigo', value: 'bg-indigo-100 text-indigo-700' },
  { label: 'Green', value: 'bg-green-100 text-green-700' },
  { label: 'Emerald', value: 'bg-emerald-100 text-emerald-700' },
  { label: 'Yellow', value: 'bg-yellow-100 text-yellow-700' },
  { label: 'Orange', value: 'bg-orange-100 text-orange-700' },
  { label: 'Red', value: 'bg-red-100 text-red-700' },
  { label: 'Gray', value: 'bg-gray-100 text-gray-700' },
  { label: 'Amber', value: 'bg-amber-100 text-amber-700' },
];

function UtilityList({ items, crud, hasColor }: {
  items: UtilityItem[];
  crud: { add: (name: string, extra?: { value?: string; color?: string }) => void; update: (id: string, u: Partial<UtilityItem>) => void; remove: (id: string) => void };
  hasColor?: boolean;
}) {
  const [newName, setNewName] = useState('');
  const [newColor, setNewColor] = useState(COLOR_OPTIONS[0].value);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editColor, setEditColor] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleAdd = () => {
    if (!newName.trim()) return;
    crud.add(newName.trim(), hasColor ? { color: newColor } : undefined);
    setNewName('');
    setNewColor(COLOR_OPTIONS[0].value);
  };

  const startEdit = (item: UtilityItem) => {
    setEditingId(item.id);
    setEditName(item.name);
    setEditColor(item.color || COLOR_OPTIONS[0].value);
  };

  const saveEdit = (id: string) => {
    if (editName.trim()) crud.update(id, { name: editName.trim(), ...(hasColor ? { color: editColor } : {}) });
    setEditingId(null);
  };

  return (
    <div>
      {/* Add new */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-3 flex-wrap">
          <input
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleAdd(); }}
            placeholder="Add new item..."
            className="flex-1 min-w-[180px] px-3 py-2 text-sm border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
          />
          {hasColor && (
            <select
              value={newColor}
              onChange={e => setNewColor(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-xl bg-white text-gray-900 focus:outline-none focus:border-red-500"
            >
              {COLOR_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          )}
          {hasColor && newColor && (
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${newColor}`}>{newName || 'Preview'}</span>
          )}
          <button
            onClick={handleAdd}
            disabled={!newName.trim()}
            className="flex items-center gap-1.5 px-4 py-2 text-sm bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>

      {/* List */}
      {items.length === 0 ? (
        <div className="py-12 text-center text-gray-500">
          <p className="text-sm">No items yet. Add one above.</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {items.map(item => (
            <div key={item.id} className={`flex items-center gap-3 px-6 py-3.5 hover:bg-gray-50 transition-colors group ${!item.isActive ? 'opacity-40' : ''}`}>
              <GripVertical className="w-4 h-4 text-gray-400 cursor-grab flex-shrink-0" />

              {editingId === item.id ? (
                <div className="flex items-center gap-2 flex-1 flex-wrap">
                  <input
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') saveEdit(item.id); if (e.key === 'Escape') setEditingId(null); }}
                    autoFocus
                    className="flex-1 min-w-[140px] px-3 py-1.5 text-sm border border-red-500/50 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/30"
                  />
                  {hasColor && (
                    <>
                      <select
                        value={editColor}
                        onChange={e => setEditColor(e.target.value)}
                        className="px-2 py-1.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-red-500"
                      >
                        {COLOR_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                      </select>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${editColor}`}>{editName || 'Preview'}</span>
                    </>
                  )}
                  <button onClick={() => saveEdit(item.id)} className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50">
                    <Save className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setEditingId(null)} className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-sm font-medium text-gray-900">{item.name}</span>
                    {hasColor && item.color && (
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${item.color}`}>{item.name}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => crud.update(item.id, { isActive: !item.isActive })}
                      className={`p-1.5 rounded-lg transition-all ${item.isActive ? 'text-emerald-600 hover:bg-emerald-50' : 'text-gray-500 hover:bg-gray-100'}`}
                      title={item.isActive ? 'Deactivate' : 'Activate'}
                    >
                      {item.isActive ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                    </button>
                    <button onClick={() => startEdit(item)} className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => setConfirmDelete(item.id)} className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${item.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                    {item.isActive ? 'Active' : 'Inactive'}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Footer count */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">
        {items.filter(i => i.isActive).length} active · {items.length} total
      </div>

      {/* Confirm Delete */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="font-bold text-gray-900 text-center mb-1">Delete Item?</h3>
            <p className="text-sm text-gray-600 text-center mb-5">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={() => { crud.remove(confirmDelete); setConfirmDelete(null); }} className="flex-1 py-2.5 rounded-xl bg-red-600 text-sm font-semibold text-white hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
