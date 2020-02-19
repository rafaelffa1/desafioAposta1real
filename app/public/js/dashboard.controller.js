'use strict';

const e = React.createElement;
let user_desafio = localStorage.getItem('user_desafio');
const userLogged = getUserLogged();

class Principal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dinheiroUsuario: '',
      pontuacaoUsuario: '',
      rankUsuarioLogado: 0,
      rankUsuarios: []
    }
    this.calculoDashboard();
  }

  calculoDashboard = () => {
    $.ajax({
      type: "GET",
      url: `http://${window.location.host}/usuario/calculoDashboard/${userLogged.userLogadoObject.id}`,
      success: (retorno) => {
        console.log(retorno);
        this.setState({
          dinheiroUsuario: retorno.dinheiro,
          pontuacaoUsuario: retorno.pontuacao,
          rankUsuarioLogado: retorno.rankUsuarioLogado,
          rankUsuarios: retorno.todosJogadoresPontuacao
        })
      },
    });
  }

  definicaoLinhaRank = (pontuacao) => {
    let tamanhoLinha = '0.5em';
    if (pontuacao !== 0) {
      let tamanhoLinhaTmp = pontuacao * 1.4;
      console.log(String(tamanhoLinhaTmp) + 'em');
      return String(tamanhoLinhaTmp) + 'em'
    }
    return tamanhoLinha;
  }

  definicaoLinhaRankDesk = (pontuacao) => {
    let tamanhoLinha = '0.5em';
    if (pontuacao !== 0) {
      let tamanhoLinhaTmp = pontuacao * 1.06;
      console.log(String(tamanhoLinhaTmp) + 'em');
      return String(tamanhoLinhaTmp) + 'em'
    }
    return tamanhoLinha;
  }

  render() {
    const { dinheiroUsuario, pontuacaoUsuario, rankUsuarioLogado, rankUsuarios } = this.state;
    return (
      <div>
        <div className="overflow-hidden mb-1">
          <h2 className="font-weight-normal text-7 mb-0">
            <strong className="font-weight-extra-bold">Meu</strong> Painel</h2>
        </div>

        <div className="overflow-hidden mb-4 pb-3">
          <p className="mb-0">Fique por dentro das suas pontuações e dos seus adversarios</p>
        </div>

        <div className="row">
          <div className="col-md-4 col-sm-12 mb-4">
            <div className="w-100 h-100 bxStatusDashboard">
              <div className="row m-0 p-3" style={{ flexDirection: 'row' }}>
                <div style={{ width: '30%', textAlign: 'center' }}>
                  <img className="imgStatusMoney" src="img/money_icon.png" alt="money" />
                </div>
                <div style={{ width: '70%', textAlign: 'left' }}>
                  <div>
                    <span className="textTitleMoneyStatusBar">Quant. Dinheiro </span>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <small className="sifraoMoneyStatus">R$</small>
                    <span className="textStatusMoney">{dinheiroUsuario}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-12 mb-4">
            <div className="w-100 h-100 bxStatusDashboard">
              <div className="row m-0 p-3" style={{ flexDirection: 'row' }}>
                <div style={{ width: '30%', textAlign: 'center' }}>
                  <img className="imgStatusPoint" src="img/point_icon.png" alt="star" />
                </div>
                <div style={{ width: '70%', textAlign: 'left' }}>
                  <div style={{ marginLeft: '9px' }}>
                    <span className="titleTextStatusPoint">Pontuação </span>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <span className="textStatusPoint">{pontuacaoUsuario}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-12 mb-4">
            <div className="w-100 h-100 bxStatusDashboard">
              <div className="row m-0 p-3" style={{ flexDirection: 'row' }}>
                <div style={{ width: '30%', textAlign: 'center' }}>
                  <img className="imgStatusRank" src="img/rank_icon.png" alt="rank" />
                </div>
                <div style={{ width: '70%', textAlign: 'left' }}>
                  <div>
                    <span className="titleTextStatusRank">Posi. Rank</span>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <span className="textStatusRank">{rankUsuarioLogado}º</span>
                    <small style={{ fontSize: "15px" }}>/{rankUsuarios.length}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="rowGraficoDashboardMobile">
          <div style={{ height: 'auto', background: 'aliceblue', borderRadius: '8px', paddingBottom: '3em' }}>
            <div className="pt-5" style={{ display: 'flex' }}>
              <div className="pl-3 pt-1" style={{ background: 'red', width: '21em', height: '32px' }}>
                <span style={{ color: 'white' }}>Premiação de <strong>1000,00</strong> |  <strong>15</strong> <small>ACERTOS</small> </span>
              </div>
              <div className="ml-2"><img height="30" width="30" src="https://data.whicdn.com/images/220638643/original.gif" alt="star" /></div>
            </div>

            <div>
              {rankUsuarios.map(jogador => {
                return (
                  <div className="pt-5" style={{ display: 'flex', position: 'relative' }}>
                    <div className="pl-3 pt-1" style={{ background: 'red', width: this.definicaoLinhaRank(jogador.pontuacao), height: '32px' }}>
                    </div>
                    <div className="ml-2">
                      <div className="divFotoDashBoard" style={{ background: `url(${jogador.foto})` }}></div>
                    </div>
                    <div className="nomeJogadorLinhaMobible">
                      <span>{jogador.nome}</span>
                      {
                        jogador.pontuacao === 0 && <div style={{ position: 'absolute', top: '13px' }}><span>{jogador.pontuacao} ACERTOS</span></div>
                      }
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        </div>

        <div className="row rowGraficoDashboard">

          <div className="w-100 bxInternalGraficoDashboard">
            <div className="row">
              <div className="col-md-2" style={{ paddingTop: '1em' }}>
                <div className="w-100" style={{ marginLeft: '19px' }}>
                  <div className="bxNomePrecoPremicao">
                    <div><img height="30" width="30" src="https://data.whicdn.com/images/220638643/original.gif" alt="star" /></div>
                    <span className="textPremiacao"><strong>PREMIO: R$1000,00</strong></span>
                  </div>
                  <div className="bxAcertos">
                    <div className="bxInternaAcertos">
                      <div><span className="textAcertos">15</span></div>
                      <div><span className="textTituloAcerto">ACERTOS</span></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-10 jogosGrafico">
                {rankUsuarios.map(jogador => {
                  return (
                    <div className="bxColunaGrafico">
                      <div className="bxTamanhoColunaGrafico" style={{ height: this.definicaoLinhaRankDesk(jogador.pontuacao) }}>
                        <div className="bxAcertosFotosColunas">
                          <div style={{ position: 'absolute', top: '-3em', right: '21px' }}>
                            <div className="divFotoDashBoard" style={{ background: `url(${jogador.foto})` }}>
                              <div className="nomePosicaoLinhaGrafico">
                                <span>{jogador.nome}</span>
                              </div>
                            </div>
                          </div>
                          <div style={{ textAlign: 'center', paddingTop: '1em' }}>
                            <div><span style={{ fontSize: '20px', fontWeight: 'bold' }}>1</span></div>
                            <div><span style={{ fontSize: '11px', fontWeight: 'bold' }}>ACERTOS</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}

              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

const domContainer = document.querySelector('#dashboard');
ReactDOM.render(e(Principal), domContainer);