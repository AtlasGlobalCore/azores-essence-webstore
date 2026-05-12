---
Task ID: 2
Agent: Auth Agent
Task: Implement ADMIN authentication with ID:Senha from environment variables

Work Log:
- Updated .env with ADMIN_CREDENTIALS (admin:azores2026,geral:essence2026) and ADMIN_SECRET
- Created /api/admin/auth/route.ts - POST endpoint that validates id:senha against ADMIN_CREDENTIALS env var, generates HMAC-signed token (base64(id:timestamp:hmac-sha256(id:timestamp, ADMIN_SECRET)))
- Created /api/admin/verify/route.ts - POST endpoint that verifies token signature and 24h expiration
- Created AdminLogin component with Azores Essence branding (emerald green theme, logo, lock icon, show/hide password, error messages, loading states)
- Updated AdminDashboard with auth gate: on mount checks localStorage token via /api/admin/verify, shows AdminLogin if not authenticated, shows dashboard content with logout button if authenticated
- All existing dashboard functionality preserved (stats, products table, orders table)
- Lint passes cleanly

Stage Summary:
- Admin authentication fully implemented with ID:Senha credentials from env
- Token-based auth with HMAC-SHA256 signatures and 24h expiration
- Beautiful login screen with Azores Essence branding
- Dashboard now has auth gate with logout functionality
- Admin session shows admin ID in header
