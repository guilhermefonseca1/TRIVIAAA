import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
// import { useHistory } from 'react-router-dom';

class Ranking extends React.Component {

 render() {

  const { history, name, email, score } = this.props;
    const gravatar = MD5(email).toString();

  return (
  <div>
    <section>
      <ol>
        <li>
          <div>
            <p data-testid='player-name'> { name } </p>
            <p data-testid='player-score'> { score }</p>
            <img
            src={ `https://www.gravatar.com/avatar/${gravatar}` }
            alt="ranking-profile-picture"
          />
          </div>
        </li>
      </ol>
    </section>
    <button
      data-testid="btn-go-home"
      type="button"
      onClick={ () => history.push('/') }
    >
      home
    </button>
  </div>
   )
 }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  })
}.isRequired

const mapStateToProps = (store) => ({
  name: store.player.name,
  email: store.player.gravatarEmail,
  score: store.player.score,
});

export default connect(mapStateToProps)(Ranking);