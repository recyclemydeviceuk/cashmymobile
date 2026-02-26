import api from './api';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data?: {
    message: string;
    submissionId: string;
  };
  error?: string;
}

export const contactApi = {
  submitContactForm: async (formData: ContactFormData): Promise<ContactResponse> => {
    try {
      const response = await api.post('/contact', formData);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to submit contact form',
        error: error.response?.data?.error || error.message,
      };
    }
  },
};
