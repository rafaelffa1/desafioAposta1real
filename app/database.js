const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database('./db/sample.db');

const tableUsers = "CREATE TABLE usuarios ( ID INTEGER PRIMARY KEY AUTOINCREMENT, nome_usuario varchar(255), email varchar(255), senha varchar(255), coins REAL, pontucao INTEGER,  foto varchar(255), tipo_usuario INTEGER, acessoToken varchar(255))"
db.run(tableUsers);

const tableJogos = "CREATE TABLE jogos ( ID INTEGER PRIMARY KEY AUTOINCREMENT, nome_time1 varchar(255), nome_time2 varchar(255),  ID_usuario_apostador INTEGER, status INTEGER, data_hora varchar(255))"
db.run(tableJogos);

db.close();