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

require_once __DIR__ . '/../../../db/database.php';

if ($method !== "POST") {
    echo json_encode([
        "success" => false,
        "message" => "Use POST request."
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$productId = (int) ($data["product_id"] ?? 0);
$productName = trim($data["product_name"] ?? "");
$price = (float) ($data["price"] ?? 0);
$imageUrl = trim($data["image_url"] ?? "");

if ($productId <= 0 || $productName === "" || $price <= 0 || $imageUrl === "") {
    echo json_encode([
        "success" => false,
        "message" => "Product ID, name, price, and image URL are required."
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        UPDATE products
        SET 
            product_name = :product_name,
            price = :price,
            image_url = :image_url
        WHERE product_id = :product_id
    ");

    $stmt->execute([
        ":product_id" => $productId,
        ":product_name" => $productName,
        ":price" => $price,
        ":image_url" => $imageUrl
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Product updated successfully."
    ]);
    exit;

} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
    exit;
}