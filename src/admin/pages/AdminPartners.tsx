import { useState, useEffect } from 'react';
import {
  Plus, Copy, RefreshCw, Trash2, CheckCircle2,
  XCircle, Key, Building2, AlertTriangle,
  ShieldCheck, Clock, Package,
} from 'lucide-react';
import AdminLayout from '../AdminLayout';
import { useAdmin } from '../AdminContext';
import type { Partner } from '../types';

export default function AdminPartners() {
  const {
    partners, loadingPartners, fetchPartners,
    createPartner, regeneratePartnerKey, togglePartner, deletePartner,
  } = useAdmin();

  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState('');

  const [revealedKey, setRevealedKey] = useState<{ id: string; key: string; name: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [regeneratingId, setRegeneratingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  const handleCreate = async () => {
    if (!newName.trim()) {
      setCreateError('Partner name is required');
      return;
    }
    setCreateError('');
    setCreating(true);
    try {
      const res = await createPartner(newName.trim());
      if (res.success && res.data?.apiKey) {
        setRevealedKey({ id: 'new', key: res.data.apiKey, name: newName.trim() });
        setNewName('');
      } else {
        setCreateError((res as any).error || 'Failed to create partner');
      }
    } catch (err: any) {
      setCreateError(err?.response?.data?.error || 'Failed to create partner');
    } finally {
      setCreating(false);
    }
  };

  const handleRegenerate = async (partner: Partner) => {
    setRegeneratingId(partner.id);
    try {
      const res = await regeneratePartnerKey(partner.id);
      if (res.success && res.data?.apiKey) {
        setRevealedKey({ id: partner.id, key: res.data.apiKey, name: partner.name });
      }
    } finally {
      setRegeneratingId(null);
    }
  };

  const handleToggle = async (id: string) => {
    setTogglingId(id);
    try {
      await togglePartner(id);
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    await deletePartner(id);
    setConfirmDelete(null);
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AdminLayout title="Partner Keys" subtitle="Manage API keys for external partners">

      {/* ── Revealed Key Modal ─────────────────────────────────────────────── */}
      {revealedKey && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">API Key Generated</h2>
                <p className="text-sm text-gray-500">For partner: <span className="font-semibold text-gray-700">{revealedKey.name}</span></p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 font-medium">
                This key will only be shown once. Copy it now and send it securely to your partner. It cannot be retrieved again.
              </p>
            </div>

            <div className="bg-gray-900 rounded-xl p-4 mb-4 flex items-center gap-3">
              <code className="text-emerald-400 text-sm font-mono flex-1 break-all leading-relaxed">
                {revealedKey.key}
              </code>
              <button
                onClick={() => copyKey(revealedKey.key)}
                className="flex-shrink-0 flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-3 mb-4 text-xs text-gray-600">
              <p className="font-semibold text-gray-700 mb-1">Partner must send in every request:</p>
              <code className="font-mono">X-Partner-Key: {revealedKey.key}</code>
            </div>

            <button
              onClick={() => setRevealedKey(null)}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 rounded-xl transition-all"
            >
              I've copied the key — Done
            </button>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ───────────────────────────────────────────── */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="font-bold text-gray-900 text-center mb-2">Delete Partner?</h3>
            <p className="text-sm text-gray-500 text-center mb-5">
              Their API key will be immediately invalidated. Any in-flight requests will fail.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Create New Partner ─────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-red-50 rounded-xl flex items-center justify-center">
            <Plus className="w-4 h-4 text-red-600" />
          </div>
          <h2 className="font-bold text-gray-900">Add New Partner</h2>
        </div>
        <div className="flex gap-3 items-start">
          <div className="flex-1">
            <input
              type="text"
              value={newName}
              onChange={e => { setNewName(e.target.value); setCreateError(''); }}
              onKeyDown={e => e.key === 'Enter' && handleCreate()}
              placeholder="e.g. DecisionTech, PhoneRecycler Ltd"
              className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ${createError ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
            />
            {createError && <p className="text-red-600 text-xs mt-1.5 font-medium">{createError}</p>}
          </div>
          <button
            onClick={handleCreate}
            disabled={creating}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold px-5 py-2.5 rounded-xl transition-all text-sm whitespace-nowrap"
          >
            {creating ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Key className="w-4 h-4" />
            )}
            {creating ? 'Generating...' : 'Generate Key'}
          </button>
        </div>
      </div>

      {/* ── Partner List ───────────────────────────────────────────────────── */}
      {loadingPartners ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      ) : partners.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <Building2 className="w-10 h-10 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">No partners yet</p>
          <p className="text-gray-400 text-sm mt-1">Add your first partner above to generate an API key</p>
        </div>
      ) : (
        <div className="space-y-3">
          {partners.map(partner => (
            <PartnerCard
              key={partner.id}
              partner={partner}
              onRegenerate={() => handleRegenerate(partner)}
              onToggle={() => handleToggle(partner.id)}
              onDelete={() => setConfirmDelete(partner.id)}
              regenerating={regeneratingId === partner.id}
              toggling={togglingId === partner.id}
            />
          ))}
        </div>
      )}

      {/* ── How It Works ──────────────────────────────────────────────────── */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <h3 className="font-bold text-blue-900 text-sm">How Partner Keys Work</h3>
        </div>
        <ul className="space-y-1.5 text-xs text-blue-700">
          <li className="flex items-start gap-2"><span className="font-bold mt-0.5">•</span> Partner must send <code className="bg-blue-100 px-1 rounded font-mono">X-Partner-Key: &lt;key&gt;</code> header with every request to <code className="bg-blue-100 px-1 rounded font-mono">/api/gateway/decisiontech</code></li>
          <li className="flex items-start gap-2"><span className="font-bold mt-0.5">•</span> Keys are hashed with SHA-256 — the plain key is never stored, only shown once on creation</li>
          <li className="flex items-start gap-2"><span className="font-bold mt-0.5">•</span> Regenerating a key immediately invalidates the old one</li>
          <li className="flex items-start gap-2"><span className="font-bold mt-0.5">•</span> Disabling a partner blocks all their requests without deleting their record</li>
          <li className="flex items-start gap-2"><span className="font-bold mt-0.5">•</span> Each order created via partner key will show the partner's name in the order details</li>
        </ul>
      </div>
    </AdminLayout>
  );
}

function PartnerCard({
  partner, onRegenerate, onToggle, onDelete, regenerating, toggling,
}: {
  partner: Partner;
  onRegenerate: () => void;
  onToggle: () => void;
  onDelete: () => void;
  regenerating: boolean;
  toggling: boolean;
}) {
  return (
    <div className={`bg-white rounded-2xl border shadow-sm p-5 transition-all ${partner.isActive ? 'border-gray-200' : 'border-gray-100 opacity-75'}`}>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        {/* Left: Partner info */}
        <div className="flex items-start gap-3 min-w-0">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${partner.isActive ? 'bg-emerald-100' : 'bg-gray-100'}`}>
            <Building2 className={`w-5 h-5 ${partner.isActive ? 'text-emerald-600' : 'text-gray-400'}`} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-gray-900 text-sm">{partner.name}</h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${partner.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                {partner.isActive ? 'Active' : 'Disabled'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <Key className="w-3 h-3 text-gray-400" />
              <code className="text-xs text-gray-500 font-mono">{partner.keyPrefix}</code>
            </div>
            <div className="flex items-center gap-4 mt-2 flex-wrap">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Package className="w-3 h-3" />
                <span>{partner.totalOrders} orders</span>
              </div>
              {partner.lastUsedAt && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>Last used {new Date(partner.lastUsedAt).toLocaleDateString('en-GB')}</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <span>Added {new Date(partner.createdAt).toLocaleDateString('en-GB')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Regenerate */}
          <button
            onClick={onRegenerate}
            disabled={regenerating}
            title="Regenerate API key"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-semibold transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${regenerating ? 'animate-spin' : ''}`} />
            Regenerate
          </button>

          {/* Enable/Disable */}
          <button
            onClick={onToggle}
            disabled={toggling}
            title={partner.isActive ? 'Disable partner' : 'Enable partner'}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all disabled:opacity-50 ${
              partner.isActive
                ? 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700'
                : 'border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
            }`}
          >
            {toggling ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : partner.isActive ? (
              <XCircle className="w-3.5 h-3.5" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5" />
            )}
            {partner.isActive ? 'Disable' : 'Enable'}
          </button>

          {/* Delete */}
          <button
            onClick={onDelete}
            title="Delete partner"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
