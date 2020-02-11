'use strict';

const e = React.createElement;

class Principal extends React.Component {
  render() {
    return (
      <h1>TESTE dashboard</h1>
    )
  }
}

const domContainer = document.querySelector('#dashboard');
ReactDOM.render(e(Principal), domContainer);