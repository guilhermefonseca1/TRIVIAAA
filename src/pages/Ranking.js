import React from 'react';
import propTypes from 'prop-types';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    const ranking = localStorage.getItem('ranking');
    if (ranking !== null) {
      this.setState({
        ranking: ranking.sort((a, b) => b.score - a.score),
      });
    }
  }

  render() {
    const { history } = this.props;
    const { ranking } = this.state;
    return (
      <div>
        <header>
          <h2 data-testid="ranking-title">Ranking</h2>
        </header>
        <main>
          {
            (ranking !== null && ranking.length > 0)
              ? (
                <ol>
                  {
                    ranking.map((person, index) => (
                      <li key={ index }>
                        <img src={ person.picture } alt="imagem da pessoa jogadora" />
                        <h4>{person.name}</h4>
                        <p>{person.score}</p>
                      </li>
                    ))
                  }
                </ol>
              )
              : <p>Não há jogadores no ranking ainda</p>
          }
          <form>
            <button
              type="button"
              data-testid="btn-go-home"
              onClick={ () => history.push('/') }
            >
              Voltar
            </button>
          </form>
        </main>
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
