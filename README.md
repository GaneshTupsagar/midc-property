# MIDC Property Website

A comprehensive industrial property platform for Maharashtra Industrial Development Corporation (MIDC) properties. Built with Next.js 14, React 18, and modern web technologies.

🌐 **Website**: [https://midcproperty.in](https://midcproperty.in)
📧 **Contact**: [contact@midcproperty.in](mailto:contact@midcproperty.in)
📞 **Contact Numbers**:
- Mr. Ganesh Tupsagar: [+917977161299](tel:+917977161299)
- Mr. Abhijeet: [+91937151174](tel:+91937151174)

## 🌟 Key Features

### 🏢 Property Management
- Advanced property filters (Location, Type, Area, Price)
- Interactive Google Maps integration
- Property listings with detailed information
- MIDC zone-wise property search
- Property type categorization (Industrial Shed, Factory, Warehouse, etc.)
- Nearby properties based on user location
- Real-time distance calculation

### 🔍 Advanced Search & Filters
- Location-wise search (MIDC region, zone-wise)
- Property Type filtering
- Area-wise Filter (sq. ft. or acres)
- Lease / Sale options
- Price Range Slider
- Dynamic search results
- Geolocation-based property sorting

### 🗺️ Interactive Map Integration
- Google Maps integration
- MIDC properties visualization
- Nearby facilities highlighting
- Industrial zones mapping
- Interactive property markers
- User location tracking
- Distance radius visualization

### 📱 Inquiry & Contact System
- WhatsApp & Call direct buttons
- Lead Capture Form
  - Name, Phone, Email
  - Requirement specification
  - Site visit scheduling
- Automated inquiry management
- Real-time notifications

### 👨‍💼 Admin Dashboard
- Property management (Add, Edit, Delete)
- Lead management system
- Inquiry tracking
- Site visit scheduling
- Status updates
- Analytics dashboard
- User management
- Role-based access control

### 🔐 Authentication & Security
- Secure user authentication
- Role-based authorization
- Protected admin routes
- Password visibility toggle
- Secure password storage
- Session management

### 🚀 Performance & SEO
- SEO optimized for MIDC property keywords
- Fast loading with Next.js 14
- Image optimization
- Lazy loading implementation
- Efficient caching
- Mobile responsiveness
- Geolocation optimization

## 🛠️ Tech Stack

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- @headlessui/react
- @heroicons/react

### Backend & Database
- Next.js API Routes
- MongoDB with Geospatial Queries
- Mongoose ODM
- NextAuth.js for authentication
- bcrypt for password hashing

### Maps & Location
- Google Maps API
- @react-google-maps/api
- Browser Geolocation API
- OpenCage Geocoding API
- Distance calculation utilities

### Performance & SEO
- Next.js Image Optimization
- React Intersection Observer
- Dynamic imports
- SEO metadata optimization
- Geolocation caching

### Contact & Communication
- WhatsApp API integration
- Email notifications
- Contact form management
- Site visit scheduling system

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/midc-property.git
cd midc-property
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with the following:
```env
# Database
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_specific_password
SMTP_FROM=noreply@midcproperty.in
ADMIN_EMAIL=admin@midcproperty.in

# Razorpay Payment Gateway
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

# AWS S3 Storage
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=ap-south-1
AWS_BUCKET_NAME=midcproperty-uploads

# Google Maps Integration
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://midcproperty.in
NEXT_PUBLIC_SITE_NAME=MIDC Property
NEXT_PUBLIC_CONTACT_EMAIL=contact@midcproperty.in
NEXT_PUBLIC_CONTACT_PHONE=+917977161299
```

### Email Setup Guide

1. **For Gmail SMTP:**
   - Enable 2-Step Verification in your Google Account
   - Generate an App Password:
     1. Go to Google Account Settings
     2. Navigate to Security
     3. Under "2-Step Verification", click on "App passwords"
     4. Generate a new app password for "Mail"
   - Use this app password as `SMTP_PASSWORD`

2. **For Custom Domain Email (e.g., midcproperty.in):**
   - Configure your domain's MX records
   - Set up email hosting (e.g., Google Workspace, Zoho)
   - Use the provided SMTP credentials

### Razorpay Setup Guide

1. **Create Razorpay Account:**
   - Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com)
   - Complete business verification
   - Enable test mode for development

2. **Get API Keys:**
   - Go to Settings → API Keys
   - Generate test keys for development
   - Use live keys for production

3. **Configure Webhooks:**
   - Go to Settings → Webhooks
   - Add webhook URL: `https://your-domain.com/api/webhooks/razorpay`
   - Enable events:
     - payment.captured
     - payment.failed
     - order.paid

4. **Testing:**
   - Use test card numbers:
     - Success: 4111 1111 1111 1111
     - Failure: 4242 4242 4242 4242
   - CVV: Any 3 digits
   - Expiry: Any future date

### Important Notes

1. **Environment Variables:**
   - Never commit `.env.local` to version control
   - Keep production credentials secure
   - Rotate secrets periodically
   - Use different credentials for development and production

2. **Email Configuration:**
   - Test email delivery in development
   - Configure SPF and DKIM records
   - Monitor email deliverability
   - Implement email templates

3. **Payment Integration:**
   - Test payment flow thoroughly
   - Implement proper error handling
   - Store transaction logs
   - Set up payment notifications

4. Initialize the database:
```bash
# Create initial admin and user accounts
node scripts/create-users.js
```

5. Run the development server:
```bash
npm run dev
```

6. Build for production:
```bash
npm run build
npm start
```

## 👥 Default User Accounts

After running the initialization script, you'll have access to these accounts:

### Admin Account
- Email: admin@midcproperty.in
- Password: Admin@123

### Regular User Account
- Email: user@midcproperty.in
- Password: User@123

## 📱 Mobile Responsiveness

The website is fully responsive and optimized for:
- Desktop (1024px and above)
- Tablet (768px to 1023px)
- Mobile (320px to 767px)

Key responsive features:
- Adaptive navigation menu
- Responsive property cards
- Mobile-optimized forms
- Touch-friendly interactions
- Responsive maps
- Optimized images

## 🔒 Security Features

- Protected API routes
- Secure password hashing
- CSRF protection
- Rate limiting
- Input sanitization
- Secure session management
- Protected admin routes
- Role-based access control

## 🌍 Location Features

- Real-time user location detection
- Nearby property search (50km radius)
- Distance calculation from user
- Reverse geocoding for location names
- Location-based property sorting
- Interactive map with user location
- Cached location data

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Support & Contact

### Customer Support
- **Website**: [https://midcproperty.in/support](https://midcproperty.in/support)
- **Email**: [contact@midcproperty.in](mailto:contact@midcproperty.in)
- **Primary Contact**: Mr. Ganesh Tupsagar
  - **Phone**: [+917977161299](tel:+917977161299)
- **Secondary Contact**: Mr. Abhijeet
  - **Phone**: [+91937151174](tel:+91937151174)
- **Hours**: Monday to Saturday, 9:00 AM to 6:00 PM IST

### Sales Inquiries
- **Email**: [contact@midcproperty.in](mailto:contact@midcproperty.in)
- **Sales Team**:
  - Mr. Ganesh Tupsagar: [+917977161299](tel:+917977161299)
  - Mr. Abhijeet: [+91937151174](tel:+91937151174)

### Office Address
MIDC Property
TTC Industrial Area
Navi Mumbai, Maharashtra
India

### Contact Buttons
- 💬 [WhatsApp Mr. Ganesh](https://wa.me/917977161299)
- 💬 [WhatsApp Mr. Abhijeet](https://wa.me/91937151174)
- 📞 [Call Mr. Ganesh](tel:+917977161299)
- 📞 [Call Mr. Abhijeet](tel:+91937151174)

### Social Media
- LinkedIn: [MIDC Property](https://linkedin.com/company/midcproperty)
- Twitter: [@MIDCProperty](https://twitter.com/MIDCProperty)
- Facebook: [MIDC Property](https://facebook.com/MIDCProperty)
- Instagram: [@midcproperty](https://instagram.com/midcproperty)

### Quick Links
- [Home](https://midcproperty.in)
- [Properties](https://midcproperty.in/properties)
- [About Us](https://midcproperty.in/about)
- [Contact](https://midcproperty.in/contact)
- [Blog](https://midcproperty.in/blog)
- [Terms of Service](https://midcproperty.in/terms)
- [Privacy Policy](https://midcproperty.in/privacy)

## 🌐 API Documentation
For API documentation and integration guides, visit:
[https://docs.midcproperty.in](https://docs.midcproperty.in)

## 📦 New Features and Requirements

### Property Listings
- Advanced property search with filters
- Detailed property pages with images and specifications
- Map integration for location visualization
- Property comparison tools

### Advertising Packages
- Multiple advertising tiers:
  - Basic Listing (₹4,999/30 days)
  - Premium Featured (₹9,999/30 days)
  - Banner Advertising (₹14,999/30 days)
- Secure payment integration with Razorpay
- Automated invoice generation
- Email notifications

### User Features
- Property inquiries and contact forms
- Saved searches and favorites
- User dashboard for managing listings
- Email notifications for property updates

### Admin Features
- Property listing management
- User management
- Analytics and reporting
- Content management system

### Technology Stack

- **Frontend:**
  - Next.js 14
  - React 18
  - TailwindCSS
  - TypeScript
  - Framer Motion for animations

- **Backend:**
  - Node.js
  - MongoDB
  - NextAuth.js for authentication
  - Nodemailer for email notifications

- **APIs and Services:**
  - Razorpay for payments
  - Google Maps for location services
  - AWS S3 for image storage
  - SendGrid/SMTP for emails

### Requirements

#### Environment Variables
Create a `.env.local` file with the following variables:

```env
# Database
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_specific_password
SMTP_FROM=noreply@midcproperty.in
ADMIN_EMAIL=admin@midcproperty.in

# Razorpay
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

# AWS S3
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=ap-south-1
AWS_BUCKET_NAME=midcproperty-uploads

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

#### Installation

1. Clone the repository:
```bash
git clone https://github.com/GaneshTupsagar/midc-property.git
cd midc-property
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

> midc-property@0.1.0 dev
> next dev

  ▲ Next.js 14.2.23
  - Local:        http://localhost:3000
  - Environments: .env.local, .env

 ✓ Starting...
 ✓ Ready in 3.8s
<w> [webpack.cache.PackFileCacheStrategy] Caching failed for pack: Error: Unable to snapshot resolve dependencies
 ○ Compiling / ...
 ⨯ ./node_modules/framer-motion/dist/es/animation/animate/subject.mjs:4:1
Module not found: Can't resolve '../interfaces/visual-element-target.mjs'

https://nextjs.org/docs/messages/module-not-found

Import trace for requested module:
./node_modules/framer-motion/dist/es/animation/animate/index.mjs
./node_modules/framer-motion/dist/es/index.mjs
./src/components/Navbar.tsx
<w> [webpack.cache.PackFileCacheStrategy] Caching failed for pack: Error: Unable to snapshot resolve dependencies
<w> [webpack.cache.PackFileCacheStrategy] Caching failed for pack: Error: Unable to snapshot resolve dependencies
 ⨯ ./node_modules/framer-motion/dist/es/animation/animate/subject.mjs:4:1
Module not found: Can't resolve '../interfaces/visual-element-target.mjs'

https://nextjs.org/docs/messages/module-not-found

Import trace for requested module:
./node_modules/framer-motion/dist/es/animation/animate/index.mjs
./node_modules/framer-motion/dist/es/index.mjs
./src/app/page.tsx

```bash
npm run dev
```

4. Build for production:
```bash
npm run build
npm start
```

#### Additional Requirements

- Node.js 18.0 or higher
- MongoDB 4.4 or higher
- Razorpay account for payment processing
- AWS account for S3 storage
- SMTP server for email notifications

### Development Guidelines

#### Code Style
- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Document complex functions and components

#### Testing
- Write unit tests for components
- Test payment integration thoroughly
- Verify email notifications
- Test responsive design

#### Security
- Implement rate limiting
- Validate all user inputs
- Secure API endpoints
- Handle payment data securely
- Follow security best practices

### Deployment

1. Set up environment variables on your hosting platform
2. Configure domain and SSL certificate
3. Set up MongoDB database
4. Configure AWS S3 bucket
5. Set up Razorpay webhooks
6. Deploy using platform-specific commands

### Support

For support, email contact@midcproperty.in or visit our website [midcproperty.in](https://midcproperty.in).

### License

This project is proprietary software. All rights reserved.
