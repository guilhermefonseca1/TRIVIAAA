import React from 'react';
import propTypes from 'prop-types';

class Ranking extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <header>
          <h2 data-testid="ranking-title">Ranking</h2>
        </header>
        <form>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ history.push('/') }
          >
            Voltar para tela de Login
          </button>
        </form>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }).isRequired,
};

export default Ranking;
