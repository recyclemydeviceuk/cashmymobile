import api from './api';

export interface IpWhitelistEntry {
  _id: string;
  ip: string;
  label: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiLogEntry {
  _id: string;
  timestamp: string;
  sourceIp: string;
  endpoint: string;
  method: string;
  statusCode: number;
  success: boolean;
  orderNumber?: string;
  payload: string;
  error?: string;
  responseTime: number;
}

export const apiGatewayApi = {
  // IP Whitelist endpoints
  getAllIps: () => api.get<{ ips: IpWhitelistEntry[] }>('/ip-whitelist'),
  
  getIpById: (id: string) => api.get<{ ip: IpWhitelistEntry }>(`/ip-whitelist/${id}`),
  
  addIp: (data: { ip: string; label: string }) => 
    api.post<{ ip: IpWhitelistEntry }>('/ip-whitelist', data),
  
  updateIp: (id: string, data: Partial<{ ip: string; label: string; isActive: boolean }>) =>
    api.put<{ ip: IpWhitelistEntry }>(`/ip-whitelist/${id}`, data),
  
  removeIp: (id: string) => api.delete(`/ip-whitelist/${id}`),
  
  checkIp: (ip: string) => 
    api.get<{ ip: string; isWhitelisted: boolean; label: string | null }>(`/ip-whitelist/check/${ip}`),

  // API Logs endpoints
  getAllLogs: (params?: {
    page?: number;
    limit?: number;
    success?: boolean;
    sourceIp?: string;
    startDate?: string;
    endDate?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) => api.get<{ 
    logs: ApiLogEntry[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
  }>('/api-logs', { params }),
  
  getLogById: (id: string) => api.get<{ log: ApiLogEntry }>(`/api-logs/${id}`),
  
  getLogStats: (params?: { startDate?: string; endDate?: string }) =>
    api.get<{
      totalRequests: number;
      successfulRequests: number;
      failedRequests: number;
      successRate: string;
      avgResponseTime: string;
      topSourceIps: Array<{ _id: string; count: number }>;
    }>('/api-logs/stats', { params }),
  
  cleanupOldLogs: (daysOld?: number) =>
    api.delete(`/api-logs/cleanup?daysOld=${daysOld || 90}`),

  // API Gateway test endpoint
  testOrder: (payload: Record<string, unknown>) =>
    api.post<{
      success: boolean;
      orderNumber?: string;
      message?: string;
      error?: string;
      order?: {
        id: string;
        orderNumber: string;
        status: string;
        createdAt: string;
      };
    }>('/gateway/decisiontech', payload),
};
