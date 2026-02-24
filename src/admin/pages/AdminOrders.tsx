import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Plus, Search, Filter, Download, Eye, Trash2,
  Package, ChevronDown, X,
} from 'lucide-react';
import AdminLayout from '../AdminLayout';
import { useAdmin } from '../AdminContext';
import {
  ORDER_STATUSES, ORDER_STATUS_COLORS, ORDER_STATUS_LABELS,
  PAYMENT_STATUS_LABELS,
  type Order, type OrderStatus, type PaymentStatus,
} from '../types';
import OrderModal from '../components/OrderModal';

export default function AdminOrders() {
  const { orders, deleteOrder, updateOrder } = useAdmin();
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | ''>(
    (searchParams.get('status') as OrderStatus) || ''
  );
  const [paymentFilter, setPaymentFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [statusUpdateOrder, setStatusUpdateOrder] = useState<Order | null>(null);

  const filtered = useMemo(() => {
    return orders.filter(o => {
      if (statusFilter && o.status !== statusFilter) return false;
      if (paymentFilter && o.paymentMethod !== paymentFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          o.orderId.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.customerEmail.toLowerCase().includes(q) ||
          o.customerPhone.includes(q) ||
          o.deviceName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [orders, search, statusFilter, paymentFilter]);

  const handleDelete = (id: string) => {
    deleteOrder(id);
    setConfirmDelete(null);
  };

  const exportCSV = () => {
    const headers = ['Order ID', 'Customer', 'Email', 'Phone', 'Device', 'Network', 'Grade', 'Storage', 'Offered £', 'Final £', 'Status', 'Source', 'Payment', 'Postage', 'Date'];
    const rows = filtered.map(o => [
      o.orderId, o.customerName, o.customerEmail, o.customerPhone,
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
    setStatusFilter(''); setPaymentFilter(''); setSearch('');
  };
  const hasFilters = statusFilter || paymentFilter || search;

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

  const bulkUpdateStatus = (status: OrderStatus) => {
    selectedOrders.forEach(id => {
      updateOrder(id, { status });
    });
    setSelectedOrders(new Set());
    setShowBulkActions(false);
  };

  const bulkUpdatePaymentStatus = (paymentStatus: PaymentStatus) => {
    selectedOrders.forEach(id => {
      updateOrder(id, { paymentStatus });
    });
    setSelectedOrders(new Set());
    setShowBulkActions(false);
  };

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
              className="pl-9 pr-4 py-2 text-sm border border-gray-700 rounded-xl bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 w-52"
            />
          </div>

          <button
            onClick={() => setShowFilters(v => !v)}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm border rounded-xl transition-all ${showFilters ? 'border-red-500 text-red-400 bg-red-500/10' : 'border-gray-700 text-gray-400 bg-gray-800 hover:bg-gray-700'}`}
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
          <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-700 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-400 transition-all">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button
            onClick={() => { setEditingOrder(null); setShowModal(true); }}
            className="flex items-center gap-1.5 px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Order
          </button>
        </div>
      </div>

      {/* ── Bulk Actions Bar ────────────────────────────────────────────── */}
      {showBulkActions && selectedOrders.size > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-4">
          <p className="text-xs font-bold text-amber-400 mb-3 uppercase tracking-wider">Bulk Update {selectedOrders.size} Order{selectedOrders.size > 1 ? 's' : ''}</p>
          <div className="flex flex-wrap gap-2">
            <div>
              <p className="text-xs text-gray-400 mb-2 font-semibold">Order Status</p>
              <div className="flex flex-wrap gap-1.5">
                {ORDER_STATUSES.slice(0, 6).map(s => (
                  <button
                    key={s}
                    onClick={() => bulkUpdateStatus(s)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${ORDER_STATUS_COLORS[s]} hover:opacity-80`}
                  >
                    {ORDER_STATUS_LABELS[s]}
                  </button>
                ))}
              </div>
            </div>
            <div className="ml-4">
              <p className="text-xs text-gray-400 mb-2 font-semibold">Payment Status</p>
              <div className="flex gap-1.5">
                <button
                  onClick={() => bulkUpdatePaymentStatus('PENDING')}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-amber-100 text-amber-700 hover:bg-amber-200 transition-all"
                >
                  Mark as Pending
                </button>
                <button
                  onClick={() => bulkUpdatePaymentStatus('PAID')}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-all"
                >
                  Mark as Paid
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Filter Bar ─────────────────────────────────────────────────── */}
      {showFilters && (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-4 flex flex-wrap gap-3">
          <SelectFilter label="Status" value={statusFilter} onChange={v => setStatusFilter(v as OrderStatus | '')}>
            <option value="">All Statuses</option>
            {ORDER_STATUSES.map(s => <option key={s} value={s}>{ORDER_STATUS_LABELS[s]}</option>)}
          </SelectFilter>
          <SelectFilter label="Payment" value={paymentFilter} onChange={v => setPaymentFilter(v)}>
            <option value="">All Payment Types</option>
            <option value="bank">Bank Transfer</option>
            <option value="paypal">PayPal</option>
            <option value="cheque">Cheque</option>
          </SelectFilter>
        </div>
      )}

      {/* ── Status Quick Filters ────────────────────────────────────────── */}
      <div className="flex gap-2 flex-wrap mb-4 overflow-x-auto pb-1">
        <QuickFilter active={!statusFilter} label="All" count={orders.length} onClick={() => setStatusFilter('')} />
        {ORDER_STATUSES.map(s => {
          const cnt = orders.filter(o => o.status === s).length;
          if (!cnt) return null;
          return <QuickFilter key={s} active={statusFilter === s} label={ORDER_STATUS_LABELS[s]} count={cnt} onClick={() => setStatusFilter(s)} color={ORDER_STATUS_COLORS[s]} />;
        })}
      </div>

      {/* ── Table ──────────────────────────────────────────────────────── */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center">
            <Package className="w-12 h-12 mx-auto text-gray-700 mb-3" />
            <p className="text-gray-500 font-medium">No orders found</p>
            <p className="text-sm text-gray-600 mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[900px]">
              <thead className="bg-gray-800/60 border-b border-gray-800">
                <tr>
                  <th className="text-left px-4 py-3 w-10">
                    <input
                      type="checkbox"
                      checked={selectedOrders.size === filtered.length && filtered.length > 0}
                      onChange={toggleAll}
                      className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-red-600 focus:ring-red-500 focus:ring-offset-gray-900 cursor-pointer"
                    />
                  </th>
                  {['Order ID', 'Customer', 'Device', 'Grade', '£ Offered', '£ Final', 'Status', 'Payment', 'Date', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filtered.map(o => (
                  <tr key={o.id} className={`hover:bg-gray-800/50 transition-colors ${selectedOrders.has(o.id) ? 'bg-red-500/5' : ''}`}>
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedOrders.has(o.id)}
                        onChange={() => toggleOrder(o.id)}
                        className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-red-600 focus:ring-red-500 focus:ring-offset-gray-900 cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Link to={`/admin-cashmymobile/orders/${o.id}`} className="font-semibold text-red-600 hover:text-red-700">{o.orderId}</Link>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-200">{o.customerName}</p>
                      <p className="text-xs text-gray-500">{o.customerPhone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-gray-300">{o.deviceName}</p>
                      <p className="text-xs text-gray-500">{o.storage} · {o.network}</p>
                    </td>
                    <td className="px-4 py-3">
                      <GradeBadge grade={o.deviceGrade} />
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-200">£{o.offeredPrice}</td>
                    <td className="px-4 py-3 font-bold text-emerald-400">
                      {o.finalPrice ? `£${o.finalPrice}` : <span className="text-gray-600">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${ORDER_STATUS_COLORS[o.status]}`}>
                        {ORDER_STATUS_LABELS[o.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${o.paymentStatus === 'PAID' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {PAYMENT_STATUS_LABELS[o.paymentStatus]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap text-xs">
                      {new Date(o.createdAt).toLocaleDateString('en-GB')}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Link to={`/admin-cashmymobile/orders/${o.id}`} className="p-1.5 rounded-lg text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all">
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setStatusUpdateOrder(o)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-orange-400 hover:bg-orange-500/10 transition-all"
                          title="Update status"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setConfirmDelete(o.id)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
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
      </div>

      {/* ── Confirm Delete Dialog ───────────────────────────────────────── */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="font-bold text-white text-center mb-1">Delete Order?</h3>
            <p className="text-sm text-gray-500 text-center mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 py-2.5 rounded-xl border border-gray-700 text-sm font-semibold text-gray-400 hover:bg-gray-800">Cancel</button>
              <button onClick={() => handleDelete(confirmDelete)} className="flex-1 py-2.5 rounded-xl bg-red-600 text-sm font-semibold text-white hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Status Update Modal ────────────────────────────────────────── */}
      {statusUpdateOrder && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <div>
                <h3 className="font-bold text-white">Update Order Status</h3>
                <p className="text-xs text-gray-500 mt-0.5">{statusUpdateOrder.orderId} • {statusUpdateOrder.customerName}</p>
              </div>
              <button onClick={() => setStatusUpdateOrder(null)} className="p-1 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-gray-800">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-4">
              <p className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Select New Status</p>
              <div className="grid grid-cols-2 gap-2">
                {ORDER_STATUSES.map(s => (
                  <button
                    key={s}
                    onClick={() => {
                      updateOrder(statusUpdateOrder.id, { status: s });
                      setStatusUpdateOrder(null);
                    }}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                      statusUpdateOrder.status === s
                        ? ORDER_STATUS_COLORS[s] + ' ring-2 ring-current'
                        : ORDER_STATUS_COLORS[s] + ' opacity-60 hover:opacity-100'
                    }`}
                  >
                    {ORDER_STATUS_LABELS[s]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Order Modal ─────────────────────────────────────────────────── */}
      {showModal && (
        <OrderModal
          order={editingOrder}
          onClose={() => { setShowModal(false); setEditingOrder(null); }}
        />
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
          className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-700 rounded-lg bg-gray-800 text-gray-300 focus:outline-none focus:border-red-500"
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
        active ? 'border-red-500 bg-red-500/10 text-red-400' : 'border-gray-700 bg-gray-800 text-gray-500 hover:bg-gray-700'
      }`}
    >
      {label}
      <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${active ? 'bg-red-500/20 text-red-400' : 'bg-gray-700 text-gray-500'}`}>
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
