<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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

// Debugging: Print the data received
error_log(print_r($data, true));

$username = $data->username;
$password = $data->password; // Get the plain text password

$query = "SELECT * FROM users WHERE username = ?";
$stmt = $pdo->prepare($query);
$stmt->execute([$username]);

$user = $stmt->fetch();

// Debugging: Print the user fetched from the database
error_log(print_r($user, true));

if ($user && base64_decode($user['password']) === $password) {
    // The username exists and the password is correct
    echo json_encode(["message" => "Login successful."]);
} else {
    // The username doesn't exist or the password is incorrect
    echo json_encode(["message" => "Invalid username or password."]);
}
?>
