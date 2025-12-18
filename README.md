# Frontend - Meta Ads Scraper

Next.js 16 frontend application for the Meta Ads Scraper SaaS. Built with React 19, Tailwind CSS, and modern component architecture.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [How It Works](#how-it-works)
- [Pages & Routes](#pages--routes)
- [Components](#components)
- [Architecture](#architecture)
- [Deployment](#deployment)
- [Development](#development)

## ✨ Features

- 🔐 **Authentication** - Login, registration, password reset with OTP
- 📊 **Dashboard** - Search Facebook ads by keyword with real-time progress
- 📈 **Coverage Tracking** - Visual coverage status and statistics
- 📋 **History** - View past scraping jobs and results
- 📄 **Google Sheets** - View exported sheets
- ⚙️ **Settings** - User profile and preferences
- 🎨 **Modern UI** - Responsive design with Tailwind CSS
- 🔄 **Real-time Updates** - Live job status polling
- 📱 **Mobile Responsive** - Works on all devices

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0.8 (App Router)
- **React**: 19.2.1
- **Styling**: Tailwind CSS 3.4
- **State Management**: React Context API
- **HTTP Client**: Fetch API
- **Icons**: Remix Icon
- **Fonts**: Manrope (Google Fonts)

## 📁 Project Structure

```
scrape-frontend/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── layout.js            # Root layout with AuthProvider
│   │   ├── page.js              # Home/Auth page
│   │   ├── reset-password/      # Password reset page
│   │   └── dashboard/           # Dashboard pages
│   │       ├── layout.js        # Dashboard layout (Sidebar + Topbar)
│   │       ├── page.js          # Main dashboard (search ads)
│   │       ├── history/         # Scraping history
│   │       ├── setting/         # User settings
│   │       └── sheet/           # Google Sheets list
│   │
│   ├── components/              # React components
│   │   ├── auth/                # Authentication components
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   ├── ForgotPasswordForm.jsx
│   │   │   ├── TabSwitcher.jsx
│   │   │   └── MessageDisplay.jsx
│   │   ├── dashboard/           # Dashboard-specific components
│   │   │   ├── SearchForm.jsx
│   │   │   ├── ScrapingProgress.jsx
│   │   │   ├── CoverageInfo.jsx
│   │   │   ├── AdCard.jsx
│   │   │   └── AdsList.jsx
│   │   ├── ui/                  # Reusable UI components
│   │   │   ├── Alert.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   └── Select.jsx
│   │   ├── SIdebar/             # Navigation sidebar
│   │   └── Topbar/               # Top navigation bar
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useAuthForm.js       # Authentication form logic
│   │   ├── useAdSearch.js       # Ad search functionality
│   │   ├── useApi.js            # API call hook
│   │   └── useForm.js           # Form handling hook
│   │
│   ├── services/                 # API service layer
│   │   ├── api.js               # Base API client
│   │   ├── auth.service.js      # Authentication API calls
│   │   ├── ads.service.js       # Ads API calls
│   │   └── index.js             # Service exports
│   │
│   ├── contexts/                 # React contexts
│   │   └── AuthContext.js       # Authentication state management
│   │
│   ├── utils/                    # Utility functions
│   │   ├── errorHandler.js      # Error handling utilities
│   │   └── format.js            # Data formatting (dates, etc.)
│   │
│   ├── constants/                # App constants
│   │   └── index.js             # API URLs, routes, colors
│   │
│   └── data/                     # Static data
│       └── countries.js          # Country list for dropdowns
│
├── public/                       # Static assets
│   └── auth-bg.jpg              # Background image
│
├── next.config.mjs               # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── package.json                  # Dependencies
```

## 🚀 Setup & Installation

### Prerequisites

- Node.js 20.9+ and npm 9+
- Backend API running (see backend README)

### Installation

```bash
# Clone repository
git clone <repository-url>
cd scrape-frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local with your backend URL
# NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

### Development Server

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in browser
```

## 🔧 Environment Variables

Create `.env.local` file:

```bash
# Backend API URL
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api/v1

# For local development
# NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

**Important**: 
- Variable must start with `NEXT_PUBLIC_` to be accessible in browser
- No trailing slash in URL
- Include `/api/v1` at the end

## 🔄 How It Works

### 1. **Authentication Flow**

```
User visits homepage (/)
  ↓
AuthContext checks localStorage for token
  ↓
If token exists → Verify with backend
  ↓
If valid → Redirect to /dashboard
  ↓
If invalid/missing → Show login form
  ↓
User submits login/register
  ↓
API call to backend
  ↓
Token received → Store in localStorage
  ↓
Update AuthContext state
  ↓
Redirect to dashboard
```

### 2. **Ad Search Flow**

```
User enters keyword and filters
  ↓
Submit search form
  ↓
useAdSearch hook calls searchAds API
  ↓
Backend checks coverage
  ↓
If coverage exists → Return cached results immediately
  ↓
If coverage missing → Create scraping job
  ↓
Frontend receives job ID
  ↓
Poll job status every 3 seconds
  ↓
Display progress bar
  ↓
When complete → Fetch and display ads
```

### 3. **Component Architecture**

```
Page Component (app/page.js)
  ↓
Composes smaller components:
  - TabSwitcher (navigation)
  - MessageDisplay (errors/success)
  - LoginForm / RegisterForm / ForgotPasswordForm
  ↓
Uses custom hooks:
  - useAuthForm (form logic)
  - useAuth (authentication state)
```

### 4. **State Management**

- **AuthContext**: Global authentication state
  - User data
  - Login/logout functions
  - Token management
  - Protected route handling

- **Local State**: Component-specific state
  - Form inputs
  - UI state (modals, dropdowns)
  - Loading states

- **Server State**: API responses
  - Cached in component state
  - Refetched on user actions

## 📄 Pages & Routes

### Public Routes

- `/` - Home page (Login/Register)
- `/reset-password` - Password reset with OTP

### Protected Routes (require authentication)

- `/dashboard` - Main dashboard (search ads)
- `/dashboard/history` - Scraping job history
- `/dashboard/sheet` - Google Sheets list
- `/dashboard/setting` - User settings

### Route Protection

- `dashboard/layout.js` checks authentication
- Redirects to `/` if not authenticated
- Shows loading state while checking

## 🧩 Components

### Auth Components (`components/auth/`)

- **LoginForm** - Email/password login form
- **RegisterForm** - User registration form
- **ForgotPasswordForm** - Password reset request
- **TabSwitcher** - Switch between login/register
- **MessageDisplay** - Error and success messages

### Dashboard Components (`components/dashboard/`)

- **SearchForm** - Keyword search form with filters
- **ScrapingProgress** - Progress bar for active jobs
- **CoverageInfo** - Coverage statistics display
- **AdCard** - Individual ad display card
- **AdsList** - List of ads with AdCard components

### UI Components (`components/ui/`)

- **Button** - Reusable button with variants
- **Input** - Form input with label and error handling
- **Select** - Dropdown select component
- **Alert** - Alert/notification component

## 🏗️ Architecture

### Request Flow

```
User Action (click, submit)
  ↓
Component Event Handler
  ↓
Custom Hook (useAuthForm, useAdSearch)
  ↓
Service Layer (auth.service.js, ads.service.js)
  ↓
Base API Client (services/api.js)
  ↓
Fetch API call to backend
  ↓
Response handling
  ↓
Update state
  ↓
Re-render component
```

### Component Hierarchy

```
RootLayout (app/layout.js)
  └── AuthProvider (contexts/AuthContext.js)
      └── Page Components
          └── Feature Components
              └── UI Components
```

### Data Flow

```
Backend API
  ↓
Service Layer (services/*.js)
  ↓
Custom Hooks (hooks/*.js)
  ↓
Components (components/*.jsx)
  ↓
UI Rendering
```

## 🚢 Deployment

### Render Static Site Deployment

1. **Connect Repository**
   - Go to Render Dashboard
   - Connect GitHub repository

2. **Create Static Site**
   - Service Type: Static Site
   - Root Directory: `.` (or leave empty)
   - Build Command: `npm install && npm run build`
   - Publish Directory: `out`

3. **Environment Variables**
   - Add `NEXT_PUBLIC_API_URL` with your backend URL
   - Format: `https://your-backend.onrender.com/api/v1`

4. **Deploy**
   - Render will build and deploy automatically
   - Static files served from `out/` directory

### Build Configuration

The project uses Next.js static export (`output: 'export'` in `next.config.mjs`):
- Generates static HTML files
- No server-side rendering
- All API calls from client-side
- Images optimized but unoptimized (for static export)

## 💻 Development

### Available Scripts

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server (after build)
npm start

# Run linter
npm run lint
```

### Development Workflow

1. **Start Backend**
   ```bash
   cd ../backend
   npm run dev
   ```

2. **Start Frontend**
   ```bash
   npm run dev
   ```

3. **Access Application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

4. **Make Changes**
   - Edit components in `src/components/`
   - Edit pages in `src/app/`
   - Changes auto-reload in browser

### Code Structure Principles

1. **Component Composition**
   - Break large components into smaller ones
   - Compose components in pages
   - Reuse UI components

2. **Custom Hooks**
   - Extract reusable logic
   - Separate business logic from UI
   - Easy to test

3. **Service Layer**
   - All API calls in services
   - Consistent error handling
   - Centralized API configuration

4. **File Size Guidelines**
   - Pages: < 100 lines
   - Components: < 150 lines
   - Hooks: < 200 lines

## 🎨 Styling

### Tailwind CSS

- Utility-first CSS framework
- Custom colors defined in `tailwind.config.js`
- Primary color: `#433974`
- Responsive breakpoints: `md:` (768px+)

### Component Styling

- Inline Tailwind classes
- Consistent spacing and colors
- Responsive design patterns
- Dark mode ready (can be added)

## 🔍 Troubleshooting

### Common Issues

**API Calls Failing (CORS)**
- Check `NEXT_PUBLIC_API_URL` is set correctly
- Verify backend CORS allows your frontend URL
- Check browser console for CORS errors

**Authentication Not Working**
- Check token is stored in localStorage
- Verify backend is running
- Check AuthContext is wrapping app

**Build Errors**
- Ensure Node.js 20.9+ is installed
- Clear `.next` folder and rebuild
- Check for syntax errors in components

**Static Export Issues**
- Verify `next.config.mjs` has `output: 'export'`
- Check all pages are client components (`"use client"`)
- Ensure no server-side features are used

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Next.js App Router](https://nextjs.org/docs/app)

## 📝 License

ISC
