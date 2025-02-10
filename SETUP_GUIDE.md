# MIDC Property - Setup Guide

This guide provides detailed instructions for setting up and configuring the MIDC Property platform.

## Table of Contents
1. [Initial Setup](#initial-setup)
2. [Email Configuration](#email-configuration)
3. [Payment Integration](#payment-integration)
4. [Storage Configuration](#storage-configuration)
5. [Development Environment](#development-environment)
6. [Production Deployment](#production-deployment)
7. [Troubleshooting](#troubleshooting)

## Initial Setup

### Prerequisites
1. Node.js 18.0 or higher
2. MongoDB 4.4 or higher
3. Git
4. npm or yarn
5. A code editor (VS Code recommended)

### Installation Steps

1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/midc-property.git
cd midc-property
```

2. **Install Dependencies**
```bash
npm install
```

3. **Create Environment Files**
Create two files:
- `.env.local` for development
- `.env.production` for production

## Email Configuration

### Gmail SMTP Setup

1. **Enable 2-Step Verification**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Step Verification

2. **Generate App Password**
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and your device
   - Copy the generated password

3. **Configure Environment Variables**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_specific_password
SMTP_FROM=noreply@midcproperty.in
ADMIN_EMAIL=admin@midcproperty.in
```

### Custom Domain Email (midcproperty.in)

1. **Domain Configuration**
   - Add MX records to your domain
   - Configure SPF record
   - Set up DKIM

2. **Email Hosting Setup**
   - Set up Google Workspace or Zoho Mail
   - Configure email forwarding rules
   - Set up catch-all email (optional)

## Payment Integration

### Razorpay Setup

1. **Create Account**
   - Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com)
   - Complete KYC verification
   - Add bank account details

2. **Get API Keys**
   - Development Keys:
     ```env
     RAZORPAY_KEY_ID=rzp_test_your_key_id
     RAZORPAY_KEY_SECRET=your_key_secret
     ```
   - Production Keys:
     ```env
     RAZORPAY_KEY_ID=rzp_live_your_key_id
     RAZORPAY_KEY_SECRET=your_key_secret
     ```

3. **Configure Webhooks**
   - URL: `https://your-domain.com/api/webhooks/razorpay`
   - Events to Enable:
     - payment.captured
     - payment.failed
     - order.paid

4. **Testing**
   - Test Cards:
     ```
     Success: 4111 1111 1111 1111
     Failure: 4242 4242 4242 4242
     CVV: Any 3 digits
     Expiry: Any future date
     ```

## Storage Configuration

### AWS S3 Setup

1. **Create AWS Account**
   - Sign up at [AWS Console](https://aws.amazon.com)
   - Enable billing alerts

2. **Create S3 Bucket**
   - Name: midcproperty-uploads
   - Region: ap-south-1
   - Enable CORS

3. **Configure IAM**
   - Create new IAM user
   - Attach S3 policies
   - Get access keys

4. **Environment Variables**
```env
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=ap-south-1
AWS_BUCKET_NAME=midcproperty-uploads
```

## Development Environment

### Local Development

1. **Start MongoDB**
```bash
mongod --dbpath /path/to/data/db
```

2. **Run Development Server**
```bash
npm run dev
```

3. **Access Local Site**
- URL: http://localhost:3000
- Admin: http://localhost:3000/admin

### Testing

1. **Run Tests**
```bash
npm test               # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

2. **Test Email**
```bash
npm run test:email
```

3. **Test Payment**
```bash
npm run test:payment
```

## Production Deployment

### Server Requirements
- Node.js 18.0+
- 2GB RAM minimum
- Ubuntu 20.04 or higher

### Deployment Steps

1. **Server Setup**
```bash
# Update system
sudo apt update
sudo apt upgrade

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2
```

2. **SSL Certificate**
```bash
# Install Certbot
sudo apt install certbot
sudo certbot certonly --standalone -d midcproperty.in
```

3. **Deploy Application**
```bash
# Clone repository
git clone https://github.com/yourusername/midc-property.git
cd midc-property

# Install dependencies
npm install --production

# Build application
npm run build

# Start with PM2
pm2 start npm --name "midc-property" -- start
```

## Troubleshooting

### Common Issues

1. **Email Not Sending**
   - Check SMTP credentials
   - Verify port is not blocked
   - Check spam folder
   - Verify SPF records

2. **Payment Failures**
   - Check Razorpay dashboard
   - Verify webhook configuration
   - Check error logs
   - Test with test cards

3. **Image Upload Issues**
   - Verify S3 permissions
   - Check file size limits
   - Verify CORS configuration
   - Check AWS credentials

### Debug Commands

```bash
# Check application logs
pm2 logs midc-property

# Check error logs
pm2 logs midc-property --err

# Monitor application
pm2 monit

# Check system resources
htop
```

### Support Contacts

- Technical Support: tech@midcproperty.in
- Payment Issues: payments@midcproperty.in
- General Inquiries: contact@midcproperty.in
- Emergency: +91 7977161299

Remember to keep all credentials secure and never commit them to version control. For additional support, refer to our [documentation](https://docs.midcproperty.in) or contact our support team.
