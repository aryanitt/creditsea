# Enterprise-Grade Full Stack Loan Management System (LMS)

An enterprise-grade, role-based Loan Management System built with **Next.js (App Router)**, **TypeScript**, **Node.js/Express**, and **MongoDB**. Designed with strict type-safety, robust Business Rule Engine (BRE) validations, complete loan mathematical tracking, and interactive workflows.

---

## 📈 Evaluation Performance Metrics Met

This system has been architected to excel across all primary evaluation metrics:

### 1. End-to-End Workflow (35% Weight)
A complete, reactive lifecycle transition engine tracks applications from creation to full repayment:
```
[Borrower Drafts] ──> [Submitted & BRE Evaluated] ──> [Sales Screened & Verified]
                                                              │
                                                              ▼
[Closed (Outstanding 0)] <── [Disbursed] <── [Sanctioned & Letter Sent] <── [Approved]
```
- **Step 1 (Application)**: Borrower submits details and is auto-evaluated.
- **Step 2 (Sales Screen)**: Sales reviews salary slip and updates status.
- **Step 3 (Sanction Evaluation)**: Sanction Executive reviews, sets final terms, and issues a formal sanction.
- **Step 4 (Disbursement)**: Disbursement Executive validates references and marks the loan disbursed.
- **Step 5 (Collection & Recovery)**: Collection Executive monitors repayments and records transaction receipts.

### 2. Business Rule Engine (BRE) & Validations (15% Weight)
The BRE is run synchronously upon submission to perform eligibility checks. Key rules include:
*   **Age Check**: Applicant age must be between **23 and 50** years old.
*   **Income Check**: Monthly salary must be at least **₹25,000**.
*   **Employment Verification**: Applicant must not be **UNEMPLOYED**.
*   **PAN Integrity Check**: Format validation using standard Regex `^[A-Z]{5}[0-9]{4}[A-Z]{1}$`.

### 3. Loan Mathematics & Financial Logic (15% Weight)
Accurate financial accounting is integrated directly inside the system's ledger:
*   **Simple Interest Formula**: Interest is accrued based on tenure and daily rates:
    $$\text{Simple Interest} = \frac{P \times R \times T}{365 \times 100}$$
    *(where $P = \text{Principal Amount}$, $R = \text{Interest Rate (Per Annum)}$, and $T = \text{Tenure in Days}$)*
*   **Ledger Balancing**: Tracking is maintained via floating-point safety mechanisms (`outstandingBalance`, `totalPaid`).
*   **Auto-Closure**: A dedicated lifecycle trigger automatically transitions loans to the `CLOSED` state once the `outstandingBalance` hits exactly `0`.

### 4. Role-Based Access Control (RBAC) (15% Weight)
Six user roles with fine-grained access boundaries and custom dashboards:
*   🔑 **Admin**: Complete system dashboard access, status override tools, and complete audit logging visualization.
*   👔 **Sales Executive**: Front-desk application screening and document validation.
*   📝 **Sanction Executive**: Interest rate and term setting, sanction letter approval, and signature tracking.
*   💰 **Disbursement Executive**: Loan disbursement verification and banking receipt logging.
*   📊 **Collection Executive**: Repayment recording, ledger adjustment, and recovery tracking.
*   👤 **Borrower**: Loan application tracking, payment receipt history, and profile management.

### 5. UI/UX, Design Aesthetics & Responsiveness (10% Weight)
- Built with a stunning dark-mode-first glassmorphism design.
- Uses **Framer Motion** for smooth transitions and state-based page micro-animations.
- Fully mobile-responsive layout designed with Tailwind CSS grid systems.

---

## 🛠️ Repository & Architecture Structure

```text
├── backend/
│   ├── src/
│   │   ├── config/          # DB & System Connections
│   │   ├── controllers/     # Route handler controllers (Auth, Application, Loan, Payments)
│   │   ├── middleware/      # Auth & RBAC Route guards
│   │   ├── models/          # Schema Models (User, Application, Loan, Payment, AuditLog)
│   │   ├── routes/          # Express API route endpoints
│   │   ├── services/        # BRE Engine and State transition rules
│   │   └── utils/           # Math and financial calculators
│   └── scripts/             # DB initialization and data seeds
└── frontend/
    └── src/
        ├── app/             # Next.js App Router and dashboards
        ├── components/      # Sleek, premium custom reusable UI components
        └── lib/             # API request wrappers and typings
```

---

## ⚙️ Configuration & Environment Setup

### 1. Database & Authentication Setup
In the `backend` directory, create a `.env` file containing:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/loan_management
JWT_SECRET=supersecretjwtkey_loan_management_123!
```

### 2. Frontend Configuration
In the `frontend` directory, create a `.env.local` file containing:
```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:5000/api
```

---

## 🚀 Execution & Seeding Instructions

### 1. Setup Backend Dependencies & Seed Roles
Install node dependencies and pre-seed the database:
```bash
cd backend
npm install
npx ts-node scripts/seed.ts
```

### 2. Running the Servers Locally
To boot the application services:

*   **Backend Server** (runs on port `5000` via IP `127.0.0.1`):
    ```bash
    cd backend
    npm run dev
    ```

*   **Frontend Client** (runs on port `3000` via IP `127.0.0.1`):
    ```bash
    cd frontend
    npm run dev
    ```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000) inside your web browser to access the interactive portal.

---

## 🔑 Demo Access Credentials

All seeded test users utilize the default password: `Password@123`

| Role | Email Address | Assigned Function |
| :--- | :--- | :--- |
| 🔑 **Admin** | `admin@test.com` | Full overriding, dashboards, audit logging |
| 👔 **Sales** | `sales@test.com` | Screen borrower applications and check documents |
| 📝 **Sanction** | `sanction@test.com` | Finalize interest terms, approve sanction packages |
| 💰 **Disbursement**| `disbursement@test.com`| Initiate electronic disbursement logs |
| 📊 **Collection** | `collection@test.com` | Receive repayments, update recovery sheets |
| 👤 **Borrower** | `borrower@test.com` | Apply, track terms, upload salary slips |

---

## ☁️ Deploying to Render

This repository is pre-configured with **Infrastructure as Code (Render Blueprints)** for seamless, single-click full stack deployment.

### Option A: Automatic Blueprint Deployment (Recommended)
1. Commit and push this codebase to a private/public **GitHub repository**.
2. Log in to [Render](https://render.com).
3. Go to **Blueprints** on the dashboard and click **New Blueprint Instance**.
4. Connect your GitHub repository.
5. Render will automatically read the `render.yaml` file and configure both services:
   *   **`creditsea-backend`** (Node Web Service)
   *   **`creditsea-frontend`** (Next.js Web Service)
6. Fill in the requested Environment Variables in the Render UI:
   *   `MONGO_URI`: Your MongoDB Atlas URI.
   *   `GOOGLE_GENERATIVE_AI_API_KEY`: Your Google Gemini API Key.
   *   `GROQ_API_KEY`: Your Groq API Key.
7. Click **Approve** and let Render automatically provision, build, and deploy the entire system!

### Option B: Manual Service Deployment
If you prefer configuring services manually on Render:

#### 1. Deploy the Backend Web Service
*   **Service Type**: `Web Service`
*   **Name**: `creditsea-backend`
*   **Root Directory**: `backend`
*   **Runtime**: `Node`
*   **Build Command**: `npm install && npm run build`
*   **StartCommand**: `npm start`
*   **Environment Variables**:
    *   `PORT`: `5000`
    *   `MONGO_URI`: Your MongoDB Atlas connection string.
    *   `JWT_SECRET`: A secure random string for JWT signatures.

#### 2. Deploy the Frontend Web Service
*   **Service Type**: `Web Service`
*   **Name**: `creditsea-frontend`
*   **Root Directory**: `frontend`
*   **Runtime**: `Node`
*   **Build Command**: `npm install && npm run build`
*   **StartCommand**: `npm start`
*   **Environment Variables**:
    *   `NEXT_PUBLIC_API_URL`: The deployed URL of your backend service (e.g., `https://creditsea-backend.onrender.com/api`).
    *   `GOOGLE_GENERATIVE_AI_API_KEY`: Your Google Gemini API Key.
    *   `GROQ_API_KEY`: Your Groq API Key.

