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
    echo json_encode(["success" => true]);
    exit;
}

require_once __DIR__ . '/../../../db/database.php';

$data = json_decode(file_get_contents("php://input"), true);

$productId = (int) ($data["product_id"] ?? 0);

if ($productId <= 0) {
    echo json_encode([
        "success" => false,
        "message" => "Product ID is required."
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        DELETE FROM products
        WHERE product_id = :product_id
    ");

    $stmt->execute([
        ":product_id" => $productId
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Product deleted."
    ]);
    exit;

} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
    exit;
}