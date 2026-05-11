<?php
declare(strict_types=1);

// Show errors (development only)
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

// Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

// Fix for terminal / undefined REQUEST_METHOD
$method = $_SERVER["REQUEST_METHOD"] ?? "GET";

// Handle preflight (CORS)
if ($method === "OPTIONS") {
    exit;
}

// DB connection
require_once __DIR__ . '/../../db/database.php';

// Only allow POST
if ($method !== "POST") {
    echo json_encode([
        "success" => false,
        "message" => "Use POST request."
    ]);
    exit;
}

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Validate JSON
if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid JSON request."
    ]);
    exit;
}

// Sanitize input
$name = trim($data["name"] ?? "");
$email = trim($data["email"] ?? "");
$phone = trim($data["phone"] ?? "");
$userMessage = trim($data["message"] ?? "");

// Required fields check
if ($name === "" || $email === "" || $userMessage === "") {
    echo json_encode([
        "success" => false,
        "message" => "Name, email, and message are required."
    ]);
    exit;
}

try {
    // Insert into DB
    $stmt = $pdo->prepare("
        INSERT INTO contact_messages
        (name, email, phone, message)
        VALUES
        (:name, :email, :phone, :message)
    ");

    $stmt->execute([
        ":name" => $name,
        ":email" => $email,
        ":phone" => $phone,
        ":message" => $userMessage
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Message submitted successfully."
    ]);
    exit;

} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Failed to submit message.",
        "error" => $e->getMessage() // remove in production
    ]);
    exit;
}