import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import logo from '../trivia.png';
import '../Style/Game.css';
import { getAssertions, getNextBtnClick, getScorePoints } from '../Redux/Action';
import Timer from '../components/Timer';
class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionsIndex: 0,
      correct: '',
      wrong: '',
      nextBtn: false,
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

  handleAnswersClick = ({ target }) => {
    const { id } = target;
    const { dispatch, timer } = this.props;
    const { difficulty } = this.handleQuestions();

    this.setState({
      correct: 'correct',
      wrong: 'wrong',
      showNextBtn: true,
    });
    if (id === 'correct') {
      const multiplier = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3;
      const totalScore = 10 + ( timer * multiplier);

      dispatch(getAssertions());
      dispatch(getScorePoints(totalScore))
    };
  }

  handleNextBtnClick = () => {
    const { dispatch } = this.props;
    this.setState((prevState) => ({
      correct: '',
      wrong: '',
      questionsIndex: prevState.questionsIndex + 1,
      showNextBtn: false,
    }));
    dispatch(getNextBtnClick(true));
  }

  render() {
    const { questionsIndex, wrong, correct, showNextBtn } = this.state;
    const { getGameData, history, isDisabled } = this.props;

    if (getGameData.length === 0) {
      localStorage.removeItem('token');
      history.push('/');
      return <h1>Invalid Token</h1>;
    }
    if (questionsIndex === getGameData.length) {
      history.push('/feedback')
      return <h1> End Game </h1>;
    }
    return (
      <div>
        <Header />
        <Timer isDisabled={ this.isDisabled } />
        <div className="App">
          <div className="App-header">
            <img src={ logo } className="App-logo" alt="logo" />
            <p>SUA VEZ</p>
          </div>
        </div>
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
                  ? 'correct-answer'
                  : `wrong-answer-${index}` }
                id={ el === this.handleQuestions().correct_answer
                  ? 'correct'
                  : 'wrong' }
                onClick={ this.handleAnswersClick }
                disabled={ isDisabled }
              >
                { el }
              </button>
            ))
          }
          {
            showNextBtn &&
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.handleNextBtnClick }
            >
              Next
            </button>
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
  isDisabled: store.player.isDisabled,
  timer: store.player.timer,
});

export default connect(mapStateToProps)(Game);
