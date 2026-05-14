# G4 Naturals E-commerce Platform

## Premium Unani & Natural Medicines Web Application

A full-stack, scalable, and modern E-commerce platform built specifically for the "G4 Naturals" brand. This application features a luxury, earthy aesthetic with an Amazon-level functional architecture.

### 🚀 Tech Stack
- **Frontend Framework**: Next.js 16 (App Router)
- **UI & Styling**: React 19, Tailwind CSS v4, Lucide Icons
- **State Management**: Zustand (with Persist Middleware for Cart/Wishlist)
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v4 (Credentials, Google Integration)
- **Payments**: Razorpay API Integration

### 📁 Project Architecture
```text
/src
 ├── /app
 │    ├── /(store)       # Public facing store (Hero, Products, Cart, Checkout)
 │    ├── /(admin)       # Secure Admin Portal
 │    └── /api           # REST API Routes (Auth, Products, Orders, Admin)
 ├── /components
 │    ├── /layout        # Header, Footer, Admin Sidebar
 │    └── /ui            # Reusable core UI components
 ├── /lib
 │    ├── prisma.ts      # Singleton Prisma DB Client
 │    ├── auth.ts        # NextAuth Configuration
 │    └── utils.ts       # Global helpers
 └── /store              # Zustand global states (Cart)
```

### ⚙️ Getting Started / Setup Instructions

1. **Configure Environment Variables**
   Rename `.env.example` to `.env` and provide your actual credentials.
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/g4naturals?schema=public"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your_secure_random_string"
   ```

2. **Initialize Database**
   Push the Prisma schema to your PostgreSQL database.
   ```bash
   npx prisma db push
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` for the Storefront and `http://localhost:3000/admin` for the Admin Dashboard.
