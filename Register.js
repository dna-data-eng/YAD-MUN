// /api/register.js
//
// Vercel Serverless Function. Runs on Vercel's servers, never in the
// visitor's browser — so the Supabase key used here is never visible
// to anyone viewing page source, dev tools, or a clone of this repo.
//
// The actual key values live in Vercel's Environment Variables
// (Project Settings → Environment Variables), NOT in this file and
// NOT in git. This file only reads them via process.env at runtime.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, school, committee, website } = req.body || {};

  // Honeypot check, re-verified server-side — a bot could bypass the
  // browser's JS entirely and POST straight to this endpoint, so the
  // client-side check alone isn't enough.
  if (typeof website === 'string' && website.trim() !== '') {
    // Pretend success so the bot doesn't learn its submission was rejected.
    return res.status(200).json({ ok: true });
  }

  // Basic required-field + format validation, re-checked server-side
  // for the same reason as the honeypot above.
  if (!name || !phone || !email || !school || !committee) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (!/^0[0-9]{9}$/.test(phone)) {
    return res.status(400).json({ error: 'Invalid phone number' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return res.status(500).json({ error: 'Server is not configured (missing Supabase env vars)' });
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/registrations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify([{
        name: String(name).trim(),
        phone: String(phone).trim(),
        email: String(email).trim(),
        school: String(school).trim(),
        committee: String(committee).trim(),
        registered_at: new Date().toISOString()
      }])
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Supabase insert failed:', errText);
      return res.status(502).json({ error: 'Database insert failed' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Registration handler error:', err);
    return res.status(500).json({ error: 'Unexpected server error' });
  }
}