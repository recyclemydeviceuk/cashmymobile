import { useState } from 'react';
import { Plus, Pencil, Trash2, Save, X, GripVertical, ToggleLeft, ToggleRight, Settings } from 'lucide-react';
import AdminLayout from '../AdminLayout';
import { useAdmin } from '../AdminContext';
import type { UtilityItem } from '../types';

type Tab = 'storage' | 'conditions' | 'networks' | 'brands' | 'categories';

interface UtilityCRUD {
  add: (name: string) => void;
  update: (id: string, updates: Partial<UtilityItem>) => void;
  remove: (id: string) => void;
  reorder: (items: UtilityItem[]) => void;
}

interface TabConfig {
  label: string;
  items: UtilityItem[];
  crud: UtilityCRUD;
  description: string;
}

export default function AdminUtilities() {
  const { 
    storageOptions, storageOptionsCRUD, 
    conditions, conditionsCRUD, 
    networks, networksCRUD,
    brands, brandsCRUD,
    categories, categoriesCRUD
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
  };

  const { label, items, crud, description } = tabConfig[tab];

  return (
    <AdminLayout title="Utilities" subtitle="Manage dropdown values used throughout the admin and frontend">
      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(Object.entries(tabConfig) as [Tab, typeof tabConfig[Tab]][]).map(([key, cfg]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${tab === key ? 'bg-red-600 text-white border-red-600 shadow-sm shadow-red-900/30' : 'bg-gray-900 border-gray-700 text-gray-400 hover:bg-gray-800'}`}
          >
            {cfg.label}
            <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${tab === key ? 'bg-white/20 text-white' : 'bg-gray-800 text-gray-500'}`}>
              {cfg.items.length}
            </span>
          </button>
        ))}
      </div>

      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        {/* Section header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <div>
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-red-500" />
              <h2 className="font-bold text-white">{label}</h2>
            </div>
            <p className="text-xs text-gray-600 mt-0.5">{description}</p>
          </div>
        </div>

        {/* Items list */}
        <UtilityList
          items={items}
          crud={crud}
        />
      </div>
    </AdminLayout>
  );
}

function UtilityList({ items, crud }: {
  items: UtilityItem[];
  crud: { add: (name: string) => void; update: (id: string, u: Partial<UtilityItem>) => void; remove: (id: string) => void };
}) {
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleAdd = () => {
    if (!newName.trim()) return;
    crud.add(newName.trim());
    setNewName('');
  };

  const startEdit = (item: UtilityItem) => {
    setEditingId(item.id);
    setEditName(item.name);
  };

  const saveEdit = (id: string) => {
    if (editName.trim()) crud.update(id, { name: editName.trim() });
    setEditingId(null);
  };

  return (
    <div>
      {/* Add new */}
      <div className="px-6 py-4 bg-gray-800/40 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <input
            value={newName}
            onChange={e => setNewName(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleAdd(); }}
            placeholder="Add new item..."
            className="flex-1 px-3 py-2 text-sm border border-gray-700 rounded-xl bg-gray-800 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
          />
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
        <div className="py-12 text-center text-gray-600">
          <p className="text-sm">No items yet. Add one above.</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-800">
          {items.map(item => (
            <div key={item.id} className={`flex items-center gap-3 px-6 py-3.5 hover:bg-gray-800/50 transition-colors group ${!item.isActive ? 'opacity-40' : ''}`}>
              <GripVertical className="w-4 h-4 text-gray-300 cursor-grab flex-shrink-0" />

              {editingId === item.id ? (
                <div className="flex items-center gap-2 flex-1">
                  <input
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') saveEdit(item.id); if (e.key === 'Escape') setEditingId(null); }}
                    autoFocus
                    className="flex-1 px-3 py-1.5 text-sm border border-red-500/50 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-500/30"
                  />
                  <button onClick={() => saveEdit(item.id)} className="p-1.5 rounded-lg text-emerald-400 hover:bg-emerald-500/10">
                    <Save className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setEditingId(null)} className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-700">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <>
                  <span className="flex-1 text-sm font-medium text-gray-200">{item.name}</span>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => crud.update(item.id, { isActive: !item.isActive })}
                      className={`p-1.5 rounded-lg transition-all ${item.isActive ? 'text-emerald-400 hover:bg-emerald-500/10' : 'text-gray-600 hover:bg-gray-700'}`}
                      title={item.isActive ? 'Deactivate' : 'Activate'}
                    >
                      {item.isActive ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                    </button>
                    <button onClick={() => startEdit(item)} className="p-1.5 rounded-lg text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => setConfirmDelete(item.id)} className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${item.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-800 text-gray-500'}`}>
                    {item.isActive ? 'Active' : 'Inactive'}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Footer count */}
      <div className="px-6 py-3 bg-gray-800/30 border-t border-gray-800 text-xs text-gray-600">
        {items.filter(i => i.isActive).length} active · {items.length} total
      </div>

      {/* Confirm Delete */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="font-bold text-white text-center mb-1">Delete Item?</h3>
            <p className="text-sm text-gray-500 text-center mb-5">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2.5 rounded-xl border border-gray-700 text-sm font-semibold text-gray-400 hover:bg-gray-800">Cancel</button>
              <button onClick={() => { crud.remove(confirmDelete); setConfirmDelete(null); }} className="flex-1 py-2.5 rounded-xl bg-red-600 text-sm font-semibold text-white hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
