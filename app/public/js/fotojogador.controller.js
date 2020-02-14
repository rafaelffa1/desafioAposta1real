'use strict';

const e = React.createElement;
const userLogged = getUserLogged();

class FotoJogador extends React.Component {
  render() {
    return (
      <div>
        <div className="profile-image-outer-container">
          <div className="profile-image-inner-container bg-color-primary">
            <div className="bxFotoDoJogador" style={{ background: `url(${userLogged.userLogadoObject.foto})` }}></div>
            <span className="profile-image-button bg-color-dark">
              <i className="fas fa-camera text-light"></i>
            </span>
          </div>
          <input type="file" id="file" className="profile-image-input" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <span><strong>{userLogged.userLogadoObject.nome}</strong></span>
        </div>
      </div>
    )
  }
}

const domContainer = document.querySelector('#fotojogador');
ReactDOM.render(e(FotoJogador), domContainer);