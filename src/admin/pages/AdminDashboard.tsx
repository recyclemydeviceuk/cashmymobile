import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Package, Smartphone, TrendingUp, Clock, CheckCircle2,
  AlertCircle, ArrowRight, Globe, Banknote, XCircle,
} from 'lucide-react';
import AdminLayout from '../AdminLayout';
import { useAdmin } from '../AdminContext';
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from '../types';

export default function AdminDashboard() {
  const { orders, devices, apiLogs } = useAdmin();

  const stats = useMemo(() => {
    const total = orders.length;
    const active = orders.filter(o => !['PAID', 'CLOSED', 'CANCELLED'].includes(o.status)).length;
    const paid = orders.filter(o => o.status === 'PAID').length;
    const cancelled = orders.filter(o => o.status === 'CANCELLED').length;
    const totalValue = orders.filter(o => o.status === 'PAID').reduce((s, o) => s + (o.finalPrice || o.offeredPrice), 0);
    const apiOrders = orders.filter(o => o.source === 'API').length;
    const apiErrors = apiLogs.filter(l => !l.success).length;
    const devicesActive = devices.filter(d => d.isActive).length;
    return { total, active, paid, cancelled, totalValue, apiOrders, apiErrors, devicesActive };
  }, [orders, devices, apiLogs]);

  const recentOrders = orders.slice(0, 6);

  const statusBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    orders.forEach(o => { map[o.status] = (map[o.status] || 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [orders]);

  const recentLogs = apiLogs.slice(0, 5);

  return (
    <AdminLayout title="Dashboard" subtitle="Overview of your operations">
      {/* ── Stat Cards ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<Package className="w-5 h-5 text-blue-400" />} bg="bg-blue-500/10" label="Total Orders" value={stats.total} sub={`${stats.active} active`} />
        <StatCard icon={<CheckCircle2 className="w-5 h-5 text-emerald-400" />} bg="bg-emerald-500/10" label="Paid Out" value={stats.paid} sub={`£${stats.totalValue.toLocaleString()}`} />
        <StatCard icon={<Globe className="w-5 h-5 text-purple-400" />} bg="bg-purple-500/10" label="API Orders" value={stats.apiOrders} sub={`${stats.apiErrors} errors`} />
        <StatCard icon={<Smartphone className="w-5 h-5 text-orange-400" />} bg="bg-orange-500/10" label="Active Devices" value={stats.devicesActive} sub={`${devices.length} total`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Recent Orders ────────────────────────────────────────────── */}
        <div className="lg:col-span-2 bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
            <h2 className="font-semibold text-white">Recent Orders</h2>
            <Link to="/admin-cashmymobile/orders" className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-gray-800">
            {recentOrders.map(o => (
              <Link key={o.id} to={`/admin-cashmymobile/orders/${o.id}`} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-800/50 transition-colors group">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-white">{o.orderId}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${ORDER_STATUS_COLORS[o.status]}`}>
                      {ORDER_STATUS_LABELS[o.status]}
                    </span>
                    {o.source === 'API' && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">API</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{o.customerName} · {o.deviceName}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-white">£{(o.finalPrice || o.offeredPrice).toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{new Date(o.createdAt).toLocaleDateString('en-GB')}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* ── Right column ─────────────────────────────────────────────── */}
        <div className="space-y-6">
          {/* Status Breakdown */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-800">
              <h2 className="font-semibold text-white">Status Breakdown</h2>
            </div>
            <div className="px-5 py-3 space-y-2.5">
              {statusBreakdown.map(([status, count]) => (
                <div key={status} className="flex items-center gap-3">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${ORDER_STATUS_COLORS[status as keyof typeof ORDER_STATUS_COLORS] || 'bg-gray-700 text-gray-300'}`}>
                    {ORDER_STATUS_LABELS[status as keyof typeof ORDER_STATUS_LABELS] || status}
                  </span>
                  <div className="flex-1 bg-gray-800 rounded-full h-1.5">
                    <div
                      className="bg-red-500 h-1.5 rounded-full"
                      style={{ width: `${(count / orders.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-gray-500 w-5 text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-800">
              <h2 className="font-semibold text-white">Quick Actions</h2>
            </div>
            <div className="p-3 space-y-2">
              <QuickAction to="/admin-cashmymobile/orders" icon={<Package className="w-4 h-4" />} label="Manage Orders" color="text-blue-400 bg-blue-500/10" />
              <QuickAction to="/admin-cashmymobile/devices" icon={<Smartphone className="w-4 h-4" />} label="Manage Devices" color="text-orange-400 bg-orange-500/10" />
              <QuickAction to="/admin-cashmymobile/pricing" icon={<TrendingUp className="w-4 h-4" />} label="Update Pricing" color="text-emerald-400 bg-emerald-500/10" />
              <QuickAction to="/admin-cashmymobile/api-gateway" icon={<Globe className="w-4 h-4" />} label="API Gateway" color="text-purple-400 bg-purple-500/10" />
            </div>
          </div>

          {/* API Health */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
              <h2 className="font-semibold text-white">API Logs</h2>
              <Link to="/admin-cashmymobile/api-gateway" className="text-xs font-semibold text-red-600 hover:text-red-700">
                View all
              </Link>
            </div>
            <div className="divide-y divide-gray-800">
              {recentLogs.map(log => (
                <div key={log.id} className="flex items-center gap-3 px-4 py-2.5">
                  {log.success
                    ? <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    : <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  }
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-300 truncate">
                      {log.success ? log.orderId || 'Success' : log.error || 'Failed'}
                    </p>
                    <p className="text-[10px] text-gray-500">{log.sourceIp} · {log.responseTime}ms</p>
                  </div>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${log.success ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'}`}>
                    {log.statusCode}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payout Queue */}
      <div className="mt-6 bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Banknote className="w-5 h-5 text-emerald-400" />
            <h2 className="font-semibold text-white">Payout Queue</h2>
          </div>
          <Link to="/admin-cashmymobile/orders?status=PAYOUT_READY" className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1">
            Manage <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-800/60 border-b border-gray-800">
              <tr>
                {['Order ID', 'Customer', 'Device', 'Amount', 'Payment Method', 'Status'].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {orders.filter(o => ['PAYOUT_READY', 'INSPECTION_PASSED'].includes(o.status)).slice(0, 5).map(o => (
                <tr key={o.id} className="hover:bg-gray-800/40 transition-colors">
                  <td className="px-4 py-3 font-semibold text-red-400">{o.orderId}</td>
                  <td className="px-4 py-3 text-gray-300">{o.customerName}</td>
                  <td className="px-4 py-3 text-gray-400">{o.deviceName}</td>
                  <td className="px-4 py-3 font-bold text-white">£{(o.finalPrice || o.offeredPrice).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 capitalize">{o.paymentMethod}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${ORDER_STATUS_COLORS[o.status]}`}>
                      {ORDER_STATUS_LABELS[o.status]}
                    </span>
                  </td>
                </tr>
              ))}
              {orders.filter(o => ['PAYOUT_READY', 'INSPECTION_PASSED'].includes(o.status)).length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-600">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-gray-700" />
                    <p className="text-sm">No payouts pending</p>
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

function StatCard({ icon, bg, label, value, sub }: { icon: React.ReactNode; bg: string; label: string; value: number; sub: string }) {
  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold text-white mb-0.5">{value.toLocaleString()}</p>
      <p className="text-sm font-medium text-gray-400">{label}</p>
      <p className="text-xs text-gray-600 mt-0.5">{sub}</p>
    </div>
  );
}

function QuickAction({ to, icon, label, color }: { to: string; icon: React.ReactNode; label: string; color: string }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-800 transition-colors group"
    >
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-400 group-hover:text-white">{label}</span>
      <ArrowRight className="w-3.5 h-3.5 text-gray-700 ml-auto group-hover:text-gray-400 transition-colors" />
    </Link>
  );
}
