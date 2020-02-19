'use strict';

const e = React.createElement;

class TelaAdmin extends React.Component {
  render() {
    return (
      <h1>Tela de admin</h1>
    )
  }
}

const domContainer = document.querySelector('#telaadmin');
ReactDOM.render(e(TelaAdmin), domContainer);