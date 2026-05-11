<?php
declare(strict_types=1);

ini_set('display_errors', '1');
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once __DIR__ . '/../../../db/database.php';

try {
    $stmt = $pdo->query("
        SELECT 
            o.order_id,
            o.user_id,
            u.full_name,
            u.email,
            o.order_date,
            o.status,
            o.total_amount,
            o.shipping_city,
            o.shipping_country
        FROM orders o
        LEFT JOIN users u ON o.user_id = u.user_id
        ORDER BY o.order_date DESC
    ");

    echo json_encode([
        "success" => true,
        "orders" => $stmt->fetchAll(PDO::FETCH_ASSOC)
    ]);
} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}