<?php
declare(strict_types=1);

ini_set('display_errors', '1');
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

$method = $_SERVER["REQUEST_METHOD"] ?? "GET";

if ($method === "OPTIONS") {
    exit;
}

require_once __DIR__ . '/../../../db/database.php';

if ($method !== "POST") {
    echo json_encode([
        "success" => false,
        "message" => "Use POST request."
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$orderId = (int) ($data["order_id"] ?? 0);
$status = trim($data["status"] ?? "");

$allowedStatuses = ["processing", "shipped", "delivered", "cancelled"];

if ($orderId <= 0 || !in_array($status, $allowedStatuses, true)) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid order status."
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        UPDATE orders
        SET status = :status
        WHERE order_id = :order_id
    ");

    $stmt->execute([
        ":status" => $status,
        ":order_id" => $orderId
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Order status updated."
    ]);
} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}