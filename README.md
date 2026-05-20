# Finance Tracker-Backend

A secure, feature-rich backend for personal finance management with advanced cybersecurity features and real-time monitoring.

---

## Features

### Core Financial Management

| Feature                    | Description                                                      |
| -------------------------- | ---------------------------------------------------------------- |
| **Transactions**           | Full CRUD with fraud detection, budget enforcement, pagination   |
| **Budgets**                | Category-based with rollover types, spend tracking, limit checks |
| **Financial Goals**        | Progress tracking, auto-allocation, importance scoring           |
| **Debt Management**        | Multi-type debt tracking, payment scheduling, strategy engine    |
| **Recurring Transactions** | Scheduled automation, frequency management, auto-approve         |
| **Account Management**     | Balance tracking with transaction history                        |

### Advanced Analytics

| Feature                       | Description                                            |
| ----------------------------- | ------------------------------------------------------ |
| **Enhanced Analytics**        | Multi-dimensional financial analysis with AI insights  |
| **Cash Flow Analysis**        | Daily/weekly/monthly tracking with predictive modeling |
| **Spending Forecasts**        | Statistical prediction based on historical patterns    |
| **Income Stream Analysis**    | Diversification and reliability assessment             |
| **Transaction Mood Tracking** | Emotional spending correlation and behavioral insights |
| **Contextual Insights**       | Pattern recognition and actionable recommendations     |

### Cybersecurity & Fraud Detection

| Feature                       | Description                                              |
| ----------------------------- | -------------------------------------------------------- |
| **Real-Time Fraud Detection** | 5x average anomaly flagging with risk scoring (0-100)    |
| **Fraud Pattern Recognition** | Rapid succession, amount deviation, location anomalies   |
| **Login Monitoring**          | IP tracking, geolocation, user agent fingerprinting      |
| **Security Events**           | Comprehensive audit logging with severity classification |
| **Account Protection**        | Automatic lockout, trusted locations, known IPs          |
| **Behavioral Analytics**      | Typical login hours, spending pattern deviation          |

### Real-Time Features

| Feature                         | Description                                      |
| ------------------------------- | ------------------------------------------------ |
| **Live Transaction Updates**    | Socket.IO broadcast to user rooms                |
| **Security Alert Broadcasting** | Admin room notifications for suspicious activity |
| **Budget Threshold Warnings**   | Real-time overspend alerts                       |
| **Goal Progress Updates**       | Live contribution tracking                       |

---

## Tech Stack

| Category             | Technology                              | Purpose                                   |
| -------------------- | --------------------------------------- | ----------------------------------------- |
| **Runtime**          | Node.js 18+ (ES Modules)                | Server execution environment              |
| **Framework**        | Express.js                              | HTTP server and routing                   |
| **Database**         | PostgreSQL 14+                          | Primary data store                        |
| **ORM**              | Prisma                                  | Type-safe database access with migrations |
| **Authentication**   | JWT + Refresh Tokens                    | Stateless auth with token rotation        |
| **Real-Time**        | Socket.IO                               | WebSocket-based live updates              |
| **Security**         | Helmet, rate-limit, hpp, mongo-sanitize | Defense in depth                          |
| **Validation**       | express-validator                       | Input sanitization and schema validation  |
| **Logging**          | Winston                                 | Structured JSON logging                   |
| **Password Hashing** | bcrypt (12 rounds)                      | Secure password storage                   |

---

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm
- Git

---

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd fintech-cyber-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file based on `.env.example`:

```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173

DATABASE_URL="postgresql://username:password@localhost:5432/fintech_cyber?sslmode=require"

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
BCRYPT_SALT_ROUNDS=12

SECURITY_ALERT_THRESHOLD=70
ENABLE_REALTIME_MONITORING=true
LOG_LEVEL=info
```

### 4. Database Setup

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run seed # optional
```

### 5. Start the Server

#### Development

```bash
npm run dev
```

#### Production

```bash
npm start
```

Server runs at: **[http://localhost:5000](http://localhost:5000)**

---

## Project Structure

```text
Finance-Tracker-Backend/
├── server.js              # Entry point: Express + Socket.IO setup
├── db.js                  # Prisma connection manager (singleton, retry logic)
├── logger.js              # Winston logging configuration
├── middleware/
│   └── authMiddleware.js  # JWT verification, token blacklist, admin check
├── routes/
│   ├── auth.js            # Authentication endpoints
│   ├── transactions.js    # Transaction CRUD + summary + flagged
│   ├── budgets.js         # Budget management + rollover
│   ├── goals.js           # Financial goal tracking
│   ├── debts.js           # Debt management + strategies
│   ├── analytics.js       # Financial analytics
│   ├── security.js        # Security monitoring + fraud detection
│   ├── accounts.js        # Account management
│   ├── recurringTransactions.js  # Automated payments
│   └── transactionMoods.js       # Emotional spending tracking
├── services/
│   ├── transactionService.js     # Transaction logic + fraud + budget enforcement
│   ├── budgetService.js          # Budget operations + rollover
│   ├── securityService.js        # Fraud detection + pattern analysis
│   ├── analyticsService.js       # Financial analysis
│   ├── enhancedAnalyticsService.js # AI-enhanced insights
│   ├── authService.js            # Authentication logic
│   ├── accountService.js         # Account operations
│   ├── goalService.js            # Goal tracking
│   ├── debtService.js            # Debt operations
│   ├── recurringService.js       # Recurring transaction processing
│   └── transactionMoodService.js # Mood correlation
├── prisma/
│   ├── schema.prisma      # 10 models with full relations
│   ├── migrations/        # Database migration history
│   └── seed.ts            # Sample data seeder
└── logs/                  # Application logs (Winston)
```

---

## System Architecture Documentation

### High-Level System Architecture

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ CLIENT TIER (Port 5173)                                                     │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ FINANCE-TRACKER-FRONTEND (React 18 + Vite)                              │ │
│ │                                                                         │ │
│ │ ┌─────────┐ ┌──────────┐ ┌──────────┐ ┌───────────┐ ┌────────────┐      │ │
│ │ │ Pages   │ │Dashboard │ │ Debt     │ │ UI        │ │ Services   │      │ │
│ │ │ Login   │ │ Analytics│ │Tracker   │ │Components │ │ API Layer  │      │ │
│ │ │Register │ │ Budgets  │ │Manager   │ │Magnetic   │ │ Axios      │      │ │
│ │ │Landing  │ │ Goals    │ │Payments  │ │Cursor     │ │ Socket.IO  │      │ │
│ │ │HomePage │ │ Security │ │          │ │MultiFilter│ │ Client     │      │ │
│ │ └─────────┘ └──────────┘ └──────────┘ └───────────┘ └────────────┘      │ │
│ │                                                                         │ │
│ │ ┌──────────────── CONTEXT PROVIDER HIERARCHY ────────────────┐          │ │
│ │ │ AuthProvider → SocketProvider → TransactionsProvider       │          │ │
│ │ │ → AccountsProvider → BudgetsProvider → GoalsProvider       │          │ │
│ │ │ → DebtProvider → TransactionMoodProvider                   │          │ │
│ │ │ → DashboardProvider                                        │          │ │
│ │ └────────────────────────────────────────────────────────────┘          │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ HTTPS / WSS (CORS Configured)
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ APPLICATION TIER (Port 5000)                                                │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ FINANCE-TRACKER-BACKEND (Node.js + Express)                             │ │
│ │                                                                         │ │
│ │ ┌──────────── SECURITY MIDDLEWARE CHAIN ─────────────┐                  │ │
│ │ │ Helmet → CORS → Rate Limiter → HPP                 │                  │ │
│ │ │ → MongoSanitize → JSON                             │                  │ │
│ │ └────────────────────────────────────────────────────┘                  │ │
│ │                                                                         │ │
│ │ ┌──────────── RATE LIMITING LAYERS ─────────────────┐                   │ │
│ │ │ General: 100 req/15min                            │                   │ │
│ │ │ Mood: 500/15min                                   │                   │ │
│ │ │ Auth: 3/15min                                     │                   │ │
│ │ │ Budget Check: 60/min                              │                   │ │
│ │ │ Health: Unlimited                                 │                   │ │
│ │ └───────────────────────────────────────────────────┘                   │ │
│ │                                                                         │ │
│ │ ┌────────── API ROUTE LAYER (9 Route Modules) ───────────┐              │ │
│ │ │ /api/auth                                              │              │ │
│ │ │ /api/transactions                                      │              │ │
│ │ │ /api/budgets                                           │              │ │
│ │ │ /api/goals                                             │              │ │
│ │ │ /api/accounts                                          │              │ │
│ │ │ /api/analytics                                         │              │ │
│ │ │ /api/security                                          │              │ │
│ │ │ /api/debts                                             │              │ │
│ │ │ /api/recurring-transactions                            │              │ │
│ │ │ /api/transaction-mood                                  │              │ │
│ │ └────────────────────────────────────────────────────────┘              │ │
│ │                                                                         │ │
│ │ ┌──────────── SERVICE LAYER (11 Services) ────────────┐                 │ │
│ │ │ TransactionService                                  │                 │ │
│ │ │ BudgetService                                       │                 │ │
│ │ │ SecurityService                                     │                 │ │
│ │ │ AnalyticsService                                    │                 │ │
│ │ │ GoalService                                         │                 │ │
│ │ │ AuthService                                         │                 │ │
│ │ │ AccountService                                      │                 │ │
│ │ │ DebtService                                         │                 │ │
│ │ │ RecurringService                                    │                 │ │
│ │ │ EnhancedAnalyticsService                            │                 │ │
│ │ │ TransactionMoodService                              │                 │ │
│ │ └─────────────────────────────────────────────────────┘                 │ │
│ │                                                                         │ │
│ │ ┌──────────────── REAL-TIME LAYER ────────────────┐                     │ │
│ │ │ Socket.IO Server                                │                     │ │
│ │ │ ├── join_user_room (userId)                     │                     │ │
│ │ │ ├── monitor_transaction → admin_security room   │                     │ │
│ │ │ └── User-specific event broadcasting            │                     │ │
│ │ └─────────────────────────────────────────────────┘                     │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      │ Prisma ORM (Connection Pool)
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ DATABASE TIER (PostgreSQL)                                                  │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ PRISMA SCHEMA MODELS                                                    │ │
│ │                                                                         │ │
│ │ ┌──────────┐ ┌───────────────┐ ┌──────────────┐ ┌─────────────┐         │ │
│ │ │ User     │ │ Transaction   │ │ Budget       │ │ Account     │         │ │
│ │ │ 1 ───────┼─│ N ────────────┼─│ N ───────────┼─│ N ──────────│         │ │
│ │ │          │ │               │ │              │ │             │         │ │
│ │ │ 1 ───────┼─│────── 1 ───── │ │              │ │             │         │ │
│ │ │          │ │TransactionMood│ │              │ │             │         │ │
│ │ │          │ │               │ │              │ │             │         │ │
│ │ │ 1 ───────┼─│ N ────────────┼─│ N ───────────┼─│ N ──────────│         │ │
│ │ │          │ │ SecurityLog   │ │SecurityEvent │ │FinancialGoal│         │ │
│ │ │          │ │               │ │              │ │             │         │ │
│ │ │ 1 ───────┼─│ N ────────────┼─│ N ───────────┼─│ N ──────────│         │ │
│ │ │          │ │RecurringTxn   │ │ Debt         │ │             │         │ │
│ │ └──────────┘ └───────────────┘ └──────────────┘ └─────────────┘         │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Data Flow Architecture

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DATA FLOW DIAGRAM                                 │
└─────────────────────────────────────────────────────────────────────────────┘

REQUEST FLOW (Create Transaction Example):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[React Component]          [Express Server]              [PostgreSQL]
       │                            │                           │
       │ 1. User submits form       │                           │
       │ POST /api/transactions     │                           │
       │ {amount, type, category, date}                         │
       ├───────────────────────────>│                           │
       │                            │                           │
       │        ┌───────────────────┴───────────────────┐       │
       │        │ SECURITY MIDDLEWARE CHAIN             │       │
       │        │ ├─ Helmet (CSP, XSS Protection)       │       │
       │        │ ├─ CORS (Origin Validation)           │       │
       │        │ ├─ Rate Limiter (Request Check)       │       │
       │        │ ├─ HPP (Param Pollution Protection)   │       │
       │        │ ├─ MongoSanitize (Injection Prev)     │       │
       │        │ └─ JSON Parser (10kb limit)           │       │
       │        └───────────────────┬───────────────────┘       │
       │                            │                           │
       │        ┌───────────────────┴───────────────────┐       │
       │        │ authenticateToken MIDDLEWARE          │       │
       │        │ ├─ Check Authorization Header         │       │
       │        │ ├─ Extract Bearer Token               │       │
       │        │ ├─ Check Token Blacklist              │       │
       │        │ ├─ JWT.verify(token, secret)          │       │
       │        │ └─ Attach user to req.user            │       │
       │        └───────────────────┬───────────────────┘       │
       │                            │                           │
       │        ┌───────────────────┴───────────────────┐       │
       │        │ EXPRESS-VALIDATOR (Input Check)       │       │
       │        │ ├─ amount: positive float             │       │
       │        │ ├─ type: income|expense               │       │
       │        │ ├─ category: 1-50 chars, sanitized    │       │
       │        │ ├─ date: ISO8601, no future dates     │       │
       │        │ └─ description: optional, escaped     │       │
       │        └───────────────────┬───────────────────┘       │
       │                            │                           │
       │        ┌───────────────────┴───────────────────┐       │
       │        │ TransactionService.createTransaction  │       │
       │        │                                       │       │
       │        │ 1. Find user account                  │       │
       │        │ prisma.account.findFirst() ───────────┼──────>│
       │        │ <─────────────────────────────────────┼───────│
       │        │                                       │       │
       │        │ 2. Check budget limits                │       │
       │        │ a. Find active budget ────────────────┼──────>│
       │        │ b. Calculate current spending ────────┼──────>│
       │        │ c. Compare with limit                 │       │
       │        │                                       │       │
       │        │ 3. Fraud detection                    │       │
       │        │ a. Calculate avg transaction ─────────┼──────>│
       │        │ b. Compare amount ratio               │       │
       │        │ c. Flag if 5x above average           │       │
       │        │                                       │       │
       │        │ 4. Create transaction ────────────────┼──────>│
       │        │ <─────────────────────────────────────┼───────│
       │        │                                       │       │
       │        │ 5. Update budget spent ───────────────┼──────>│
       │        │                                       │       │
       │        │ 6. Log security event (if flagged) ───┼──────>│
       │        │                                       │       │
       │        │ 7. Emit Socket.IO event               │       │
       │        └───────────────────┬───────────────────┘       │
       │                            │                           │
       │ <──── 201 Response ────────│                           │
       │ {transaction, warning?, fraudReason?}                  │
       │                            │                           │

REAL-TIME FLOW (Socket.IO):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Frontend Socket.IO Client]   [Backend Socket.IO Server]   [Admin Client]
              │                             │                       │
              │ 1. On login, emit:          │                       │
              │ 'join_user_room', userId    │                       │
              ├────────────────────────────>│                       │
              │                             │ socket.join()         │
              │                             │                       │
              │ 2. When transaction created:│                       │
              │ Server broadcasts to user room                      │
              │ <──── 'transaction_created' ─────────────────────── │
              │                             │                       │
              │ 3. When fraud detected:     │                       │
              │                             │ 'monitor_transaction' ├────>
              │                             │ to 'admin_security'   │

TOKEN REFRESH FLOW:
━━━━━━━━━━━━━━━━━━━

[Frontend Axios Interceptor]      [Backend /api/auth/refresh]
                │                               │
                │ 1. API call returns 403       │
                │ "Token expired"               │
                │                               │
                │ 2. Check if refreshing already│
                │ ├─ Yes: Queue request         │
                │ └─ No: Set isRefreshing=true  │
                │                               │
                ├──────────────────────────────>│
                │ 3. POST /api/auth/refresh     │
                │ {refreshToken}                │
                │ <──── {accessToken} ───────── │
                │                               │
                │ 4. Update localStorage        │
                │ Update axios defaults         │
                │                               │
                │ 5. Process queued requests    │
                │ with new token                │
                │                               │
                │ 6. Retry original request     │
```

---

### Architecture Layers

| Layer               | Responsibility                                         | Key Components                                 |
| ------------------- | ------------------------------------------------------ | ---------------------------------------------- |
| **API Routes**      | HTTP request handling, validation, response formatting | 9 route modules with express-validator         |
| **Service Layer**   | Business logic, fraud detection, data processing       | 11 service classes with Prisma ORM             |
| **Database Layer**  | Data persistence, connection pooling, transactions     | PostgreSQL with Prisma connection manager      |
| **Security Layer**  | Defense in depth across all layers                     | Helmet, rate limiting, JWT, input sanitization |
| **Real-Time Layer** | WebSocket events, live monitoring                      | Socket.IO with room-based broadcasting         |

---

## Security Features

### Authentication & Authorization

- JWT‑based authentication with refresh tokens
- Role‑based access control (Admin / User)
- Token blacklisting for immediate revocation
- Rate limiting on sensitive endpoints

### Data Protection

- Input validation & sanitization
- SQL injection prevention
- XSS protection via Helmet
- Secure CORS configuration
- Password hashing using bcrypt

### Monitoring & Detection

- Real‑time transaction monitoring
- Spending anomaly detection
- Suspicious login tracking
- IP‑based location analysis
- Security event logging & audit trails

### Security Architecture Layers

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SECURITY DEFENSE IN DEPTH                            │
└─────────────────────────────────────────────────────────────────────────────┘

LAYER 1: NETWORK SECURITY
┌─────────────────────────────────────────────────────────────────────────────┐
│ Helmet.js                                                                   │
│ ├── Content-Security-Policy (CSP): default-src 'self'                       │
│ ├── X-Frame-Options: DENY                                                   │
│ ├── X-Content-Type-Options: nosniff                                         │
│ ├── Strict-Transport-Security: max-age=31536000                             │
│ └── X-XSS-Protection: 1; mode=block                                         │
│                                                                             │
│ CORS (Origin Validation)                                                    │
│ ├── Allowed Origins: [localhost:5173, 127.0.0.1:5173, FRONTEND_URL]         │
│ ├── Credentials: true                                                       │
│ └── Methods: GET, POST, PUT, DELETE, OPTIONS                                │
└─────────────────────────────────────────────────────────────────────────────┘

LAYER 2: APPLICATION SECURITY
┌─────────────────────────────────────────────────────────────────────────────┐
│ Rate Limiting                                                               │
│ ├── General API: 100 requests/15 minutes                                    │
│ ├── Auth Endpoints: 3 requests/15 minutes                                   │
│ │   (brute force protection)                                                │
│ ├── Budget Checks: 60 requests/minute                                       │
│ └── Mood Tracking: 500 requests/15 minutes                                  │
│                                                                             │
│ Input Protection                                                            │
│ ├── hpp(): HTTP Parameter Pollution protection                              │
│ ├── mongoSanitize(): NoSQL injection prevention                             │
│ ├── express-validator: Schema validation + sanitization                     │
│ └── JSON body limit: 10kb                                                   │
└─────────────────────────────────────────────────────────────────────────────┘

LAYER 3: AUTHENTICATION & AUTHORIZATION
┌─────────────────────────────────────────────────────────────────────────────┐
│ JWT Token System                                                            │
│ ├── Access Token: Short-lived (JWT signed)                                  │
│ ├── Refresh Token: Long-lived (stored client-side)                          │
│ ├── Token Blacklist: In-memory (Redis-ready for production)                 │
│ ├── Automatic 24-hour blacklist cleanup                                     │
│ └── Role-based: authenticateToken → requireAdmin                            │
│                                                                             │
│ Password Security                                                           │
│ ├── bcrypt hashing (12 salt rounds)                                         │
│ └── Minimum password requirements enforced                                  │
└─────────────────────────────────────────────────────────────────────────────┘

LAYER 4: DATA SECURITY
┌─────────────────────────────────────────────────────────────────────────────┐
│ Database Protection                                                         │
│ ├── Prisma ORM: Parameterized queries                                       │
│ │   (prevents SQL injection)                                                │
│ ├── Connection pooling with retry logic                                     │
│ │   (max 3 attempts)                                                        │
│ ├── Exponential backoff on connection failure                               │
│ └── Transaction support with automatic rollback                             │
│                                                                             │
│ Data in Transit                                                             │
│ ├── HTTPS recommended for production                                        │
│ └── Encrypted JWT tokens                                                    │
└─────────────────────────────────────────────────────────────────────────────┘

LAYER 5: MONITORING & DETECTION
┌─────────────────────────────────────────────────────────────────────────────┐
│ Real-time Security Monitoring                                               │
│ ├── Transaction anomaly detection                                           │
│ │   (5x average flagging)                                                   │
│ ├── Fraud pattern recognition                                               │
│ │   (rapid succession, amount deviations)                                   │
│ ├── Login attempt tracking with IP/city/country                             │
│ ├── Suspicious transaction flagging                                         │
│ │   with risk scoring (0-100)                                               │
│ └── Security event audit logging                                            │
│                                                                             │
│ Behavioral Analytics                                                        │
│ ├── Typical login hours tracking                                            │
│ ├── Known IPs whitelist                                                     │
│ ├── User agent fingerprinting                                               │
│ └── Trusted locations mapping                                               │
│                                                                             │
│ Logging & Auditing                                                          │
│ ├── Winston structured logging                                              │
│ │   (JSON in production)                                                    │
│ ├── Auth-specific logging                                                   │
│ │   (attempts, successes, failures, revocations)                            │
│ ├── Security event persistence to SecurityLog table                         │
│ └── Automatic suspicious 404 logging for API routes                         │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Fraud Detection Pipeline

```text
Transaction Created
│
▼
Budget Check ──────────> Exceeds limit? ──> Block or Warn
│
▼
Average Calculation ───> 5x above average? ──> Flag + Risk Score 85
│
▼
Rapid Succession ──────> < 5 min interval? ──> Flag + Risk Score +10
│
▼
Amount Deviation ──────> > 2 std dev? ──> Flag + Risk Score +15
│
▼
Location Check ────────> Unusual IP? ──> Flag + Risk Score +20
│
▼
Final Risk Score (0-100)
│
├── 0-30: Allow
├── 31-60: Flag for Review
├── 61-80: High Risk Alert
└── 81-100: Recommend Block
```

---

### Key Models

| Model                    | Records                   | Key Fields                                                            |
| ------------------------ | ------------------------- | --------------------------------------------------------------------- |
| **User**                 | Authentication & security | email, password, lastLogin, loginAttempts, trustedLocations, knownIPs |
| **Transaction**          | Financial records         | amount, type, category, flagged, fraudReason, riskScore               |
| **Budget**               | Spending limits           | category, limit, spent, rolloverType, allowExceed                     |
| **FinancialGoal**        | Savings targets           | name, targetAmount, currentAmount, deadline, allocationPercentage     |
| **Debt**                 | Liability tracking        | type, principal, balance, interestRate, minimumPayment                |
| **SecurityLog**          | Audit trail               | action, ipAddress, details, riskScore                                 |
| **SecurityEvent**        | Suspicious activity       | type, severity, metadata, resolved                                    |
| **TransactionMood**      | Emotional context         | mood, intensity, notes                                                |
| **RecurringTransaction** | Automated payments        | frequency, interval, autoApprove, nextRunDate                         |

## Database Entity Relationship Diagram

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DATABASE SCHEMA RELATIONSHIPS                       │
└─────────────────────────────────────────────────────────────────────────────┘

                              ┌──────────────────┐
                              │      User        │
                              │──────────────────│
                              │ id (PK)          │
                              │ email (unique)   │
                              │ password (hash)  │
                              │ name             │
                              │ lastLogin        │
                              │ lastLoginIP      │
                              │ lastLoginCity    │
                              │ lastLoginCountry │
                              │ loginAttempts    │
                              │ lockedUntil      │
                              │ isVerified       │
                              │ twoFactorSecret  │
                              │ trustedLocations │
                              │ securityPrefs    │
                              │ typicalLoginHrs  │
                              │ knownIPs         │
                              │ lastUserAgent    │
                              │ alertEmailEnabled│
                              └────────┬─────────┘
                                       │ 1
                    ┌──────────────────┼──────────────────┐
                    │                  │                  │
                    │ N                │ N                │ N
          ┌─────────┴──────┐  ┌───────┴────────┐  ┌──────┴──────────┐
          │    Account     │  │  SecurityLog   │  │  SecurityEvent  │
          │────────────────│  │────────────────│  │─────────────────│
          │ id (PK)        │  │ id (PK)        │  │ id (PK)         │
          │ userId (FK) ───┼──│ userId (FK) ───┼──│ userId (FK) ────│
          │ name           │  │ action         │  │ type            │
          │ balance        │  │ ipAddress      │  │ severity        │
          └────────┬───────┘  │ userAgent      │  │ title           │
                   │          │ timestamp      │  │ message         │
                   │ 1        │ details        │  │ metadata (JSON) │
                   │          │ riskScore      │  │ resolved        │
                   │          └────────────────┘  └─────────────────┘
        ┌──────────┼──────────┐
        │ N        │ N        │ N
┌───────┴──────┐ ┌─┴──────────┴──┐ ┌──────────────────┐
│ Transaction  │ │RecurringTxn   │ │ TransactionMood  │
│──────────────│ │───────────────│ │──────────────────│
│ id (PK)      │ │ id (PK)       │ │ id (PK)          │
│ accountId(FK)│ │ userId (FK)   │ │ transactionId(FK)│
│ amount       │ │ accountId(FK) │ │ userId (FK)      │
│ type         │ │ amount        │ │ mood             │
│ category     │ │ type          │ │ notes            │
│ date         │ │ category      │ │ intensity (1-10) │
│ description  │ │ frequency     │ └──────────────────┘
│ flagged      │ │ interval      │
│ fraudReason  │ │ startDate     │
│ riskScore    │ │ endDate       │
│ reviewed     │ │ lastRun       │
│ isRecurring  │ │ isActive      │
└──────────────┘ │ autoApprove   │
                 │ nextRunDate   │
                 │ totalRuns     │
                 └───────────────┘

┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│     Budget       │  │  FinancialGoal   │  │      Debt        │
│──────────────────│  │──────────────────│  │──────────────────│
│ id (PK)          │  │ id (PK)          │  │ id (PK)          │
│ userId (FK)      │  │ userId (FK)      │  │ userId (FK)      │
│ category         │  │ name             │  │ name             │
│ limit            │  │ targetAmount     │  │ type             │
│ spent            │  │ currentAmount    │  │ principal        │
│ period           │  │ deadline         │  │ balance          │
│ rolloverType     │  │ category         │  │ interestRate     │
│ rolloverAmount   │  │ importance(1-5)  │  │ minimumPayment   │
│ isActive         │  │ allocationPct    │  │ startDate        │
│ allowExceed      │  │ isActive         │  │ dueDate          │
└──────────────────┘  │ isCompleted      │  │ isActive         │
                      │ completedAt      │  │ termMonths       │
                      └──────────────────┘  │ paymentsMade     │
                                            │ lender           │
                                            │ accountNumber    │
                                            └──────────────────┘
```

---

## API Documentation

### Authentication (`/api/auth`)

| Method | Endpoint    | Auth | Description                          |
| ------ | ----------- | ---- | ------------------------------------ |
| POST   | `/register` | No   | Create account, receive JWT          |
| POST   | `/login`    | No   | Authenticate, rate-limited (3/15min) |
| POST   | `/logout`   | Yes  | Revoke token (blacklist)             |
| POST   | `/refresh`  | No   | Rotate access token                  |
| GET    | `/profile`  | Yes  | Get user details                     |

### Transactions (`/api/transactions`)

| Method | Endpoint                     | Auth | Description                                  |
| ------ | ---------------------------- | ---- | -------------------------------------------- |
| GET    | `/`                          | Yes  | Paginated transactions (20/page, max 50)     |
| GET    | `/all`                       | Yes  | All transactions (dashboard)                 |
| GET    | `/summary?timeframe=monthly` | Yes  | Aggregated summary                           |
| GET    | `/flagged`                   | Yes  | Fraud-flagged transactions                   |
| GET    | `/category/:category`        | Yes  | Category-filtered with stats                 |
| POST   | `/`                          | Yes  | Create with fraud check + budget enforcement |
| PUT    | `/:id`                       | Yes  | Update transaction                           |
| DELETE | `/:id`                       | Yes  | Delete with budget adjustment                |
| PATCH  | `/:id/review`                | Yes  | Clear fraud flag                             |

### Budgets (`/api/budgets`)

| Method | Endpoint           | Auth | Description                  |
| ------ | ------------------ | ---- | ---------------------------- |
| GET    | `/`                | Yes  | All budgets                  |
| GET    | `/overview`        | Yes  | Performance summary          |
| POST   | `/`                | Yes  | Create budget                |
| PUT    | `/:id`             | Yes  | Update budget                |
| DELETE | `/:id`             | Yes  | Delete budget                |
| POST   | `/check-limit`     | Yes  | Pre-transaction limit check  |
| POST   | `/sync`            | Yes  | Sync spent with transactions |
| GET    | `/recommendations` | Yes  | Smart budget suggestions     |

### Analytics (`/api/analytics`)

| Method | Endpoint                       | Auth | Description                   |
| ------ | ------------------------------ | ---- | ----------------------------- |
| GET    | `/overview`                    | Yes  | Dashboard analytics           |
| GET    | `/enhanced?timeframe=monthly`  | Yes  | AI-enhanced insights          |
| GET    | `/cash-flow?granularity=daily` | Yes  | Flow analysis                 |
| GET    | `/income-breakdown`            | Yes  | Income stream analysis        |
| GET    | `/forecast?days=30`            | Yes  | Spending predictions          |
| GET    | `/contextual-insights`         | Yes  | Pattern-based recommendations |

### Security (`/api/security`)

| Method | Endpoint                   | Auth | Description                   |
| ------ | -------------------------- | ---- | ----------------------------- |
| GET    | `/overview`                | Yes  | Comprehensive security status |
| GET    | `/login-attempts?days=30`  | Yes  | Login history                 |
| GET    | `/suspicious-transactions` | Yes  | Flagged activity              |
| GET    | `/logs`                    | Yes  | Audit trail                   |
| POST   | `/monitor-transaction`     | Yes  | Real-time fraud check         |
| POST   | `/alert-preferences`       | Yes  | Configure notifications       |

### Additional Endpoints

| Module        | Base Path                     | Description                                       |
| ------------- | ----------------------------- | ------------------------------------------------- |
| **Goals**     | `/api/goals`                  | Goal CRUD + contributions + auto-allocation       |
| **Debts**     | `/api/debts`                  | Debt management + payment scheduling + strategies |
| **Recurring** | `/api/recurring-transactions` | Automated payment scheduling                      |
| **Moods**     | `/api/transaction-mood`       | Emotional spending tracking + analysis            |
| **Accounts**  | `/api/accounts`               | Account management                                |
| **Health**    | `/health`                     | Server health check                               |

---

## Development

### Testing

```bash
npm test
```

Tests are implemented using **Jest** and **Supertest**.

### Database Management

```bash
npx prisma generate
npx prisma migrate dev --name migration_name
npx prisma migrate reset
npx prisma studio
```

### Logging

```text
Level   Usage
──────────────────────────────────────────────────────────────────────────────
error   Application errors, database failures, security breaches
warn    Suspicious activities, budget exceeding, CORS blocks
info    Server startup, user actions, transaction summaries
http    API requests with method, path, status
debug   Development details, query execution
```

### Production Logging

- Structured JSON format
- Separate auth-specific logging
- Security event persistence to database
- Automatic suspicious 404 logging for API routes

---

## Real‑Time Features

### Socket.IO Events

```text
Event                  Direction           Description
──────────────────────────────────────────────────────────────────────────────
join_user_room         Client → Server     Subscribe to user-specific updates
monitor_transaction    Client → Server     Send transaction for admin monitoring
transaction_created    Server → Client     New transaction notification
security_alert         Server → Client     Suspicious activity alert
budget_warning         Server → Client     Budget threshold exceeded
goal_progress          Server → Client     Goal milestone achieved
```

---

## Performance

- Connection Pooling: Prisma-managed with retry logic (exponential backoff)
- Pagination: 20 items/page, max 50 per request
- Parallel Queries: Promise.all for independent data fetching
- Body Limit: 10kb JSON to prevent memory exhaustion
- Socket.IO: Room-based broadcasting for efficient real-time updates

---

## Deployment

### Production Checklist

- Set strong JWT_SECRET (min 64 chars)
- Set NODE_ENV=production
- Configure production PostgreSQL with SSL
- Enable HTTPS
- Set up Redis for token blacklist (replace in-memory Set)
- Configure proper CORS origins
- Set up external monitoring (PM2, Docker healthchecks)
- Schedule regular database backups
- Review rate limiting thresholds

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your fork
5. Open a Pull Request

---

## License

MIT License — see the `LICENSE` file for details.

---

## Support

- Check existing issues
- Review documentation
- Create a detailed issue report if needed

Built by **Khalfaan Khan**

---

> **Note:** This backend is designed with fintech‑grade security in mind. Always review and harden configuration before deploying to production.
