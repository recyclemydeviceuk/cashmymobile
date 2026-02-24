import { useState } from 'react';
import {
  Globe, Send, CheckCircle2, XCircle, Clock, Copy,
  Shield, AlertCircle, RefreshCw, ChevronDown, ChevronUp,
  FileText, Zap,
} from 'lucide-react';
import AdminLayout from '../AdminLayout';
import { useAdmin } from '../AdminContext';

const SAMPLE_PAYLOAD = {
  customer_name: 'John Smith',
  customer_phone: '07700900123',
  customer_email: 'john@example.com',
  customer_address: '12 Baker Street, London, W1U 3BT',
  postage_method: 'label',
  payment_method: 'bank',
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
  const { apiLogs, processApiOrder } = useAdmin();
  const [payload, setPayload] = useState(JSON.stringify(SAMPLE_PAYLOAD, null, 2));
  const [result, setResult] = useState<{ success: boolean; orderId?: string; error?: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [payloadError, setPayloadError] = useState('');

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
    await new Promise(r => setTimeout(r, 600));
    const res = processApiOrder(parsed);
    setResult(res);
    setLoading(false);
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
          <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-800">
              <Globe className="w-4 h-4 text-red-500" />
              <h2 className="font-bold text-white">Integration Endpoint</h2>
            </div>
            <div className="p-5 space-y-4">
              {/* Method + path */}
              <div className="flex items-center gap-3 bg-gray-900 rounded-xl px-4 py-3">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-900/40 px-2 py-1 rounded-lg">POST</span>
                <code className="text-sm text-gray-200 flex-1">/decisiontech</code>
                <button
                  onClick={copyEndpoint}
                  className="text-gray-400 hover:text-white transition-colors"
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
                    ['payment_method', '"bank" | "paypal" | "cheque"', 'Payout method'],
                    ['device_name', 'string', 'Full device model name'],
                    ['network', 'string', '"Unlocked", "EE", etc.'],
                    ['offered_price', 'number', 'Price offered to customer'],
                    ['device_grade', '"NEW" | "GOOD" | "BROKEN"', 'Device condition'],
                  ].map(([field, type, desc]) => (
                    <div key={field} className="flex items-start gap-3 py-1.5 border-b border-gray-800 last:border-0">
                      <code className="text-xs font-mono text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded flex-shrink-0">{field}</code>
                      <span className="text-xs text-blue-400 font-mono flex-shrink-0">{type}</span>
                      <span className="text-xs text-gray-500">{desc}</span>
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
                    ['bank_name', 'string', 'Required if payment_method=bank'],
                    ['account_number', 'string', 'Required if payment_method=bank'],
                    ['sort_code', 'string', 'Required if payment_method=bank'],
                    ['paypal_email', 'string', 'Required if payment_method=paypal'],
                    ['cheque_name', 'string', 'Required if payment_method=cheque'],
                  ].map(([field, type, desc]) => (
                    <div key={field} className="flex items-start gap-3 py-1.5 border-b border-gray-800 last:border-0">
                      <code className="text-xs font-mono text-gray-400 bg-gray-800 px-1.5 py-0.5 rounded flex-shrink-0">{field}</code>
                      <span className="text-xs text-blue-400 font-mono flex-shrink-0">{type}</span>
                      <span className="text-xs text-gray-500">{desc}</span>
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
          <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-800">
              <Send className="w-4 h-4 text-purple-400" />
              <h2 className="font-bold text-white">Test API Order</h2>
              <span className="text-xs text-gray-600">(Writes into your order list)</span>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">JSON Payload</label>

                <textarea
                  value={payload}
                  onChange={e => setPayload(e.target.value)}
                  rows={14}
                  className={`w-full px-4 py-3 text-xs font-mono border rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 resize-none bg-gray-900 text-gray-200 ${payloadError ? 'border-red-500' : 'border-gray-700'}`}
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
                  className="px-3 py-2.5 border border-gray-700 rounded-xl text-sm text-gray-500 hover:bg-gray-800 transition-all"
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
                  {result.success && result.orderId && (
                    <p className="text-xs text-emerald-400 font-mono">Order ID: <strong>{result.orderId}</strong></p>
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

      {/* ── Request Logs ─────────────────────────────────────────────────── */}
      <div className="mt-6 bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-800">
          <FileText className="w-4 h-4 text-gray-500" />
          <h2 className="font-bold text-white">Request Logs</h2>
          <span className="text-xs text-gray-400">{apiLogs.length} total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead className="bg-gray-800/60 border-b border-gray-800">
              <tr>
                {['Timestamp', 'Source IP', 'Status', 'Order ID', 'Response Time', 'Error', 'Payload'].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {apiLogs.map(log => (
                <>
                  <tr key={log.id} className="hover:bg-gray-800/40 transition-colors">
                    <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap font-mono">
                      {new Date(log.timestamp).toLocaleString('en-GB')}
                    </td>
                    <td className="px-4 py-3 text-xs font-mono text-gray-400">{log.sourceIp}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${log.success ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                        {log.statusCode}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs font-mono text-red-400">{log.orderId || '—'}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{log.responseTime}ms</td>
                    <td className="px-4 py-3 text-xs text-red-400 max-w-[180px] truncate">{log.error || '—'}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                        className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
                      >
                        {expandedLog === log.id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        {expandedLog === log.id ? 'Hide' : 'View'}
                      </button>
                    </td>
                  </tr>
                  {expandedLog === log.id && (
                    <tr key={`${log.id}-expanded`} className="bg-gray-800/30">
                      <td colSpan={7} className="px-4 py-3">
                        <pre className="text-[11px] font-mono text-gray-400 whitespace-pre-wrap break-all bg-gray-900 border border-gray-700 rounded-xl p-3 max-h-48 overflow-y-auto">
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
    <div className="bg-gray-900 rounded-2xl border border-gray-800 p-4">
      <div className={`w-8 h-8 ${bg} rounded-xl flex items-center justify-center mb-3`}>{icon}</div>
      <p className="text-xl font-bold text-white">{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
    </div>
  );
}
