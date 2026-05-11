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

$reviewId = (int) ($data["review_id"] ?? 0);

if ($reviewId <= 0) {
    echo json_encode([
        "success" => false,
        "message" => "Review ID is required."
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        DELETE FROM reviews
        WHERE review_id = :review_id
    ");

    $stmt->execute([
        ":review_id" => $reviewId
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Review deleted successfully."
    ]);
} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}