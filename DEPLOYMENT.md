# MIDC Property - Deployment Guide

This guide provides step-by-step instructions for deploying the MIDC Property platform to production.

## Production Deployment Checklist

### 1. Pre-deployment Tasks

- [ ] Update all dependencies to latest stable versions
- [ ] Run and pass all tests
- [ ] Check for security vulnerabilities
- [ ] Backup production database
- [ ] Update environment variables
- [ ] Generate new API keys for production
- [ ] Configure domain and SSL

### 2. Server Setup

#### System Requirements
- Ubuntu 20.04 LTS or higher
- 2GB RAM minimum (4GB recommended)
- 2 CPU cores minimum
- 20GB SSD storage
- Stable internet connection

#### Initial Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install -y curl git build-essential nginx

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
sudo npm install -g pm2

# Create application directory
sudo mkdir -p /var/www/midcproperty
sudo chown -R $USER:$USER /var/www/midcproperty
```

### 3. SSL Certificate Setup

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d midcproperty.in -d www.midcproperty.in

# Auto-renewal
sudo certbot renew --dry-run
```

### 4. Nginx Configuration

Create `/etc/nginx/sites-available/midcproperty`:

```nginx
server {
    listen 80;
    server_name midcproperty.in www.midcproperty.in;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name midcproperty.in www.midcproperty.in;

    ssl_certificate /etc/letsencrypt/live/midcproperty.in/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/midcproperty.in/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # HSTS
    add_header Strict-Transport-Security "max-age=63072000" always;

    # Proxy settings
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket support
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Optimize file serving
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 7d;
        add_header Cache-Control "public, no-transform";
    }

    # Large file uploads
    client_max_body_size 10M;
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/midcproperty /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 5. Application Deployment

```bash
# Navigate to app directory
cd /var/www/midcproperty

# Clone repository
git clone https://github.com/yourusername/midc-property.git .

# Install dependencies
npm install --production

# Build application
npm run build

# Start with PM2
pm2 start npm --name "midc-property" -- start
pm2 startup
pm2 save
```

### 6. Environment Setup

Create `.env.production`:
```env
# Database
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database

# Authentication
NEXTAUTH_URL=https://midcproperty.in
NEXTAUTH_SECRET=your_production_secret

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_production_email@gmail.com
SMTP_PASSWORD=your_production_app_password
SMTP_FROM=noreply@midcproperty.in
ADMIN_EMAIL=admin@midcproperty.in

# Razorpay
RAZORPAY_KEY_ID=rzp_live_your_key_id
RAZORPAY_KEY_SECRET=your_live_key_secret

# AWS S3
AWS_ACCESS_KEY_ID=your_production_aws_key
AWS_SECRET_ACCESS_KEY=your_production_aws_secret
AWS_REGION=ap-south-1
AWS_BUCKET_NAME=midcproperty-uploads-prod
```

### 7. Monitoring Setup

```bash
# Install monitoring tools
sudo apt install -y htop

# Configure PM2 monitoring
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7

# Monitor application
pm2 monit
```

### 8. Backup Setup

Create backup script `/var/www/midcproperty/backup.sh`:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d)
BACKUP_DIR=/var/backups/midcproperty

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup MongoDB
mongodump --uri="$MONGODB_URI" --out="$BACKUP_DIR/mongodb_$DATE"

# Backup uploads
aws s3 sync s3://midcproperty-uploads-prod $BACKUP_DIR/uploads_$DATE

# Compress backups
tar -czf $BACKUP_DIR/backup_$DATE.tar.gz $BACKUP_DIR/mongodb_$DATE $BACKUP_DIR/uploads_$DATE

# Clean up
rm -rf $BACKUP_DIR/mongodb_$DATE $BACKUP_DIR/uploads_$DATE

# Keep only last 7 days of backups
find $BACKUP_DIR -name "backup_*.tar.gz" -mtime +7 -delete
```

Add to crontab:
```bash
chmod +x /var/www/midcproperty/backup.sh
(crontab -l 2>/dev/null; echo "0 2 * * * /var/www/midcproperty/backup.sh") | crontab -
```

### 9. Security Setup

```bash
# Configure firewall
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable

# Install fail2ban
sudo apt install -y fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### 10. Post-deployment Checklist

- [ ] Verify SSL certificate
- [ ] Test all forms and functions
- [ ] Check email delivery
- [ ] Verify payment processing
- [ ] Test file uploads
- [ ] Monitor error logs
- [ ] Check backup system
- [ ] Verify monitoring tools
- [ ] Test site performance
- [ ] Update DNS records

### Troubleshooting

1. **Application Issues**
```bash
# Check application logs
pm2 logs midc-property

# Check error logs
pm2 logs midc-property --err

# Monitor resources
htop
```

2. **Nginx Issues**
```bash
# Check nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Test nginx configuration
sudo nginx -t
```

3. **SSL Issues**
```bash
# Check SSL certificate
sudo certbot certificates
sudo certbot renew --dry-run
```

### Support Contacts

- Technical Issues: tech@midcproperty.in
- Server Issues: devops@midcproperty.in
- Emergency: +91 7977161299
