import api from './api';

// Debug: Log if admin token exists
const adminToken = localStorage.getItem('adminAuthToken');
console.log('Admin auth token exists:', !!adminToken);

export interface CounterOffer {
  _id: string;
  orderId: string;
  orderNumber: string;
  originalPrice: number;
  revisedPrice: number;
  reason: string;
  deviceImages: Array<{
    url: string;
    key: string;
    uploadedAt: Date;
  }>;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
  customerResponse?: 'ACCEPTED' | 'DECLINED';
  customerFeedback?: string;
  respondedAt?: Date;
  expiresAt: Date;
  reviewToken: string;
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCounterOfferData {
  revisedPrice: number;
  reason: string;
  deviceImages?: Array<{
    url: string;
    key: string;
  }>;
}

/**
 * Create a counter offer for an order (Admin)
 */
export const createCounterOffer = async (orderId: string, data: CreateCounterOfferData) => {
  // Ensure admin token is sent
  const token = localStorage.getItem('adminAuthToken');
  const response = await api.post(`/counter-offers/order/${orderId}`, data, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  return response.data;
};

/**
 * Get counter offer by review token (Public - for customer)
 */
export const getCounterOfferByToken = async (token: string) => {
  const response = await api.get(`/counter-offers/review/${token}`);
  return response.data;
};

/**
 * Accept counter offer (Customer)
 */
export const acceptCounterOffer = async (token: string) => {
  const response = await api.post(`/counter-offers/accept/${token}`);
  return response.data;
};

/**
 * Decline counter offer (Customer)
 */
export const declineCounterOffer = async (token: string, feedback?: string) => {
  const response = await api.post(`/counter-offers/decline/${token}`, { feedback });
  return response.data;
};

/**
 * Get all counter offers for an order (Admin)
 */
export const getOrderCounterOffers = async (orderId: string) => {
  const response = await api.get(`/counter-offers/order/${orderId}/all`);
  return response.data;
};
