# Razorpay Payment Integration Setup

This application includes Razorpay payment gateway integration for adding funds to user accounts.

## Setup Instructions

### 1. Get Razorpay API Keys

1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Go to Settings → API Keys
3. Generate API Key ID and Secret
4. Copy the keys

### 2. Environment Configuration

Add your Razorpay credentials to the `.env` file:

```env
# Razorpay Payment Gateway
RAZORPAY_KEY_ID=rzp_test_your_key_id_here
RAZORPAY_KEY_SECRET=your_secret_key_here
```

### 3. Database Setup

The following migrations have been created:

- `create_payments_table` - Stores payment transactions
- `add_balance_to_users_table` - Adds balance field to users

Run migrations:

```bash
php artisan migrate
```

### 4. Features

#### Add Funds
- Users can add funds via the "Add" button in the header
- Secure payment processing with Razorpay
- Automatic balance updates on successful payment

#### Payment History
- View all payment transactions at `/payments/history`
- Shows payment status, amount, and transaction details

#### Database Tables

**payments table:**
- `user_id` - Foreign key to users
- `razorpay_payment_id` - Razorpay payment ID
- `razorpay_order_id` - Razorpay order ID
- `amount` - Payment amount
- `currency` - Payment currency (default: INR)
- `status` - Payment status (pending, captured, failed, cancelled)
- `method` - Payment method
- `paid_at` - Payment completion timestamp

**users table (updated):**
- `balance` - User's current balance (decimal)

### 5. API Endpoints

- `GET /payments/add-funds` - Add funds page
- `POST /payments/order` - Create Razorpay order
- `POST /payments/success` - Handle payment success
- `POST /payments/failure` - Handle payment failure
- `GET /payments/history` - Payment history

### 6. Security Features

- CSRF protection on all payment requests
- Payment signature verification
- User authentication required
- Amount validation (₹1 - ₹1,00,000)

### 7. Testing

For testing, use Razorpay's test credentials:
- Test Card: 4111 1111 1111 1111
- CVV: Any 3 digits
- Expiry: Any future date

### 8. Webhook Setup (Optional)

For production, set up webhooks in Razorpay dashboard to handle payment events automatically.

## Troubleshooting

1. **Payment not working**: Check Razorpay API keys in `.env`
2. **Balance not updating**: Check payment status in database
3. **Routes not found**: Run `php artisan route:clear` and `php artisan route:cache`

## File Structure

```
app/
├── Models/
│   ├── Payment.php
│   └── User.php (updated)
├── Http/Controllers/
│   └── PaymentController.php
database/migrations/
│   ├── create_payments_table.php
│   └── add_balance_to_users_table.php
resources/js/
│   ├── components/
│   │   └── app-sidebar-header.tsx (updated)
│   └── pages/payments/
│       ├── create.tsx
│       └── history.tsx
routes/
└── web.php (updated)
```