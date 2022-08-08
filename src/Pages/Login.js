import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getToken, savePlayerInfo } from '../Redux/Action';
import { saveTokenToStorage } from '../tests/helpers/addTokenToStorage';
import logo from '../trivia.png';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      inputName: '',
      inputEmail: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = async () => {
    const { inputName, inputEmail } = this.state;
    const { saveTokenToRedux, playerInfo, history } = this.props;
    await saveTokenToRedux();

    const { getTokenFromStore } = this.props;

    saveTokenToStorage(getTokenFromStore);
    playerInfo(inputName, inputEmail);

    history.push('/game');
  }

  render() {
    const { inputEmail, inputName } = this.state;
    const { history } = this.props;
    return (
      <div className="loginPage">
        <div className="triviaLogo">
          <div className="App">
            <img src={ logo } className="App-logo" alt="logo" />
          </div>
        </div>
        <form className="formLogin">
          <label htmlFor="playerName">
            Name:
            <input
              placeholder="Nome do Jogador"
              className="inputLogin"
              id="playerName"
              data-testid="input-player-name"
              value={ inputName }
              onChange={ this.handleChange }
              name="inputName"
              type="text"
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              placeholder="Email"
              className="inputLogin"
              id="email"
              data-testid="input-gravatar-email"
              value={ inputEmail }
              onChange={ this.handleChange }
              name="inputEmail"
              type="email"
            />
          </label>
          <button
            className="button"
            data-testid="btn-play"
            type="button"
            disabled={ !(inputName && inputEmail) }
            onClick={ this.handleClick }
          >
            Play
          </button>
        </form>
        <button
          className="button"
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/settings') }
        >
          Configurações
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  getTokenFromStore: PropTypes.any,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  saveToken: PropTypes.func,
}.isRequired;

const mapStateToProps = (store) => ({
  getTokenFromStore: store.token.token,
  getResponseCode: store.token.responseCode,
});

const mapDispatchToProps = (dispatch) => ({
  saveTokenToRedux: () => dispatch(getToken()),
  playerInfo: (name, email) => dispatch(savePlayerInfo(name, email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
