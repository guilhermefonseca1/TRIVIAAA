import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getToken } from '../Redux/Action';
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
    const { saveTokenToRedux, history } = this.props;
    await saveTokenToRedux();

    const { getTokenFromStore } = this.props;
    saveTokenToStorage(getTokenFromStore);

    history.push('/game');
  }

  render() {
    const { inputEmail, inputName } = this.state;
    const { history } = this.props;
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={ logo } className="App-logo" alt="logo" />
            <p>SUA VEZ</p>
          </header>
        </div>
        <form>
          <label htmlFor="playerName">
            Name:
            <input
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
              id="email"
              data-testid="input-gravatar-email"
              value={ inputEmail }
              onChange={ this.handleChange }
              name="inputEmail"
              type="email"
            />
          </label>
          <button
            data-testid="btn-play"
            type="button"
            disabled={ !(inputName && inputEmail) }
            onClick={ this.handleClick }
          >
            Play
          </button>
        </form>
        <button
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
});

const mapDispatchToProps = (dispatch) => ({
  saveTokenToRedux: () => dispatch(getToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
