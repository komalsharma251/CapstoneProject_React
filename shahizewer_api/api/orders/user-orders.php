<?php
declare(strict_types=1);

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

$method = $_SERVER["REQUEST_METHOD"] ?? "GET";

if ($method === "OPTIONS") {
    exit;
}

require_once __DIR__ . '/../../db/database.php';

$userId = (int) ($_GET["user_id"] ?? 0);

if ($userId <= 0) {
    echo json_encode([
        "success" => false,
        "message" => "User ID is required."
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT 
            order_id,
            user_id,
            order_date,
            status,
            total_amount,
            shipping_address,
            shipping_city,
            shipping_postal_code,
            shipping_country
        FROM orders
        WHERE user_id = :user_id
        ORDER BY order_date DESC
    ");

    $stmt->execute([
        ":user_id" => $userId
    ]);

    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "orders" => $orders
    ]);
    exit;

} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Failed to fetch orders.",
        "error" => $e->getMessage()
    ]);
    exit;
}