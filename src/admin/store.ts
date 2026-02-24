import { useState, useCallback } from 'react';
import type {
  Order, Device, PricingEntry, UtilityItem, ApiRequestLog,
  OrderStatus, PaymentMethod, PostageMethod,
} from './types';

// ─── Mock Data ───────────────────────────────────────────────────────────────

export const mockDevices: Device[] = [
  { id: 'd1', brand: 'Apple', name: 'iPhone 16 Pro Max', fullName: 'Apple iPhone 16 Pro Max', category: 'iPhone', isActive: true, createdAt: '2024-01-01' },
  { id: 'd2', brand: 'Apple', name: 'iPhone 16 Pro', fullName: 'Apple iPhone 16 Pro', category: 'iPhone', isActive: true, createdAt: '2024-01-01' },
  { id: 'd3', brand: 'Apple', name: 'iPhone 16', fullName: 'Apple iPhone 16', category: 'iPhone', isActive: true, createdAt: '2024-01-01' },
  { id: 'd4', brand: 'Apple', name: 'iPhone 15 Pro Max', fullName: 'Apple iPhone 15 Pro Max', category: 'iPhone', isActive: true, createdAt: '2024-01-01' },
  { id: 'd5', brand: 'Apple', name: 'iPhone 15 Pro', fullName: 'Apple iPhone 15 Pro', category: 'iPhone', isActive: true, createdAt: '2024-01-01' },
  { id: 'd6', brand: 'Apple', name: 'iPhone 15', fullName: 'Apple iPhone 15', category: 'iPhone', isActive: true, createdAt: '2024-01-01' },
  { id: 'd7', brand: 'Apple', name: 'iPhone 14 Pro Max', fullName: 'Apple iPhone 14 Pro Max', category: 'iPhone', isActive: true, createdAt: '2024-01-01' },
  { id: 'd8', brand: 'Apple', name: 'iPhone 14', fullName: 'Apple iPhone 14', category: 'iPhone', isActive: true, createdAt: '2024-01-01' },
  { id: 'd9', brand: 'Samsung', name: 'Galaxy S24 Ultra', fullName: 'Samsung Galaxy S24 Ultra', category: 'Samsung', isActive: true, createdAt: '2024-01-01' },
  { id: 'd10', brand: 'Samsung', name: 'Galaxy S24+', fullName: 'Samsung Galaxy S24+', category: 'Samsung', isActive: true, createdAt: '2024-01-01' },
  { id: 'd11', brand: 'Samsung', name: 'Galaxy S24', fullName: 'Samsung Galaxy S24', category: 'Samsung', isActive: true, createdAt: '2024-01-01' },
  { id: 'd12', brand: 'Samsung', name: 'Galaxy S23 Ultra', fullName: 'Samsung Galaxy S23 Ultra', category: 'Samsung', isActive: true, createdAt: '2024-01-01' },
  { id: 'd13', brand: 'Google', name: 'Pixel 9 Pro', fullName: 'Google Pixel 9 Pro', category: 'Google', isActive: true, createdAt: '2024-01-01' },
  { id: 'd14', brand: 'Google', name: 'Pixel 9', fullName: 'Google Pixel 9', category: 'Google', isActive: false, createdAt: '2024-01-01' },
];

export const mockOrders: Order[] = [
  {
    id: 'o1', orderId: 'CMM-2025-001', source: 'WEBSITE', status: 'RECEIVED',
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
    id: 'o2', orderId: 'CMM-2025-002', source: 'API', status: 'PACK_SENT',
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
    id: 'o3', orderId: 'CMM-2025-003', source: 'API', status: 'INSPECTION_PASSED',
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
    id: 'o4', orderId: 'CMM-2025-004', source: 'WEBSITE', status: 'PAYOUT_READY',
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
    id: 'o5', orderId: 'CMM-2025-005', source: 'API', status: 'PRICE_REVISED',
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
    id: 'o6', orderId: 'CMM-2025-006', source: 'WEBSITE', status: 'PAID',
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
    id: 'o7', orderId: 'CMM-2025-007', source: 'API', status: 'CANCELLED',
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
  { id: 'l1', timestamp: '2025-02-22T14:35:22Z', sourceIp: '185.23.10.45', endpoint: '/decisiontech', method: 'POST', statusCode: 200, success: true, orderId: 'CMM-2025-002', payload: '{"device_name":"iPhone 15 Pro Max","network":"O2","device_grade":"BROKEN","offered_price":280}', responseTime: 142 },
  { id: 'l2', timestamp: '2025-02-22T11:12:08Z', sourceIp: '185.23.10.45', endpoint: '/decisiontech', method: 'POST', statusCode: 200, success: true, orderId: 'CMM-2025-003', payload: '{"device_name":"Samsung Galaxy S24 Ultra","network":"Unlocked","device_grade":"NEW","offered_price":525}', responseTime: 98 },
  { id: 'l3', timestamp: '2025-02-21T16:55:00Z', sourceIp: '185.23.10.45', endpoint: '/decisiontech', method: 'POST', statusCode: 422, success: false, payload: '{"device_name":"","network":"EE","device_grade":"GOOD","offered_price":300}', error: 'device_name is required', responseTime: 22 },
  { id: 'l4', timestamp: '2025-02-20T09:15:44Z', sourceIp: '185.23.10.45', endpoint: '/decisiontech', method: 'POST', statusCode: 200, success: true, orderId: 'CMM-2025-005', payload: '{"device_name":"iPhone 16","network":"EE","device_grade":"GOOD","offered_price":425}', responseTime: 115 },
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
  { id: 'b3', name: 'Google', sortOrder: 3, isActive: true },
  { id: 'b4', name: 'OnePlus', sortOrder: 4, isActive: true },
  { id: 'b5', name: 'Xiaomi', sortOrder: 5, isActive: true },
  { id: 'b6', name: 'Huawei', sortOrder: 6, isActive: true },
];

export const defaultCategories: UtilityItem[] = [
  { id: 'cat1', name: 'iPhone', sortOrder: 1, isActive: true },
  { id: 'cat2', name: 'Samsung', sortOrder: 2, isActive: true },
  { id: 'cat3', name: 'Google', sortOrder: 3, isActive: true },
  { id: 'cat4', name: 'Android', sortOrder: 4, isActive: true },
  { id: 'cat5', name: 'Tablet', sortOrder: 5, isActive: true },
  { id: 'cat6', name: 'Smartwatch', sortOrder: 6, isActive: true },
];

// ─── Helper ──────────────────────────────────────────────────────────────────
export function generateOrderId(): string {
  const year = new Date().getFullYear();
  const num = Math.floor(Math.random() * 9000) + 1000;
  return `CMM-${year}-${num}`;
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

// ─── Hook - useAdminStore ────────────────────────────────────────────────────
// This is a simple in-memory store using React state.
// In production, replace with Supabase / API calls.

export function useAdminStore() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [devices, setDevices] = useState<Device[]>(mockDevices);
  const [pricingEntries, setPricingEntries] = useState<PricingEntry[]>(mockPricingEntries);
  const [apiLogs, setApiLogs] = useState<ApiRequestLog[]>(mockApiLogs);
  const [storageOptions, setStorageOptions] = useState<UtilityItem[]>(defaultStorageOptions);
  const [conditions, setConditions] = useState<UtilityItem[]>(defaultConditions);
  const [networks, setNetworks] = useState<UtilityItem[]>(defaultNetworks);
  const [brands, setBrands] = useState<UtilityItem[]>(defaultBrands);
  const [categories, setCategories] = useState<UtilityItem[]>(defaultCategories);

  // ── Orders ────────────────────────────────────────────────────────────────
  const addOrder = useCallback((order: Omit<Order, 'id' | 'orderId' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newOrder: Order = {
      ...order,
      id: generateId(),
      orderId: generateOrderId(),
      createdAt: now,
      updatedAt: now,
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  }, []);

  const updateOrder = useCallback((id: string, updates: Partial<Order>) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, ...updates, updatedAt: new Date().toISOString() } : o));
  }, []);

  const deleteOrder = useCallback((id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  }, []);

  const updateOrderStatus = useCallback((id: string, status: OrderStatus) => {
    updateOrder(id, { status });
  }, [updateOrder]);

  // ── Devices ───────────────────────────────────────────────────────────────
  const addDevice = useCallback((device: Omit<Device, 'id' | 'createdAt'>) => {
    const newDevice: Device = { ...device, id: generateId(), createdAt: new Date().toISOString() };
    setDevices(prev => [...prev, newDevice]);
    return newDevice;
  }, []);

  const updateDevice = useCallback((id: string, updates: Partial<Device>) => {
    setDevices(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
  }, []);

  const deleteDevice = useCallback((id: string) => {
    setDevices(prev => prev.filter(d => d.id !== id));
  }, []);

  // ── Pricing ───────────────────────────────────────────────────────────────
  const addPricingEntry = useCallback((entry: Omit<PricingEntry, 'id' | 'updatedAt'>) => {
    const newEntry: PricingEntry = { ...entry, id: generateId(), updatedAt: new Date().toISOString().slice(0, 10) };
    setPricingEntries(prev => [...prev, newEntry]);
    return newEntry;
  }, []);

  const updatePricingEntry = useCallback((id: string, updates: Partial<PricingEntry>) => {
    setPricingEntries(prev => prev.map(p => p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString().slice(0, 10) } : p));
  }, []);

  const deletePricingEntry = useCallback((id: string) => {
    setPricingEntries(prev => prev.filter(p => p.id !== id));
  }, []);

  // ── Utilities (generic CRUD) ──────────────────────────────────────────────
  const makeUtilityCRUD = <T extends UtilityItem>(
    setter: React.Dispatch<React.SetStateAction<T[]>>
  ) => ({
    add: (name: string) => {
      const item = { id: generateId(), name, sortOrder: Date.now(), isActive: true } as T;
      setter(prev => [...prev, item]);
    },
    update: (id: string, updates: Partial<T>) => {
      setter(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
    },
    remove: (id: string) => {
      setter(prev => prev.filter(i => i.id !== id));
    },
    reorder: (items: T[]) => setter(items),
  });

  // ── API Gateway simulation ────────────────────────────────────────────────
  const processApiOrder = useCallback((payload: Record<string, unknown>) => {
    const now = new Date().toISOString();
    const required = ['customer_name', 'customer_phone', 'customer_address', 'device_name', 'network', 'device_grade', 'offered_price', 'payment_method', 'postage_method'];
    const missing = required.filter(k => !payload[k]);

    const log: ApiRequestLog = {
      id: generateId(),
      timestamp: now,
      sourceIp: payload.source_ip as string || '0.0.0.0',
      endpoint: '/decisiontech',
      method: 'POST',
      statusCode: missing.length > 0 ? 422 : 200,
      success: missing.length === 0,
      payload: JSON.stringify(payload),
      error: missing.length > 0 ? `Missing required fields: ${missing.join(', ')}` : undefined,
      responseTime: Math.floor(Math.random() * 200) + 50,
    };

    if (missing.length > 0) {
      setApiLogs(prev => [log, ...prev]);
      return { success: false, error: log.error };
    }

    const newOrder = {
      source: 'API' as const,
      status: 'RECEIVED' as const,
      customerName: payload.customer_name as string,
      customerPhone: payload.customer_phone as string,
      customerEmail: payload.customer_email as string || '',
      customerAddress: payload.customer_address as string,
      deviceId: payload.device_id as string || generateId(),
      deviceName: payload.device_name as string,
      network: payload.network as string,
      deviceGrade: payload.device_grade as 'NEW' | 'GOOD' | 'BROKEN',
      storage: payload.storage as string || 'Unknown',
      offeredPrice: Number(payload.offered_price),
      postageMethod: payload.postage_method as PostageMethod,
      paymentMethod: 'bank' as const,
      paymentStatus: 'PENDING' as const,
      payoutDetails: {
        bankName: payload.bank_name as string,
        accountNumber: payload.account_number as string,
        sortCode: payload.sort_code as string,
      },
      transactionId: payload.transaction_id as string,
    };

    const created = (() => {
      const o: Order = { ...newOrder, id: generateId(), orderId: generateOrderId(), createdAt: now, updatedAt: now };
      setOrders(prev => [o, ...prev]);
      return o;
    })();

    log.orderId = created.orderId;
    setApiLogs(prev => [log, ...prev]);

    return { success: true, orderId: created.orderId, order: created };
  }, []);

  return {
    orders, addOrder, updateOrder, deleteOrder, updateOrderStatus,
    devices, addDevice, updateDevice, deleteDevice,
    pricingEntries, addPricingEntry, updatePricingEntry, deletePricingEntry,
    apiLogs, processApiOrder,
    storageOptions, storageOptionsCRUD: makeUtilityCRUD(setStorageOptions),
    conditions, conditionsCRUD: makeUtilityCRUD(setConditions),
    networks, networksCRUD: makeUtilityCRUD(setNetworks),
    brands, brandsCRUD: makeUtilityCRUD(setBrands),
    categories, categoriesCRUD: makeUtilityCRUD(setCategories),
  };
}

export type AdminStore = ReturnType<typeof useAdminStore>;
