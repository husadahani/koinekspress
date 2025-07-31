# ExpressCoin Agent - GameFi Delivery Simulation

A modern, fully refactored Next.js application for the ExpressCoin Agent GameFi delivery simulation platform. This project has been converted from a static HTML file to a modular, TypeScript-based Next.js application with local dependencies.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, React 18, TypeScript
- **Responsive Design**: Mobile-first approach with Tailwind CSS and DaisyUI
- **Local Dependencies**: No CDN dependencies - all assets are bundled locally
- **Google Fonts**: Optimized font loading using Next.js font optimization
- **Smooth Animations**: Framer Motion for enhanced user experience
- **Modular Architecture**: Component-based structure for maintainability
- **Type Safety**: Full TypeScript implementation with proper interfaces
- **Dark Mode Support**: System preference detection

## 🛠 Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Beautiful component library for Tailwind CSS
- **Framer Motion** - Animation library
- **React Icons** - Icon library (replaces Font Awesome)

### Fonts
- **Inter** - Google Font optimized with Next.js font loading

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expresscoin-agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🏗 Project Structure

```
expresscoin-agent/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout with Google Fonts
│   │   ├── page.tsx           # Main application entry point
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── auth/              # Authentication components
│   │   │   └── LoginScreen.tsx
│   │   ├── layout/            # Layout components
│   │   │   ├── Navbar.tsx     # Mobile navigation bar
│   │   │   └── Sidebar.tsx    # Main navigation sidebar
│   │   ├── dashboard/         # Dashboard components
│   │   │   └── StatsCards.tsx
│   │   ├── pages/             # Page components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── LicensePage.tsx
│   │   │   ├── PackagesPage.tsx
│   │   │   ├── HistoryPage.tsx
│   │   │   ├── ReferralPage.tsx
│   │   │   └── WalletPage.tsx
│   │   └── modals/            # Modal components (integrated in WalletPage)
│   ├── types/                 # TypeScript type definitions
│   │   └── index.ts
│   └── data/                  # Mock data and constants
│       └── mockData.ts
├── public/                    # Static assets
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Dependencies and scripts
└── next.config.ts            # Next.js configuration
```

## 🎨 Features Overview

### Authentication
- Google OAuth simulation
- Animated login screen
- User profile management

### Dashboard
- Real-time statistics cards
- Package status overview
- Commission tracking
- Referral rewards display

### License Management
- Three tier licensing system (Basic, Premium, VIP)
- Feature comparison
- Pricing display

### Package Management
- Available packages listing
- Package details with commission
- Status-based filtering
- Priority indicators

### Delivery History
- Transaction history table
- Status filtering tabs
- Action buttons based on status

### Referral System
- Referral link management
- Multi-level commission tracking
- Referral statistics
- Team member management

### Wallet
- Multi-asset balance display
- Send/receive functionality
- Transaction history
- QR code support
- Wallet address management

## 🎭 Components

### Layout Components
- **Navbar**: Mobile navigation with hamburger menu
- **Sidebar**: Main navigation with user profile

### Page Components
- **Dashboard**: Main overview with statistics
- **LicensePage**: License selection and purchasing
- **PackagesPage**: Available delivery packages
- **HistoryPage**: Delivery history with filtering
- **ReferralPage**: Referral management and statistics
- **WalletPage**: Crypto wallet functionality

### UI Components
- **StatsCards**: Animated statistics display
- **LoginScreen**: Authentication interface
- **Modals**: Send/receive cryptocurrency modals

## 🔧 Customization

### Colors
The application uses custom FedEx-inspired color scheme defined in `tailwind.config.ts`:
- `fedex-purple`: #4B0082
- `fedex-orange`: #FF6600  
- `fedex-light`: #6B46C1
- `fedex-dark`: #3B0764

### Fonts
Inter font is loaded optimally using Next.js font optimization system.

### Icons
React Icons library provides scalable vector icons replacing the original Font Awesome dependency.

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Collapsible sidebar navigation
- Mobile-optimized tables and cards
- Touch-friendly interface elements

## 🌙 Dark Mode

Automatic dark mode support based on system preferences with DaisyUI themes.

## 🚀 Performance Optimizations

- **Static Generation**: Pages are statically generated where possible
- **Font Optimization**: Google Fonts loaded optimally
- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Next.js Image component recommendations (warnings in build)
- **Bundle Analysis**: Optimized dependency bundling

## 🔄 Migration Notes

This project was refactored from a single HTML file (`koin.html`) to a modern Next.js application:

### Changes Made:
1. **Framework Migration**: HTML/CSS/JS → Next.js + React + TypeScript
2. **Dependency Management**: CDN links → Local npm packages
3. **Component Architecture**: Monolithic → Modular components
4. **State Management**: Global variables → React hooks
5. **Styling**: Embedded CSS → Tailwind CSS + DaisyUI
6. **Icons**: Font Awesome CDN → React Icons
7. **Animations**: CDN Framer Motion → Local Framer Motion
8. **Fonts**: CDN → Next.js font optimization

### Original Features Preserved:
- All original functionality and UI design
- Responsive layout and mobile menu
- Animation effects
- Color scheme and branding
- Data structure and user flows

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the ExpressCoin Agent GameFi platform.

---

**Note**: This application uses mock data for demonstration purposes. In a production environment, you would integrate with actual blockchain networks and authentication providers.
