import api from './api';

interface SendOTPResponse {
  message: string;
}

interface AdminUser {
  id: string;
  email: string;
  username: string;
  role: string;
}

interface VerifyOTPResponse {
  token: string;
  admin: AdminUser;
}

interface GetMeResponse {
  admin: AdminUser;
}

export const adminAuthApi = {
  sendOTP: async (email: string) => {
    const response = await api.post<SendOTPResponse>('/auth/send-otp', { email });
    return response;
  },

  verifyOTP: async (email: string, otp: string) => {
    const response = await api.post<VerifyOTPResponse>('/auth/verify-otp', { email, otp });
    return response;
  },

  getMe: async () => {
    const response = await api.get<GetMeResponse>('/auth/me');
    return response;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response;
  },
};

export type { AdminUser, SendOTPResponse, VerifyOTPResponse, GetMeResponse };
