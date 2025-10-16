Contact Form + Email Notification (Node + Express + Nodemailer)

Files included:
- index.html        -> frontend form (mobile design)
- server.js         -> Express server that sends email on /submit
- .env.example      -> environment variables example

Quick start (local):
1. Copy .env.example to .env and fill values (especially SMTP_PASS).
2. Install dependencies:
   npm init -y
   npm install express nodemailer dotenv express-rate-limit helmet cors
3. Run server:
   node server.js
4. Open index.html in browser (or serve it via static host).
5. Update SERVER constant in index.html if server not running on localhost:3000.

Deployment:
- Deploy server.js to Railway / Render / Heroku / Vercel (serverless) and set env vars there.
- Serve index.html via Netlify / GitHub Pages or same host.

Security notes:
- Use HTTPS in production.
- Do not use this to collect credentials for other services (phishing).
- Consider adding CAPTCHA and stronger rate-limiting for public sites.

If you want, I can prepare a ready-to-download ZIP now or a Dockerfile or a Telegram webhook variant.
