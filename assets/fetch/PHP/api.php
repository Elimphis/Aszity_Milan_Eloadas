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

    case 'POST':

        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;

        try {

            $stmt = $pdo->prepare("INSERT INTO sutik (nev, tipus, dijazott) VALUES (?, ?, ?)");
            $stmt->execute([
                $data['nev'], $data['tipus'], !$data['dijazott'] ?? true
            ]);

            echo json_encode(['success' => true, 'message' => "Süti sikeresen mentve!", 'data' => $data]);

        }
        catch (PDOException $e) {

            echo json_encode(['success' => false, 'error' => $e->getMessage()]);

        }

    break;

    case 'DELETE':

        $data = json_decode(file_get_contents("php://input"), true) ?? $_POST;

        try {

            $stmt = $pdo->prepare("DELETE FROM sutik WHERE id = ?");
            $stmt->execute([
                $data['id']
            ]);

            echo json_encode(['success' => true, 'message' => "Süti sikeresen törölve!", 'data' => $data]);

        }
        catch (PDOException $e) {

            echo json_encode(['success' => false, 'error' => $e->getMessage()]);

        }

    break;

}