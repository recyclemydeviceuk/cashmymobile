import { useState, useMemo } from 'react';
import {
  Search, ChevronDown, ChevronUp, Save, Download,
  BarChart2, CheckCircle, DollarSign,
} from 'lucide-react';
import AdminLayout from '../AdminLayout';
import { useAdmin } from '../AdminContext';
import type { PricingEntry, UtilityItem } from '../types';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Condition name → field key */
const condToField: Record<string, 'gradeNew' | 'gradeGood' | 'gradeBroken'> = {
  'New / Mint': 'gradeNew',
  'Good': 'gradeGood',
  'Broken / Faulty': 'gradeBroken',
};

/** Condition name → badge colour */
const condColor: Record<string, string> = {
  'New / Mint': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  'Good': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  'Broken / Faulty': 'bg-red-500/15 text-red-400 border-red-500/30',
};

// ─── Types ────────────────────────────────────────────────────────────────────

/** Local price grid: storage → condition → price */
type PriceGrid = Record<string, Record<string, string>>;

// ─── Sub-component: Device Pricing Card ───────────────────────────────────────

function DeviceCard({
  device,
  entries,
  networks,
  storageOptions,
  conditions,
  onSave,
}: {
  device: { id: string; fullName: string; brand: string; category: string; imageUrl?: string };
  entries: PricingEntry[];
  networks: UtilityItem[];
  storageOptions: UtilityItem[];
  conditions: UtilityItem[];
  onSave: (deviceId: string, networks: string[], grid: PriceGrid) => void;
}) {
  const activeNetworks = networks.filter(n => n.isActive);
  const activeStorages = storageOptions.filter(s => s.isActive);
  const activeConditions = conditions.filter(c => c.isActive);

  const [expanded, setExpanded] = useState(false);
  // Multi-select: default to first network selected
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>(
    activeNetworks.length > 0 ? [activeNetworks[0].name] : []
  );
  const [dirty, setDirty] = useState(false);
  const [saved, setSaved] = useState(false);

  // Grid is keyed by the first selected network (preview), same prices apply to all selected
  const previewNetwork = selectedNetworks[0] || '';

  // Build initial grid from existing entries (using first selected network as preview)
  const buildGrid = (network: string): PriceGrid => {
    const grid: PriceGrid = {};
    for (const s of activeStorages) {
      grid[s.name] = {};
      for (const c of activeConditions) {
        const entry = entries.find(e => e.network === network && e.storage === s.name);
        const field = condToField[c.name];
        grid[s.name][c.name] = entry && field ? String(entry[field] ?? '') : '';
      }
    }
    return grid;
  };

  const [grid, setGrid] = useState<PriceGrid>(() => buildGrid(previewNetwork));

  const toggleNetwork = (name: string) => {
    setSelectedNetworks(prev => {
      if (prev.includes(name)) {
        // Don't allow deselecting all
        if (prev.length === 1) return prev;
        const next = prev.filter(n => n !== name);
        // Reload grid from new preview network
        setGrid(buildGrid(next[0]));
        return next;
      } else {
        const next = [...prev, name];
        // If only one was selected before, keep current grid (user is adding networks)
        return next;
      }
    });
    setDirty(false);
    setSaved(false);
  };

  const selectAll = () => {
    setSelectedNetworks(activeNetworks.map(n => n.name));
    setDirty(false);
    setSaved(false);
  };

  const setPrice = (storage: string, condition: string, val: string) => {
    setGrid(prev => ({
      ...prev,
      [storage]: { ...prev[storage], [condition]: val },
    }));
    setDirty(true);
    setSaved(false);
  };

  const handleSave = () => {
    onSave(device.id, selectedNetworks, grid);
    setDirty(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  // Count configured storages for this device
  const configuredCount = entries.filter(e => e.deviceId === device.id).length;

  return (
    <div className={`bg-gray-900 border rounded-2xl overflow-hidden transition-all ${expanded ? 'border-red-500/40' : 'border-gray-800 hover:border-gray-700'}`}>
      {/* Card Header */}
      <div
        className="flex items-center gap-4 px-5 py-4 cursor-pointer select-none"
        onClick={() => setExpanded(v => !v)}
      >
        {/* Device icon / image */}
        <div className="w-10 h-10 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {device.imageUrl ? (
            <img src={device.imageUrl} alt={device.fullName} className="w-8 h-8 object-contain" />
          ) : (
            <DollarSign className="w-5 h-5 text-gray-600" />
          )}
        </div>

        {/* Name + meta */}
        <div className="flex-1 min-w-0">
          <p className="font-bold text-white text-base truncate">{device.fullName}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-400">{device.brand}</span>
            {configuredCount > 0 && (
              <span className="flex items-center gap-1 text-xs text-emerald-400">
                <CheckCircle className="w-3 h-3" />
                {configuredCount} {configuredCount === 1 ? 'entry' : 'entries'} configured
              </span>
            )}
          </div>
        </div>

        {/* Configure button */}
        <button
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
            expanded
              ? 'border-red-500/50 bg-red-500/10 text-red-400'
              : 'border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600 hover:text-gray-300'
          }`}
          onClick={e => { e.stopPropagation(); setExpanded(v => !v); }}
        >
          Configure Pricing
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expanded Panel */}
      {expanded && (
        <div className="border-t border-gray-800 px-5 py-6">

          {/* Section title */}
          <div className="mb-5">
            <h3 className="text-sm font-semibold text-gray-200">Set Pricing by Condition &amp; Storage</h3>
            <p className="text-xs text-gray-500 mt-0.5">Select one or more networks — the prices below will apply to all selected networks</p>
          </div>

          {/* Network capsule multi-select */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Network</span>
              <button
                onClick={selectAll}
                className="text-xs text-red-400 hover:text-red-300 font-medium transition-colors"
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
                    onClick={() => toggleNetwork(n.name)}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 select-none ${
                      isSelected
                        ? 'bg-red-600 border-red-500 text-white shadow-md shadow-red-900/40'
                        : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {isSelected && (
                      <span className="mr-1 opacity-80">✓</span>
                    )}
                    {n.name}
                  </button>
                );
              })}
            </div>
            {selectedNetworks.length > 1 && (
              <p className="mt-2 text-xs text-amber-400/80 font-medium">
                ⚡ Prices will be saved to {selectedNetworks.length} networks: {selectedNetworks.join(', ')}
              </p>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 mb-5" />

          {/* Price Grid */}
          {activeStorages.length === 0 || activeConditions.length === 0 ? (
            <p className="text-sm text-gray-500 py-4 text-center">
              No active storage options or conditions. Configure them in <span className="text-red-400">Utilities</span>.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-separate" style={{ borderSpacing: '0 6px' }}>
                <thead>
                  <tr>
                    <th className="text-left pb-1 pr-6 text-xs font-semibold text-gray-500 uppercase tracking-wider min-w-[120px]">
                      Condition
                    </th>
                    {activeStorages.map(s => (
                      <th key={s.id} className="pb-1 px-2 text-center min-w-[140px]">
                        <span className="inline-block px-3 py-1 rounded-lg bg-gray-800 border border-gray-700 text-xs font-bold text-gray-300 uppercase tracking-wider">
                          {s.name}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {activeConditions.map(cond => (
                    <tr key={cond.id}>
                      <td className="py-1 pr-6">
                        <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold border ${
                          condColor[cond.name] || 'bg-gray-700/50 text-gray-400 border-gray-700'
                        }`}>
                          {cond.name}
                        </span>
                      </td>
                      {activeStorages.map(stor => (
                        <td key={stor.id} className="py-1 px-2">
                          <div className="flex items-center border border-gray-700/80 rounded-xl overflow-hidden transition-all duration-150 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20 hover:border-gray-500" style={{ backgroundColor: '#000' }}>
                            <span className="pl-3 pr-1.5 text-xs font-bold text-gray-500 select-none flex-shrink-0">£</span>
                            <input
                              type="number"
                              min={0}
                              placeholder="0"
                              value={grid[stor.name]?.[cond.name] ?? ''}
                              onChange={e => setPrice(stor.name, cond.name, e.target.value)}
                              className="w-full py-2.5 pr-3 text-white text-sm font-semibold placeholder-gray-600 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              style={{ backgroundColor: '#000', colorScheme: 'dark' }}
                            />
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between gap-3 mt-6 pt-5 border-t border-gray-800">
            <div className="flex items-center gap-2">
              {dirty && (
                <span className="flex items-center gap-1.5 text-xs text-amber-400 font-medium bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  Unsaved changes
                </span>
              )}
              {saved && !dirty && (
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
                  <CheckCircle className="w-3.5 h-3.5" /> Saved to {selectedNetworks.length} network{selectedNetworks.length > 1 ? 's' : ''}
                </span>
              )}
            </div>
            <button
              onClick={handleSave}
              disabled={!dirty}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                dirty
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/40'
                  : 'bg-gray-800 text-gray-600 cursor-not-allowed border border-gray-700'
              }`}
            >
              <Save className="w-4 h-4" /> Save This Device
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AdminPricing() {
  const {
    pricingEntries, addPricingEntry, updatePricingEntry,
    devices,
    networks, storageOptions, conditions,
  } = useAdmin();

  const [search, setSearch] = useState('');
  const [filterBrand, setFilterBrand] = useState('');

  const activeDevices = useMemo(
    () => devices.filter(d => d.isActive),
    [devices]
  );

  const brands = useMemo(
    () => [...new Set(activeDevices.map(d => d.brand))].sort(),
    [activeDevices]
  );

  const filteredDevices = useMemo(() => {
    return activeDevices.filter(d => {
      if (filterBrand && d.brand !== filterBrand) return false;
      if (search) {
        const q = search.toLowerCase();
        return d.fullName.toLowerCase().includes(q) || d.brand.toLowerCase().includes(q);
      }
      return true;
    });
  }, [activeDevices, search, filterBrand]);

  /** Save handler: convert grid back into PricingEntry rows for each selected network */
  const handleSaveDevice = (deviceId: string, selectedNetworksList: string[], grid: PriceGrid) => {
    const device = devices.find(d => d.id === deviceId);
    if (!device) return;

    // For each storage in grid, we need exactly ONE PricingEntry (device+network+storage)
    // that carries gradeNew/gradeGood/gradeBroken mapped from condition names
    const activeStorages = storageOptions.filter(s => s.isActive);
    const activeConditions = conditions.filter(c => c.isActive);

    // Build a condition→field map dynamically from current conditions
    // We match by known names, fallback by order (1st=New, 2nd=Good, 3rd=Broken)
    const getField = (condName: string, index: number): 'gradeNew' | 'gradeGood' | 'gradeBroken' => {
      if (condToField[condName]) return condToField[condName];
      const ordered: ('gradeNew' | 'gradeGood' | 'gradeBroken')[] = ['gradeNew', 'gradeGood', 'gradeBroken'];
      return ordered[index] ?? 'gradeNew';
    };

    for (const network of selectedNetworksList) {
      for (const stor of activeStorages) {
        const existingEntry = pricingEntries.find(
          e => e.deviceId === deviceId && e.network === network && e.storage === stor.name
        );

        const updates: Partial<PricingEntry> = {};
        activeConditions.forEach((cond, idx) => {
          const field = getField(cond.name, idx);
          const raw = grid[stor.name]?.[cond.name] ?? '';
          updates[field] = raw === '' ? 0 : parseFloat(raw) || 0;
        });

        if (existingEntry) {
          updatePricingEntry(existingEntry.id, updates);
        } else {
          const hasPrice = Object.values(updates).some(v => (v as number) > 0);
          if (hasPrice) {
            addPricingEntry({
              deviceId,
              deviceName: device.fullName,
              network,
              storage: stor.name,
              gradeNew: (updates.gradeNew as number) ?? 0,
              gradeGood: (updates.gradeGood as number) ?? 0,
              gradeBroken: (updates.gradeBroken as number) ?? 0,
              deeplink: '',
            });
          }
        }
      }
    }
  };

  // Export CSV
  const exportCSV = () => {
    const headers = ['Device', 'Network', 'Storage', 'Grade NEW (£)', 'Grade GOOD (£)', 'Grade BROKEN (£)', 'Updated'];
    const rows = pricingEntries.map(p => [
      p.deviceName, p.network, p.storage, p.gradeNew, p.gradeGood, p.gradeBroken, p.updatedAt,
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'pricing-feed.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminLayout
      title="Pricing Feed"
      subtitle="Configure device prices by network, storage & condition"
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by brand or model..."
              className="pl-9 pr-4 py-2 text-sm border border-gray-700 rounded-xl bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 w-56"
            />
          </div>

          {/* Brand filter */}
          <select
            value={filterBrand}
            onChange={e => setFilterBrand(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-700 rounded-xl bg-gray-800 text-gray-300 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
          >
            <option value="">All Brands</option>
            {brands.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          <span className="text-sm text-gray-500">{filteredDevices.length} devices</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-700 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-400 transition-all"
          >
            <Download className="w-4 h-4" /> Export Feed
          </button>
        </div>
      </div>

      {/* Device list */}
      {filteredDevices.length === 0 ? (
        <div className="py-20 text-center bg-gray-900 border border-gray-800 rounded-2xl">
          <BarChart2 className="w-12 h-12 mx-auto text-gray-700 mb-3" />
          <p className="text-gray-500 font-medium">No devices found</p>
          <p className="text-xs text-gray-600 mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredDevices.map(device => (
            <DeviceCard
              key={device.id}
              device={device}
              entries={pricingEntries.filter(e => e.deviceId === device.id)}
              networks={networks}
              storageOptions={storageOptions}
              conditions={conditions}
              onSave={handleSaveDevice}
            />
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
