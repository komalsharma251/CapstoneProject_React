
<?php
declare(strict_types=1);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once __DIR__ . '/../../db/database.php';

$productId = (int) ($_GET["product_id"] ?? 0);

if ($productId <= 0) {
    echo json_encode(["success" => false, "message" => "Product ID required"]);
    exit;
}

$stmt = $pdo->prepare("
    SELECT review_id, customer_name, rating, review_text, created_at
    FROM reviews
    WHERE product_id = :product_id
    ORDER BY created_at DESC
");

$stmt->execute([":product_id" => $productId]);

echo json_encode([
    "success" => true,
    "reviews" => $stmt->fetchAll(PDO::FETCH_ASSOC)
]);