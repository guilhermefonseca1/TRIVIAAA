import React from 'react';
import propTypes from 'prop-types';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      username: '',
      invalid: true,
    };
  }

  inputRolesValidation = () => {
    const { email, username } = this.state;
    if (
      email.length > 0
      && email.includes('@')
      && email.endsWith('.com')
      && username.length > 0
    ) {
      this.setState({
        invalid: false,
      });
    } else {
      this.setState({
        invalid: true,
      });
    }
  }

  handleInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => this.inputRolesValidation());
  }

  handleEnter = () => {
    const { history } = this.props;
    history.push('/game');
  }

  render() {
    const { email, username, invalid } = this.state;
    return (
      <div className="initial-page">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <div className="login-page">
          <p>Informe seu nome e email:</p>
          <form>
            <input
              type="text"
              name="username"
              placeholder="Username"
              data-testid="input-player-name"
              value={ username }
              onChange={ (event) => this.handleInputChange(event) }
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              data-testid="input-gravatar-email"
              value={ email }
              onChange={ (event) => this.handleInputChange(event) }
            />
            {
              (invalid) ? <p>Por favor preencha corretamente as informações</p> : <> </>
            }
            <button
              type="button"
              disabled={ invalid }
              data-testid="btn-play"
              onClick={ () => this.handleEnter(email) }
            >
              Play
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

export default Login;
