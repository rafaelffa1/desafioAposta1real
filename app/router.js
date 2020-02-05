const express = require("express");
const router = express.Router();
const path = require("path");
const ProdutoController = require('./controller/ProdutoController');
const UsuarioController = require('./controller/UsuarioController');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const app = express();

router.use('/', express.static(path.join(__dirname + '/public')), function (req, res, next) {
  next();
});

router.use('/', express.static(path.join(__dirname + '/public/panel/')), function (req, res, next) {
  next();
});

verificarLoginToken = (token, callbackResultado) => {
  UsuarioController.selectAllUsuarios(callback);
  function callback(rows) {
    for (let index = 0; index < rows.length; index++) {
      const element = rows[index];
      bcrypt.compare(String(element.acesso), token, function (err, res) {
        callbackResultado(res);
      });
    }
  }
}

// ===================== Site =============================================

router.get("/", function (req, res) {
  res.sendfile(path.join(__dirname + "/page/index.html"));
});

router.get("/desafio", function (req, res) {
  res.sendfile(path.join(__dirname + "/page/desafio.html"));
});

// ===================== Ações ============================================


router.post("acao/login", (req, res) => {
  let result = false

  callbackResult = (result) => {
    if (result === true) {
      res.json({ result })
    }
  }

  function callback(rows) {
    for (let index = 0; index < rows.length; index++) {
      const element = rows[index];
      bcrypt.compare(String(element.acesso), req.body.token, function (err, res) {
        callbackResult(res)
      });
    }
  }

  UsuarioController.selectAllUsuarios(callback);
});

router.post("/verificar_login", (req, res) => {
  let result = false

  callbackResult = (result) => {
    if (result === true) {
      res.json({ result })
    }
  }

  function callback(rows) {
    for (let index = 0; index < rows.length; index++) {
      const element = rows[index];
      bcrypt.compare(String(element.acesso), req.body.token, function (err, res) {
        callbackResult(res)
      });
    }
  }
  UsuarioController.selectAllUsuarios(callback);
});

router.post("/usuario/cadastrar", async function (req, res) {
  let nomeFoto = '';
  if (req.body.foto === undefined) {
    nomeFoto = 'defaultUsuario.png';
  } else {
    await UsuarioController.salvarFotos(req.body.foto);
    nomeFoto = req.body.foto[0].name;
  }
  UsuarioController.insertUsuarios(
    req.body.nome,
    req.body.email,
    req.body.tipo,
    req.body.senha,
    nomeFoto
  )
  res.sendStatus(200)
});

router.post("/jogo/cadastrar", function (req, res) {
  let nomesDasFotos = '';
  ProdutoController.salvarFotos(req.body.fotos);
  req.body.fotos.map(element => {
    nomesDasFotos = nomesDasFotos + element.name + ','
  })
  ProdutoController.insertProdutos(
    req.body.nome,
    req.body.categoria,
    req.body.descricao,
    nomesDasFotos
  )
  res.sendStatus(200)
});

router.get("/jogo/listar", (req, res) => {
  function callback(row) {
    res.json(row);
  }
  ProdutoController.selectAllProdutos(callback);
});

router.get("/jogo/listar/:id", (req, res) => {
  function callback(row) {
    res.json(row);
  }
  ProdutoController.selectIdProduto(callback, req.params.id);
});

router.get("/usuario/listar", (req, res) => {
  function callback(row) {
    res.json(row);
  }
  UsuarioController.selectAllUsuarios(callback);
});

router.delete("/usuario/deletar/:id", (req, res) => {
  UsuarioController.deleteUsuarios(req.params.id);
  res.sendStatus(200);
});


module.exports = router;
