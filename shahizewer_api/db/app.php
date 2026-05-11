
<?php
declare(strict_types=1);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

define('BASE_URL', '/shahizewer-api');