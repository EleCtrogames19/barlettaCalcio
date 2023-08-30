<?php

include_once '../../config/database.php';
include_once '../../objects/prodotti.php';

$method = $_SERVER['REQUEST_METHOD'];

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$id = 0;
if (isset($_REQUEST['request'])) {
  $id = filter_var($_REQUEST['request'], FILTER_SANITIZE_NUMBER_INT);
}

switch ($method) {
  case 'GET':
    if ($id > 0) {
      //**
    } else {
      $prodotto = new Prodotto($db);
      $stmt = $prodotto->leggi();
      $num = $stmt->rowCount();
      if ($num == 0) {
        echo json_encode(
          array("messaggio" => "Nessun prodotto trovato.")
        );
      } else {
        $products_arr = array();
        $products_arr["records"] = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
          extract($row);
          $product_item = array(
            "id" => $id,
            "nome" => $nome,
            "descrizione" => html_entity_decode($descrizione),
            "prezzo" => $prezzo,
            "categoria_id" => $categoria_id,
            "categoria_nome" => $categoria_nome
          );
          array_push($products_arr["records"], $product_item);
        }
      }
    }
    echo json_encode($products_arr);
    break;
}

?>