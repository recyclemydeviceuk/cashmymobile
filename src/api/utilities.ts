import api from './api';

export interface StorageOption {
  _id: string;
  name: string;
  value: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DeviceCondition {
  _id: string;
  name: string;
  value: string;
  description?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Network {
  _id: string;
  name: string;
  value: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Brand {
  _id: string;
  name: string;
  value?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  value?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OrderStatusItem {
  _id: string;
  name: string;
  value: string;
  color: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentStatusItem {
  _id: string;
  name: string;
  value: string;
  color: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UtilitiesResponse {
  storageOptions: StorageOption[];
  deviceConditions: DeviceCondition[];
  networks: Network[];
  brands: Brand[];
  categories: Category[];
  orderStatuses: OrderStatusItem[];
  paymentStatuses: PaymentStatusItem[];
}

export const utilitiesApi = {
  async getAllUtilities() {
    return api.get<UtilitiesResponse>('/utilities/all');
  },

  // Storage Options
  async getStorageOptions() {
    return api.get<{ storageOptions: StorageOption[] }>('/utilities/storage');
  },
  async createStorageOption(data: { name: string; value?: string; sortOrder?: number; isActive?: boolean }) {
    return api.post<{ storageOption: StorageOption }>('/utilities/storage', data);
  },
  async updateStorageOption(id: string, data: Partial<StorageOption>) {
    return api.put<{ storageOption: StorageOption }>(`/utilities/storage/${id}`, data);
  },
  async deleteStorageOption(id: string) {
    return api.delete(`/utilities/storage/${id}`);
  },
  async reorderStorageOptions(items: { id: string; sortOrder: number }[]) {
    return api.post('/utilities/storage/reorder', { items });
  },

  // Device Conditions
  async getDeviceConditions() {
    return api.get<{ deviceConditions: DeviceCondition[] }>('/utilities/conditions');
  },
  async createDeviceCondition(data: { name: string; value?: string; description?: string; sortOrder?: number; isActive?: boolean }) {
    return api.post<{ deviceCondition: DeviceCondition }>('/utilities/conditions', data);
  },
  async updateDeviceCondition(id: string, data: Partial<DeviceCondition>) {
    return api.put<{ deviceCondition: DeviceCondition }>(`/utilities/conditions/${id}`, data);
  },
  async deleteDeviceCondition(id: string) {
    return api.delete(`/utilities/conditions/${id}`);
  },
  async reorderDeviceConditions(items: { id: string; sortOrder: number }[]) {
    return api.post('/utilities/conditions/reorder', { items });
  },

  // Networks
  async getNetworks() {
    return api.get<{ networks: Network[] }>('/utilities/networks');
  },
  async createNetwork(data: { name: string; value?: string; sortOrder?: number; isActive?: boolean }) {
    return api.post<{ network: Network }>('/utilities/networks', data);
  },
  async updateNetwork(id: string, data: Partial<Network>) {
    return api.put<{ network: Network }>(`/utilities/networks/${id}`, data);
  },
  async deleteNetwork(id: string) {
    return api.delete(`/utilities/networks/${id}`);
  },
  async reorderNetworks(items: { id: string; sortOrder: number }[]) {
    return api.post('/utilities/networks/reorder', { items });
  },

  // Brands
  async getBrands() {
    return api.get<{ brands: Brand[] }>('/utilities/brands');
  },
  async createBrand(data: { name: string; logo?: string; sortOrder?: number; isActive?: boolean }) {
    return api.post<{ brand: Brand }>('/utilities/brands', data);
  },
  async updateBrand(id: string, data: Partial<Brand>) {
    return api.put<{ brand: Brand }>(`/utilities/brands/${id}`, data);
  },
  async deleteBrand(id: string) {
    return api.delete(`/utilities/brands/${id}`);
  },
  async reorderBrands(items: { id: string; sortOrder: number }[]) {
    return api.post('/utilities/brands/reorder', { items });
  },

  // Categories
  async getCategories() {
    return api.get<{ categories: Category[] }>('/utilities/categories');
  },
  async createCategory(data: { name: string; description?: string; sortOrder?: number; isActive?: boolean }) {
    return api.post<{ category: Category }>('/utilities/categories', data);
  },
  async updateCategory(id: string, data: Partial<Category>) {
    return api.put<{ category: Category }>(`/utilities/categories/${id}`, data);
  },
  async deleteCategory(id: string) {
    return api.delete(`/utilities/categories/${id}`);
  },
  async reorderCategories(items: { id: string; sortOrder: number }[]) {
    return api.post('/utilities/categories/reorder', { items });
  },

  // Order Statuses
  async getOrderStatuses() {
    return api.get<{ orderStatuses: OrderStatusItem[] }>('/utilities/order-statuses');
  },
  async createOrderStatus(data: { name: string; value: string; color?: string; sortOrder?: number; isActive?: boolean }) {
    return api.post<{ orderStatus: OrderStatusItem }>('/utilities/order-statuses', data);
  },
  async updateOrderStatus(id: string, data: Partial<OrderStatusItem>) {
    return api.put<{ orderStatus: OrderStatusItem }>(`/utilities/order-statuses/${id}`, data);
  },
  async deleteOrderStatus(id: string) {
    return api.delete(`/utilities/order-statuses/${id}`);
  },

  // Payment Statuses
  async getPaymentStatuses() {
    return api.get<{ paymentStatuses: PaymentStatusItem[] }>('/utilities/payment-statuses');
  },
  async createPaymentStatus(data: { name: string; value: string; color?: string; sortOrder?: number; isActive?: boolean }) {
    return api.post<{ paymentStatus: PaymentStatusItem }>('/utilities/payment-statuses', data);
  },
  async updatePaymentStatus(id: string, data: Partial<PaymentStatusItem>) {
    return api.put<{ paymentStatus: PaymentStatusItem }>(`/utilities/payment-statuses/${id}`, data);
  },
  async deletePaymentStatus(id: string) {
    return api.delete(`/utilities/payment-statuses/${id}`);
  },
};

export default utilitiesApi;
