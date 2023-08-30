<?php

class Prodotto
{
  // connessione al database e nome della tabella
  private $conn;
  private $nome_tabella = "prodotti";
  // proprietà dell'oggetto
  public $id;
  public $nome;
  public $descrizione;
  public $prezzo;
  public $categoria_id;
  public $categoria_nome;
  public $data_insert;

  public function __construct($db)
  {
    $this->conn = $db;
  }

  function leggi()
  {
    $sql = "SELECT c.nome as categoria_nome, p.id, p.nome, p.descrizione, p.prezzo, p.categoria_id, p.data_insert
       FROM " . $this->nome_tabella . " p
       INNER JOIN categorie c ON p.categoria_id = c.id
       ORDER BY p.data_insert DESC";
    $stmt = $this->conn->prepare($sql);
    $stmt->execute();
    return $stmt;
  }

  function leggiProdotto()
  {
    $sql = "SELECT c.nome as categoria_nome, p.id, p.nome, p.descrizione, p.prezzo, p.categoria_id, p.data_insert
       FROM " . $this->nome_tabella . " p
           INNER JOIN
               categorie c
                   ON p.categoria_id = c.id
       WHERE
           p.id = ?
       LIMIT
           0,1";
    $stmt = $this->conn->prepare($sql);
    $stmt->bindParam(1, $this->id);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $this->nome = $row['nome'];
    $this->prezzo = $row['prezzo'];
    $this->descrizione = $row['descrizione'];
    $this->categoria_id = $row['categoria_id'];
    $this->categoria_nome = $row['categoria_nome'];
  }

  function crea()
  {
    $sql = "INSERT INTO " . $this->nome_tabella . "
       SET nome=:nome, prezzo=:prezzo, descrizione=:descrizione, categoria_id=:categoria_id, data_insert=:data_insert";
    $stmt = $this->conn->prepare($sql);
    $this->nome = htmlspecialchars(strip_tags($this->nome));
    $this->prezzo = htmlspecialchars(strip_tags($this->prezzo));
    $this->descrizione = htmlspecialchars(strip_tags($this->descrizione));
    $this->categoria_id = htmlspecialchars(strip_tags($this->categoria_id));
    $this->data_insert = htmlspecialchars(strip_tags($this->data_insert));
    $stmt->bindParam(":nome", $this->nome, PDO::PARAM_STR);
    $stmt->bindParam(":prezzo", $this->prezzo, PDO::PARAM_STR);
    $stmt->bindParam(":descrizione", $this->descrizione, PDO::PARAM_STR);
    $stmt->bindParam(":categoria_id", $this->categoria_id, PDO::PARAM_INT);
    $stmt->bindParam(":data_insert", $this->data_insert, PDO::PARAM_STR);
    if ($stmt->execute()) {
      return true;
    }
    return false;
  }

  function aggiorna()
  {
    $sql = "UPDATE".$this->nome_tabella."SET
           nome = :nome,
           prezzo = :prezzo,
           descrizione = :descrizione,
           categoria_id = :categoria_id
       WHERE
           id = :id";
    $stmt = $this->conn->prepare($sql);
    $this->nome = htmlspecialchars(strip_tags($this->nome));
    $this->prezzo = htmlspecialchars(strip_tags($this->prezzo));
    $this->descrizione = htmlspecialchars(strip_tags($this->descrizione));
    $this->categoria_id = htmlspecialchars(strip_tags($this->categoria_id));
    $this->id = htmlspecialchars(strip_tags($this->id));
    $stmt->bindParam(':nome', $this->nome, PDO::PARAM_STR);
    $stmt->bindParam(':prezzo', $this->prezzo, PDO::PARAM_STR);
    $stmt->bindParam(':descrizione', $this->descrizione, PDO::PARAM_STR);
    $stmt->bindParam(':categoria_id', $this->categoria_id, PDO::PARAM_INT);
    $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);
    if ($stmt->execute()) {
      return true;
    }
    return false;
  }

  function delete()
  {
    $sql = "DELETE FROM " . $this->nome_tabella . " WHERE id = ?";
    $stmt = $this->conn->prepare($sql);
    $this->id = filter_var($this->id, FILTER_SANITIZE_NUMBER_INT);
    $stmt->bindParam(1, $this->id, PDO::PARAM_INT);
    if ($stmt->execute()) {
      return true;
    }
    return false;
  }
}

?>