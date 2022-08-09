import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import '../Style/Game.css';

const correctAnswerColor = 'correct-answer';

// const sleep = (ms) => new Promise(
//   (resolve) => setTimeout(resolve, ms),
// );

class Game extends Component {
  constructor() {
    super();

    this.state = {
      questionsIndex: 0,
      correct: '',
      wrong: '',
    };
  }

  handleQuestions = () => {
    const { questionsIndex } = this.state;
    const { getGameData } = this.props;

    return getGameData[questionsIndex];
  }

  handleMultipleOptions = () => {
    const { correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = this.handleQuestions();

    const answersArr = incorrectAnswers.concat(correctAnswer);

    for (let i = answersArr.length - 1; i > 0; i -= 1) {
      const random = Math.floor(Math.random() * (i + 1));
      [answersArr[i], answersArr[random]] = [answersArr[random], answersArr[i]];
    }
    return answersArr;
  }

  handleClick = ({ target }) => {
    const { id } = target;

    if (id === correctAnswerColor) {
      target.classList.add('correct');
    } else {
      target.classList.add('wrong');
    }
    // await sleep(1000);
    this.setState({
      correct: 'correct',
      wrong: 'wrong',
    });
  }

  render() {
    const { questionsIndex, wrong, correct } = this.state;
    const { getGameData, history } = this.props;

    if (getGameData.length === 0) {
      localStorage.removeItem('token');
      history.push('/');
      return <h1>Invalid Token</h1>;
    }
    if (questionsIndex === getGameData.length) {
      return <h1> End Game </h1>;
    }
    return (
      <div>
        <Header />
        <h1 data-testid="question-category">{ this.handleQuestions().category }</h1>
        <h2 data-testid="question-text">{ this.handleQuestions().question }</h2>
        <section data-testid="answer-options">
          {
            this.handleMultipleOptions().map((el, index) => (
              <button
                className={ el === this.handleQuestions().correct_answer
                  ? correct
                  : wrong }
                key={ el }
                type="button"
                data-testid={ el === this.handleQuestions().correct_answer
                  ? correctAnswerColor
                  : `wrong-answer-${index}` }
                id={ el === this.handleQuestions().correct_answer
                  ? correctAnswerColor
                  : 'wrong-answer' }
                // className={ el === this.handleQuestions().correct_answer
                //   ? 'correct'
                //   : 'wrong' }
                onClick={ this.handleClick }
              >
                { el }
              </button>
            ))
          }
        </section>
      </div>
    );
  }
}

Game.propTypes = {
  getCategory: PropTypes.shape({
    length: PropTypes.number,
  }),
}.isRequired;

const mapStateToProps = (store) => ({
  getGameData: store.asks.results,
});

export default connect(mapStateToProps)(Game);
