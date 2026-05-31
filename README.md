# Enterprise-Grade Loan Management System (LMS)

A state-of-the-art, secure, and fully automated role-based Loan Management System (LMS) designed for modern financial institutions. Engineered with **Next.js (App Router)**, **TypeScript**, **Node.js/Express**, and **MongoDB**, this platform features a robust Business Rule Engine (BRE), accurate daily-accrued interest ledger tracking, integrated RBAC controls, and a context-aware AI Assistant.

## 🌐 Deployed Live Link
Experience the live operational portal: **[CreditSea Production Portal](https://creditsea-frontend-4jlb.onrender.com)**

## 🎬 Project Walkthrough Video
Watch the high-fidelity end-to-end walkthrough of the Loan Management System on YouTube: **[CreditSea Loan Management System Demonstration](https://youtu.be/_0Asjnh1oSY)**

---

## 💎 Core Enterprise Capabilities

### 1. End-to-End Reactive Loan Lifecycle
The platform manages the complete loan transition matrix from initial draft to final ledger balancing and closure:

```
[Borrower Draft] ──> [Submitted & BRE Screened] ──> [Sales Verified]
                                                          │
                                                          ▼
[Closed (Outstanding: 0)] <── [Disbursed] <── [Sanction Approved]
```

*   **Step 1: Application Submission**: Borrowers request loans between **₹50,000 and ₹5,00,000**. The BRE synchronously evaluates credit scoring criteria.
*   **Step 2: Sales Screening**: Sales Executives review salary slips, verify banking references, and transition applicants to verified status.
*   **Step 3: Sanction Evaluation**: Sanction Executives review credit profiles, finalize sanction terms, and sign the official sanction packet.
*   **Step 4: Banking Disbursal**: Disbursement Executives validate transaction credentials and release funds directly to the borrower's registered account.
*   **Step 5: Ledger & Collections**: Collection Executives record payment receipts, track outstanding balances, and recover pending installments.

### 2. High-Fidelity Business Rule Engine (BRE)
Every loan request undergoes synchronous risk evaluation via the custom BRE layer:
*   **Age Bound validation**: Applicant age must be between **23 and 50** years of age.
*   **Financial Sufficiency**: Monthly gross income must be at least **₹25,000**.
*   **Active Employment Verification**: Employment status must be `SALARIED` or `SELF_EMPLOYED`.
*   **PAN Format Integrity**: Format validation using standard Regex `^[A-Z]{5}[0-9]{4}[A-Z]{1}$`.

### 3. Precision Loan Mathematics & Daily Accruals
The core ledger balances are computed daily using simple interest accruals to maintain absolute financial precision:
*   **Accrual Mathematical Formula**:
    $$\text{Interest Amount} = \frac{\text{Principal} \times 12 \times \text{Tenure (Days)}}{365 \times 100}$$
    *(where $R = 12\%$ per annum fixed simple interest)*
*   **Total Repayment Ledger**:
    $$\text{Total Repayment} = \text{Principal} + \text{Interest Amount}$$
*   **Automated State Transitions**: A background ledger observer automatically transitions active loans to the `CLOSED` state once the `outstandingBalance` is recorded as exactly `0`.

### 4. Interactive Gemini AI Assistant
A built-in custom support chatbot powered by **Google Gemini 2.5 Flash** is integrated directly into the portal. The assistant is natively configured with the platform's specific loan products, interest rate bounds (12% p.a.), ranges (₹50K - ₹5L), and mathematical accrual logic to assist borrowers in real time.

---

## 🛠️ Repository & Architecture Structure

```text
├── backend/
│   ├── src/
│   │   ├── config/          # DB & System Connection Handlers
│   │   ├── controllers/     # API Route Handlers (Auth, Applications, Loans, Repayments)
│   │   ├── middleware/      # Strict RBAC and Token validation guards
│   │   ├── models/          # MongoDB Schema definitions (User, Application, Loan, Payment, AuditLog)
│   │   ├── routes/          # Express API route configurations
│   │   ├── services/        # BRE Engine and state machine logic
│   │   └── utils/           # Daily interest and financial calculators
│   └── scripts/             # Data seeds and DB utilities
└── frontend/
    └── src/
        ├── app/             # Next.js App Router & Dashboard pages
        ├── components/      # Sleek, premium custom reusable UI components
        └── lib/             # API connection clients and typings
```

---

## ☁️ Cloud Deployment Configuration (Render)

This repository is fully configured using **Infrastructure as Code (Render Blueprints)** for single-click, secure deployments.

### Option A: Automatic Blueprint Deployment (Recommended)
1. Push this monorepo to your connected **GitHub repository**.
2. Log in to [Render](https://render.com).
3. Navigate to **Blueprints** and click **New Blueprint Instance**.
4. Select your GitHub repository.
5. Render will automatically parse `render.yaml` and provision both required services:
    *   **`creditsea-backend`** (Node.js REST API Web Service)
    *   **`creditsea-frontend`** (Next.js Application Web Service)
6. Supply the required environment values in the Render dashboard and approve the build.

### Option B: Manual Service Deployment

If deploying manually, configure the two services as follows:

#### 1. Backend Web Service (`creditsea-backend`)
*   **Root Directory**: `backend`
*   **Runtime**: `Node`
*   **Build Command**: `npm install && npm run build`
*   **Start Command**: `npm start`
*   **Environment Variables**:
    *   `PORT`: `5000`
    *   `MONGO_URI`: *Your MongoDB Atlas connection URI.*
    *   `JWT_SECRET`: *A secure random string used to sign user tokens.*
    *   `NODE_ENV`: `production`

#### 2. Frontend Web Service (`creditsea-frontend`)
*   **Root Directory**: `frontend`
*   **Runtime**: `Node`
*   **Build Command**: `npm install && npm run build`
*   **Start Command**: `npm start`
*   **Environment Variables**:
    *   `NEXT_PUBLIC_API_URL`: *The URL of your deployed backend service (e.g., `https://creditsea-backend.onrender.com/api`).*
    *   `GOOGLE_GENERATIVE_AI_API_KEY`: *Your Google Gemini API Key.*
    *   `NODE_ENV`: `production`

*Note: Next.js API endpoints are deployed dynamically. The system features self-healing API clients that automatically resolve backend endpoints even if trailing paths are omitted during configuration.*

---

## 🔑 Enterprise Role Credentials

All pre-seeded accounts utilize the default secure credential: `Password@123`

| Role | Email Address | Assigned Portal Function |
| :--- | :--- | :--- |
| 🔑 **Admin** | `admin@test.com` | Override controls, complete auditing, operational metrics |
| 👔 **Sales Executive** | `sales@test.com` | Application document scanning and reference checks |
| 📝 **Sanction Executive** | `sanction@test.com` | Sign off sanction letters, approve interest rates |
| 💰 **Disbursement Executive** | `disbursement@test.com` | Electronic banking release and ledger seeding |
| 📊 **Collection Executive** | `collection@test.com` | Payment ledger updates and receipt generation |
| 👤 **Borrower User** | `borrower@test.com` | Apply, view term sheets, query the AI assistant |
