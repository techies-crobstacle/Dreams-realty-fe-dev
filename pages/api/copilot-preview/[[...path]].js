import { randomBytes } from "node:crypto";
import axios from "axios";

const upstream = "http://203.9.197.21";
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
]);
const scriptIntegrity = "sha384-EKB2DeRlRxRylU3YkWhTwdszl5TzYv2tgLSarcL4/13BNWUME1Cy6yghPVQZTrnL";

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
    <p>Open the widget and send a made-up question. Use dummy data only.</p>
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
  if (process.env.VERCEL_ENV !== "preview" || !testKey) {
    return res.status(404).end();
  }

  const path = Array.isArray(req.query.path) ? req.query.path.join("/") : req.query.path || "";
  if (!path && req.method === "GET") return renderPage(res);
  const route = routes.get(path);
  if (route?.method !== req.method) return res.status(404).end();

  // Only the test credential is sent upstream. Vercel session cookies stay at Vercel.
  const headers = path.startsWith(chatPath) ? { "X-API-Key": testKey } : {};
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
    options.data = body;
  }

  try {
    const response = await axios(`${upstream}/${path}`, options);
    if (response.status >= 400) return res.status(response.status).end();
    if (response.status !== 200) return res.status(502).end("Unexpected widget status");
    const actualType = response.headers["content-type"]?.split(";")[0];
    if (actualType !== route.contentType) return res.status(502).end("Unexpected widget response");

    res.setHeader("Content-Type", route.contentType);
    res.status(200).send(Buffer.from(response.data));
  } catch {
    res.status(502).end("Widget upstream unavailable");
  }
}
