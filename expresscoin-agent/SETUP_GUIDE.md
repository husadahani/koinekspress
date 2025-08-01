# Setup Guide - Firebase Auth & Smart Wallet Integration

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.local.example` to `.env.local` dan isi dengan konfigurasi Anda:

```bash
cp .env.local.example .env.local
```

### 3. Setup Firebase Project

#### Step 1: Buat Firebase Project
1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Klik "Create a project"
3. Masukkan nama project (misal: "expresscoin-agent")
4. Pilih "Continue" dan selesaikan setup

#### Step 2: Aktifkan Authentication
1. Di Firebase Console, pilih project Anda
2. Klik "Authentication" di sidebar
3. Klik "Get started"
4. Pilih tab "Sign-in method"
5. Aktifkan "Google" provider
6. Masukkan email support dan project name
7. Klik "Save"

#### Step 3: Dapatkan Konfigurasi
1. Klik gear icon ⚙️ di sidebar
2. Pilih "Project settings"
3. Scroll ke "Your apps" section
4. Klik "Add app" → "Web"
5. Masukkan app nickname (misal: "expresscoin-web")
6. Copy konfigurasi yang muncul

#### Step 4: Update .env.local
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-actual-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 4. Setup Alchemy Account

#### Step 1: Buat Alchemy Account
1. Buka [Alchemy](https://www.alchemy.com/)
2. Klik "Get Started"
3. Sign up dengan email Anda

#### Step 2: Buat App untuk BNB MAINNET
1. Di Alchemy Dashboard, klik "Create App"
2. Pilih "BNB Chain" sebagai network
3. Pilih "Mainnet" sebagai environment
4. Masukkan nama app (misal: "expresscoin-agent")
5. Klik "Create App"

#### Step 3: Aktifkan Gas Manager
1. Di app dashboard, klik "Gas Manager" di sidebar
2. Klik "Create Policy"
3. Pilih "Sponsored" sebagai policy type
4. Set budget dan limits sesuai kebutuhan
5. Copy Policy ID yang muncul

#### Step 4: Update .env.local
```env
NEXT_PUBLIC_ALCHEMY_API_KEY=your-actual-alchemy-api-key
NEXT_PUBLIC_GAS_MANAGER_POLICY_ID=your-actual-policy-id
```

### 5. Test Aplikasi

#### Step 1: Start Development Server
```bash
npm run dev
```

#### Step 2: Test Firebase Auth
1. Buka http://localhost:3000
2. Klik "Login dengan Google"
3. Verifikasi popup Google OAuth muncul
4. Login dengan Google account
5. Cek user muncul di navbar

#### Step 3: Test Smart Wallet
1. Setelah login, buka halaman "Wallet"
2. Cek status smart wallet
3. Verifikasi wallet address muncul
4. Test copy address functionality

## 🔧 Troubleshooting

### Firebase Issues
- **Error: "Firebase: Error (auth/unauthorized-domain)"**
  - Solusi: Tambahkan domain localhost ke authorized domains di Firebase Console
  - Buka Authentication → Settings → Authorized domains
  - Tambahkan `localhost`

- **Error: "Firebase: Error (auth/popup-closed-by-user)"**
  - Solusi: Pastikan popup blocker dinonaktifkan
  - Atau gunakan redirect method sebagai alternatif

### Alchemy Issues
- **Error: "Invalid API key"**
  - Solusi: Pastikan API key benar dan untuk BNB MAINNET
  - Cek di Alchemy Dashboard → Apps → Your App

- **Error: "Gas Manager policy not found"**
  - Solusi: Pastikan Policy ID benar dan policy aktif
  - Cek di Gas Manager dashboard

### Smart Wallet Issues
- **Error: "Failed to create smart wallet"**
  - Solusi: Pastikan JWT token valid
  - Cek Firebase Auth berfungsi dengan baik
  - Pastikan Alchemy API key benar

## 📝 Notes

### Development vs Production
- **Development**: Gunakan testnet untuk testing
- **Production**: Gunakan mainnet dengan budget yang sesuai

### Security Best Practices
1. Jangan commit `.env.local` ke repository
2. Gunakan environment variables untuk semua API keys
3. Monitor Gas Manager usage
4. Set budget limits yang sesuai

### Performance Tips
1. Smart wallet creation bisa memakan waktu 5-10 detik
2. Gas sponsorship memerlukan waktu untuk diproses
3. Monitor transaction status di blockchain explorer

## 🎯 Next Steps

1. **Customize UI**: Sesuaikan tampilan dengan brand Anda
2. **Add Error Handling**: Improve error messages dan user feedback
3. **Transaction History**: Integrate dengan blockchain explorer
4. **Multi-chain Support**: Extend ke blockchain lain
5. **Advanced Features**: Batch transactions, contract interactions

## 📞 Support

Jika mengalami masalah:
1. Cek console browser untuk error messages
2. Verifikasi semua environment variables benar
3. Pastikan Firebase dan Alchemy setup sesuai panduan
4. Cek network connectivity dan API endpoints