<?php
declare(strict_types=1);

ini_set('display_errors', '1');
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
    echo json_encode(["success" => false, "message" => "Use POST request"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$productId = (int) ($data["product_id"] ?? 0);
$userId = (int) ($data["user_id"] ?? 0);
$customerName = trim($data["customer_name"] ?? "");
$rating = (int) ($data["rating"] ?? 0);
$reviewText = trim($data["review_text"] ?? "");

if ($productId <= 0 || $customerName === "" || $rating < 1 || $rating > 5 || $reviewText === "") {
    echo json_encode(["success" => false, "message" => "All review fields are required"]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        INSERT INTO reviews
        (product_id, user_id, customer_name, rating, review_text)
        VALUES
        (:product_id, :user_id, :customer_name, :rating, :review_text)
    ");

    $stmt->execute([
        ":product_id" => $productId,
        ":user_id" => $userId ?: null,
        ":customer_name" => $customerName,
        ":rating" => $rating,
        ":review_text" => $reviewText
    ]);

    echo json_encode(["success" => true, "message" => "Review submitted successfully"]);
} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => "Review failed",
        "error" => $e->getMessage()
    ]);
}