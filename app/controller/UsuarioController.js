const UsuariosModel = require("../model/UsuariosModel");
const fs = require('fs');
const bcrypt = require('bcryptjs');

exports.selectAllUsuarios = function (callback) {
  UsuariosModel.selectAllUsuarios(callback);
};

exports.insertUsuarios = function (nomeUsuario, email, senha) {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(senha, salt, function (err, hash) {
      UsuariosModel.insertUsuarios(nomeUsuario, email, hash)
    });
  });
}

exports.salvarFotos = async function (fotos) {
  fs.writeFile(`app/public/img/usuarios/${fotos[0].name}`, fotos[0].b64, { encoding: 'base64' }, function (err) {
    console.log('File created');
  });
}

exports.verificarLogin = async function (token, callbackResult) {

  async function callback(rows) {

    let arrayResultados = [];
    function callbackVerification(resultado) {
      arrayResultados.push(resultado);
      if (rows.length === arrayResultados.length) {
        let resultadoFinal = arrayResultados.filter(resp => resp === true);
        if (resultadoFinal[0] === true) {
          callbackResult(true);
        } else {
          callbackResult(false);
        }
      }
    }

    for (let index = 0; index < rows.length; index++) {
      const element = rows[index];
      bcrypt.compare(String(element.acessoToken), token, function (err, res) {
        callbackVerification(res);
      });
    }
  }

  UsuariosModel.selectAllUsuarios(callback);
}


exports.deleteUsuarios = async function (idProduto) {
  UsuariosModel.deleteUsuarios(idProduto);
}

exports.loginUsuario = async function (usuario, callbackReturnHash) {
  const saltRounds = 10;
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < 20; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  const tokenLogin = result;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(tokenLogin, salt, function (err, hash) {
      UsuariosModel.loginUsuario(usuario, tokenLogin);
      callbackReturnHash(hash, usuario)
    });
  });
}
