import { useState, useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import { useAdmin } from '../AdminContext';
import {
  ORDER_STATUSES, ORDER_STATUS_LABELS,
  type Order, type OrderStatus, type PaymentMethod, type PostageMethod,
} from '../types';

interface Props {
  order: Order | null;
  onClose: () => void;
}

const EMPTY: Omit<Order, 'id' | 'orderId' | 'createdAt' | 'updatedAt'> = {
  source: 'WEBSITE',
  status: 'RECEIVED',
  customerName: '', customerPhone: '', customerEmail: '', customerAddress: '',
  deviceId: '', deviceName: '', network: '', deviceGrade: 'GOOD', storage: '',
  offeredPrice: 0, postageMethod: 'label', paymentMethod: 'bank',
  payoutDetails: {}, internalNotes: '',
};

export default function OrderModal({ order, onClose }: Props) {
  const { addOrder, updateOrder, devices, networks } = useAdmin();
  const [form, setForm] = useState<Omit<Order, 'id' | 'orderId' | 'createdAt' | 'updatedAt'>>(EMPTY);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (order) {
      const { id: _id, orderId: _oid, createdAt: _c, updatedAt: _u, ...rest } = order;
      setForm(rest);
    } else {
      setForm(EMPTY);
    }
  }, [order]);

  const set = (field: string, value: unknown) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const setPayout = (field: string, value: string) => {
    setForm(prev => ({ ...prev, payoutDetails: { ...prev.payoutDetails, [field]: value } }));
  };

  const validate = () => {
    const errs: string[] = [];
    if (!form.customerName.trim()) errs.push('Customer name is required');
    if (!form.customerPhone.trim()) errs.push('Phone number is required');
    if (!form.customerAddress.trim()) errs.push('Address is required');
    if (!form.deviceName.trim()) errs.push('Device name is required');
    if (!form.network.trim()) errs.push('Network is required');
    if (form.offeredPrice <= 0) errs.push('Offered price must be greater than 0');
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (errs.length > 0) { setErrors(errs); return; }
    setErrors([]);
    if (order) {
      updateOrder(order.id, form);
    } else {
      addOrder(form);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-start justify-center z-50 px-4 py-6 overflow-y-auto">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h2 className="font-bold text-white text-lg">
            {order ? `Edit Order — ${order.orderId}` : 'Add New Order'}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-gray-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Errors */}
          {errors.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 space-y-1">
              {errors.map(e => (
                <div key={e} className="flex items-center gap-2 text-sm text-red-400">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {e}
                </div>
              ))}
            </div>
          )}

          {/* Status & Source */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Status">
              <select value={form.status} onChange={e => set('status', e.target.value as OrderStatus)} className={inputCls}>
                {ORDER_STATUSES.map(s => <option key={s} value={s}>{ORDER_STATUS_LABELS[s]}</option>)}
              </select>
            </Field>
            <Field label="Source">
              <select value={form.source} onChange={e => set('source', e.target.value)} className={inputCls}>
                <option value="WEBSITE">Website</option>
                <option value="API">API</option>
              </select>
            </Field>
          </div>

          {/* Customer */}
          <div>
            <SectionTitle>Customer Details</SectionTitle>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Full Name *">
                <input value={form.customerName} onChange={e => set('customerName', e.target.value)} className={inputCls} placeholder="John Smith" />
              </Field>
              <Field label="Phone *">
                <input value={form.customerPhone} onChange={e => set('customerPhone', e.target.value)} className={inputCls} placeholder="07700900000" />
              </Field>
              <Field label="Email">
                <input type="email" value={form.customerEmail} onChange={e => set('customerEmail', e.target.value)} className={inputCls} placeholder="john@example.com" />
              </Field>
              <Field label="Address *">
                <input value={form.customerAddress} onChange={e => set('customerAddress', e.target.value)} className={inputCls} placeholder="12 Baker Street, London, W1U 3BT" />
              </Field>
            </div>
          </div>

          {/* Device */}
          <div>
            <SectionTitle>Device Details</SectionTitle>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Device Name *">
                <input
                  value={form.deviceName}
                  onChange={e => set('deviceName', e.target.value)}
                  list="device-list"
                  className={inputCls}
                  placeholder="Apple iPhone 16 Pro Max"
                />
                <datalist id="device-list">
                  {devices.map(d => <option key={d.id} value={d.fullName} />)}
                </datalist>
              </Field>
              <Field label="Network *">
                <input
                  value={form.network}
                  onChange={e => set('network', e.target.value)}
                  list="network-list"
                  className={inputCls}
                  placeholder="Unlocked"
                />
                <datalist id="network-list">
                  {networks.map(n => <option key={n.id} value={n.name} />)}
                </datalist>
              </Field>
              <Field label="Storage">
                <input value={form.storage} onChange={e => set('storage', e.target.value)} className={inputCls} placeholder="256GB" />
              </Field>
              <Field label="Grade">
                <select value={form.deviceGrade} onChange={e => set('deviceGrade', e.target.value)} className={inputCls}>
                  <option value="NEW">NEW — Mint condition</option>
                  <option value="GOOD">GOOD — Normal wear</option>
                  <option value="BROKEN">BROKEN — Faulty/damaged</option>
                </select>
              </Field>
              <Field label="Offered Price (£) *">
                <input type="number" min={0} step={0.01} value={form.offeredPrice || ''} onChange={e => set('offeredPrice', parseFloat(e.target.value) || 0)} className={inputCls} placeholder="0.00" />
              </Field>
              <Field label="Final Price (£)">
                <input type="number" min={0} step={0.01} value={form.finalPrice || ''} onChange={e => set('finalPrice', parseFloat(e.target.value) || undefined)} className={inputCls} placeholder="Leave blank if same as offered" />
              </Field>
            </div>
          </div>

          {/* Postage & Payment */}
          <div>
            <SectionTitle>Postage & Payment</SectionTitle>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Postage Method">
                <select value={form.postageMethod} onChange={e => set('postageMethod', e.target.value as PostageMethod)} className={inputCls}>
                  <option value="label">Label (customer prints)</option>
                  <option value="postbag">Postbag (we send pack)</option>
                </select>
              </Field>
              <Field label="Payment Method">
                <select value={form.paymentMethod} onChange={e => set('paymentMethod', e.target.value as PaymentMethod)} className={inputCls}>
                  <option value="bank">Bank Transfer</option>
                  <option value="paypal">PayPal</option>
                  <option value="cheque">Cheque</option>
                </select>
              </Field>
            </div>

            {/* Payout details */}
            <div className="mt-4 p-4 bg-gray-800/60 rounded-xl space-y-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Payout Details</p>
              {form.paymentMethod === 'bank' && (
                <div className="grid grid-cols-3 gap-3">
                  <Field label="Bank Name">
                    <input value={form.payoutDetails.bankName || ''} onChange={e => setPayout('bankName', e.target.value)} className={inputCls} placeholder="Barclays" />
                  </Field>
                  <Field label="Account Number">
                    <input value={form.payoutDetails.accountNumber || ''} onChange={e => setPayout('accountNumber', e.target.value)} className={inputCls} placeholder="12345678" />
                  </Field>
                  <Field label="Sort Code">
                    <input value={form.payoutDetails.sortCode || ''} onChange={e => setPayout('sortCode', e.target.value)} className={inputCls} placeholder="20-00-00" />
                  </Field>
                </div>
              )}
              {form.paymentMethod === 'paypal' && (
                <Field label="PayPal Email">
                  <input type="email" value={form.payoutDetails.paypalEmail || ''} onChange={e => setPayout('paypalEmail', e.target.value)} className={inputCls} placeholder="customer@paypal.com" />
                </Field>
              )}
              {form.paymentMethod === 'cheque' && (
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Payee Name">
                    <input value={form.payoutDetails.chequeName || ''} onChange={e => setPayout('chequeName', e.target.value)} className={inputCls} placeholder="John Smith" />
                  </Field>
                  <Field label="Cheque Address">
                    <input value={form.payoutDetails.chequeAddress || ''} onChange={e => setPayout('chequeAddress', e.target.value)} className={inputCls} placeholder="12 Baker St, London" />
                  </Field>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          <div>
            <SectionTitle>Internal Notes</SectionTitle>
            <textarea
              value={form.internalNotes}
              onChange={e => set('internalNotes', e.target.value)}
              rows={3}
              className={inputCls + ' resize-none'}
              placeholder="Internal notes visible to staff only..."
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-2 border-t border-gray-800">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl border border-gray-700 text-sm font-semibold text-gray-400 hover:bg-gray-800">
              Cancel
            </button>
            <button type="submit" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-sm font-semibold text-white transition-all shadow-sm">
              <Save className="w-4 h-4" />
              {order ? 'Save Changes' : 'Create Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputCls = 'w-full px-3 py-2 text-sm border border-gray-700 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-600 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-400">{label}</label>
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-bold text-gray-300 mb-3 pb-2 border-b border-gray-800">{children}</h3>;
}
