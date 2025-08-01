import { createHash } from "crypto";

/**
 * Generate deterministic private key from Firebase UID
 * 
 * ⚠️ WARNING: This is for development/demo purposes only!
 * For production, use HMAC with server-side secret:
 * const hash = createHmac("sha256", process.env.PRIVATE_KEY_SECRET).update(uid).digest("hex");
 * 
 * @param uid Firebase user UID
 * @returns Private key as 0x-prefixed hex string
 */
export function privateKeyFromUid(uid: string): `0x${string}` {
  // Create SHA256 hash of UID
  const hash = createHash("sha256").update(uid).digest("hex");
  
  // Ensure it's exactly 64 characters (32 bytes) and add 0x prefix
  const privateKey = ("0x" + hash) as `0x${string}`;
  
  return privateKey;
}

/**
 * Generate private key with additional salt for better security
 * Use this for production with a server-side secret
 */
export function privateKeyFromUidWithSalt(uid: string, salt: string): `0x${string}` {
  const combined = uid + salt;
  const hash = createHash("sha256").update(combined).digest("hex");
  return ("0x" + hash) as `0x${string}`;
}