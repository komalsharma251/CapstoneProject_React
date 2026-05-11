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
            r.review_id,
            r.product_id,
            p.product_name,
            r.user_id,
            r.customer_name,
            r.rating,
            r.review_text,
            r.created_at
        FROM reviews r
        LEFT JOIN products p ON r.product_id = p.product_id
        ORDER BY r.created_at DESC
    ");

    echo json_encode([
        "success" => true,
        "reviews" => $stmt->fetchAll(PDO::FETCH_ASSOC)
    ]);
} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}