const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database('./sample.db');

// 0 = Administrador
// 1 = Usuario comum

let usuario_mock = "INSERT INTO usuarios (nome_usuario, email, senha, coins, pontucao, foto, tipo_usuario) VALUES ('Rafael Usuario Normal', 'usuario.normal@gmail.com', '$2a$10$VChu/QJdZzY73N2MGVMQ8e7Qtbe6DdqmqROXF0LzKHWX3vAP2unv.', 1000.30 , 0, 'img/perfil_padrao.jpg', 1);"
db.run(usuario_mock);

usuario_mock = "INSERT INTO usuarios (nome_usuario, email, senha, coins, pontucao, foto, tipo_usuario) VALUES ('Rafael Administrador', 'usuario.admin@gmail.com', '$2a$10$VChu/QJdZzY73N2MGVMQ8e7Qtbe6DdqmqROXF0LzKHWX3vAP2unv.', 100, 0, 'img/perfil_padrao.jpg', 0);"
db.run(usuario_mock);

db.close(); 