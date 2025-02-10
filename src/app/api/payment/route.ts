import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import crypto from 'crypto';

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

interface PaymentRequestBody {
  amount: number;
  currency?: string;
  receipt?: string;
  email?: string;
  contact?: string;
  method?: PaymentMethod;
  packageType?: string;
}

interface PaymentVerificationBody {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

// Supported payment methods
type PaymentMethod = 'card' | 'netbanking' | 'wallet' | 'upi' | 'emi';

// Payment method configuration
const paymentMethods = {
  card: {
    enabled: true,
    description: 'Credit/Debit Card'
  },
  netbanking: {
    enabled: true,
    description: 'Net Banking'
  },
  wallet: {
    enabled: true,
    description: 'Mobile Wallets'
  },
  upi: {
    enabled: true,
    description: 'UPI Payment'
  },
  emi: {
    enabled: true,
    description: 'EMI (Easy Monthly Installments)'
  }
};

export async function POST(req: Request) {
  try {
    const { 
      amount, 
      currency = 'INR', 
      receipt = `receipt_${Date.now()}`,
      email,
      contact,
      method,
      packageType
    } = await req.json() as PaymentRequestBody;

    // Special handling for 1-year free promotion
    if (amount === 0) {
      // Set package expiry to 1 year from now
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);

      // Update user's package information
      // NOTE: You need to implement the User model and its methods
      // await User.findOneAndUpdate(
      //   { email },
      //   {
      //     packageType,
      //     packageExpiry: expiryDate,
      //     updatedAt: new Date()
      //   }
      // );

      return NextResponse.json({
        success: true,
        message: "Free package activated successfully",
        packageDetails: {
          type: packageType,
          expiry: expiryDate,
          price: 0
        }
      });
    }

    // Validate payment method if provided
    if (method && !paymentMethods[method]?.enabled) {
      return NextResponse.json(
        { error: 'Selected payment method is not available' },
        { status: 400 }
      );
    }

    // Create Razorpay order with additional options
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency,
      receipt,
      notes: {
        email,
        contact,
        payment_method: method
      }
    });

    // Prepare the response with payment options
    const response = {
      success: true,
      order_id: order.id,
      amount: (order.amount as number) / 100, // Convert back to rupees
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
      payment_methods: Object.entries(paymentMethods)
        .filter(([_, config]) => config.enabled)
        .reduce((acc, [key, config]) => ({
          ...acc,
          [key]: config.description
        }), {}),
      prefill: {
        email,
        contact
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Payment error:', error);
    return NextResponse.json(
      { error: 'Error processing payment request' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = 
      await req.json() as PaymentVerificationBody;

    // Verify payment signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Get payment details
      const payment = await razorpay.payments.fetch(razorpay_payment_id);
      
      return NextResponse.json({
        success: true,
        message: "Payment verified successfully",
        payment: {
          id: payment.id,
          amount: (payment.amount as number) / 100,
          currency: payment.currency,
          method: payment.method,
          status: payment.status,
          email: payment.email,
          contact: payment.contact,
          created_at: payment.created_at
        }
      });
    }

    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 400 }
    );
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: "Error verifying payment" },
      { status: 500 }
    );
  }
}
