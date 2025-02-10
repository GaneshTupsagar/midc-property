export type PaymentMethod = 'card' | 'netbanking' | 'wallet' | 'upi' | 'emi';

export interface PaymentMethodConfig {
  enabled: boolean;
  description: string;
}

export interface PaymentMethods {
  [key: string]: PaymentMethodConfig;
}

export interface PaymentRequestBody {
  amount: number;
  currency?: string;
  receipt?: string;
  email?: string;
  contact?: string;
  method?: PaymentMethod;
}

export interface PaymentVerificationBody {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface PaymentResponse {
  success: boolean;
  order_id: string;
  amount: number;
  currency: string;
  key: string;
  payment_methods: {
    [key: string]: string;
  };
  prefill: {
    email?: string;
    contact?: string;
  };
}

export interface PaymentVerificationResponse {
  success: boolean;
  message: string;
  payment?: {
    id: string;
    amount: number;
    currency: string;
    method: string;
    status: string;
    email?: string;
    contact?: string;
    created_at: number;
  };
  error?: string;
}
