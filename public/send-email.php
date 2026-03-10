<?php
// ─── Brevo Email Handler for Kleza Landing Page ──────────────────────────────
// Place this file alongside your dist files on Hostinger (public_html root).
// Set your Brevo API key below.

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');          // tighten to your domain in production
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// ─── Load .env file ──────────────────────────────────────────────────────────
$envFile = __DIR__ . '/.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $trimmed = trim($line);
        if ($trimmed === '' || $trimmed[0] === '#' || strpos($trimmed, '=') === false)
            continue;
        list($k, $v) = explode('=', $trimmed, 2);
        putenv(trim($k) . '=' . trim($v));
    }
}

// ─── CONFIG ──────────────────────────────────────────────────────────────────
define('BREVO_API_KEY', getenv('BREVO_API_KEY') ?: '');
define('TO_EMAIL', 'manasa@kleza.io');
define('TO_NAME', 'Kleza Solutions');
// ─────────────────────────────────────────────────────────────────────────────

// Guard: refuse to run if key is missing
if (!BREVO_API_KEY) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Mail service not configured']);
    exit();
}

// Read and sanitise input
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid request body']);
    exit();
}

$name = htmlspecialchars(trim($data['name'] ?? ''), ENT_QUOTES, 'UTF-8');
$email = filter_var(trim($data['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(trim($data['phone'] ?? ''), ENT_QUOTES, 'UTF-8');
$service = htmlspecialchars(trim($data['service'] ?? ''), ENT_QUOTES, 'UTF-8');
$msg = htmlspecialchars(trim($data['msg'] ?? ''), ENT_QUOTES, 'UTF-8');

// Basic validation
if (empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Name and a valid email are required']);
    exit();
}

// ─── Build email HTML ────────────────────────────────────────────────────────
$htmlContent = "
<div style='font-family:Arial,sans-serif;max-width:600px;margin:0 auto;'>
  <div style='background:#0066FF;padding:24px 32px;border-radius:8px 8px 0 0;'>
    <h2 style='color:#fff;margin:0;'>New Lead from Kleza Landing Page</h2>
  </div>
  <div style='background:#f9fafb;padding:32px;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;'>
    <table style='width:100%;border-collapse:collapse;'>
      <tr><td style='padding:10px 0;font-weight:bold;color:#374151;width:130px;'>Name</td>
          <td style='padding:10px 0;color:#111827;'>$name</td></tr>
      <tr><td style='padding:10px 0;font-weight:bold;color:#374151;'>Email</td>
          <td style='padding:10px 0;color:#111827;'><a href='mailto:$email'>$email</a></td></tr>
      <tr><td style='padding:10px 0;font-weight:bold;color:#374151;'>Phone</td>
          <td style='padding:10px 0;color:#111827;'>$phone</td></tr>
      <tr><td style='padding:10px 0;font-weight:bold;color:#374151;'>Service</td>
          <td style='padding:10px 0;color:#111827;'>$service</td></tr>
      <tr><td style='padding:10px 0;font-weight:bold;color:#374151;vertical-align:top;'>Message</td>
          <td style='padding:10px 0;color:#111827;'>$msg</td></tr>
    </table>
    <p style='margin-top:24px;font-size:12px;color:#9ca3af;'>Sent from kleza.io landing page contact form.</p>
  </div>
</div>
";

// ─── 1. Lead notification email → Kleza team ─────────────────────────────────
$leadPayload = [
    'sender' => ['name' => 'Kleza Website', 'email' => 'services@kleza.io'],
    'to' => [['email' => TO_EMAIL, 'name' => TO_NAME]],
    'cc' => [
        ['email' => 'praveen@kleza.io', 'name' => 'Praveen'],
        ['email' => 'divya.ayuluri@kleza.io', 'name' => 'Divya'],
    ],
    'replyTo' => ['email' => $email, 'name' => $name],
    'subject' => "New Lead: $name is interested in $service",
    'htmlContent' => $htmlContent,
];

$ch = curl_init('https://api.brevo.com/v3/smtp/email');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($leadPayload),
    CURLOPT_HTTPHEADER => [
        'accept: application/json',
        'api-key: ' . BREVO_API_KEY,
        'content-type: application/json',
    ],
    CURLOPT_TIMEOUT => 15,
]);

$response = curl_exec($ch);
$httpStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Mail service connection error']);
    exit();
}

if (!($httpStatus >= 200 && $httpStatus < 300)) {
    $brevoBody = json_decode($response, true);
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => $brevoBody['message'] ?? 'Failed to send email',
    ]);
    exit();
}

// ─── 2. Thank-you email → form submitter ─────────────────────────────────────
$thankYouHtml = "
<div style='font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;'>

  <!-- Header -->
  <div style='background:linear-gradient(135deg,#0066FF 0%,#0052CC 100%);padding:40px 32px;border-radius:12px 12px 0 0;text-align:center;'>
    <img src='https://kleza.io/wp-content/uploads/2021/09/logo.png' alt='Kleza Solutions' style='height:40px;margin-bottom:16px;' />
    <h1 style='color:#ffffff;margin:0;font-size:24px;font-weight:700;'>Thank You, $name! 🎉</h1>
    <p style='color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:15px;'>We've received your request and we're on it.</p>
  </div>

  <!-- Body -->
  <div style='padding:36px 32px;background:#f9fafb;'>
    <p style='font-size:16px;color:#374151;line-height:1.7;margin:0 0 20px;'>
      Hi <strong>$name</strong>, thank you for reaching out to <strong>Kleza Solutions</strong>.
      One of our digital marketing experts will review your request and get back to you
      <strong style='color:#0066FF;'>within 24 hours</strong> with a tailored strategy.
    </p>

    <!-- What you submitted -->
    <div style='background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;padding:20px 24px;margin:24px 0;'>
      <p style='font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#9ca3af;margin:0 0 12px;'>Your Submission</p>
      <table style='width:100%;border-collapse:collapse;font-size:14px;'>
        <tr>
          <td style='padding:6px 0;color:#6b7280;width:100px;'>Service</td>
          <td style='padding:6px 0;color:#111827;font-weight:600;'>$service</td>
        </tr>
        <tr>
          <td style='padding:6px 0;color:#6b7280;'>Phone</td>
          <td style='padding:6px 0;color:#111827;'>$phone</td>
        </tr>
      </table>
    </div>

    <!-- What happens next -->
    <p style='font-size:14px;font-weight:700;color:#374151;margin:24px 0 12px;'>What happens next?</p>
    <table style='width:100%;border-collapse:collapse;'>
      <tr>
        <td style='vertical-align:top;padding:8px 12px 8px 0;'>
          <div style='width:28px;height:28px;background:#0066FF;border-radius:50%;color:#fff;font-weight:700;font-size:13px;text-align:center;line-height:28px;'>1</div>
        </td>
        <td style='vertical-align:top;padding:8px 0;color:#374151;font-size:14px;line-height:1.6;'>
          Our team reviews your goals and prepares a <strong>custom growth strategy</strong>.
        </td>
      </tr>
      <tr>
        <td style='vertical-align:top;padding:8px 12px 8px 0;'>
          <div style='width:28px;height:28px;background:#0066FF;border-radius:50%;color:#fff;font-weight:700;font-size:13px;text-align:center;line-height:28px;'>2</div>
        </td>
        <td style='vertical-align:top;padding:8px 0;color:#374151;font-size:14px;line-height:1.6;'>
          We'll <strong>contact you within 24 hours</strong> to schedule a free strategy call.
        </td>
      </tr>
      <tr>
        <td style='vertical-align:top;padding:8px 12px 8px 0;'>
          <div style='width:28px;height:28px;background:#0066FF;border-radius:50%;color:#fff;font-weight:700;font-size:13px;text-align:center;line-height:28px;'>3</div>
        </td>
        <td style='vertical-align:top;padding:8px 0;color:#374151;font-size:14px;line-height:1.6;'>
          We build and launch your <strong>AI-powered marketing campaign</strong>.
        </td>
      </tr>
    </table>

    <!-- CTA -->
    <div style='text-align:center;margin:32px 0 0;'>
      <a href='https://kleza.io' style='display:inline-block;background:linear-gradient(135deg,#0066FF,#0052CC);color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:700;font-size:15px;'>
        Explore Our Work →
      </a>
    </div>
  </div>

  <!-- Footer -->
  <div style='background:#111827;padding:24px 32px;border-radius:0 0 12px 12px;text-align:center;'>
    <p style='color:rgba(255,255,255,0.5);font-size:12px;margin:0 0 8px;'>
      📍 9331 W 87th St, Overland Park, KS 66212, USA
    </p>
    <p style='color:rgba(255,255,255,0.5);font-size:12px;margin:0;'>
      📞 +1 913-800-2728 &nbsp;·&nbsp;
      ✉️ <a href='mailto:info@kleza.io' style='color:#60a5fa;text-decoration:none;'>info@kleza.io</a>
    </p>
    <p style='color:rgba(255,255,255,0.3);font-size:11px;margin:16px 0 0;'>
      © 2025 Kleza Solutions Pvt. Ltd. · AI-Powered Digital Marketing
    </p>
  </div>

</div>
";

$thankYouPayload = [
    'sender' => ['name' => 'Kleza Solutions', 'email' => 'services@kleza.io'],
    'to' => [['email' => $email, 'name' => $name]],
    'subject' => "We received your request, $name! Our team will reach out within 24 hrs 🚀",
    'htmlContent' => $thankYouHtml,
];

$ch2 = curl_init('https://api.brevo.com/v3/smtp/email');
curl_setopt_array($ch2, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($thankYouPayload),
    CURLOPT_HTTPHEADER => [
        'accept: application/json',
        'api-key: ' . BREVO_API_KEY,
        'content-type: application/json',
    ],
    CURLOPT_TIMEOUT => 15,
]);
curl_exec($ch2);   // fire-and-forget — don't fail the response if this one errors
curl_close($ch2);

// ─── Success ─────────────────────────────────────────────────────────────────
http_response_code(200);
echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
