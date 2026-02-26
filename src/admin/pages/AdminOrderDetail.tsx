import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, Edit2, Save, X, Package, User, Smartphone,
  CreditCard, Truck, Clock, CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import AdminLayout from '../AdminLayout';
import { useAdmin } from '../AdminContext';
import type { UtilityItem } from '../types';

function StatusBadge({ value, statuses, fallbackColor }: { value: string; statuses: UtilityItem[]; fallbackColor: string }) {
  const match = statuses.find(s => (s.value || s.name) === value);
  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${match?.color || fallbackColor}`}>
      {match?.name || value}
    </span>
  );
}

export default function AdminOrderDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { orders, updateOrder, updateOrderStatus, orderStatuses, paymentStatuses } = useAdmin();

  const order = orders.find(o => o.id === id);

  const [editFinalPrice, setEditFinalPrice] = useState(false);
  const [finalPrice, setFinalPrice] = useState(String(order?.finalPrice || order?.offeredPrice || ''));
  const [priceRevisionReason, setPriceRevisionReason] = useState(order?.priceRevisionReason || '');
  const [showReasonModal, setShowReasonModal] = useState(false);

  // Sync state with order updates after refetch
  useEffect(() => {
    if (order) {
      setFinalPrice(String(order.finalPrice || order.offeredPrice || ''));
      setPriceRevisionReason(order.priceRevisionReason || '');
    }
  }, [order?.finalPrice, order?.offeredPrice, order?.priceRevisionReason]);

  if (!order) {
    return (
      <AdminLayout title="Order Not Found">
        <div className="text-center py-16">
          <Package className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">Order not found</p>
          <Link to="/admin-cashmymobile/orders" className="text-sm text-red-600 hover:underline mt-2 inline-block">
            Back to orders
          </Link>
        </div>
      </AdminLayout>
    );
  }

  // Get active statuses in sort order for the progress timeline
  const statusFlow = orderStatuses.filter(s => s.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
  const currentStatusIdx = statusFlow.findIndex(s => (s.value || s.name) === order.status);
  const lastStatusValue = statusFlow[statusFlow.length - 1]?.value || statusFlow[statusFlow.length - 1]?.name || '';
  const isTerminal = order.status === lastStatusValue || order.status === 'CANCELLED';

  const handleStatusChange = (statusValue: string) => {
    updateOrderStatus(order.id, statusValue);
  };

  const saveFinalPrice = async () => {
    const p = parseFloat(finalPrice);
    if (!isNaN(p) && p > 0) {
      // If price is being reduced, require reason
      if (p < (order.offeredPrice || 0)) {
        setShowReasonModal(true);
      } else {
        try {
          await updateOrder(order.id, { finalPrice: p });
          setEditFinalPrice(false);
        } catch (error) {
          console.error('Failed to update price:', error);
        }
      }
    }
  };

  const confirmPriceRevision = async () => {
    const p = parseFloat(finalPrice);
    if (!isNaN(p) && p > 0 && priceRevisionReason.trim()) {
      try {
        await updateOrder(order.id, { finalPrice: p, priceRevisionReason: priceRevisionReason.trim() });
        setEditFinalPrice(false);
        setShowReasonModal(false);
        setPriceRevisionReason(''); // Reset after successful update
      } catch (error) {
        console.error('Failed to update price with revision:', error);
      }
    }
  };

  return (
    <AdminLayout title={`Order #${order.orderNumber}`} subtitle={`Created ${new Date(order.createdAt).toLocaleString('en-GB')}`}>
      {/* Back + Actions */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Orders
        </button>
        <div className="flex items-center gap-2">
          <StatusBadge value={order.status} statuses={orderStatuses} fallbackColor="bg-gray-100 text-gray-700" />
          {order.source === 'API' && (
            <span className="text-sm font-semibold px-3 py-1.5 rounded-full bg-purple-100 text-purple-700">API Order</span>
          )}
        </div>
      </div>

      {/* ── Status Timeline ───────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-5 overflow-x-auto shadow-sm">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Order Progress</h3>
        <div className="flex items-center gap-1 min-w-max">
          {statusFlow.map((s, i) => {
            const statusValue = s.value || s.name;
            const done = i <= currentStatusIdx && !isTerminal;
            const active = statusValue === order.status;
            return (
              <div key={s.id} className="flex items-center">
                <button
                  onClick={() => handleStatusChange(statusValue)}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all text-center
                    ${active ? 'bg-red-600 text-white shadow-md' : done ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                  `}
                >
                  {active ? (
                    <Clock className="w-4 h-4" />
                  ) : done ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-current" />
                  )}
                  <span className="text-[10px] font-semibold leading-tight max-w-[80px] text-center">
                    {s.name}
                  </span>
                </button>
                {i < statusFlow.length - 1 && (
                  <div className={`w-6 h-0.5 flex-shrink-0 ${i < currentStatusIdx && !isTerminal ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Main Grid ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Customer + Device + Postage */}
        <div className="lg:col-span-2 space-y-5">
          {/* Customer */}
          <InfoCard icon={<User className="w-4 h-4 text-blue-600" />} title="Customer Details">
            <Row label="Name" value={order.customerName} />
            <Row label="Phone" value={order.customerPhone} />
            <Row label="Email" value={order.customerEmail || '—'} />
            <Row label="Address" value={order.customerAddress} />
          </InfoCard>

          {/* Device */}
          <InfoCard icon={<Smartphone className="w-4 h-4 text-orange-600" />} title="Device Details">
            <Row label="Device" value={order.deviceName} />
            <Row label="Network" value={order.network} />
            <Row label="Storage" value={order.storage || '—'} />
            <Row label="Grade" value={
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                order.deviceGrade === 'NEW' ? 'bg-emerald-100 text-emerald-700' :
                order.deviceGrade === 'GOOD' ? 'bg-blue-100 text-blue-700' :
                'bg-red-100 text-red-700'
              }`}>{order.deviceGrade}</span>
            } />
            <div className="grid grid-cols-2 gap-4 pt-2 mt-2 border-t border-gray-200">
              <div>
                <p className="text-xs text-gray-600 mb-1">Offered Price</p>
                <p className="text-2xl font-bold text-gray-900">£{order.offeredPrice}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Final Price
                  <button onClick={() => setEditFinalPrice(v => !v)} className="ml-1 text-red-500 hover:text-red-700">
                    <Edit2 className="w-3 h-3 inline" />
                  </button>
                </p>
                {editFinalPrice ? (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">£</span>
                    <input
                      type="number" value={finalPrice}
                      onChange={e => setFinalPrice(e.target.value)}
                      className="w-24 px-2 py-1 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500/30"
                    />
                    <button onClick={saveFinalPrice} className="p-1 text-emerald-600 hover:text-emerald-700"><Save className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setEditFinalPrice(false)} className="p-1 text-gray-600 hover:text-gray-900"><X className="w-3.5 h-3.5" /></button>
                  </div>
                ) : (
                  <p className={`text-2xl font-bold ${order.finalPrice && order.finalPrice < order.offeredPrice ? 'text-orange-600' : 'text-emerald-600'}`}>
                    £{order.finalPrice || order.offeredPrice}
                    {order.finalPrice && order.finalPrice < order.offeredPrice && (
                      <span className="text-sm font-normal text-orange-600 ml-1">revised</span>
                    )}
                  </p>
                )}
              </div>
            </div>
          </InfoCard>

          {/* Postage */}
          <InfoCard icon={<Truck className="w-4 h-4 text-purple-600" />} title="Postage">
            <Row label="Method" value={
              <div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${order.postageMethod === 'label' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                  {order.postageMethod === 'label' ? 'Label (customer prints)' : 'Postbag (we send pack)'}
                </span>
                {order.postageMethod === 'postbag' && order.status === 'PENDING' && (
                  <div className="mt-2 text-xs text-orange-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Action required: Send postbag to customer
                  </div>
                )}
              </div>
            } />
          </InfoCard>

          {/* Price Revision Reason */}
          {order.priceRevisionReason && (
            <InfoCard icon={<AlertCircle className="w-4 h-4 text-amber-600" />} title="Price Revision Reason">
              <p className="text-sm text-gray-700">{order.priceRevisionReason}</p>
            </InfoCard>
          )}
        </div>

        {/* Right: Payment + Notes + Request Log */}
        <div className="space-y-5">
          {/* Payment */}
          <InfoCard icon={<CreditCard className="w-4 h-4 text-emerald-600" />} title="Payment Details">
            <Row label="Status" value={
              <StatusBadge value={order.paymentStatus} statuses={paymentStatuses} fallbackColor="bg-amber-100 text-amber-700" />
            } />
            <Row label="Method" value={
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">Bank Transfer</span>
            } />
            <Row label="Bank" value={order.payoutDetails.bankName} />
            <Row label="Account" value={order.payoutDetails.accountNumber} />
            <Row label="Sort Code" value={order.payoutDetails.sortCode} />
            {order.transactionId && (
              <Row label="Transaction ID" value={order.transactionId} mono />
            )}
            <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-500 italic">
              Payment status updates automatically when order is marked as Completed
            </div>
          </InfoCard>

          {/* Metadata */}
          <InfoCard icon={<Clock className="w-4 h-4 text-gray-600" />} title="Metadata">
            <Row label="Order Number" value={`#${order.orderNumber}`} mono />
            <Row label="Source" value={order.source} />
            <Row label="Created" value={new Date(order.createdAt).toLocaleString('en-GB')} />
            <Row label="Updated" value={new Date(order.updatedAt).toLocaleString('en-GB')} />
          </InfoCard>
        </div>
      </div>

      {/* Price Revision Reason Modal */}
      {showReasonModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-900">Price Revision Reason</h3>
              <button onClick={() => setShowReasonModal(false)} className="p-1 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">New final price: <span className="text-orange-600 font-bold">£{finalPrice}</span></p>
                <p className="text-sm text-gray-600">Original offer: <span className="text-gray-900 font-bold">£{order.offeredPrice}</span></p>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-2">Reason for price reduction *</label>
                <textarea
                  value={priceRevisionReason}
                  onChange={e => setPriceRevisionReason(e.target.value)}
                  rows={4}
                  placeholder="E.g., Screen damage found during inspection..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={() => setShowReasonModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmPriceRevision}
                disabled={!priceRevisionReason.trim()}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Revision
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

function InfoCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-200">
        <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center">{icon}</div>
        <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
      </div>
      <div className="px-5 py-4 space-y-2.5">{children}</div>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: React.ReactNode; mono?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs text-gray-600 flex-shrink-0 mt-0.5">{label}</span>
      <span className={`text-sm text-right text-gray-900 break-all ${mono ? 'font-mono text-xs text-gray-700' : 'font-medium'}`}>
        {value}
      </span>
    </div>
  );
}
