# IEEE RAS & IAS International Workshop — MITS DU

A full-stack event website for the International Workshop organized by IEEE Robotics and Automation Society (RAS) and IEEE Industry Applications Society (IAS) at MITS DU.

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Environment Setup
```bash
cp .env.example .env
# Edit .env with your credentials
```

### 2. Install Dependencies
```bash
cd server && npm install
cd ../client && npm install
```

### 3. Seed Admin Account
```bash
cd server && npm run seed:admin
```

### 4. Run Development Servers
```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
cd client && npm run dev
```

Frontend: http://localhost:5173
Backend API: http://localhost:5000
Admin Login: http://localhost:5173/admin/login

## Project Structure
```
ieee-workshop/
├── client/                  # React + Vite frontend
│   ├── src/
│   │   ├── components/      # All UI sections
│   │   ├── pages/           # Route pages
│   │   ├── config/          # eventConfig.js (edit all event data here)
│   │   └── styles/          # CSS design system
│   └── public/
├── server/                  # Express.js backend
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API endpoints
│   ├── controllers/         # Business logic
│   ├── middleware/           # Auth, validation, rate-limiting
│   ├── utils/               # QR, email, ID generation
│   └── scripts/             # Admin seeder
└── .env.example             # Environment template
```

## Configuration
All event data lives in `client/src/config/eventConfig.js`:
- Event title, date, time, venue
- Registration fee
- Schedule, speakers, highlights
- FAQs, contact info, social links

## Payment Integration
Razorpay integration is structured and ready. In development mode (no Razorpay keys), payments are auto-simulated. For production:
1. Set `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in `.env`
2. Add Razorpay checkout script to `index.html`

## Admin Dashboard
- URL: `/admin/login`
- Default credentials from `.env`
- Features: stats, participant search, filters, CSV export
