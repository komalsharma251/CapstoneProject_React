<?php
declare(strict_types=1);

ini_set('display_errors', '1');
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once __DIR__ . '/../../db/database.php';

if (!isset($_GET['id']) || empty($_GET['id'])) {
    echo json_encode(["error" => "Product ID is required"]);
    exit;
}

$product_id = (int) $_GET['id'];

$stmt = $pdo->prepare("
    SELECT product_id, product_name, price, image_url
    FROM products
    WHERE product_id = :product_id
    LIMIT 1
");

$stmt->execute([
    ":product_id" => $product_id
]);

$product = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$product) {
    echo json_encode(["error" => "Product not found"]);
    exit;
}

echo json_encode($product);
exit;