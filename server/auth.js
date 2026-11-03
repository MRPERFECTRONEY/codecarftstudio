import crypto from 'node:crypto';

const secret = () => {
  const value = process.env.JWT_SECRET;
  if (!value || value.length < 32) throw new Error('JWT_SECRET must be set to a random value of at least 32 characters.');
  return value;
};
const b64 = (value) => Buffer.from(value).toString('base64url');

export function verifyAdminCredentials(email, password) {
  const expectedEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const passwordHash = process.env.ADMIN_PASSWORD_HASH || '';
  if (!expectedEmail || !passwordHash || !email || !password) return false;
  const normalized = String(email).trim().toLowerCase();
  if (normalized !== expectedEmail) return false;
  const [salt, expected] = passwordHash.split(':');
  if (!salt || !expected) return false;
  const actual = crypto.scryptSync(String(password), salt, 64).toString('hex');
  const a = Buffer.from(actual, 'hex');
  const b = Buffer.from(expected, 'hex');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
export function createPasswordHash(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  return salt + ':' + crypto.scryptSync(String(password), salt, 64).toString('hex');
}
export function issueAdminToken() {
  const now = Math.floor(Date.now() / 1000);
  const header = b64(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = b64(JSON.stringify({ sub: 'admin', iat: now, exp: now + 60 * 60 * 8 }));
  const unsigned = header + '.' + payload;
  const signature = crypto.createHmac('sha256', secret()).update(unsigned).digest('base64url');
  return unsigned + '.' + signature;
}
export function requireAdmin(req, res, next) {
  try {
    const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    const [header, payload, signature] = token.split('.');
    if (!header || !payload || !signature) return res.status(401).json({ success: false, error: 'Admin authentication required.' });
    const unsigned = header + '.' + payload;
    const expected = crypto.createHmac('sha256', secret()).update(unsigned).digest();
    const actual = Buffer.from(signature, 'base64url');
    if (actual.length !== expected.length || !crypto.timingSafeEqual(actual, expected)) throw new Error('Invalid token');
    const claims = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (claims.sub !== 'admin' || claims.exp < Math.floor(Date.now() / 1000)) throw new Error('Expired token');
    next();
  } catch {
    res.status(401).json({ success: false, error: 'Your admin session is invalid or expired. Please sign in again.' });
  }
}
