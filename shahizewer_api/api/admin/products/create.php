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

$productName = trim($data["product_name"] ?? "");
$price = (float) ($data["price"] ?? 0);
$imageUrl = trim($data["image_url"] ?? "");

if ($productName === "" || $price <= 0 || $imageUrl === "") {
    echo json_encode([
        "success" => false,
        "message" => "Product name, price, and image URL are required."
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        INSERT INTO products
        (product_name, price, image_url, created_at)
        VALUES
        (:product_name, :price, :image_url, NOW())
    ");

    $stmt->execute([
        ":product_name" => $productName,
        ":price" => $price,
        ":image_url" => $imageUrl
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Product created successfully.",
        "product_id" => $pdo->lastInsertId()
    ]);
    exit;

} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
    exit;
}