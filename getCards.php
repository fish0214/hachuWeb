<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// 資料庫設定
$host = getenv('DB_HOST') ?: 'db';
$dbuser = getenv('DB_USER') ?: 'user';
$dbpassword = getenv('DB_PASSWORD') ?: 'password';
$dbname = getenv('DB_NAME') ?: 'hachudb';

try {
    // 建立 PDO 連線
    $pdo = new PDO("pgsql:host=$host;port=5432;dbname=$dbname", $dbuser, $dbpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // 取得搜尋條件（如果有提供）
    $search = isset($_GET['search']) ? $_GET['search'] : "";

    // 取得分頁參數，預設 page = 1, limit = 10
    $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 12;
    if($page < 1) $page = 1;
    if($limit < 1) $limit = 10;
    $offset = ($page - 1) * $limit;

    // 先取得符合條件的總筆數
    $countSql = "SELECT COUNT(*) FROM test_results";
    if ($search !== "") {
        $countSql .= " WHERE user_name LIKE :search";
    }
    $countStmt = $pdo->prepare($countSql);
    if ($search !== "") {
        $countStmt->bindValue(':search', "%$search%", PDO::PARAM_STR);
    }
    $countStmt->execute();
    $total = (int)$countStmt->fetchColumn();

    // 取得資料
    $sql = "SELECT user_name, card_url, timestamp FROM test_results";
    if ($search !== "") {
        $sql .= " WHERE user_name LIKE :search";
    }
    $sql .= " ORDER BY timestamp DESC LIMIT :limit OFFSET :offset";
    $stmt = $pdo->prepare($sql);
    if ($search !== "") {
        $stmt->bindValue(':search', "%$search%", PDO::PARAM_STR);
    }
    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();

    $cards = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $totalPages = ceil($total / $limit);

    echo json_encode([
        'total'      => $total,
        'page'       => $page,
        'limit'      => $limit,
        'totalPages' => $totalPages,
        'cards'      => $cards
    ]);
} catch (Exception $e) {
    error_log($e->getMessage()); // 記錄詳細錯誤
    http_response_code(500);
    echo json_encode([
        'message' => 'Database error'
    ]);
}
?>
