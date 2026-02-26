import { useState, useCallback, useEffect } from 'react';
import type {
  Order, Device, PricingEntry, UtilityItem, ApiRequestLog,
  OrderStatus, PostageMethod,
} from './types';
import { utilitiesApi } from '../api/utilities';
import { deviceApi } from '../api/devices';
import { orderApi } from '../api/orders';
import { pricingApi } from '../api/pricing';
import { apiGatewayApi } from '../api/apiGateway';

// ─── Mock Data ───────────────────────────────────────────────────────────────

export const mockDevices: Device[] = [
  { id: 'd1', brand: 'Apple', name: 'iPhone 16 Pro Max', fullName: 'Apple iPhone 16 Pro Max', category: 'iPhone', imageUrl: 'https://storage.googleapis.com/atomjuice-product-images/apple/iphone-16-pro-max/default.png', isActive: true, createdAt: '2024-01-01', defaultPricing: [
    { network: 'Unlocked', storage: '128GB', gradeNew: 620, gradeGood: 558, gradeBroken: 275 },
    { network: 'Unlocked', storage: '256GB', gradeNew: 655, gradeGood: 590, gradeBroken: 290 },
    { network: 'Unlocked', storage: '512GB', gradeNew: 700, gradeGood: 630, gradeBroken: 310 },
    { network: 'Unlocked', storage: '1TB', gradeNew: 780, gradeGood: 700, gradeBroken: 345 },
  ]},
  { id: 'd2', brand: 'Apple', name: 'iPhone 16 Pro', fullName: 'Apple iPhone 16 Pro', category: 'iPhone', imageUrl: 'https://storage.googleapis.com/atomjuice-product-images/apple/iphone-16-pro/default.png', isActive: true, createdAt: '2024-01-01', defaultPricing: [
    { network: 'Unlocked', storage: '128GB', gradeNew: 555, gradeGood: 500, gradeBroken: 240 },
    { network: 'Unlocked', storage: '256GB', gradeNew: 590, gradeGood: 530, gradeBroken: 260 },
    { network: 'Unlocked', storage: '512GB', gradeNew: 635, gradeGood: 570, gradeBroken: 280 },
  ]},
  { id: 'd3', brand: 'Apple', name: 'iPhone 16', fullName: 'Apple iPhone 16', category: 'iPhone', imageUrl: 'https://storage.googleapis.com/atomjuice-product-images/apple/iphone-16/default.png', isActive: true, createdAt: '2024-01-01', defaultPricing: [
    { network: 'Unlocked', storage: '128GB', gradeNew: 425, gradeGood: 380, gradeBroken: 185 },
    { network: 'Unlocked', storage: '256GB', gradeNew: 460, gradeGood: 415, gradeBroken: 200 },
    { network: 'Unlocked', storage: '512GB', gradeNew: 510, gradeGood: 460, gradeBroken: 225 },
  ]},
  { id: 'd4', brand: 'Apple', name: 'iPhone 15 Pro Max', fullName: 'Apple iPhone 15 Pro Max', category: 'iPhone', imageUrl: 'https://storage.googleapis.com/atomjuice-product-images/apple/iphone-15-pro-max/default.png', isActive: true, createdAt: '2024-01-01', defaultPricing: [
    { network: 'Unlocked', storage: '256GB', gradeNew: 495, gradeGood: 445, gradeBroken: 215 },
    { network: 'Unlocked', storage: '512GB', gradeNew: 540, gradeGood: 485, gradeBroken: 235 },
    { network: 'Unlocked', storage: '1TB', gradeNew: 595, gradeGood: 535, gradeBroken: 260 },
  ]},
  { id: 'd5', brand: 'Apple', name: 'iPhone 15 Pro', fullName: 'Apple iPhone 15 Pro', category: 'iPhone', imageUrl: 'https://storage.googleapis.com/atomjuice-product-images/apple/iphone-15-pro/default.png', isActive: true, createdAt: '2024-01-01', defaultPricing: [
    { network: 'Unlocked', storage: '128GB', gradeNew: 420, gradeGood: 380, gradeBroken: 185 },
    { network: 'Unlocked', storage: '256GB', gradeNew: 455, gradeGood: 410, gradeBroken: 200 },
    { network: 'Unlocked', storage: '512GB', gradeNew: 495, gradeGood: 445, gradeBroken: 215 },
  ]},
  { id: 'd6', brand: 'Apple', name: 'iPhone 15', fullName: 'Apple iPhone 15', category: 'iPhone', imageUrl: 'https://storage.googleapis.com/atomjuice-product-images/apple/iphone-15/default.png', isActive: true, createdAt: '2024-01-01', defaultPricing: [
    { network: 'Unlocked', storage: '128GB', gradeNew: 340, gradeGood: 305, gradeBroken: 148 },
    { network: 'Unlocked', storage: '256GB', gradeNew: 375, gradeGood: 337, gradeBroken: 165 },
    { network: 'Unlocked', storage: '512GB', gradeNew: 420, gradeGood: 378, gradeBroken: 184 },
  ]},
  { id: 'd7', brand: 'Apple', name: 'iPhone 14 Pro Max', fullName: 'Apple iPhone 14 Pro Max', category: 'iPhone', imageUrl: 'https://storage.googleapis.com/atomjuice-product-images/apple/iphone-14-pro-max/default.png', isActive: true, createdAt: '2024-01-01', defaultPricing: [
    { network: 'Unlocked', storage: '128GB', gradeNew: 380, gradeGood: 342, gradeBroken: 167 },
    { network: 'Unlocked', storage: '256GB', gradeNew: 415, gradeGood: 373, gradeBroken: 182 },
    { network: 'Unlocked', storage: '512GB', gradeNew: 460, gradeGood: 414, gradeBroken: 202 },
  ]},
  { id: 'd8', brand: 'Apple', name: 'iPhone 14', fullName: 'Apple iPhone 14', category: 'iPhone', imageUrl: 'https://storage.googleapis.com/atomjuice-product-images/apple/iphone-14/default.png', isActive: true, createdAt: '2024-01-01', defaultPricing: [
    { network: 'Unlocked', storage: '128GB', gradeNew: 280, gradeGood: 252, gradeBroken: 123 },
    { network: 'Unlocked', storage: '256GB', gradeNew: 315, gradeGood: 283, gradeBroken: 138 },
    { network: 'Unlocked', storage: '512GB', gradeNew: 355, gradeGood: 319, gradeBroken: 156 },
  ]},
  { id: 'd9', brand: 'Samsung', name: 'Galaxy S24 Ultra', fullName: 'Samsung Galaxy S24 Ultra', category: 'Samsung', imageUrl: 'https://storage.googleapis.com/atomjuice-product-images/samsung/galaxy-s24-ultra/default.png', isActive: true, createdAt: '2024-01-01', defaultPricing: [
    { network: 'Unlocked', storage: '256GB', gradeNew: 525, gradeGood: 470, gradeBroken: 230 },
    { network: 'Unlocked', storage: '512GB', gradeNew: 570, gradeGood: 513, gradeBroken: 250 },
    { network: 'Unlocked', storage: '1TB', gradeNew: 630, gradeGood: 567, gradeBroken: 277 },
  ]},
  { id: 'd10', brand: 'Samsung', name: 'Galaxy S24+', fullName: 'Samsung Galaxy S24+', category: 'Samsung', imageUrl: 'https://storage.googleapis.com/atomjuice-product-images/samsung/galaxy-s24-plus/default.png', isActive: true, createdAt: '2024-01-01', defaultPricing: [
    { network: 'Unlocked', storage: '256GB', gradeNew: 370, gradeGood: 330, gradeBroken: 160 },
    { network: 'Unlocked', storage: '512GB', gradeNew: 415, gradeGood: 373, gradeBroken: 182 },
  ]},
  { id: 'd11', brand: 'Samsung', name: 'Galaxy S24', fullName: 'Samsung Galaxy S24', category: 'Samsung', imageUrl: 'https://storage.googleapis.com/atomjuice-product-images/samsung/galaxy-s24/default.png', isActive: true, createdAt: '2024-01-01', defaultPricing: [
    { network: 'Unlocked', storage: '128GB', gradeNew: 300, gradeGood: 270, gradeBroken: 131 },
    { network: 'Unlocked', storage: '256GB', gradeNew: 335, gradeGood: 301, gradeBroken: 147 },
    { network: 'Unlocked', storage: '512GB', gradeNew: 380, gradeGood: 342, gradeBroken: 167 },
  ]},
  { id: 'd12', brand: 'Samsung', name: 'Galaxy S23 Ultra', fullName: 'Samsung Galaxy S23 Ultra', category: 'Samsung', imageUrl: 'https://storage.googleapis.com/atomjuice-product-images/samsung/galaxy-s23-ultra/default.png', isActive: true, createdAt: '2024-01-01', defaultPricing: [
    { network: 'Unlocked', storage: '256GB', gradeNew: 380, gradeGood: 342, gradeBroken: 167 },
    { network: 'Unlocked', storage: '512GB', gradeNew: 425, gradeGood: 382, gradeBroken: 187 },
  ]},
];

export const mockOrders: Order[] = [
  {
    id: 'o1', orderNumber: 'A3F9K2', source: 'WEBSITE', status: 'RECEIVED',
    createdAt: '2025-02-20T10:30:00Z', updatedAt: '2025-02-20T10:30:00Z',
    customerName: 'James Wilson', customerPhone: '07700900001', customerEmail: 'james@example.com',
    customerAddress: '12 Baker Street, London, W1U 3BT',
    deviceId: 'd1', deviceName: 'Apple iPhone 16 Pro Max', network: 'Unlocked',
    deviceGrade: 'GOOD', storage: '256GB', offeredPrice: 655,
    postageMethod: 'label', paymentMethod: 'bank', paymentStatus: 'PENDING',
    payoutDetails: { bankName: 'Barclays', accountNumber: '12345678', sortCode: '20-00-00' },
    transactionId: 'TXN-001',
  },
  {
    id: 'o2', orderNumber: 'B7X1M4', source: 'API', status: 'PACK_SENT',
    createdAt: '2025-02-19T14:15:00Z', updatedAt: '2025-02-20T08:00:00Z',
    customerName: 'Sarah Brown', customerPhone: '07700900002', customerEmail: 'sarah@example.com',
    customerAddress: '45 High Street, Manchester, M1 1AD',
    deviceId: 'd4', deviceName: 'Apple iPhone 15 Pro Max', network: 'O2',
    deviceGrade: 'BROKEN', storage: '512GB', offeredPrice: 280,
    postageMethod: 'postbag', paymentMethod: 'bank', paymentStatus: 'PENDING',
    payoutDetails: { bankName: 'Santander', accountNumber: '23456789', sortCode: '09-01-28' },
    transactionId: 'TXN-002',
  },
  {
    id: 'o3', orderNumber: 'C2R8N6', source: 'API', status: 'INSPECTION_PASSED',
    createdAt: '2025-02-18T09:00:00Z', updatedAt: '2025-02-21T11:00:00Z',
    customerName: 'Mike Chen', customerPhone: '07700900003', customerEmail: 'mike@example.com',
    customerAddress: '7 Oak Avenue, Birmingham, B1 1BB',
    deviceId: 'd9', deviceName: 'Samsung Galaxy S24 Ultra', network: 'Unlocked',
    deviceGrade: 'NEW', storage: '1TB', offeredPrice: 525, finalPrice: 525,
    postageMethod: 'label', paymentMethod: 'bank', paymentStatus: 'PENDING',
    payoutDetails: { bankName: 'HSBC', accountNumber: '87654321', sortCode: '40-00-00' },
    transactionId: 'TXN-003',
  },
  {
    id: 'o4', orderNumber: 'D5T3P9', source: 'WEBSITE', status: 'PAYOUT_READY',
    createdAt: '2025-02-17T16:45:00Z', updatedAt: '2025-02-22T09:30:00Z',
    customerName: 'Emma Davis', customerPhone: '07700900004', customerEmail: 'emma@example.com',
    customerAddress: '23 Rose Lane, Leeds, LS1 1AB',
    deviceId: 'd2', deviceName: 'Apple iPhone 16 Pro', network: 'Vodafone',
    deviceGrade: 'GOOD', storage: '128GB', offeredPrice: 555, finalPrice: 555,
    postageMethod: 'postbag', paymentMethod: 'bank', paymentStatus: 'PENDING',
    payoutDetails: { bankName: 'Nationwide', accountNumber: '44556677', sortCode: '07-00-30' },
    transactionId: 'TXN-004',
  },
  {
    id: 'o5', orderNumber: 'E4W7Q1', source: 'API', status: 'PRICE_REVISED',
    createdAt: '2025-02-16T11:20:00Z', updatedAt: '2025-02-21T15:00:00Z',
    customerName: 'Tom Parker', customerPhone: '07700900005', customerEmail: 'tom@example.com',
    customerAddress: '89 Pine Road, Bristol, BS1 1AA',
    deviceId: 'd3', deviceName: 'Apple iPhone 16', network: 'EE',
    deviceGrade: 'GOOD', storage: '128GB', offeredPrice: 425, finalPrice: 380,
    postageMethod: 'label', paymentMethod: 'bank', paymentStatus: 'PENDING',
    payoutDetails: { bankName: 'NatWest', accountNumber: '11223344', sortCode: '60-00-01' },
    transactionId: 'TXN-005',
    priceRevisionReason: 'Screen has hairline crack top right corner',
  },
  {
    id: 'o6', orderNumber: 'F8L2V5', source: 'WEBSITE', status: 'PAID',
    createdAt: '2025-02-10T13:00:00Z', updatedAt: '2025-02-15T10:00:00Z',
    customerName: 'Lucy Johnson', customerPhone: '07700900006', customerEmail: 'lucy@example.com',
    customerAddress: '56 Elm Street, Edinburgh, EH1 1AB',
    deviceId: 'd5', deviceName: 'Apple iPhone 15 Pro', network: 'Unlocked',
    deviceGrade: 'GOOD', storage: '256GB', offeredPrice: 440, finalPrice: 440,
    postageMethod: 'label', paymentMethod: 'bank', paymentStatus: 'PAID',
    payoutDetails: { bankName: 'Lloyds', accountNumber: '99887766', sortCode: '30-00-09' },
    transactionId: 'TXN-006',
  },
  {
    id: 'o7', orderNumber: 'G6H0S3', source: 'API', status: 'CANCELLED',
    createdAt: '2025-02-12T10:00:00Z', updatedAt: '2025-02-13T08:00:00Z',
    customerName: 'David Smith', customerPhone: '07700900007', customerEmail: 'david@example.com',
    customerAddress: '31 Oak Road, Cardiff, CF1 1AD',
    deviceId: 'd11', deviceName: 'Samsung Galaxy S24', network: 'Three',
    deviceGrade: 'BROKEN', storage: '128GB', offeredPrice: 120,
    postageMethod: 'postbag', paymentMethod: 'bank', paymentStatus: 'PENDING',
    payoutDetails: { bankName: 'TSB', accountNumber: '55667788', sortCode: '30-96-34' },
    transactionId: 'TXN-007',
  },
];

export const mockPricingEntries: PricingEntry[] = [
  { id: 'p1', deviceId: 'd1', deviceName: 'Apple iPhone 16 Pro Max', network: 'Unlocked', storage: '256GB', gradeNew: 655, gradeGood: 590, gradeBroken: 290, deeplink: '/sell?device=iphone16promax', updatedAt: '2025-02-01' },
  { id: 'p2', deviceId: 'd1', deviceName: 'Apple iPhone 16 Pro Max', network: 'Unlocked', storage: '512GB', gradeNew: 700, gradeGood: 630, gradeBroken: 310, deeplink: '/sell?device=iphone16promax', updatedAt: '2025-02-01' },
  { id: 'p3', deviceId: 'd2', deviceName: 'Apple iPhone 16 Pro', network: 'Unlocked', storage: '128GB', gradeNew: 555, gradeGood: 500, gradeBroken: 240, deeplink: '/sell?device=iphone16pro', updatedAt: '2025-02-01' },
  { id: 'p4', deviceId: 'd3', deviceName: 'Apple iPhone 16', network: 'Unlocked', storage: '128GB', gradeNew: 425, gradeGood: 380, gradeBroken: 185, deeplink: '/sell?device=iphone16', updatedAt: '2025-02-01' },
  { id: 'p5', deviceId: 'd4', deviceName: 'Apple iPhone 15 Pro Max', network: 'Unlocked', storage: '256GB', gradeNew: 495, gradeGood: 445, gradeBroken: 215, deeplink: '/sell?device=iphone15promax', updatedAt: '2025-02-01' },
  { id: 'p6', deviceId: 'd9', deviceName: 'Samsung Galaxy S24 Ultra', network: 'Unlocked', storage: '256GB', gradeNew: 525, gradeGood: 470, gradeBroken: 230, deeplink: '/sell?device=s24ultra', updatedAt: '2025-02-01' },
  { id: 'p7', deviceId: 'd10', deviceName: 'Samsung Galaxy S24+', network: 'Unlocked', storage: '256GB', gradeNew: 370, gradeGood: 330, gradeBroken: 160, deeplink: '/sell?device=s24plus', updatedAt: '2025-02-01' },
];

export const mockApiLogs: ApiRequestLog[] = [
  { id: 'l1', timestamp: '2025-02-22T14:35:22Z', sourceIp: '185.23.10.45', endpoint: '/decisiontech', method: 'POST', statusCode: 200, success: true, orderNumber: 'B7X1M4', payload: '{"device_name":"iPhone 15 Pro Max","network":"O2","device_grade":"BROKEN","offered_price":280}', responseTime: 142 },
  { id: 'l2', timestamp: '2025-02-22T11:12:08Z', sourceIp: '185.23.10.45', endpoint: '/decisiontech', method: 'POST', statusCode: 200, success: true, orderNumber: 'C2R8N6', payload: '{"device_name":"Samsung Galaxy S24 Ultra","network":"Unlocked","device_grade":"NEW","offered_price":525}', responseTime: 98 },
  { id: 'l3', timestamp: '2025-02-21T16:55:00Z', sourceIp: '185.23.10.45', endpoint: '/decisiontech', method: 'POST', statusCode: 422, success: false, payload: '{"device_name":"","network":"EE","device_grade":"GOOD","offered_price":300}', error: 'device_name is required', responseTime: 22 },
  { id: 'l4', timestamp: '2025-02-20T09:15:44Z', sourceIp: '185.23.10.45', endpoint: '/decisiontech', method: 'POST', statusCode: 200, success: true, orderNumber: 'E4W7Q1', payload: '{"device_name":"iPhone 16","network":"EE","device_grade":"GOOD","offered_price":425}', responseTime: 115 },
  { id: 'l5', timestamp: '2025-02-19T14:20:11Z', sourceIp: '203.0.113.22', endpoint: '/decisiontech', method: 'POST', statusCode: 401, success: false, payload: '{}', error: 'IP not whitelisted', responseTime: 8 },
];

export const defaultStorageOptions: UtilityItem[] = [
  { id: 'st1', name: '64GB', sortOrder: 1, isActive: true },
  { id: 'st2', name: '128GB', sortOrder: 2, isActive: true },
  { id: 'st3', name: '256GB', sortOrder: 3, isActive: true },
  { id: 'st4', name: '512GB', sortOrder: 4, isActive: true },
  { id: 'st5', name: '1TB', sortOrder: 5, isActive: true },
];

export const defaultConditions: UtilityItem[] = [
  { id: 'c1', name: 'New / Mint', sortOrder: 1, isActive: true },
  { id: 'c2', name: 'Good', sortOrder: 2, isActive: true },
  { id: 'c3', name: 'Broken / Faulty', sortOrder: 3, isActive: true },
];

export const defaultNetworks: UtilityItem[] = [
  { id: 'n1', name: 'Unlocked', sortOrder: 1, isActive: true },
  { id: 'n2', name: 'EE', sortOrder: 2, isActive: true },
  { id: 'n3', name: 'O2', sortOrder: 3, isActive: true },
  { id: 'n4', name: 'Vodafone', sortOrder: 4, isActive: true },
  { id: 'n5', name: 'Three', sortOrder: 5, isActive: true },
  { id: 'n6', name: 'Sky Mobile', sortOrder: 6, isActive: true },
  { id: 'n7', name: 'iD Mobile', sortOrder: 7, isActive: true },
  { id: 'n8', name: 'Virgin Mobile', sortOrder: 8, isActive: true },
];

export const defaultBrands: UtilityItem[] = [
  { id: 'b1', name: 'Apple', sortOrder: 1, isActive: true },
  { id: 'b2', name: 'Samsung', sortOrder: 2, isActive: true },
];

export const defaultCategories: UtilityItem[] = [
  { id: 'cat1', name: 'iPhone', sortOrder: 1, isActive: true },
  { id: 'cat2', name: 'Samsung', sortOrder: 2, isActive: true },
];

// ─── Helper ──────────────────────────────────────────────────────────────────
export function generateOrderNumber(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

// ─── Hook - useAdminStore ────────────────────────────────────────────────────
// This is a simple in-memory store using React state.
// In production, replace with Supabase / API calls.

export function useAdminStore() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [ordersPage, setOrdersPage] = useState(1);
  const [ordersHasMore, setOrdersHasMore] = useState(true);
  const [devices, setDevices] = useState<Device[]>([]);
  const [devicesPage, setDevicesPage] = useState(1);
  const [devicesHasMore, setDevicesHasMore] = useState(true);
  const [pricingEntries, setPricingEntries] = useState<PricingEntry[]>([]);
  const [loadingPricing, setLoadingPricing] = useState(true);
  const [pricingPage, setPricingPage] = useState(1);
  const [pricingHasMore, setPricingHasMore] = useState(true);
  const [apiLogs, setApiLogs] = useState<ApiRequestLog[]>([]);
  const [ipWhitelist, setIpWhitelist] = useState<{ id: string; ip: string; label: string; addedAt: string }[]>([]);
  const [loadingApiLogs, setLoadingApiLogs] = useState(true);
  const [loadingIpWhitelist, setLoadingIpWhitelist] = useState(true);
  const [storageOptions, setStorageOptions] = useState<UtilityItem[]>([]);
  const [conditions, setConditions] = useState<UtilityItem[]>([]);
  const [networks, setNetworks] = useState<UtilityItem[]>([]);
  const [brands, setBrands] = useState<UtilityItem[]>([]);
  const [categories, setCategories] = useState<UtilityItem[]>([]);
  const [orderStatuses, setOrderStatuses] = useState<UtilityItem[]>([]);
  const [paymentStatuses, setPaymentStatuses] = useState<UtilityItem[]>([]);
  const [loadingUtilities, setLoadingUtilities] = useState(true);
  const [loadingDevices, setLoadingDevices] = useState(true);

  const fetchOrders = useCallback(async (params?: Parameters<typeof orderApi.getAllOrders>[0], append = false) => {
    try {
      setLoadingOrders(true);
      const page = append ? ordersPage : 1;
      const res = await orderApi.getAllOrders({ limit: 10, page, ...params });
      if (res.success && res.data?.orders) {
        const mapped = res.data.orders.map((o: any): Order => ({
          id: o._id,
          orderNumber: o.orderNumber,
          source: o.source,
          status: o.status,
          createdAt: o.createdAt,
          updatedAt: o.updatedAt,
          customerName: o.customerName,
          customerPhone: o.customerPhone,
          customerEmail: o.customerEmail || '',
          customerAddress: o.customerAddress,
          deviceId: o.deviceId || '',
          deviceName: o.deviceName,
          network: o.network,
          deviceGrade: o.deviceGrade,
          storage: o.storage,
          offeredPrice: o.offeredPrice,
          finalPrice: o.finalPrice,
          postageMethod: o.postageMethod,
          paymentMethod: o.paymentMethod || 'bank',
          paymentStatus: o.paymentStatus || 'PENDING',
          payoutDetails: o.payoutDetails || { bankName: '', accountNumber: '', sortCode: '' },
          transactionId: o.transactionId,
          priceRevisionReason: o.priceRevisionReason,
        }));
        if (append) {
          setOrders(prev => [...prev, ...mapped]);
        } else {
          setOrders(mapped);
          setOrdersPage(1);
        }
        setOrdersHasMore(mapped.length === 10);
        if (append) {
          setOrdersPage(prev => prev + 1);
        }
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoadingOrders(false);
    }
  }, [ordersPage]);

  const loadMoreOrders = useCallback(async () => {
    if (!loadingOrders && ordersHasMore) {
      await fetchOrders({}, true);
    }
  }, [fetchOrders, loadingOrders, ordersHasMore]);

  const fetchPricing = useCallback(async (append = false) => {
    try {
      setLoadingPricing(true);
      const page = append ? pricingPage : 1;
      const res = await pricingApi.getAllPricing({ limit: 10, page });
      if (res.success && res.data?.pricing) {
        const mapped = res.data.pricing.map((p: any): PricingEntry => ({
          id: p._id,
          deviceId: p.deviceId,
          deviceName: p.deviceName,
          network: p.network,
          storage: p.storage,
          gradeNew: p.gradeNew,
          gradeGood: p.gradeGood,
          gradeBroken: p.gradeBroken,
          deeplink: '',
          updatedAt: p.updatedAt,
        }));
        if (append) {
          setPricingEntries(prev => [...prev, ...mapped]);
        } else {
          setPricingEntries(mapped);
          setPricingPage(1);
        }
        setPricingHasMore(mapped.length === 10);
        if (append) {
          setPricingPage(prev => prev + 1);
        }
      }
    } catch (error) {
      console.error('Failed to fetch pricing:', error);
    } finally {
      setLoadingPricing(false);
    }
  }, [pricingPage]);

  const loadMorePricing = useCallback(async () => {
    if (!loadingPricing && pricingHasMore) {
      await fetchPricing(true);
    }
  }, [fetchPricing, loadingPricing, pricingHasMore]);

  const fetchApiLogs = useCallback(async () => {
    try {
      setLoadingApiLogs(true);
      const res = await apiGatewayApi.getAllLogs({ limit: 100, sortBy: 'timestamp', sortOrder: 'desc' });
      if (res.success && res.data?.logs) {
        const mapped = res.data.logs.map((log: any): ApiRequestLog => ({
          id: log._id,
          timestamp: log.timestamp,
          sourceIp: log.sourceIp,
          endpoint: log.endpoint,
          method: log.method,
          statusCode: log.statusCode,
          success: log.success,
          orderNumber: log.orderNumber,
          payload: log.payload,
          error: log.error,
          responseTime: log.responseTime,
        }));
        setApiLogs(mapped);
      }
    } catch (error) {
      console.error('Failed to fetch API logs:', error);
    } finally {
      setLoadingApiLogs(false);
    }
  }, []);

  const fetchIpWhitelist = useCallback(async () => {
    try {
      setLoadingIpWhitelist(true);
      const res = await apiGatewayApi.getAllIps();
      if (res.success && res.data?.ips) {
        const mapped = res.data.ips.map((ip: any) => ({
          id: ip._id,
          ip: ip.ip,
          label: ip.label,
          addedAt: new Date(ip.createdAt).toISOString().slice(0, 10),
        }));
        setIpWhitelist(mapped);
      }
    } catch (error) {
      console.error('Failed to fetch IP whitelist:', error);
    } finally {
      setLoadingIpWhitelist(false);
    }
  }, []);

  const fetchDevices = useCallback(async (append = false) => {
    try {
      setLoadingDevices(true);
      const page = append ? devicesPage : 1;
      const res = await deviceApi.getAllDevices({ limit: 10, page });
      if (res.success && res.data?.devices) {
        const mapped = res.data.devices.map((d: any): Device => ({
          id: d._id,
          brand: d.brand,
          name: d.name,
          fullName: d.fullName,
          category: d.category,
          imageUrl: d.imageUrl,
          isActive: d.isActive,
          createdAt: d.createdAt,
          defaultPricing: d.defaultPricing,
        }));
        if (append) {
          setDevices(prev => [...prev, ...mapped]);
        } else {
          setDevices(mapped);
          setDevicesPage(1);
        }
        setDevicesHasMore(mapped.length === 10);
        if (append) {
          setDevicesPage(prev => prev + 1);
        }
      }
    } catch (error) {
      console.error('Failed to fetch devices:', error);
    } finally {
      setLoadingDevices(false);
    }
  }, [devicesPage]);

  const loadMoreDevices = useCallback(async () => {
    if (!loadingDevices && devicesHasMore) {
      await fetchDevices(true);
    }
  }, [fetchDevices, loadingDevices, devicesHasMore]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const utilitiesRes = await utilitiesApi.getAllUtilities();

        if (utilitiesRes.success && utilitiesRes.data) {
          const mapToUtilityItem = (item: any): UtilityItem => ({
            id: item._id,
            name: item.name,
            value: item.value,
            color: item.color,
            sortOrder: item.sortOrder,
            isActive: item.isActive,
          });
          setStorageOptions(utilitiesRes.data.storageOptions?.map(mapToUtilityItem) || []);
          setConditions(utilitiesRes.data.deviceConditions?.map(mapToUtilityItem) || []);
          setNetworks(utilitiesRes.data.networks?.map(mapToUtilityItem) || []);
          setBrands(utilitiesRes.data.brands?.map(mapToUtilityItem) || []);
          setCategories(utilitiesRes.data.categories?.map(mapToUtilityItem) || []);
          setOrderStatuses(utilitiesRes.data.orderStatuses?.map(mapToUtilityItem) || []);
          setPaymentStatuses(utilitiesRes.data.paymentStatuses?.map(mapToUtilityItem) || []);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoadingUtilities(false);
      }
    };

    fetchData();
    fetchOrders();
    fetchDevices();
    fetchPricing();
    fetchApiLogs();
    fetchIpWhitelist();
  }, [fetchOrders, fetchDevices, fetchPricing, fetchApiLogs, fetchIpWhitelist]);

  // ── Orders ────────────────────────────────────────────────────────────────
  const addOrder = useCallback(async (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>) => {
    try {
      const res = await orderApi.createOrder({
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        customerEmail: order.customerEmail,
        customerAddress: order.customerAddress,
        postcode: '',
        deviceId: order.deviceId,
        deviceName: order.deviceName,
        network: order.network,
        deviceGrade: order.deviceGrade,
        storage: order.storage,
        offeredPrice: order.offeredPrice,
        postageMethod: order.postageMethod,
        payoutDetails: {
          accountName: order.payoutDetails?.bankName || '',
          sortCode: order.payoutDetails?.sortCode || '',
          accountNumber: order.payoutDetails?.accountNumber || '',
        },
      });
      if (res.success && res.data?.order) {
        await fetchOrders();
        return res.data.order;
      }
    } catch (error) {
      console.error('Failed to create order:', error);
      throw error;
    }
  }, [fetchOrders]);

  const updateOrder = useCallback(async (id: string, updates: Partial<Order>) => {
    try {
      if (updates.status) {
        await orderApi.updateOrderStatus(id, updates.status);
      } else {
        await orderApi.updateOrder(id, updates as any);
      }
      // Refetch to ensure UI matches backend state
      await fetchOrders();
    } catch (error) {
      console.error('Failed to update order:', error);
      throw error;
    }
  }, [fetchOrders]);

  const deleteOrder = useCallback(async (id: string) => {
    try {
      await orderApi.deleteOrder(id);
      setOrders(prev => prev.filter(o => o.id !== id));
    } catch (error) {
      console.error('Failed to delete order:', error);
      throw error;
    }
  }, []);

  const updateOrderStatus = useCallback(async (id: string, status: string) => {
    await updateOrder(id, { status: status as any });
  }, [updateOrder]);

  // ── Devices ───────────────────────────────────────────────────────────────
  const addDevice = useCallback(async (data: Omit<Device, 'id' | 'createdAt'>) => {
    try {
      const response = await deviceApi.createDevice({
        brand: data.brand,
        name: data.name,
        fullName: data.fullName,
        category: data.category,
        imageUrl: data.imageUrl,
        isActive: data.isActive,
        defaultPricing: data.defaultPricing,
      });

      if (response.success && response.data?.device) {
        const newDevice: Device = {
          id: response.data.device._id,
          brand: response.data.device.brand,
          name: response.data.device.name,
          fullName: response.data.device.fullName,
          category: response.data.device.category,
          imageUrl: response.data.device.imageUrl,
          isActive: response.data.device.isActive,
          createdAt: response.data.device.createdAt,
          defaultPricing: data.defaultPricing,
        };
        setDevices(prev => [newDevice, ...prev]);
        
        // Sync defaultPricing to backend pricing entries
        if (newDevice.defaultPricing && newDevice.defaultPricing.length > 0) {
          for (const pricing of newDevice.defaultPricing) {
            await pricingApi.createPricing({
              deviceId: newDevice.id,
              deviceName: newDevice.fullName,
              network: pricing.network,
              storage: pricing.storage,
              gradeNew: pricing.gradeNew,
              gradeGood: pricing.gradeGood,
              gradeBroken: pricing.gradeBroken,
            });
          }
          // Refetch pricing to update UI
          await fetchPricing();
        }
        
        return newDevice;
      }
    } catch (error) {
      console.error('Failed to create device:', error);
      throw error;
    }
  }, [fetchPricing]);

  const updateDevice = useCallback(async (id: string, updates: Partial<Device>, options?: { skipPricingSync?: boolean }) => {
    try {
      const response = await deviceApi.updateDevice(id, {
        brand: updates.brand,
        name: updates.name,
        fullName: updates.fullName,
        category: updates.category,
        imageUrl: updates.imageUrl,
        isActive: updates.isActive,
        defaultPricing: updates.defaultPricing,
      });

      if (response.success && response.data?.device) {
        setDevices(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
        
        // Sync defaultPricing to backend pricing entries (unless skipPricingSync is true)
        if (updates.defaultPricing !== undefined && !options?.skipPricingSync) {
          const device = devices.find(d => d.id === id);
          const deviceName = updates.fullName || device?.fullName || '';
          
          // Fetch current pricing entries from backend to get correct IDs
          const pricingRes = await pricingApi.getAllPricing();
          const currentEntries = (pricingRes.success && pricingRes.data?.pricing)
            ? pricingRes.data.pricing
                .filter((p: any) => p.deviceId === id)
                .map((p: any) => ({
                  id: p._id,
                  deviceId: p.deviceId,
                  network: p.network,
                  storage: p.storage,
                  gradeNew: p.gradeNew,
                  gradeGood: p.gradeGood,
                  gradeBroken: p.gradeBroken,
                }))
            : [];
          
          if (updates.defaultPricing && updates.defaultPricing.length > 0) {
            // Update or create each pricing entry
            for (const pricing of updates.defaultPricing) {
              // Find existing entry by deviceId+network+storage combination
              const existing = currentEntries.find(
                e => e.network === pricing.network && e.storage === pricing.storage
              );
              
              if (existing) {
                // Update existing entry
                await pricingApi.updatePricing(existing.id, {
                  gradeNew: pricing.gradeNew,
                  gradeGood: pricing.gradeGood,
                  gradeBroken: pricing.gradeBroken,
                });
              } else {
                // Create new entry
                await pricingApi.createPricing({
                  deviceId: id,
                  deviceName: deviceName,
                  network: pricing.network,
                  storage: pricing.storage,
                  gradeNew: pricing.gradeNew,
                  gradeGood: pricing.gradeGood,
                  gradeBroken: pricing.gradeBroken,
                });
              }
            }
            
            // Delete entries that are no longer in defaultPricing
            const newCombos = new Set(
              updates.defaultPricing.map(p => `${p.network}|${p.storage}`)
            );
            for (const entry of currentEntries) {
              const combo = `${entry.network}|${entry.storage}`;
              if (!newCombos.has(combo)) {
                try {
                  await pricingApi.deletePricing(entry.id);
                } catch (error) {
                  console.error('Failed to delete pricing entry:', error);
                }
              }
            }
          } else {
            // Delete all pricing entries if defaultPricing is empty
            for (const entry of currentEntries) {
              try {
                await pricingApi.deletePricing(entry.id);
              } catch (error) {
                console.error('Failed to delete pricing entry:', error);
              }
            }
          }
          
          // Refetch pricing to update UI
          await fetchPricing();
        }
      }
    } catch (error) {
      console.error('Failed to update device:', error);
      throw error;
    }
  }, [devices, pricingEntries, fetchPricing]);

  const deleteDevice = useCallback(async (id: string) => {
    try {
      await deviceApi.deleteDevice(id);
      setDevices(prev => prev.filter(d => d.id !== id));
      setPricingEntries(prev => prev.filter(p => p.deviceId !== id));
    } catch (error) {
      console.error('Failed to delete device:', error);
      throw error;
    }
  }, []);

  // ── Pricing ───────────────────────────────────────────────────────────────
  const addPricingEntry = useCallback(async (entry: Omit<PricingEntry, 'id' | 'updatedAt'>) => {
    try {
      const res = await pricingApi.createPricing({
        deviceId: entry.deviceId,
        deviceName: entry.deviceName,
        network: entry.network,
        storage: entry.storage,
        gradeNew: entry.gradeNew,
        gradeGood: entry.gradeGood,
        gradeBroken: entry.gradeBroken,
      });
      if (res.success && res.data?.pricing) {
        const newEntry: PricingEntry = {
          id: res.data.pricing._id,
          deviceId: res.data.pricing.deviceId,
          deviceName: res.data.pricing.deviceName,
          network: res.data.pricing.network,
          storage: res.data.pricing.storage,
          gradeNew: res.data.pricing.gradeNew,
          gradeGood: res.data.pricing.gradeGood,
          gradeBroken: res.data.pricing.gradeBroken,
          deeplink: entry.deeplink || '',
          updatedAt: res.data.pricing.updatedAt,
        };
        setPricingEntries(prev => [...prev, newEntry]);
        return newEntry;
      }
    } catch (error) {
      console.error('Failed to create pricing entry:', error);
      throw error;
    }
  }, []);

  const updatePricingEntry = useCallback(async (id: string, updates: Partial<PricingEntry>) => {
    try {
      const res = await pricingApi.updatePricing(id, {
        gradeNew: updates.gradeNew,
        gradeGood: updates.gradeGood,
        gradeBroken: updates.gradeBroken,
      });
      if (res.success && res.data?.pricing) {
        const pricing = res.data.pricing;
        setPricingEntries(prev => prev.map(p => p.id === id ? { 
          ...p, 
          gradeNew: pricing.gradeNew,
          gradeGood: pricing.gradeGood,
          gradeBroken: pricing.gradeBroken,
          updatedAt: pricing.updatedAt,
        } : p));
      }
    } catch (error) {
      console.error('Failed to update pricing entry:', error);
      throw error;
    }
  }, []);

  const deletePricingEntry = useCallback(async (id: string) => {
    try {
      await pricingApi.deletePricing(id);
      setPricingEntries(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Failed to delete pricing entry:', error);
      throw error;
    }
  }, []);

  const bulkUpdatePricing = useCallback(async (updates: Array<{
    id: string;
    gradeNew: number;
    gradeGood: number;
    gradeBroken: number;
  }>) => {
    try {
      const res = await pricingApi.bulkUpdatePricing(updates);
      if (res.success) {
        // Refetch pricing to ensure UI matches backend
        await fetchPricing();
      }
      return res;
    } catch (error) {
      console.error('Failed to bulk update pricing:', error);
      throw error;
    }
  }, [fetchPricing]);

  // ── Utilities CRUD (connected to backend) ────────────────────────────────
  const storageOptionsCRUD = {
    add: async (name: string) => {
      try {
        const response = await utilitiesApi.createStorageOption({ name, value: name });
        if (response.success && response.data) {
          const item: UtilityItem = {
            id: response.data.storageOption._id,
            name: response.data.storageOption.name,
            sortOrder: response.data.storageOption.sortOrder,
            isActive: response.data.storageOption.isActive,
          };
          setStorageOptions(prev => [...prev, item]);
        }
      } catch (error) {
        console.error('Failed to add storage option:', error);
      }
    },
    update: async (id: string, updates: Partial<UtilityItem>) => {
      try {
        await utilitiesApi.updateStorageOption(id, updates);
        setStorageOptions(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
      } catch (error) {
        console.error('Failed to update storage option:', error);
      }
    },
    remove: async (id: string) => {
      try {
        await utilitiesApi.deleteStorageOption(id);
        setStorageOptions(prev => prev.filter(i => i.id !== id));
      } catch (error) {
        console.error('Failed to delete storage option:', error);
      }
    },
    reorder: (items: UtilityItem[]) => setStorageOptions(items),
  };

  const conditionsCRUD = {
    add: async (name: string) => {
      try {
        const response = await utilitiesApi.createDeviceCondition({ name, value: name.toUpperCase() });
        if (response.success && response.data) {
          const item: UtilityItem = {
            id: response.data.deviceCondition._id,
            name: response.data.deviceCondition.name,
            sortOrder: response.data.deviceCondition.sortOrder,
            isActive: response.data.deviceCondition.isActive,
          };
          setConditions(prev => [...prev, item]);
        }
      } catch (error) {
        console.error('Failed to add condition:', error);
      }
    },
    update: async (id: string, updates: Partial<UtilityItem>) => {
      try {
        await utilitiesApi.updateDeviceCondition(id, updates);
        setConditions(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
      } catch (error) {
        console.error('Failed to update condition:', error);
      }
    },
    remove: async (id: string) => {
      try {
        await utilitiesApi.deleteDeviceCondition(id);
        setConditions(prev => prev.filter(i => i.id !== id));
      } catch (error) {
        console.error('Failed to delete condition:', error);
      }
    },
    reorder: (items: UtilityItem[]) => setConditions(items),
  };

  const networksCRUD = {
    add: async (name: string) => {
      try {
        const response = await utilitiesApi.createNetwork({ name, value: name });
        if (response.success && response.data) {
          const item: UtilityItem = {
            id: response.data.network._id,
            name: response.data.network.name,
            sortOrder: response.data.network.sortOrder,
            isActive: response.data.network.isActive,
          };
          setNetworks(prev => [...prev, item]);
        }
      } catch (error) {
        console.error('Failed to add network:', error);
      }
    },
    update: async (id: string, updates: Partial<UtilityItem>) => {
      try {
        await utilitiesApi.updateNetwork(id, updates);
        setNetworks(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
      } catch (error) {
        console.error('Failed to update network:', error);
      }
    },
    remove: async (id: string) => {
      try {
        await utilitiesApi.deleteNetwork(id);
        setNetworks(prev => prev.filter(i => i.id !== id));
      } catch (error) {
        console.error('Failed to delete network:', error);
      }
    },
    reorder: (items: UtilityItem[]) => setNetworks(items),
  };

  const brandsCRUD = {
    add: async (name: string) => {
      try {
        const response = await utilitiesApi.createBrand({ name });
        if (response.success && response.data) {
          const item: UtilityItem = {
            id: response.data.brand._id,
            name: response.data.brand.name,
            sortOrder: response.data.brand.sortOrder,
            isActive: response.data.brand.isActive,
          };
          setBrands(prev => [...prev, item]);
        }
      } catch (error) {
        console.error('Failed to add brand:', error);
      }
    },
    update: async (id: string, updates: Partial<UtilityItem>) => {
      try {
        await utilitiesApi.updateBrand(id, updates);
        setBrands(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
      } catch (error) {
        console.error('Failed to update brand:', error);
      }
    },
    remove: async (id: string) => {
      try {
        await utilitiesApi.deleteBrand(id);
        setBrands(prev => prev.filter(i => i.id !== id));
      } catch (error) {
        console.error('Failed to delete brand:', error);
      }
    },
    reorder: (items: UtilityItem[]) => setBrands(items),
  };

  const categoriesCRUD = {
    add: async (name: string) => {
      try {
        const response = await utilitiesApi.createCategory({ name });
        if (response.success && response.data) {
          const item: UtilityItem = {
            id: response.data.category._id,
            name: response.data.category.name,
            sortOrder: response.data.category.sortOrder,
            isActive: response.data.category.isActive,
          };
          setCategories(prev => [...prev, item]);
        }
      } catch (error) {
        console.error('Failed to add category:', error);
      }
    },
    update: async (id: string, updates: Partial<UtilityItem>) => {
      try {
        await utilitiesApi.updateCategory(id, updates);
        setCategories(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
      } catch (error) {
        console.error('Failed to update category:', error);
      }
    },
    remove: async (id: string) => {
      try {
        await utilitiesApi.deleteCategory(id);
        setCategories(prev => prev.filter(i => i.id !== id));
      } catch (error) {
        console.error('Failed to delete category:', error);
      }
    },
    reorder: (items: UtilityItem[]) => setCategories(items),
  };

  const orderStatusesCRUD = {
    add: async (name: string, extra?: { value?: string; color?: string }) => {
      try {
        const response = await utilitiesApi.createOrderStatus({ name, value: extra?.value || name.toUpperCase().replace(/\s+/g, '_'), color: extra?.color });
        if (response.success && response.data) {
          const item: UtilityItem = { id: response.data.orderStatus._id, name: response.data.orderStatus.name, sortOrder: response.data.orderStatus.sortOrder, isActive: response.data.orderStatus.isActive, color: response.data.orderStatus.color, value: response.data.orderStatus.value };
          setOrderStatuses(prev => [...prev, item]);
        }
      } catch (error) { console.error('Failed to add order status:', error); }
    },
    update: async (id: string, updates: Partial<UtilityItem>) => {
      try {
        await utilitiesApi.updateOrderStatus(id, updates as any);
        setOrderStatuses(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
      } catch (error) { console.error('Failed to update order status:', error); }
    },
    remove: async (id: string) => {
      try {
        await utilitiesApi.deleteOrderStatus(id);
        setOrderStatuses(prev => prev.filter(i => i.id !== id));
      } catch (error) { console.error('Failed to delete order status:', error); }
    },
    reorder: (items: UtilityItem[]) => setOrderStatuses(items),
  };

  const paymentStatusesCRUD = {
    add: async (name: string, extra?: { value?: string; color?: string }) => {
      try {
        const response = await utilitiesApi.createPaymentStatus({ name, value: extra?.value || name.toUpperCase().replace(/\s+/g, '_'), color: extra?.color });
        if (response.success && response.data) {
          const item: UtilityItem = { id: response.data.paymentStatus._id, name: response.data.paymentStatus.name, sortOrder: response.data.paymentStatus.sortOrder, isActive: response.data.paymentStatus.isActive, color: response.data.paymentStatus.color, value: response.data.paymentStatus.value };
          setPaymentStatuses(prev => [...prev, item]);
        }
      } catch (error) { console.error('Failed to add payment status:', error); }
    },
    update: async (id: string, updates: Partial<UtilityItem>) => {
      try {
        await utilitiesApi.updatePaymentStatus(id, updates as any);
        setPaymentStatuses(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
      } catch (error) { console.error('Failed to update payment status:', error); }
    },
    remove: async (id: string) => {
      try {
        await utilitiesApi.deletePaymentStatus(id);
        setPaymentStatuses(prev => prev.filter(i => i.id !== id));
      } catch (error) { console.error('Failed to delete payment status:', error); }
    },
    reorder: (items: UtilityItem[]) => setPaymentStatuses(items),
  };

  // ── IP Whitelist CRUD ─────────────────────────────────────────────────────
  const addIpToWhitelist = useCallback(async (ip: string, label: string) => {
    try {
      const res = await apiGatewayApi.addIp({ ip: ip.trim(), label: label.trim() });
      if (res.success && res.data?.ip) {
        const entry = {
          id: res.data.ip._id,
          ip: res.data.ip.ip,
          label: res.data.ip.label,
          addedAt: new Date(res.data.ip.createdAt).toISOString().slice(0, 10),
        };
        setIpWhitelist(prev => [...prev, entry]);
        return entry;
      }
    } catch (error) {
      console.error('Failed to add IP to whitelist:', error);
      throw error;
    }
  }, []);

  const removeIpFromWhitelist = useCallback(async (id: string) => {
    try {
      await apiGatewayApi.removeIp(id);
      setIpWhitelist(prev => prev.filter(e => e.id !== id));
    } catch (error) {
      console.error('Failed to remove IP from whitelist:', error);
      throw error;
    }
  }, []);

  const updateIpWhitelistEntry = useCallback(async (id: string, updates: { ip?: string; label?: string }) => {
    try {
      await apiGatewayApi.updateIp(id, updates);
      setIpWhitelist(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
    } catch (error) {
      console.error('Failed to update IP whitelist entry:', error);
      throw error;
    }
  }, []);

  // ── API Gateway test order ────────────────────────────────────────────────
  const processApiOrder = useCallback(async (payload: Record<string, unknown>) => {
    try {
      const res = await apiGatewayApi.testOrder(payload);
      
      // Refresh logs and orders after test
      await fetchApiLogs();
      await fetchOrders();
      
      if (res.success) {
        return {
          success: true,
          orderNumber: res.data?.orderNumber,
          message: res.data?.message,
        };
      } else {
        return {
          success: false,
          error: res.error || res.data?.error || 'Failed to create order',
        };
      }
    } catch (error: any) {
      console.error('API test order error:', error);
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to create order',
      };
    }
  }, [fetchApiLogs, fetchOrders]);

  return {
    orders, addOrder, updateOrder, deleteOrder, updateOrderStatus, fetchOrders, loadingOrders, loadMoreOrders, ordersHasMore,
    devices, addDevice, updateDevice, deleteDevice, loadingDevices, fetchDevices, loadMoreDevices, devicesHasMore,
    pricingEntries, addPricingEntry, updatePricingEntry, deletePricingEntry, bulkUpdatePricing, fetchPricing, loadingPricing, loadMorePricing, pricingHasMore,
    apiLogs, processApiOrder, fetchApiLogs, loadingApiLogs,
    ipWhitelist, addIpToWhitelist, removeIpFromWhitelist, updateIpWhitelistEntry, fetchIpWhitelist, loadingIpWhitelist,
    storageOptions, storageOptionsCRUD,
    conditions, conditionsCRUD,
    networks, networksCRUD,
    brands, brandsCRUD,
    categories, categoriesCRUD,
    orderStatuses, orderStatusesCRUD,
    paymentStatuses, paymentStatusesCRUD,
    loadingUtilities,
  };
}

export type AdminStore = ReturnType<typeof useAdminStore>;
