<?php
$host = getenv('DB_HOST') ?: 'db';
$dbuser = getenv('DB_USER') ?: 'user';
$dbpassword = getenv('DB_PASSWORD') ?: 'password';
$dbname = getenv('DB_NAME') ?: 'hachudb';

try {
    // 連線到資料庫
    $pdo = new PDO("pgsql:host=$host;port=5432;dbname=$dbname", $dbuser, $dbpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 獲取前端發送的數據
    $data = json_decode(file_get_contents("php://input"), true);

    if (
        !$data || 
        empty($data['userName']) || 
        empty($data['userAnswers']) || 
        empty($data['cardUrl'])
    ) {
        http_response_code(400);
        echo json_encode(['message' => 'Invalid data']);
        exit;
    }

    $userName = $data['userName'];
    $answers = json_encode($data['userAnswers'], JSON_UNESCAPED_UNICODE);
    $cardUrl = $data['cardUrl'];
    $timestamp = date('Y-m-d H:i:s'); 

    // 插入數據到資料庫
    $stmt = $pdo->prepare("INSERT INTO test_results (user_name, answers, card_url, timestamp) VALUES (:user_name, :answers, :card_url, :timestamp)");
    $stmt->execute([
        'user_name' => $userName, 
        'answers' => $answers, 
        'card_url' => $cardUrl,
        'timestamp' => $timestamp
    ]);

    echo json_encode(['message' => 'Data saved successfully']);
} catch (Exception $e) {
    error_log($e->getMessage()); // 將錯誤紀錄到 log 中
    http_response_code(500);
    echo json_encode(['message' => 'Database error']);
}
?>
