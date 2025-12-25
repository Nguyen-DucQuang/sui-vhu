import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    // Try Authorization: Bearer <token>
    const authHeader = req.headers['authorization'] || '';
    const query = req.query || {};

    // check Bearer token first
    if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7).trim();
      const ok = this.verifyToken(token);
      if (ok) return true;
    }

    // fallback: token via ?token=SIGNED_TOKEN for EventSource
    if (query.token) {
      const token = String(query.token || '');
      if (this.verifyToken(token)) return true;
    }

    // legacy: Basic auth support
    let auth = authHeader || '';
    // Fallback: allow auth via query param 'auth' containing base64 token used before
    if (!auth && req.query && req.query.auth) {
      const q = String(req.query.auth || '');
      auth = q.startsWith('Basic ') ? q : `Basic ${q}`;
    }
    if (!auth) return false;
    if (!auth.startsWith('Basic ')) return false;
    try {
      const b = Buffer.from(auth.slice(6), 'base64').toString('utf8');
      const [user, pass] = b.split(':');
      const ADMIN_USER = process.env.ADMIN_USER || 'admin';
      const ADMIN_PASS = process.env.ADMIN_PASS || 'password';
      return user === ADMIN_USER && pass === ADMIN_PASS;
    } catch (e) {
      return false;
    }
  }

  private verifyToken(token: string) {
    try {
      const secret = process.env.ADMIN_JWT_SECRET || 'devsecret';
      const parts = token.split('.');
      if (parts.length !== 2) return false;
      const [b64, sig] = parts;
      const calc = crypto.createHmac('sha256', secret).update(b64).digest('hex');
      if (calc !== sig) return false;
      const payload = JSON.parse(Buffer.from(b64, 'base64').toString('utf8'));
      if (!payload || !payload.user || !payload.exp) return false;
      if (payload.exp < Math.floor(Date.now() / 1000)) return false;
      const ADMIN_USER = process.env.ADMIN_USER || 'admin';
      return payload.user === ADMIN_USER;
    } catch (e) {
      return false;
    }
  }
}
