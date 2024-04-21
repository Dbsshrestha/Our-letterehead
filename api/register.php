<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$host = 'localhost';
$db   = 'letterhead';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$opt = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];
$pdo = new PDO($dsn, $user, $pass, $opt);

$data = json_decode(file_get_contents("php://input"));

try {
    $username = $data->username;
    $gmail = $data->gmail;
    $password = $data->password;
    $base64Password = base64_encode($password); // Base64 encode the password

    $query = "INSERT INTO users (username, gmail, password) VALUES (?, ?, ?)";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$username, $gmail, $base64Password]); // Store the base64 encoded password

    echo json_encode(["message" => "User registered successfully."]);
} catch (Exception $e) {
    // Catch any exceptions and return them as valid JSON
    echo json_encode(["error" => $e->getMessage()]);
}

?>
