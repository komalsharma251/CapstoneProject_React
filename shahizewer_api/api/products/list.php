<?php
declare(strict_types=1);

ini_set('display_errors', '1');
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once __DIR__ . '/../../db/database.php';

$stmt = $pdo->query("
    SELECT product_id, product_name, price, image_url
    FROM products
    ORDER BY created_at DESC
");

$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($products);
exit;