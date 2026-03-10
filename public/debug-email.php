<?php
// ─── DEBUG SCRIPT — Upload to Hostinger, visit it once, then DELETE IT ────────
// URL: https://yourdomain.com/debug-email.php
// IMPORTANT: Delete this file from the server after testing!

header('Content-Type: text/plain');

echo "=== PHP Version ===\n";
echo PHP_VERSION . "\n\n";

echo "=== .env file ===\n";
$envFile = __DIR__ . '/.env';
if (file_exists($envFile)) {
    echo ".env found.\n";
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $trimmed = trim($line);
        if ($trimmed === '' || $trimmed[0] === '#' || strpos($trimmed, '=') === false)
            continue;
        list($k, $v) = explode('=', $trimmed, 2);
        putenv(trim($k) . '=' . trim($v));
        // Show key name but mask value for security
        echo trim($k) . " = " . (strlen(trim($v)) > 10 ? substr(trim($v), 0, 8) . "..." : "(short/empty)") . "\n";
    }
} else {
    echo ".env NOT found at: $envFile\n";
}

echo "\n=== BREVO_API_KEY check ===\n";
$key = getenv('BREVO_API_KEY');
if ($key) {
    echo "Key loaded: " . substr($key, 0, 12) . "...\n";
} else {
    echo "ERROR: BREVO_API_KEY is empty or not loaded!\n";
}

echo "\n=== cURL check ===\n";
echo function_exists('curl_init') ? "cURL: OK\n" : "ERROR: cURL not available!\n";

echo "\n=== Test Brevo API ping ===\n";
if ($key) {
    $ch = curl_init('https://api.brevo.com/v3/account');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => ['api-key: ' . $key, 'accept: application/json'],
        CURLOPT_TIMEOUT => 10,
    ]);
    $resp = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err = curl_error($ch);
    curl_close($ch);

    if ($err) {
        echo "cURL error: $err\n";
    } elseif ($code === 200) {
        $acc = json_decode($resp, true);
        echo "Brevo API: OK\n";
        echo "Account email: " . ($acc['email'] ?? 'unknown') . "\n";
        echo "Plan: " . ($acc['plan'][0]['type'] ?? 'unknown') . "\n";
    } else {
        echo "Brevo API error (HTTP $code):\n$resp\n";
    }
} else {
    echo "Skipped (no key loaded)\n";
}

echo "\n=== Done ===\n";
echo "DELETE this file from your server now!\n";
