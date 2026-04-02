<?php

$servername = "localhost";
$username   = "root";
$dbname     = "beadandok";
$password   = "Start1234!";

try {

    $pdo = new PDO(
        "mysql:host=$servername;dbname=$dbname;port=3306", $username, $password,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
    );

} catch(PDOException $e) {

    echo "Connection failed: " . $e->getMessage();

}

?>