const JogosModel = require("../model/JogosModel");
const fs = require('fs');

exports.selectAllJogos = function (callback) {
  JogosModel.selectAllJogos(callback);
};

exports.selectIdJogos = function (callback, usuarioId) {
  JogosModel.selectAllJogos(callback, usuarioId);
};

exports.insertJogos = function (nome_time1, nome_time2, id_usuario, status, dataHora) {
  JogosModel.insertJogos(nome_time1, nome_time2, id_usuario, status, dataHora)
}

exports.deleteProduto = async function (idProduto) {
  JogosModel.deleteProdutos(idProduto);
}