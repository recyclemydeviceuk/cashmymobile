import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search, Filter, Download, Eye, Trash2,
  Package, ChevronDown, X, RefreshCw, Loader2,
} from 'lucide-react';
import AdminLayout from '../AdminLayout';
import { useAdmin } from '../AdminContext';
import type { Order, UtilityItem } from '../types';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';

function StatusBadge({ value, statuses, fallbackColor }: { value: string; statuses: UtilityItem[]; fallbackColor: string }) {
  const match = statuses.find(s => (s.value || s.name) === value);
  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${match?.color || fallbackColor}`}>
      {match?.name || value}
    </span>
  );
}

export default function AdminOrders() {
  const { orders, deleteOrder, updateOrder, fetchOrders, loadingOrders, loadMoreOrders, ordersHasMore, orderStatuses, paymentStatuses } = useAdmin();
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>(
    searchParams.get('status') || ''
  );
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [statusUpdateOrder, setStatusUpdateOrder] = useState<Order | null>(null);

  const filtered = useMemo(() => {
    return orders.filter(o => {
      if (statusFilter && o.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          o.orderNumber.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.customerEmail.toLowerCase().includes(q) ||
          o.customerPhone.includes(q) ||
          o.deviceName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [orders, search, statusFilter]);

  const handleDelete = (id: string) => {
    deleteOrder(id);
    setConfirmDelete(null);
  };

  const exportCSV = () => {
    const headers = ['Order Number', 'Customer', 'Email', 'Phone', 'Device', 'Network', 'Grade', 'Storage', 'Offered £', 'Final £', 'Status', 'Source', 'Payment', 'Postage', 'Date'];
    const rows = filtered.map(o => [
      o.orderNumber, o.customerName, o.customerEmail, o.customerPhone,
      o.deviceName, o.network, o.deviceGrade, o.storage,
      o.offeredPrice, o.finalPrice || '', o.status, o.source,
      o.paymentMethod, o.postageMethod,
      new Date(o.createdAt).toLocaleDateString('en-GB'),
    ]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'orders.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setStatusFilter(''); setSearch('');
  };
  const hasFilters = statusFilter || search;

  const toggleOrder = (id: string) => {
    const newSet = new Set(selectedOrders);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedOrders(newSet);
  };

  const toggleAll = () => {
    if (selectedOrders.size === filtered.length) {
      setSelectedOrders(new Set());
    } else {
      setSelectedOrders(new Set(filtered.map(o => o.id)));
    }
  };

  const bulkUpdateStatus = async (statusValue: string) => {
    await Promise.all(Array.from(selectedOrders).map(id => updateOrder(id, { status: statusValue as any })));
    setSelectedOrders(new Set());
    setShowBulkActions(false);
  };

  const sentinelRef = useInfiniteScroll({
    onLoadMore: loadMoreOrders,
    hasMore: ordersHasMore,
    loading: loadingOrders,
    threshold: 200,
  });

  return (
    <AdminLayout title="Orders" subtitle="Manage all incoming orders from website and API">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search orders..."
              className="pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 w-52"
            />
          </div>

          <button
            onClick={() => setShowFilters(v => !v)}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm border rounded-xl transition-all ${showFilters ? 'border-red-500 text-red-600 bg-red-50' : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'}`}
          >
            <Filter className="w-4 h-4" />
            Filters
            {hasFilters && <span className="w-2 h-2 bg-red-500 rounded-full" />}
          </button>

          {hasFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700">
              <X className="w-3.5 h-3.5" /> Clear
            </button>
          )}

          <span className="text-sm text-gray-500">{filtered.length} orders</span>
          {selectedOrders.size > 0 && (
            <span className="text-sm font-semibold text-red-400">{selectedOrders.size} selected</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {selectedOrders.size > 0 && (
            <button
              onClick={() => setShowBulkActions(v => !v)}
              className="flex items-center gap-1.5 px-4 py-2 text-sm bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold transition-all shadow-sm"
            >
              <ChevronDown className="w-4 h-4" /> Bulk Actions
            </button>
          )}
          <button
            onClick={() => fetchOrders()}
            disabled={loadingOrders}
            className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-300 rounded-xl bg-white hover:bg-gray-50 text-gray-700 transition-all disabled:opacity-50"
          >
            {loadingOrders ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            Refresh
          </button>
          <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-300 rounded-xl bg-white hover:bg-gray-50 text-gray-700 transition-all">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* ── Bulk Actions Bar ────────────────────────────────────────────── */}
      {showBulkActions && selectedOrders.size > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-4">
          <p className="text-xs font-bold text-amber-400 mb-3 uppercase tracking-wider">Bulk Update {selectedOrders.size} Order{selectedOrders.size > 1 ? 's' : ''}</p>
          <div className="flex flex-wrap gap-2">
            <div>
              <p className="text-xs text-gray-400 mb-2 font-semibold">Update Order Status</p>
              <div className="flex flex-wrap gap-1.5">
                {orderStatuses.filter(s => s.isActive).map(s => (
                  <button
                    key={s.id}
                    onClick={() => bulkUpdateStatus(s.value || s.name)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all hover:opacity-80 ${s.color || 'bg-gray-100 text-gray-700'}`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 italic mt-2">Payment status updates automatically based on order status</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Filter Bar ─────────────────────────────────────────────────── */}
      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4 flex flex-wrap gap-3 shadow-sm">
          <SelectFilter label="Status" value={statusFilter} onChange={v => setStatusFilter(v)}>
            <option value="">All Statuses</option>
            {orderStatuses.map(s => <option key={s.id} value={s.value || s.name}>{s.name}</option>)}
          </SelectFilter>
        </div>
      )}

      {/* ── Status Quick Filters ────────────────────────────────────────── */}
      <div className="flex gap-2 flex-wrap mb-4 overflow-x-auto pb-1">
        <QuickFilter active={!statusFilter} label="All" count={orders.length} onClick={() => setStatusFilter('')} />
        {orderStatuses.map(s => {
          const val = s.value || s.name;
          const cnt = orders.filter(o => o.status === val).length;
          if (!cnt) return null;
          return <QuickFilter key={s.id} active={statusFilter === val} label={s.name} count={cnt} onClick={() => setStatusFilter(val)} color={s.color} />;
        })}
      </div>

      {/* ── Table ──────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        {loadingOrders ? (
          <div className="py-16 text-center">
            <Loader2 className="w-10 h-10 mx-auto text-red-500 animate-spin mb-3" />
            <p className="text-gray-500 font-medium">Loading orders...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <Package className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500 font-medium">No orders found</p>
            <p className="text-sm text-gray-600 mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[900px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 w-10">
                    <input
                      type="checkbox"
                      checked={selectedOrders.size === filtered.length && filtered.length > 0}
                      onChange={toggleAll}
                      className="w-4 h-4 rounded border-gray-300 bg-white text-red-600 focus:ring-red-500 cursor-pointer"
                    />
                  </th>
                  {['Order Number', 'Customer', 'Device', 'Grade', '£ Offered', 'Source', 'Status', 'Payment', 'Date', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filtered.map(o => (
                  <tr key={o.id} className={`hover:bg-gray-50 transition-colors ${selectedOrders.has(o.id) ? 'bg-red-50' : ''}`}>
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedOrders.has(o.id)}
                        onChange={() => toggleOrder(o.id)}
                        className="w-4 h-4 rounded border-gray-300 bg-white text-red-600 focus:ring-red-500 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Link to={`/admin-cashmymobile/orders/${o.id}`} className="font-semibold text-red-600 hover:text-red-700">#{o.orderNumber}</Link>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{o.customerName}</p>
                      <p className="text-xs text-gray-600">{o.customerPhone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-gray-900">{o.deviceName}</p>
                      <p className="text-xs text-gray-600">{o.storage} · {o.network}</p>
                    </td>
                    <td className="px-4 py-3">
                      <GradeBadge grade={o.deviceGrade} />
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-900">£{o.offeredPrice}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${o.source === 'API' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                        {o.source}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge value={o.status} statuses={orderStatuses} fallbackColor="bg-gray-100 text-gray-700" />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge value={o.paymentStatus} statuses={paymentStatuses} fallbackColor="bg-amber-100 text-amber-700" />
                    </td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap text-xs">
                      {new Date(o.createdAt).toLocaleDateString('en-GB')}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Link to={`/admin-cashmymobile/orders/${o.id}`} className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setStatusUpdateOrder(o)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-orange-600 hover:bg-orange-50 transition-all"
                          title="Update status"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setConfirmDelete(o.id)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Infinite Scroll Sentinel */}
        {!loadingOrders && filtered.length > 0 && (
          <div ref={sentinelRef} className="h-20 flex items-center justify-center border-t border-gray-200">
            {ordersHasMore && (
              <div className="flex items-center gap-2 text-gray-500">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm">Loading more...</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Confirm Delete Dialog ───────────────────────────────────────── */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="font-bold text-gray-900 text-center mb-1">Delete Order?</h3>
            <p className="text-sm text-gray-600 text-center mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={() => handleDelete(confirmDelete)} className="flex-1 py-2.5 rounded-xl bg-red-600 text-sm font-semibold text-white hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Status Update Modal ────────────────────────────────────────── */}
      {statusUpdateOrder && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <h3 className="font-bold text-gray-900">Update Order Status</h3>
                <p className="text-xs text-gray-500 mt-0.5">#{statusUpdateOrder.orderNumber} • {statusUpdateOrder.customerName}</p>
              </div>
              <button onClick={() => setStatusUpdateOrder(null)} className="p-1 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-4">
              <p className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Select New Status</p>
              <div className="grid grid-cols-2 gap-2">
                {orderStatuses.filter(s => s.isActive).map(s => {
                  const val = s.value || s.name;
                  const isActive = statusUpdateOrder.status === val;
                  return (
                    <button
                      key={s.id}
                      onClick={() => {
                        updateOrder(statusUpdateOrder.id, { status: val as any });
                        setStatusUpdateOrder(null);
                      }}
                      className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${s.color || 'bg-gray-100 text-gray-700'} ${isActive ? 'ring-2 ring-current' : 'opacity-60 hover:opacity-100'}`}
                    >
                      {s.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

function SelectFilter({ label, value, onChange, children }: { label: string; value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-red-500"
        >
          {children}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}

function QuickFilter({ active, label, count, onClick }: { active: boolean; label: string; count: number; onClick: () => void; color?: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
        active ? 'border-red-500 bg-red-50 text-red-600' : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
      }`}
    >
      {label}
      <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${active ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
        {count}
      </span>
    </button>
  );
}

function GradeBadge({ grade }: { grade: string }) {
  const map: Record<string, string> = {
    NEW: 'bg-emerald-100 text-emerald-700',
    GOOD: 'bg-blue-100 text-blue-700',
    BROKEN: 'bg-red-100 text-red-700',
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${map[grade] || 'bg-gray-100 text-gray-600'}`}>
      {grade}
    </span>
  );
}
