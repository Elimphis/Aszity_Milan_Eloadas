<?php

header("Content-Type: application/json");
require "db.php";

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    case 'GET':  
        try {
            $stmt = $pdo->query("SELECT * FROM sutik");
            $readData=$stmt->fetchAll();
            echo json_encode(['success' => true, "data" => $readData]);
        }
        catch(PDOException $e) {
          echo json_encode(['success' => false, 'error' => $e->getMessage()]);
        }

    break;

}