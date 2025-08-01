# Firebase UID to Private Key Integration

## Overview
Integrasi ini menggunakan Firebase UID user untuk generate private key deterministik yang digunakan sebagai signer untuk smart wallet.

## Cara Kerja

### 1. **Firebase Auth Flow**
```
User Login → Firebase Auth → Get UID → Generate Private Key → Create Signer → Smart Wallet
```

### 2. **Private Key Generation**
- UID Firebase di-hash menggunakan SHA256
- Hash 32 bytes dikonversi ke hex string
- Ditambahkan prefix `0x` untuk format Ethereum private key

### 3. **Deterministic Behavior**
- Setiap user dengan UID yang sama akan selalu mendapat private key yang sama
- Smart wallet address akan konsisten untuk user yang sama
- User tidak perlu menyimpan seed phrase

## File yang Ditambahkan

### Core Files
- `src/lib/privateKeyFromUid.ts` - Helper untuk generate private key dari UID
- `src/components/SmartWalletDebug.tsx` - Debug component untuk development

### Updated Files
- `src/hooks/useSmartWallet.ts` - Menggunakan private key dari UID
- `src/components/pages/WalletPage.tsx` - Menambahkan debug component

## Keamanan

### ⚠️ Development Only
```typescript
// Current implementation (INSECURE for production)
const privateKey = privateKeyFromUid(user.uid);
```

### 🔒 Production Ready
```typescript
// Secure implementation with server-side secret
const privateKey = privateKeyFromUidWithSalt(user.uid, process.env.PRIVATE_KEY_SECRET);
```

## Testing

### 1. **Login dengan Firebase**
1. Buka aplikasi dan login dengan Google
2. Cek console untuk log: "Generated private key from UID: [uid]"

### 2. **Debug Component**
1. Setelah login, buka halaman Wallet
2. Cari section "Smart Wallet Debug Info"
3. Klik eye icon untuk lihat full private key
4. Klik copy icon untuk copy private key

### 3. **Verify Consistency**
1. Logout dan login lagi dengan user yang sama
2. Private key dan wallet address harus sama
3. Smart wallet harus ready tanpa perlu setup ulang

## Production Considerations

### 1. **Server-Side Secret**
```typescript
// Backend API endpoint
app.post('/api/generate-signature', async (req, res) => {
  const { uid, message } = req.body;
  const privateKey = privateKeyFromUidWithSalt(uid, process.env.PRIVATE_KEY_SECRET);
  const signature = await signMessage(message, privateKey);
  res.json({ signature });
});
```

### 2. **Environment Variables**
```env
# Add to .env.local
PRIVATE_KEY_SECRET=your-super-secret-key-here
```

### 3. **Security Best Practices**
- Jangan expose private key di frontend
- Gunakan server-side signing untuk transaksi
- Implement rate limiting untuk API endpoints
- Monitor wallet usage dan suspicious activity

## Troubleshooting

### Error: "User must be authenticated"
- Pastikan user sudah login dengan Firebase
- Cek `user.uid` tidak null

### Error: "Failed to create smart wallet"
- Cek console untuk error detail
- Pastikan Alchemy API key valid
- Verifikasi Gas Manager policy aktif

### Private Key Tidak Konsisten
- Pastikan menggunakan UID yang sama
- Cek tidak ada cache issue
- Restart development server jika perlu

## Next Steps

### 1. **Production Implementation**
- Implement server-side signing
- Add proper error handling
- Add transaction monitoring

### 2. **Security Enhancements**
- Add rate limiting
- Implement session management
- Add audit logging

### 3. **User Experience**
- Add loading states
- Improve error messages
- Add transaction history

## Code Examples

### Generate Private Key
```typescript
import { privateKeyFromUid } from '../lib/privateKeyFromUid';

const uid = user.uid;
const privateKey = privateKeyFromUid(uid);
console.log('Private Key:', privateKey);
```

### Create Signer
```typescript
import { LocalAccountSigner } from '@alchemy/aa-core';

const signer = LocalAccountSigner.privateKeyToAccountSigner(privateKey);
```

### Smart Wallet Creation
```typescript
const account = await createSmartAccount(signer);
const address = await account.getAddress();
console.log('Smart Wallet Address:', address);
```

## Notes

- **Development**: Private key visible di debug component
- **Production**: Private key hanya di server, frontend hanya handle UI
- **Testing**: Gunakan testnet untuk testing transaksi
- **Monitoring**: Monitor smart wallet usage dan gas sponsorship