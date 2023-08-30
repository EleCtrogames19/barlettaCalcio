<?php

class Categoria
{
  // connessione al database e nome della tabella
  private $conn;
  private $table_name = "categorie";
  // proprietà dell'oggetto
  public $id;
  public $nome;
  public $descrizione;
  public $data_insert;

  public function __construct($db)
  {
    $this->conn = $db;
  }

  public function readAll()
  {
    $sql = "SELECT id, nome, descrizione
FROM " . $this->table_name . "
ORDER BY nome";
    $stmt = $this->conn->prepare($sql);
    $stmt->execute();
    return $stmt;
  }
}

?>