const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbPath = path.resolve(__dirname, "../db/sample.db");
const util = require('util');

let db = new sqlite3.Database(dbPath);

exports.insertJogos = function (
  nome_time1,
  nome_time2,
  id_usuario,
  status,
  dataHora
) {
  db.run(
    `INSERT INTO jogos (nome_time1,nome_time2,ID_usuario_apostador,status,data_hora) VALUES(?,?,?,?,?)`,
    [nome_time1, nome_time2, id_usuario, status, dataHora],
    function (err) {
      if (err) {
        return console.log(err.message);
      }
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    }
  );
};

exports.selectAllJogos = function (callback) {
  db.serialize(function () {
    db.all("SELECT * FROM jogos", function (err, allRows) {
      if (err != null) {
        console.log(err);
      }
      callback(allRows);
    });
  });
}

exports.selectIdJogos = function (callback, idUsuario) {
  db.serialize(function () {
    db.all(`SELECT * FROM jogos WHERE ID == ${idUsuario}`, function (err, allRows) {
      if (err != null) {
        console.log(err);
      }
      callback(allRows);
    });
  });
}

exports.deleteJogos = function (idJogos) {
  db.run(`DELETE FROM produtos WHERE ID == ${idProduto}`, function (err) {
    if (err != null) {
      console.log(err);
    }
  });
}
