'use strict';

const e = React.createElement;

class ListaJogos extends React.Component {
  render() {
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
          <div className="form-row align-items-center">
            <div className="col-sm-3 my-1">
              <span>Time 1</span>
              <input type="text" className="form-control" id="inlineFormInputName" placeholder="Jane Doe" />
            </div>
            <div className="col-sm-3 my-1">
              <span>Time 2</span>
              <input type="text" className="form-control" id="inlineFormInputName" placeholder="Jane Doe" />
            </div>
            <div className="col-auto my-1">
              <button type="submit" className="btn btn-primary mt-4">Cadastrar</button>
            </div>
          </div>
        </form>

        <div className="overflow-hidden mb-1">
          <h2 className="font-weight-normal text-7 mb-0">
            Lista de jogos
          </h2>
        </div>


        <div className="w-100">
          <div className="row">

            <div className="col-md-4">
              <div className="card">
                <img src="img/futebol.jpeg" className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Millwall v Fulham</h5>
                  <div>
                    <h5>Data/Hora</h5>
                  </div>
                  <p className="card-text">01/02/2020 17:45</p>
                  <div>
                    <h5>Status</h5>
                  </div>
                  <p className="card-text">Em analise</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card">
                <img src="img/futebol.jpeg" className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Millwall v Fulham</h5>
                  <div>
                    <h5>Data/Hora</h5>
                  </div>
                  <p className="card-text">01/02/2020 17:45</p>
                  <div>
                    <h5>Status</h5>
                  </div>
                  <p className="card-text">Em analise</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card">
                <img src="img/futebol.jpeg" className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Millwall v Fulham</h5>
                  <div>
                    <h5>Data/Hora</h5>
                  </div>
                  <p className="card-text">01/02/2020 17:45</p>
                  <div>
                    <h5>Status</h5>
                  </div>
                  <p className="card-text">Em analise</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    )
  }
}

const domContainer = document.querySelector('#listajogosusuario');
ReactDOM.render(e(ListaJogos), domContainer);