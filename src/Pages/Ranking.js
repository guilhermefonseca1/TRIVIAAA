import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  constructor() {
    super();

    this.state = {
    };
  }

  render() {
    const { history } = this.props;
    // const ranking = JSON.parse(localStorage.getItem('ranking'));
    // const array = ranking.ranking;

    return (
      <div>
        <section>
          <h1 data-testid="ranking-title">TITLE</h1>
          {/* {
            array.map((value, index) => (
              <ol key="something">
                <li>
                  <div>
                    <p data-testid={ `player-name-${index}` }>
                      {' '}
                      { value.name }
                    </p>
                    <p data-testid={ `player-score-${index}` }>
                      {' '}
                      { value.score }
                    </p>
                    <img
                      src={ `https://www.gravatar.com/avatar/${value.gravatar}` }
                      alt="ranking"
                    />
                  </div>
                </li>
              </ol>
            ))
          } */}
        </section>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ () => history.push('/') }
        >
          home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (store) => ({
  name: store.player.name,
  email: store.player.gravatarEmail,
  score: store.player.score,
});

export default connect(mapStateToProps)(Ranking);
