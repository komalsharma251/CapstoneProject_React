<?php
declare(strict_types=1);

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json");

$method = $_SERVER["REQUEST_METHOD"] ?? "GET";

if ($method === "OPTIONS") {
    exit;
}

require_once __DIR__ . '/../../db/database.php';

if ($method !== "POST") {
    echo json_encode([
        "success" => false,
        "message" => "Use POST request."
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$full_name = trim($data["full_name"] ?? "");
$email = trim($data["email"] ?? "");
$password = trim($data["password"] ?? "");

if ($full_name === "" || $email === "" || $password === "") {
    echo json_encode([
        "success" => false,
        "message" => "All fields are required."
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid email address."
    ]);
    exit;
}

if (strlen($password) < 6) {
    echo json_encode([
        "success" => false,
        "message" => "Password must be at least 6 characters."
    ]);
    exit;
}

try {
    $check = $pdo->prepare("
        SELECT user_id 
        FROM users 
        WHERE email = :email 
        LIMIT 1
    ");

    $check->execute([
        ":email" => $email
    ]);

    if ($check->fetch()) {
        echo json_encode([
            "success" => false,
            "message" => "Email already registered."
        ]);
        exit;
    }

    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("
        INSERT INTO users 
        (full_name, email, password_hash, role)
        VALUES 
        (:full_name, :email, :password_hash, 'customer')
    ");

    $stmt->execute([
        ":full_name" => $full_name,
        ":email" => $email,
        ":password_hash" => $password_hash
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Account created successfully."
    ]);
    exit;

} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Registration failed.",
        "error" => $e->getMessage()
    ]);
    exit;
}