function getUserLogged() {
  let user_desafio = localStorage.getItem('user_desafio');
  let token_login_desafio = localStorage.getItem('token_login_desafio');
  if (user_desafio !== null) {
    try {
      user_desafio = atob(user_desafio);
      const user_desafio_final = user_desafio.slice(7);
      let userLogadoObject = JSON.parse(atob(user_desafio_final));
      return { userLogadoObject, token_login_desafio };
    } catch (error) {
      return null;
    }
  } else {
    return null
  }
}

let verificarRetorno = false

function verifyUserLogged(objetSecurity, view = 'login') {

  if (objetSecurity !== null) {
    if (objetSecurity.token_login_desafio !== null) {
      $.ajax({
        type: "POST",
        url: `http://${window.location.host}/verificar_login`,
        data: {
          token: objetSecurity.token_login_desafio
        },
        success: (resp) => {
          if (resp.result === true) {
            document.getElementById('main').style.display = 'block';
          }

          if (resp.result === false && view !== 'login') {
            window.location.href = `http://${window.location.host}/`;
          }
        },
      });
    } else {
      if (view !== 'login') {
        window.location.href = `http://${window.location.host}/`;
      }
    }
  } else {
    if (view !== 'login') {
      window.location.href = `http://${window.location.host}/`;
    }
  }
}
