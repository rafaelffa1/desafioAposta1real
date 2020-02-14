'use strict';

const e = React.createElement;
const userLogged = getUserLogged();
console.log(userLogged);
verifyUserLogged(userLogged, 'listaJogo');

class ListaJogos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time1: '',
      time2: '',
      abrirAlerta: false,
      tipoDeAlerta: 'alert-danger',
      mensagemAlerta: '',
      jogosObject: []
    }
    this.recuperarJogosDoUsuarioLogado(1);
  }

  recuperarDataHoraAgora = () => {
    const dataHoje = new Date();
    dataHoje.toLocaleDateString('pt-BR');
    const dataBrasil = dataHoje.toLocaleDateString('pt-BR');
    const horaAgora = dataHoje.getMinutes() < 10 ? `0${dataHoje.getMinutes()}` : dataHoje.getMinutes();
    return `${dataBrasil} ${dataHoje.getHours()}:${horaAgora}`;
  }

  onChangeTime1 = (time1) => {
    this.setState({ time1: time1.target.value })
  }

  onChangeTime2 = (time2) => {
    this.setState({ time2: time2.target.value })
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

  recuperarJogosDoUsuarioLogado = (idUsuario) => {
    $.ajax({
      type: "GET",
      url: `http://${window.location.host}/jogo/listar/${idUsuario}`,
      success: (jogosObject) => {
        this.setState({ jogosObject });
      },
    });
  }

  onClickCadastrarJogo = (e) => {
    const { time1, time2 } = this.state;
    e.preventDefault();

    if (time1 === '' || time2 === '') {
      this.openAlertaErro('Preencha todos os campos')
    } else {
      $.ajax({
        type: "POST",
        url: `http://${window.location.host}/jogo/cadastrar`,
        data: {
          nome_time1: time1,
          nome_time2: time2,
          id_usuario: 1,
          status: 0,
          dataHora: this.recuperarDataHoraAgora()
        },
        success: (resp) => {
          this.openAlertaSucesso('Jogo cadastrado com sucesso!');
          this.recuperarJogosDoUsuarioLogado();
        },
      });
    }
  }

  tarjaStatusJogos = (numStatus) => {
    let status = ''
    switch (numStatus) {
      case 0:
        status = 'Pendente de analise'
        break;

      case 1:
        status = 'Aceito'
        break;

      case 2:
        status = 'Vitoria'
        break;

      case 3:
        status = 'Derrota'
        break;

      default:
        break;
    }
    return status;
  }

  render() {
    const {
      time1,
      time2,
      abrirAlerta,
      tipoDeAlerta,
      mensagemAlerta,
      jogosObject } = this.state;
    return (
      <div>
        <div className="overflow-hidden mb-1">
          <h2 className="font-weight-normal text-7 mb-0">
            <strong className="font-weight-extra-bold">Minha</strong> Lista de jogos</h2>
        </div>

        <div className="overflow-hidden mb-4 pb-3">
          <p className="mb-0">Veja todos os seus jogos, e cadastre um novo jogo.</p>
        </div>

        <div className="overflow-hidden mb-1">
          <h2 className="font-weight-normal text-7 mb-0">
            Novo jogo
          </h2>
        </div>

        <form className="mb-4">
          {abrirAlerta === true &&
            <div className="row">
              <div className={`alert w-100 ${tipoDeAlerta}`} role="alert">
                {mensagemAlerta}
              </div>
            </div>
          }
          <div className="form-row align-items-center">
            <div className="col-sm-3 my-1">
              <span>Time 1</span>
              <input type="text" className="form-control" onChange={this.onChangeTime1} value={time1} placeholder="Flamengo" />
            </div>
            <div className="col-sm-3 my-1">
              <span>Time 2</span>
              <input type="text" className="form-control" onChange={this.onChangeTime2} value={time2} placeholder="Vasco da Gama" />
            </div>
            <div className="col-auto my-1">
              <button type="submit" onClick={(e) => this.onClickCadastrarJogo(e)} className="btn btn-primary mt-4">Cadastrar</button>
            </div>
          </div>
        </form>

        <div className="overflow-hidden mb-1">
          <h2 className="font-weight-normal text-7 mb-0">
            Lista de jogos
          </h2>
        </div>

        <div className="w-100">
          <div className="row bxDosJogos">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Jogo</th>
                  <th scope="col">Data/Hora</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  jogosObject.map((jogo) => {
                    return (
                      <tr>
                        <th scope="row">{jogo.ID}</th>
                        <td>{jogo.nome_time1} v {jogo.nome_time2}</td>
                        <td>{jogo.data_hora}</td>
                        <td>{this.tarjaStatusJogos(jogo.status)}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

const domContainer = document.querySelector('#listajogosusuario');
ReactDOM.render(e(ListaJogos), domContainer);