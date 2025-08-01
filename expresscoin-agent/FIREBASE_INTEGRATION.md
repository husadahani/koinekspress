# Firebase Auth & Smart Wallet Integration

## Overview
Proyek ini telah diintegrasikan dengan Firebase Authentication dan Alchemy Smart Wallet untuk BNB MAINNET dengan gas sponsorship.

## Fitur yang Diintegrasikan

### 1. Firebase Authentication
- ✅ Google Sign-in integration
- ✅ User state management
- ✅ JWT token handling untuk smart wallet

### 2. Alchemy Smart Wallet
- ✅ Light Account creation dengan Firebase JWT
- ✅ Gas Manager integration untuk BNB MAINNET
- ✅ Transaction handling dengan gas sponsorship

### 3. UI Integration
- ✅ Login screen dengan Firebase Auth
- ✅ Smart wallet status di wallet page
- ✅ User profile di navbar
- ✅ Real wallet address display

## Konfigurasi yang Diperlukan

### 1. Environment Variables
Buat file `.env.local` dengan konfigurasi berikut:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Alchemy Configuration
NEXT_PUBLIC_ALCHEMY_API_KEY=your-alchemy-api-key
NEXT_PUBLIC_GAS_MANAGER_POLICY_ID=your-gas-manager-policy-id
```

### 2. Firebase Setup
1. Buat project di [Firebase Console](https://console.firebase.google.com/)
2. Aktifkan Authentication dengan Google provider
3. Dapatkan konfigurasi dari project settings

### 3. Alchemy Setup
1. Buat account di [Alchemy](https://www.alchemy.com/)
2. Buat app untuk BNB MAINNET
3. Aktifkan Gas Manager dan buat policy
4. Dapatkan API key dan policy ID

## Cara Kerja

### 1. Authentication Flow
1. User klik "Login dengan Google"
2. Firebase Auth menangani OAuth flow
3. JWT token didapat dari Firebase
4. Smart wallet dibuat dengan JWT sebagai signer

### 2. Smart Wallet Flow
1. JWT dari Firebase digunakan untuk membuat Web3Auth signer
2. Light Account dibuat dengan Alchemy SDK
3. Gas Manager policy diterapkan untuk sponsorship
4. Wallet siap untuk transaksi tanpa gas fee

### 3. Transaction Flow
1. User input recipient dan amount
2. Smart wallet mengirim User Operation
3. Gas Manager mensponsori gas fee
4. Transaksi diproses di BNB MAINNET

## File yang Dimodifikasi

### Core Files
- `src/lib/firebase.ts` - Firebase configuration
- `src/lib/alchemy.ts` - Alchemy & smart wallet setup
- `src/hooks/useAuth.ts` - Firebase auth hook
- `src/hooks/useSmartWallet.ts` - Smart wallet management

### Components
- `src/components/auth/LoginScreen.tsx` - Firebase auth integration
- `src/components/pages/WalletPage.tsx` - Smart wallet display
- `src/components/layout/Navbar.tsx` - User profile

## Testing

### 1. Development
```bash
npm run dev
```

### 2. Test Firebase Auth
1. Klik "Login dengan Google"
2. Verifikasi user muncul di navbar
3. Cek smart wallet status di wallet page

### 3. Test Smart Wallet
1. Login dengan Firebase
2. Tunggu smart wallet creation
3. Cek wallet address dan status
4. Test transaction (dengan testnet dulu)

## Troubleshooting

### Firebase Issues
- Pastikan domain diizinkan di Firebase Auth settings
- Cek API key dan project ID benar
- Verifikasi Google OAuth setup

### Alchemy Issues
- Pastikan API key valid untuk BNB MAINNET
- Cek Gas Manager policy aktif
- Verifikasi network configuration

### Smart Wallet Issues
- Cek JWT token valid
- Pastikan Alchemy API key benar
- Verifikasi chain configuration

## Security Notes

1. **Environment Variables**: Jangan commit `.env.local` ke repository
2. **API Keys**: Gunakan environment variables untuk semua API keys
3. **JWT Tokens**: Tokens disimpan di memory, tidak di localStorage
4. **Gas Manager**: Monitor usage dan set limits yang sesuai

## Next Steps

1. **Production Setup**: Konfigurasi untuk production environment
2. **Error Handling**: Improve error handling dan user feedback
3. **Transaction History**: Integrate dengan blockchain explorer
4. **Multi-chain Support**: Extend ke blockchain lain
5. **Advanced Features**: Batch transactions, contract interactions