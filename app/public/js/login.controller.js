'use strict';

const e = React.createElement;
const userLogged = getUserLogged();
verifyUserLogged(userLogged);

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      confirmarSenha: '',
      nomeSobrenome: '',
      continuarLogado: false,
      esqueciSenha: false,
      cadastrarUsuario: false,
      isGoing: true,
      abrirAlerta: false,
      mensagemAlerta: '',
      tipoDeAlerta: 'alert-danger'
    }
    this.verificarLogin(localStorage.getItem("token_login_portec"))
  }

  verificarLogin = (token) => {
    $.ajax({
      type: "POST",
      url: `http://${window.location.host}/verificar_login`,
      data: { token },
      success: (resp) => {
        if (resp.result === true) {
          window.location.href = `http://${window.location.host}/panel/cadastro_produtos?token=${token}`
        }
      }
    })
  }

  onChangeConfirmarSenha = (confirmarSenha) => {
    this.setState({ confirmarSenha: confirmarSenha.target.value });
  }

  onChangeNome = (nomeSobrenome) => {
    this.setState({ nomeSobrenome: nomeSobrenome.target.value });
  }

  onChangeEmail = (email) => {
    this.setState({ email: email.target.value });
  }

  onChangeSenha = (senha) => {
    this.setState({ senha: senha.target.value });
  }

  onClickEsqueciSenha = (e) => {
    e.preventDefault();
    this.setState({ esqueciSenha: true })
  }

  onCLickLogin = (e) => {
    const { email, senha } = this.state;
    e.preventDefault();

    $.ajax({
      type: "POST",
      url: `http://${window.location.host}/acao/login`,
      data: {
        email: email,
        senha: senha
      },
      success: (resp) => {
        if (resp.result === false) {
          this.openAlertaErro('Email ou senha incorreto');
        } else {
          let objectConvertB64 = '154stj%' + window.btoa(JSON.stringify({ id: resp.usuario.ID, nome: resp.usuario.nome_usuario, foto: resp.usuario.foto }));
          localStorage.setItem("token_login_desafio", resp.result);
          localStorage.setItem("user_desafio", window.btoa(objectConvertB64));
          window.location.href = `http://${window.location.host}/desafio`
        }
      },
    });
  }

  onClickirParaTelaCadastrar = (e) => {
    e.preventDefault();
    this.setState({
      cadastrarUsuario: true,
      senha: '',
      email: ''
    })
  }

  onClickVoltarLogin = () => {
    this.setState({
      esqueciSenha: false,
      cadastrarUsuario: false,
      senha: '',
      email: '',
      confirmarSenha: '',
      nomeSobrenome: ''
    });
  }

  onClickCadastrar = (e) => {
    const {
      senha,
      email,
      confirmarSenha,
      nomeSobrenome,
    } = this.state;
    e.preventDefault();

    if (email === '' || nomeSobrenome === '' || senha === '' || confirmarSenha === '') {
      this.openAlertaErro('Preencha todos os campos do formulario');
    } else {
      if (senha === confirmarSenha) {
        $.ajax({
          type: "POST",
          url: `http://${window.location.host}/usuario/cadastrar`,
          data: {
            nomeSobrenome: nomeSobrenome,
            email: email,
            senha: senha
          },
          success: (resp) => {
            this.openAlertaSucesso('Usuário cadastrado com sucesso!');
            this.voltarParaTelaDeLogin();
          },
        });
      } else {
        this.openAlertaErro('A senha não está igual ao campo de confirmar senha');
      }
    }

  }

  onChangeContinuarLogado = () => {

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    this.setState({ continuarLogado: !this.state.continuarLogado });
  }

  openAlertaErro = (mensagem) => {
    this.setState({
      abrirAlerta: true,
      mensagemAlerta: mensagem,
      tipoDeAlerta: 'alert-danger'
    });

    setTimeout(() => {
      this.setState({
        abrirAlerta: false,
      })
    }, 3000);
  }

  openAlertaSucesso = (mensagem) => {
    this.setState({
      abrirAlerta: true,
      mensagemAlerta: mensagem,
      tipoDeAlerta: 'alert-success'
    });
    setTimeout(() => {
      this.setState({
        abrirAlerta: false,
      })
    }, 3000);
  }

  voltarParaTelaDeLogin = () => {
    this.setState({
      cadastrarUsuario: false,
      esqueciSenha: false
    })
  }

  renderContainerLogin = () => {
    const {
      esqueciSenha,
      cadastrarUsuario,
      senha,
      email,
      confirmarSenha,
      nomeSobrenome,
      continuarLogado
    } = this.state;

    if (cadastrarUsuario === true) {
      return (
        <div>

          <span className="login100-form-title p-b-43">
            Nova Conta
					</span>

          <div className="wrap-input100 validate-input">
            <input style={nomeSobrenome !== '' ? { height: 48 } : {}} value={nomeSobrenome} className="input100" onChange={this.onChangeNome} type="text" name="nomesobrenome" />
            <span className="focus-input100"></span>
            <span className="label-input100" style={nomeSobrenome !== '' ? { top: 14, fontSize: 13 } : {}} >Nome e sobrenome</span>
          </div>

          <div className="wrap-input100 validate-input">
            <input style={email !== '' ? { height: 48 } : {}} value={email} className="input100" onChange={this.onChangeEmail} type="text" name="email" />
            <span className="focus-input100"></span>
            <span className="label-input100" style={email !== '' ? { top: 14, fontSize: 13 } : {}}>Email</span>
          </div>

          <div className="wrap-input100 validate-input">
            <input style={senha !== '' ? { height: 48 } : {}} value={senha} className="input100" onChange={this.onChangeSenha} type="password" name="pass" />
            <span className="focus-input100"></span>
            <span className="label-input100" style={senha !== '' ? { top: 14, fontSize: 13 } : {}}>Senha</span>
          </div>

          <div className="wrap-input100 validate-input">
            <input style={confirmarSenha !== '' ? { height: 48 } : {}} value={confirmarSenha} className="input100" onChange={this.onChangeConfirmarSenha} type="password" name="pass2" />
            <span className="focus-input100"></span>
            <span className="label-input100" style={confirmarSenha !== '' ? { top: 14, fontSize: 13 } : {}}>Confirme a senha</span>
          </div>

          <div className="container-login100-form-btn" style={{ marginBottom: 5 }}>
            <button style={{ background: `#8990c7` }} onClick={() => this.onClickVoltarLogin()} className="login100-form-btn">
              Voltar para o login
            </button>
          </div>

          <div className="container-login100-form-btn">
            <button onClick={(e) => this.onClickCadastrar(e)} className="login100-form-btn">
              Cadastrar
            </button>
          </div>

        </div>
      );
    }

    if (esqueciSenha === false && cadastrarUsuario === false) {
      return (
        <div>

          <span className="login100-form-title p-b-43">
            Faça o login para continuar
					</span>

          <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
            <input style={email !== '' ? { height: 48 } : {}} value={email} className="input100" onChange={(e) => this.onChangeEmail(e)} type="text" name="email" />
            <span className="focus-input100"></span>
            <span className="label-input100" style={email !== '' ? { top: 14, fontSize: 13 } : {}}>Email</span>
          </div>

          <div className="wrap-input100 validate-input" data-validate="Password is required">
            <input style={senha !== '' ? { height: 48 } : {}} value={senha} className="input100" onChange={(e) => this.onChangeSenha(e)} type="password" name="pass" />
            <span className="focus-input100"></span>
            <span className="label-input100" style={senha !== '' ? { top: 14, fontSize: 13 } : {}}>Senha</span>
          </div>

          <div className="flex-sb-m w-full p-t-3 p-b-32">
            <div>
              <a href="#" onClick={(e) => this.onClickEsqueciSenha(e)} className="txt1">
                Esqueceu a senha?
							</a>
            </div>
          </div>

          <div className="container-login100-form-btn" style={{ marginBottom: 5 }}>
            <button onClick={(e) => this.onCLickLogin(e)} className="login100-form-btn">
              Login
            </button>
          </div>

          <div className="container-login100-form-btn">
            <button style={{ background: `#8990c7` }} onClick={(e) => this.onClickirParaTelaCadastrar(e)} className="login100-form-btn">
              Nova conta
            </button>
          </div>

        </div>
      )
    } else {
      return (
        <div>
          <span>Coloque o email para enviar uma nova senha temporária</span>
          <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
            <input style={email !== '' ? { height: 48 } : {}} value={email} className="input100" onChange={(e) => this.onChangeEmail(e)} type="text" name="email" />
            <span className="focus-input100"></span>
            <span className="label-input100" style={email !== '' ? { top: 14, fontSize: 13 } : {}}>Email</span>
          </div>

          <div className="container-login100-form-btn" style={{ marginBottom: 5 }}>
            <button style={{ background: `#8990c7` }} onClick={() => this.onClickVoltarLogin()} className="login100-form-btn">
              Voltar para o login
					</button>
          </div>
          <div className="container-login100-form-btn">
            <button className="login100-form-btn">
              Enviar
					</button>
          </div>
        </div>
      )

    }
  }

  render() {
    const { mensagemAlerta, abrirAlerta, tipoDeAlerta } = this.state;
    return (
      <div>
        {abrirAlerta === true &&
          <div className="row">
            <div className={`alert w-100 ${tipoDeAlerta}`} role="alert">
              {mensagemAlerta}
            </div>
          </div>
        }
        {this.renderContainerLogin()}
      </div>
    );
  }
}

const domContainer = document.querySelector('#login_form');
ReactDOM.render(e(Login), domContainer);