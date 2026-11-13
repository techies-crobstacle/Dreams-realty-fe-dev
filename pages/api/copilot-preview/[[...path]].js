import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import axios from "axios";

const upstream = "https://chat.dreamsrealty.co.in";
const clientId = "4a21557b-e5bd-451a-b882-bcca27e0c282";
const iconPath = `uploads/chat-icons/${clientId}.png`;
const chatPath = `chat/${clientId}`;
const routes = new Map([
  ["widget/widget.js", { method: "GET", contentType: "application/javascript" }],
  [iconPath, { method: "GET", contentType: "image/png" }],
  ["static/caze-logo.png", { method: "GET", contentType: "image/png" }],
  [chatPath, { method: "POST", contentType: "application/json" }],
  [`${chatPath}/config`, { method: "GET", contentType: "application/json" }],
  [`${chatPath}/closing-config`, { method: "GET", contentType: "application/json" }],
  [`${chatPath}/onboarding-starters`, { method: "POST", contentType: "application/json" }],
  [`${chatPath}/auth/send-otp`, { method: "POST", contentType: "application/json" }],
  [`${chatPath}/auth/verify-otp`, { method: "POST", contentType: "application/json" }],
]);
const scriptIntegrity = "sha384-EKB2DeRlRxRylU3YkWhTwdszl5TzYv2tgLSarcL4/13BNWUME1Cy6yghPVQZTrnL";

const sessionCookie = "__Host-dreams-widget-session";

function sessionKey(testKey) {
  return createHash("sha256").update("dreams-widget-session:").update(testKey).digest();
}

function sealToken(token, testKey) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", sessionKey(testKey), iv);
  const encrypted = Buffer.concat([cipher.update(token, "utf8"), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString("base64url");
}

function readToken(cookie, testKey) {
  if (!cookie) return null;
  try {
    const data = Buffer.from(cookie, "base64url");
    const decipher = createDecipheriv("aes-256-gcm", sessionKey(testKey), data.subarray(0, 12));
    decipher.setAuthTag(data.subarray(12, 28));
    return Buffer.concat([decipher.update(data.subarray(28)), decipher.final()]).toString("utf8");
  } catch {
    return null;
  }
}

function renderPage(res) {
  const nonce = randomBytes(16).toString("base64");
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("X-Robots-Tag", "noindex");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("Content-Security-Policy", [
    "default-src 'none'",
    `script-src 'self' 'nonce-${nonce}'`,
    "connect-src 'self'",
    "style-src 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "base-uri 'none'",
    "frame-ancestors 'none'",
  ].join("; "));
  res.status(200).send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Dreams Realty widget test</title>
</head>
<body>
  <main>
    <h1>Dreams Realty widget test</h1>
    <p>Use the approved WhatsApp test number for verification and send a made-up question.</p>
    <p id="status" role="status">Loading the widget…</p>
  </main>
  <script nonce="${nonce}">
    const widget = document.createElement("script");
    widget.src = "/copilot-api/widget/widget.js";
    widget.integrity = "${scriptIntegrity}";
    Object.assign(widget.dataset, {
      clientId: "${clientId}",
      apiKey: "preview",
      apiUrl: location.origin + "/copilot-api",
      title: "Dreams Realty",
      welcomeMessage: "Hello! How can I help you today?",
      primaryColor: "#3b82f6",
      chatIcon: "/copilot-api/${iconPath}",
      disclaimerText: "Staging test",
      enableVoice: "false"
    });
    widget.onload = () => { document.getElementById("status").textContent = ""; };
    widget.onerror = () => {
      document.getElementById("status").textContent = "The widget script could not be loaded.";
    };
    document.body.appendChild(widget);
  </script>
</body>
</html>`);
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  const testKey = process.env.COPILOT_TEST_KEY;
  const testPhone = process.env.COPILOT_TEST_PHONE;
  const isPreview = process.env.VERCEL_ENV === "preview";
  if ((!isPreview && !testPhone) || !testKey) {
    return res.status(404).end();
  }

  const path = Array.isArray(req.query.path) ? req.query.path.join("/") : req.query.path || "";
  if (!path && req.method === "GET") return renderPage(res);
  const route = routes.get(path);
  if (route?.method !== req.method) return res.status(404).end();

  const headers = path.startsWith(chatPath) ? { "X-API-Key": testKey } : {};
  if (path === chatPath) {
    const token = readToken(req.cookies?.[sessionCookie], testKey);
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  const options = {
    method: req.method,
    headers,
    timeout: 25000,
    maxRedirects: 0,
    maxContentLength: 2 * 1024 * 1024,
    responseType: "arraybuffer",
    validateStatus: () => true,
  };
  if (req.method === "POST") {
    if (req.headers["content-type"]?.split(";")[0] !== "application/json") {
      return res.status(415).end();
    }

    headers["Content-Type"] = "application/json";
    const { page_url, ...body } = req.body || {};
    const isOtpRequest = path === `${chatPath}/auth/send-otp` || path === `${chatPath}/auth/verify-otp`;
    if (testPhone && isOtpRequest) {
      if (body.phone !== testPhone) {
        return res.status(403).json({ detail: "Use the approved WhatsApp test number." });
      }
      options.data = { phone: testPhone, session_id: body.session_id, ...(path.endsWith("/verify-otp") && { otp: body.otp }) };
    } else {
      options.data = body;
    }
  }

  try {
    const response = await axios(`${upstream}/${path}`, options);
    if (response.status >= 400) {
      if (path === `${chatPath}/auth/send-otp`) {
        return res.status(response.status).json({ detail: "Failed to send OTP. Please try again." });
      }
      if (path === `${chatPath}/auth/verify-otp`) {
        return res.status(response.status).json({ detail: "OTP verification failed. Check the code and try again." });
      }
      return res.status(response.status).end();
    }
    if (response.status !== 200) return res.status(502).end("Unexpected widget status");
    const actualType = response.headers["content-type"]?.split(";")[0];
    if (actualType !== route.contentType) return res.status(502).end("Unexpected widget response");

    if (path === `${chatPath}/auth/verify-otp`) {
      const { token } = JSON.parse(Buffer.from(response.data).toString("utf8"));
      if (typeof token !== "string" || !/^[A-Za-z0-9._~-]{1,2500}$/.test(token)) {
        return res.status(502).json({ detail: "The provider did not return a valid verification token." });
      }
      const cookie = sealToken(token, testKey);
      res.setHeader("Set-Cookie", `${sessionCookie}=${cookie}; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=86400`);
    }
    res.setHeader("Content-Type", route.contentType);
    res.status(200).send(Buffer.from(response.data));
  } catch {
    res.status(502).end("Widget upstream unavailable");
  }
}
