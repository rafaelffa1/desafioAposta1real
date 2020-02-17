'use strict';

const e = React.createElement;
let user_desafio = localStorage.getItem('user_desafio');

class Principal extends React.Component {
  render() {
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
                    <span className="textStatusMoney">1000,00</span>
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
                    <span className="textStatusPoint">15</span>
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
                    <span className="textStatusRank">5º</span>
                    <small style={{ fontSize: "15px" }}>/100</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="rowGraficoDashboardMobile">
          <div style={{ height: 'auto', background: 'aliceblue', borderRadius: '8px' }}>
            <div className="pt-5" style={{ display: 'flex' }}>
              <div className="pl-3 pt-1" style={{ background: 'red', width: '21em', height: '32px' }}>
                <span style={{ color: 'white' }}>Premiação de <strong>1000,00</strong> |  <strong>15</strong> <small>ACERTOS</small> </span>
              </div>
              <div className="ml-2"><img height="30" width="30" src="https://data.whicdn.com/images/220638643/original.gif" alt="star" /></div>
            </div>

            <div>
              <div className="pt-5" style={{ display: 'flex' }}>
                <div className="pl-3 pt-1" style={{ background: 'red', width: '10em', height: '32px' }}>
                </div>
                <div className="ml-2"><img height="30" width="30" src="https://data.whicdn.com/images/220638643/original.gif" alt="star" /></div>
              </div>
              <div className="pt-5" style={{ display: 'flex' }}>
                <div className="pl-3 pt-1" style={{ background: 'red', width: '11em', height: '32px' }}>
                </div>
                <div className="ml-2"><img height="30" width="30" src="https://data.whicdn.com/images/220638643/original.gif" alt="star" /></div>
              </div>
              <div className="pt-5" style={{ display: 'flex' }}>
                <div className="pl-3 pt-1" style={{ background: 'red', width: '19em', height: '32px' }}>
                </div>
                <div className="ml-2"><img height="30" width="30" src="https://data.whicdn.com/images/220638643/original.gif" alt="star" /></div>
              </div>
              <div className="pt-5" style={{ display: 'flex' }}>
                <div className="pl-3 pt-1" style={{ background: 'red', width: '6em', height: '32px' }}>
                </div>
                <div className="ml-2"><img height="30" width="30" src="https://data.whicdn.com/images/220638643/original.gif" alt="star" /></div>
              </div>

              

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
                <div className="bxColunaGrafico">
                  <div className="bxTamanhoColunaGrafico" style={{ height: '5em' }}>
                    <div className="bxAcertosFotosColunas">
                      <div style={{ position: 'absolute', top: '-3em', right: '21px' }}>
                        <img height="30" width="30" src="https://data.whicdn.com/images/220638643/original.gif" alt="star" />
                      </div>
                      <div style={{ textAlign: 'center', paddingTop: '1em' }}>
                        <div><span style={{ fontSize: '20px', fontWeight: 'bold' }}>1</span></div>
                        <div><span style={{ fontSize: '11px', fontWeight: 'bold' }}>ACERTOS</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bxColunaGrafico">
                  <div className="bxTamanhoColunaGrafico" style={{ height: '7em' }}>
                    <div className="bxAcertosFotosColunas">
                      <div style={{ position: 'absolute', top: '-3em', right: '21px' }}>
                        <img height="30" width="30" src="https://data.whicdn.com/images/220638643/original.gif" alt="star" />
                      </div>
                      <div style={{ textAlign: 'center', paddingTop: '1em' }}>
                        <div><span style={{ fontSize: '20px', fontWeight: 'bold' }}>1</span></div>
                        <div><span style={{ fontSize: '11px', fontWeight: 'bold' }}>ACERTOS</span></div>
                      </div>
                    </div>
                  </div>
                </div>


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