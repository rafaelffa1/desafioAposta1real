'use strict';

const e = React.createElement;

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
      isGoing: true
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
          alert('Email ou senha incorreto');
        } else {
          let objectConvertB64 = '154stj%' + window.btoa(JSON.stringify({ id: resp.usuario.ID, nome: resp.usuario.nome_usuario, foto: resp.usuario.foto }));
          localStorage.setItem("token_login_desafio", resp.result);
          localStorage.setItem("user_desafio", window.btoa(objectConvertB64));
          window.location.href = `http://${window.location.host}/desafio`
        }
      }
    })
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

  onClickCadastrar = () => { }

  onChangeContinuarLogado = () => {

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

    console.log('testet')
    // this.setState({ continuarLogado: !this.state.continuarLogado });
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
            <input style={nomeSobrenome !== '' ? { height: 48 } : {}} value={nomeSobrenome} className="input100" onChange={(e) => this.onChangeEmail(e)} type="text" name="nomesobrenome" />
            <span className="focus-input100"></span>
            <span className="label-input100" style={nomeSobrenome !== '' ? { top: 14, fontSize: 13 } : {}} >Nome e sobrenome</span>
          </div>

          <div className="wrap-input100 validate-input">
            <input style={email !== '' ? { height: 48 } : {}} value={email} className="input100" onChange={(e) => this.onChangeEmail(e)} type="text" name="email" />
            <span className="focus-input100"></span>
            <span className="label-input100" style={email !== '' ? { top: 14, fontSize: 13 } : {}}>Email</span>
          </div>

          <div className="wrap-input100 validate-input">
            <input style={senha !== '' ? { height: 48 } : {}} value={senha} className="input100" onChange={(e) => this.onChangeSenha(e)} type="password" name="pass" />
            <span className="focus-input100"></span>
            <span className="label-input100" style={senha !== '' ? { top: 14, fontSize: 13 } : {}}>Senha</span>
          </div>

          <div className="wrap-input100 validate-input">
            <input style={confirmarSenha !== '' ? { height: 48 } : {}} value={confirmarSenha} className="input100" onChange={(e) => this.onChangeSenha(e)} type="password" name="pass2" />
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
            <div className="contact100-form-checkbox">
              {/* <input className="input-checkbox100" onChange={this.onChangeContinuarLogado} checked={continuarLogado} type="checkbox" />
               */}
              <input
                name="isGoing"
                type="checkbox"
                checked={this.state.isGoing}
                onChange={this.onChangeContinuarLogado} />
              <label style={{ color: 'gray', fontSize: 13, float: 'right', marginLeft: 4, marginTop: 4 }}>
                Continuar Logado?
							</label>
            </div>

            <div>
              <a href="#" onClick={(e) => this.onClickEsqueciSenha(e)} className="txt1">
                Esqueceu a senha?
							</a>
            </div>
          </div>

          <div className="container-login100-form-btn" style={{ marginBottom: 5 }}>
            <button style={{ background: `#8990c7` }} onClick={(e) => this.onClickirParaTelaCadastrar(e)} className="login100-form-btn">
              Nova conta
            </button>
          </div>
          <div className="container-login100-form-btn">
            <button onClick={(e) => this.onCLickLogin(e)} className="login100-form-btn">
              Login
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
    return (
      <div>{this.renderContainerLogin()}</div>
    );
  }
}

const domContainer = document.querySelector('#login_form');
ReactDOM.render(e(Login), domContainer);