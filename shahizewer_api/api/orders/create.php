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
        "message" => "Use POST request from checkout page."
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid JSON request."
    ]);
    exit;
}

$userId = (int) ($data["user_id"] ?? 0);
$customer = $data["customer"] ?? [];
$cart = $data["cart"] ?? [];
$total = (float) ($data["total"] ?? 0);

if ($userId <= 0) {
    echo json_encode([
        "success" => false,
        "message" => "User login is required."
    ]);
    exit;
}

if (
    empty($customer["address"]) ||
    empty($customer["city"]) ||
    empty($customer["postal_code"]) ||
    empty($cart)
) {
    echo json_encode([
        "success" => false,
        "message" => "Missing checkout fields."
    ]);
    exit;
}

try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("
        INSERT INTO orders
        (
            user_id,
            order_date,
            status,
            total_amount,
            shipping_address,
            shipping_city,
            shipping_postal_code,
            shipping_country
        )
        VALUES
        (
            :user_id,
            :order_date,
            :status,
            :total_amount,
            :shipping_address,
            :shipping_city,
            :shipping_postal_code,
            :shipping_country
        )
    ");

    $stmt->execute([
        ":user_id" => $userId,
        ":order_date" => date("Y-m-d H:i:s"),
        ":status" => "processing",
        ":total_amount" => $total,
        ":shipping_address" => $customer["address"],
        ":shipping_city" => $customer["city"],
        ":shipping_postal_code" => $customer["postal_code"],
        ":shipping_country" => $customer["country"] ?? "Canada"
    ]);

    $orderId = $pdo->lastInsertId();

    $itemStmt = $pdo->prepare("
        INSERT INTO order_items
        (
            order_id,
            product_id,
            quantity,
            price
        )
        VALUES
        (
            :order_id,
            :product_id,
            :quantity,
            :price
        )
    ");

    foreach ($cart as $item) {
        $itemStmt->execute([
            ":order_id" => $orderId,
            ":product_id" => (int) $item["product_id"],
            ":quantity" => (int) $item["quantity"],
            ":price" => (float) $item["price"]
        ]);
    }

    $pdo->commit();

    echo json_encode([
        "success" => true,
        "message" => "Order placed successfully.",
        "order_id" => $orderId
    ]);
    exit;

} catch (Throwable $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    echo json_encode([
        "success" => false,
        "message" => "Order failed.",
        "error" => $e->getMessage()
    ]);
    exit;
}