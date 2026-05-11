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

$email = trim($data["email"] ?? "");
$password = trim($data["password"] ?? "");

if ($email === "" || $password === "") {
    echo json_encode([
        "success" => false,
        "message" => "Email and password are required."
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT user_id, full_name, email, password_hash, role
        FROM users
        WHERE email = :email
        LIMIT 1
    ");

    $stmt->execute([
        ":email" => $email
    ]);

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || !password_verify($password, $user["password_hash"])) {
        echo json_encode([
            "success" => false,
            "message" => "Invalid email or password."
        ]);
        exit;
    }

    echo json_encode([
        "success" => true,
        "message" => "Login successful.",
        "user" => [
            "user_id" => $user["user_id"],
            "full_name" => $user["full_name"],
            "email" => $user["email"],
            "role" => $user["role"]
        ]
    ]);
    exit;

} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Login failed.",
        "error" => $e->getMessage()
    ]);
    exit;
}