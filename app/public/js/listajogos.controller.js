'use strict';

const e = React.createElement;

class ListaJogos extends React.Component {
  render() {
    return (
      <h1>TESTE lista jogos</h1>
    )
  }
}

const domContainer = document.querySelector('#listajogosusuario');
ReactDOM.render(e(ListaJogos), domContainer);