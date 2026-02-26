import { useState } from 'react';
import {
  Globe, Send, CheckCircle2, XCircle, Clock, Copy,
  Shield, AlertCircle, RefreshCw, ChevronDown, ChevronUp,
  FileText, Zap, Plus, Trash2, Lock, Pencil, Check, X,
} from 'lucide-react';
import AdminLayout from '../AdminLayout';
import { useAdmin } from '../AdminContext';

const SAMPLE_PAYLOAD = {
  customer_name: 'John Smith',
  customer_phone: '03332244018',
  customer_email: 'john@example.com',
  customer_address: '12 Baker Street, London, W1U 3BT',
  postage_method: 'label',
  bank_name: 'Barclays',
  account_number: '12345678',
  sort_code: '20-00-00',
  device_id: 'd1',
  device_name: 'Apple iPhone 16 Pro Max',
  network: 'Unlocked',
  offered_price: 655,
  device_grade: 'GOOD',
  storage: '256GB',
  transaction_id: 'TXN-DEMO-001',
  source_ip: '185.23.10.45',
};

export default function AdminApiGateway() {
  const { apiLogs, processApiOrder, ipWhitelist, addIpToWhitelist, removeIpFromWhitelist, updateIpWhitelistEntry } = useAdmin();
  const [payload, setPayload] = useState(JSON.stringify(SAMPLE_PAYLOAD, null, 2));
  const [result, setResult] = useState<{ success: boolean; orderNumber?: string; error?: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [payloadError, setPayloadError] = useState('');
  // IP Whitelist state
  const [newIp, setNewIp] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [ipError, setIpError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editIp, setEditIp] = useState('');
  const [editLabel, setEditLabel] = useState('');
  const [confirmDeleteIp, setConfirmDeleteIp] = useState<string | null>(null);

  const isValidIp = (ip: string) => /^(\d{1,3}\.){3}\d{1,3}$/.test(ip.trim()) || /^[0-9a-fA-F:]+$/.test(ip.trim());

  const handleAddIp = async () => {
    setIpError('');
    if (!newIp.trim()) { setIpError('IP address is required'); return; }
    if (!isValidIp(newIp)) { setIpError('Enter a valid IPv4 or IPv6 address'); return; }
    if (ipWhitelist.some(e => e.ip === newIp.trim())) { setIpError('This IP is already whitelisted'); return; }
    try {
      await addIpToWhitelist(newIp.trim(), newLabel.trim() || newIp.trim());
      setNewIp('');
      setNewLabel('');
    } catch (error) {
      setIpError('Failed to add IP to whitelist');
    }
  };

  const handleEditSave = async (id: string) => {
    if (!editIp.trim() || !isValidIp(editIp)) return;
    try {
      await updateIpWhitelistEntry(id, { ip: editIp.trim(), label: editLabel.trim() || editIp.trim() });
      setEditingId(null);
    } catch (error) {
      console.error('Failed to update IP:', error);
    }
  };

  const handleSend = async () => {
    setPayloadError('');
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(payload);
    } catch {
      setPayloadError('Invalid JSON payload');
      return;
    }
    setLoading(true);
    try {
      const res = await processApiOrder(parsed);
      setResult(res);
    } catch (error) {
      setResult({ success: false, error: 'Failed to send request' });
    } finally {
      setLoading(false);
    }
  };

  const copyEndpoint = () => {
    navigator.clipboard.writeText('POST /decisiontech');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const successCount = apiLogs.filter(l => l.success).length;
  const errorCount = apiLogs.filter(l => !l.success).length;
  const avgResponse = apiLogs.length > 0
    ? Math.round(apiLogs.reduce((s, l) => s + l.responseTime, 0) / apiLogs.length)
    : 0;

  return (
    <AdminLayout title="API Gateway" subtitle="Integration endpoint for direct order placement from partners">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MiniStat icon={<Zap className="w-4 h-4 text-blue-400" />} bg="bg-blue-500/10" label="Total Requests" value={apiLogs.length} />
        <MiniStat icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />} bg="bg-emerald-500/10" label="Successful" value={successCount} />
        <MiniStat icon={<XCircle className="w-4 h-4 text-red-400" />} bg="bg-red-500/10" label="Failed" value={errorCount} />
        <MiniStat icon={<Clock className="w-4 h-4 text-orange-400" />} bg="bg-orange-500/10" label="Avg Response" value={`${avgResponse}ms`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── Left: Endpoint docs + Tester ─────────────────────────────── */}
        <div className="space-y-5">
          {/* Endpoint Info */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-200">
              <Globe className="w-4 h-4 text-red-500" />
              <h2 className="font-bold text-gray-900">Integration Endpoint</h2>
            </div>
            <div className="p-5 space-y-4">
              {/* Method + path */}
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg">POST</span>
                <code className="text-sm text-gray-900 flex-1">/decisiontech</code>
                <button
                  onClick={copyEndpoint}
                  className="text-gray-500 hover:text-gray-900 transition-colors"
                  title="Copy"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Required fields */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Required Fields</p>

                <div className="space-y-1">
                  {[
                    ['customer_phone', 'string', 'UK mobile number'],
                    ['customer_address', 'string', 'Full postal address'],
                    ['postage_method', '"label" | "postbag"', 'Shipping method'],
                    ['device_name', 'string', 'Full device model name'],
                    ['network', 'string', '"Unlocked", "EE", etc.'],
                    ['offered_price', 'number', 'Price offered to customer'],
                    ['device_grade', '"NEW" | "GOOD" | "BROKEN"', 'Device condition'],
                  ].map(([field, type, desc]) => (
                    <div key={field} className="flex items-start gap-3 py-1.5 border-b border-gray-200 last:border-0">
                      <code className="text-xs font-mono text-red-700 bg-red-50 px-1.5 py-0.5 rounded flex-shrink-0">{field}</code>
                      <span className="text-xs text-blue-700 font-mono flex-shrink-0">{type}</span>
                      <span className="text-xs text-gray-600">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Optional fields */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Optional Fields</p>
                <div className="space-y-1">
                  {[
                    ['customer_email', 'string', 'Customer email'],
                    ['transaction_id', 'string', 'Partner transaction reference'],
                    ['device_id', 'string', 'Your device catalogue ID'],
                    ['storage', 'string', 'Device storage capacity'],
                    ['bank_name', 'string', 'Customer bank name'],
                    ['account_number', 'string', 'Customer account number'],
                    ['sort_code', 'string', 'Customer sort code'],
                  ].map(([field, type, desc]) => (
                    <div key={field} className="flex items-start gap-3 py-1.5 border-b border-gray-200 last:border-0">
                      <code className="text-xs font-mono text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded flex-shrink-0">{field}</code>
                      <span className="text-xs text-blue-700 font-mono flex-shrink-0">{type}</span>
                      <span className="text-xs text-gray-600">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-amber-400 text-sm">Security Requirements</h3>
            </div>
            <ul className="space-y-1.5 text-xs text-amber-500">
              <li className="flex items-start gap-2"><span className="font-bold mt-0.5">•</span> HTTPS only — all HTTP connections will be rejected</li>
              <li className="flex items-start gap-2"><span className="font-bold mt-0.5">•</span> IP allowlist enforced — requests from unlisted IPs return 401</li>
              <li className="flex items-start gap-2"><span className="font-bold mt-0.5">•</span> Bank details encrypted at rest — never log raw payout data</li>
              <li className="flex items-start gap-2"><span className="font-bold mt-0.5">•</span> All requests are logged regardless of outcome</li>
              <li className="flex items-start gap-2"><span className="font-bold mt-0.5">•</span> Orders are accepted even if some optional fields are missing</li>
            </ul>
          </div>
        </div>

        {/* ── Right: Tester + Logs ──────────────────────────────────────── */}
        <div className="space-y-5">
          {/* API Tester */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-200">
              <Send className="w-4 h-4 text-purple-600" />
              <h2 className="font-bold text-gray-900">Test API Order</h2>
              <span className="text-xs text-gray-600">(Writes into your order list)</span>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">JSON Payload</label>

                <textarea
                  value={payload}
                  onChange={e => setPayload(e.target.value)}
                  rows={14}
                  className={`w-full px-4 py-3 text-xs font-mono border rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 resize-none bg-white text-gray-900 ${payloadError ? 'border-red-500' : 'border-gray-300'}`}
                  spellCheck={false}
                />
                {payloadError && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {payloadError}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSend}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition-all shadow-sm"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  {loading ? 'Processing...' : 'Send Request'}
                </button>
                <button
                  onClick={() => setPayload(JSON.stringify(SAMPLE_PAYLOAD, null, 2))}
                  className="px-3 py-2.5 border border-gray-300 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-all"
                  title="Reset to sample"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              {/* Result */}
              {result && (
                <div className={`rounded-xl p-4 border ${result.success ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {result.success
                      ? <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      : <XCircle className="w-4 h-4 text-red-400" />
                    }
                    <span className={`text-sm font-bold ${result.success ? 'text-emerald-400' : 'text-red-400'}`}>
                      {result.success ? 'Order Created Successfully' : 'Request Failed'}
                    </span>
                  </div>
                  {result.success && result.orderNumber && (
                    <p className="text-xs text-emerald-400 font-mono">Order Number: <strong>#{result.orderNumber}</strong></p>
                  )}
                  {!result.success && result.error && (
                    <p className="text-xs text-red-400">{result.error}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── IP Whitelist ──────────────────────────────────────────────────── */}
      <div className="mt-6 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-200">
          <Lock className="w-4 h-4 text-red-500" />
          <h2 className="font-bold text-gray-900">IP Whitelist</h2>
          <span className="text-xs text-gray-500">Only whitelisted IPs can send API requests</span>
          <span className="ml-auto bg-red-50 text-red-700 text-xs font-bold px-2.5 py-0.5 rounded-full">{ipWhitelist.length} allowed</span>
        </div>

        {/* Add new IP */}
        <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Add IP Address</p>
          <div className="flex flex-wrap gap-2">
            <div className="flex-1 min-w-[160px]">
              <input
                value={newIp}
                onChange={e => { setNewIp(e.target.value); setIpError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleAddIp()}
                placeholder="e.g. 185.23.10.45"
                className={`w-full px-3 py-2 text-sm border rounded-xl bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 font-mono ${ipError ? 'border-red-400' : 'border-gray-300'}`}
              />
            </div>
            <div className="flex-1 min-w-[160px]">
              <input
                value={newLabel}
                onChange={e => setNewLabel(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddIp()}
                placeholder="Label (e.g. Partner Server)"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              />
            </div>
            <button
              onClick={handleAddIp}
              className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add IP
            </button>
          </div>
          {ipError && (
            <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {ipError}
            </p>
          )}
        </div>

        {/* Whitelist table */}
        {ipWhitelist.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6 text-red-400" />
            </div>
            <p className="text-sm font-semibold text-gray-700">No IPs whitelisted</p>
            <p className="text-xs text-gray-500 mt-1">All API requests will be rejected until you add at least one IP</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {['IP Address', 'Label', 'Added', 'Actions'].map(h => (
                    <th key={h} className="text-left px-5 py-2.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ipWhitelist.map(entry => (
                  <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                    {editingId === entry.id ? (
                      <>
                        <td className="px-5 py-3">
                          <input
                            value={editIp}
                            onChange={e => setEditIp(e.target.value)}
                            className="px-2.5 py-1.5 text-xs font-mono border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 w-40"
                          />
                        </td>
                        <td className="px-5 py-3">
                          <input
                            value={editLabel}
                            onChange={e => setEditLabel(e.target.value)}
                            className="px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-red-500 w-48"
                          />
                        </td>
                        <td className="px-5 py-3 text-xs text-gray-500">{entry.addedAt}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEditSave(entry.id)}
                              className="flex items-center gap-1 px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-all"
                            >
                              <Check className="w-3.5 h-3.5" /> Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="flex items-center gap-1 px-2.5 py-1.5 border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs rounded-lg transition-all"
                            >
                              <X className="w-3.5 h-3.5" /> Cancel
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"></span>
                            <code className="text-xs font-mono text-gray-900 bg-gray-100 px-2 py-0.5 rounded">{entry.ip}</code>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-sm text-gray-700">{entry.label}</td>
                        <td className="px-5 py-3 text-xs text-gray-500">{entry.addedAt}</td>
                        <td className="px-5 py-3">
                          {confirmDeleteIp === entry.id ? (
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-red-600 font-semibold">Remove?</span>
                              <button
                                onClick={() => { removeIpFromWhitelist(entry.id); setConfirmDeleteIp(null); }}
                                className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-all"
                              >Yes</button>
                              <button
                                onClick={() => setConfirmDeleteIp(null)}
                                className="px-2.5 py-1 border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs rounded-lg transition-all"
                              >No</button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => { setEditingId(entry.id); setEditIp(entry.ip); setEditLabel(entry.label); }}
                                className="flex items-center gap-1 px-2.5 py-1.5 border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs rounded-lg transition-all"
                              >
                                <Pencil className="w-3 h-3" /> Edit
                              </button>
                              <button
                                onClick={() => setConfirmDeleteIp(entry.id)}
                                className="flex items-center gap-1 px-2.5 py-1.5 border border-red-200 hover:bg-red-50 text-red-600 text-xs rounded-lg transition-all"
                              >
                                <Trash2 className="w-3 h-3" /> Remove
                              </button>
                            </div>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Request Logs ─────────────────────────────────────────────────── */}
      <div className="mt-6 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-200">
          <FileText className="w-4 h-4 text-gray-600" />
          <h2 className="font-bold text-gray-900">Request Logs</h2>
          <span className="text-xs text-gray-600">{apiLogs.length} total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Timestamp', 'Source IP', 'Status', 'Order Number', 'Response Time', 'Error', 'Payload'].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-gray-600 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {apiLogs.map(log => (
                <>
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap font-mono">
                      {new Date(log.timestamp).toLocaleString('en-GB')}
                    </td>
                    <td className="px-4 py-3 text-xs font-mono text-gray-700">{log.sourceIp}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${log.success ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                        {log.statusCode}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-700">{log.orderNumber ? `#${log.orderNumber}` : '—'}</td>
                    <td className="px-4 py-3 text-xs text-gray-700">{log.responseTime}ms</td>
                    <td className="px-4 py-3 text-xs text-gray-700 max-w-[180px] truncate">{log.error || '—'}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                        className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
                      >
                        {expandedLog === log.id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        {expandedLog === log.id ? 'Hide' : 'View'}
                      </button>
                    </td>
                  </tr>
                  {expandedLog === log.id && (
                    <tr key={`${log.id}-expanded`} className="bg-gray-50">
                      <td colSpan={7} className="px-4 py-3">
                        <pre className="text-[11px] font-mono text-gray-600 whitespace-pre-wrap break-all bg-white border border-gray-300 rounded-xl p-3 max-h-48 overflow-y-auto">
                          {(() => { try { return JSON.stringify(JSON.parse(log.payload), null, 2); } catch { return log.payload; } })()}
                        </pre>
                      </td>
                    </tr>
                  )}
                </>
              ))}
              {apiLogs.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-gray-600 text-sm">
                    No API requests logged yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

function MiniStat({ icon, bg, label, value }: { icon: React.ReactNode; bg: string; label: string; value: string | number }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
      <div className={`w-8 h-8 ${bg} rounded-xl flex items-center justify-center mb-3`}>{icon}</div>
      <p className="text-xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-600 mt-0.5">{label}</p>
    </div>
  );
}
