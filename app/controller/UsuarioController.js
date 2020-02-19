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

exports.calculoDashboardUsuario = async function (idUsuario, callback) {
  async function callbackDashboard(rows) {
    let pontuacao = 0;
    let dinheiro = 0;
    let todosJogadoresPontuacao = [];
    let rankUsuarioLogado = 0;

    const usuarioLogado = rows.filter(usuario => { return usuario.ID == idUsuario });

    pontuacao = usuarioLogado[0].pontucao;
    dinheiro = usuarioLogado[0].coins;

    for (let index = 0; index < rows.length; index++) {
      const element = rows[index];
      todosJogadoresPontuacao.push({
        id: element.ID,
        nome: element.nome_usuario,
        pontuacao: element.pontucao,
        foto: element.foto
      })
    }

    todosJogadoresPontuacao.sort(function (a, b) {
      if (a.pontucao == b.pontucao) return 0;
      if (a.pontucao > b.pontucao) return -1;
      return 1;
    })

    for (let index = 0; index < todosJogadoresPontuacao.length; index++) {
      const element = todosJogadoresPontuacao[index];
      if (element.id === idUsuario) {
        rankUsuarioLogado = index;
        break;
      }
    }

    const infoUsuarioLogadoDashboard = { pontuacao, dinheiro, rankUsuarioLogado, todosJogadoresPontuacao }
    callback(infoUsuarioLogadoDashboard)
  }

  UsuariosModel.selectAllUsuarios(callbackDashboard);
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

exports.verificarTipo = async function (id, callbackReturn) {
  function callback(usuarios) {
    for (let index = 0; index < usuarios.length; index++) {
      const usuario = usuarios[index];
      if (usuario.ID === parseInt(id) && parseInt(usuario.tipo_usuario) === 0) {
        callbackReturn(true)
      }
    }
  }
  UsuariosModel.selectAllUsuarios(callback);
}