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
            message_id,
            name,
            email,
            phone,
            message,
            created_at
        FROM contact_messages
        ORDER BY created_at DESC
    ");

    echo json_encode([
        "success" => true,
        "messages" => $stmt->fetchAll(PDO::FETCH_ASSOC)
    ]);
} catch (Throwable $e) {
    echo json_encode([
        "success" => false,
        "message" => $e->getMessage()
    ]);
}