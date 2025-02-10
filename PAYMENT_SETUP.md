# Payment Integration Setup Guide

This guide explains how to set up and use the Razorpay payment integration in the MIDC Property application.

## Prerequisites

1. A Razorpay account (create one at [Razorpay](https://razorpay.com))
2. API keys from your Razorpay dashboard
3. Node.js and npm installed

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory and add your Razorpay credentials:

```env
RAZORPAY_KEY_ID=your_key_id_here
RAZORPAY_KEY_SECRET=your_key_secret_here
```

Replace `your_key_id_here` and `your_key_secret_here` with your actual Razorpay API keys.

### 2. Install Dependencies

```bash
npm install razorpay @types/razorpay
```

### 3. Using the Payment Form

Import and use the PaymentForm component in your pages:

```typescript
import PaymentForm from '@/components/payment/PaymentForm';

// In your component
<PaymentForm
  amount={1000} // Amount in rupees
  email="user@example.com"
  contact="1234567890"
  onSuccess={(response) => {
    // Handle successful payment
    console.log('Payment successful:', response);
  }}
  onError={(error) => {
    // Handle payment error
    console.error('Payment failed:', error);
  }}
/>
```

## Supported Payment Methods

The integration supports the following payment methods:

1. Credit/Debit Card
2. Net Banking
3. UPI
4. Mobile Wallets
5. EMI (Easy Monthly Installments)

## Testing

For testing, use Razorpay's test card details:

- Card Number: 4111 1111 1111 1111
- Expiry: Any future date
- CVV: Any 3 digits
- Name: Any name
- 3D Secure Password: 1221

## Error Handling

The PaymentForm component provides error handling through the `onError` callback. Common errors include:

- Payment verification failed
- Network issues
- Invalid payment details
- Cancelled payment

## Security Considerations

1. Never expose your RAZORPAY_KEY_SECRET
2. Always verify payments server-side
3. Use HTTPS in production
4. Implement proper error handling
5. Store payment information securely

## Webhook Integration (Optional)

To handle asynchronous payment events, set up webhooks in your Razorpay dashboard and add the webhook URL:

```typescript
// app/api/payment/webhook/route.ts
export async function POST(req: Request) {
  // Handle webhook events
}
```

## Production Deployment

1. Ensure all environment variables are set in your production environment
2. Use proper SSL certificates
3. Test the integration thoroughly
4. Monitor payment transactions
5. Set up proper logging and error tracking

## Support

For any issues:
1. Check Razorpay documentation
2. Contact your Razorpay account manager
3. Reach out to the development team

## Additional Resources

- [Razorpay Documentation](https://razorpay.com/docs)
- [API Reference](https://razorpay.com/docs/api)
- [Testing Guide](https://razorpay.com/docs/payments/testing)
