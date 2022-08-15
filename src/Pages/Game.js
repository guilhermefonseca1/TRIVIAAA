import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import '../Style/Game.css';
import { getAssertions, getNextBtnClick, getScorePoints,
  handleDisableBtns } from '../Redux/Action';
import Timer from '../components/Timer';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionsIndex: 0,
      correct: '',
      wrong: '',
      stopTimer: false,
      showNextBtn: false,
      answersArr: [],
    };
  }

  componentDidMount() {
    const { getGameData } = this.props;
    if (getGameData.length === 0) return getGameData;
    this.handleMultipleOptions();
  }

  handleQuestions = () => {
    const { questionsIndex } = this.state;
    const { getGameData } = this.props;

    return getGameData[questionsIndex];
  }

  handleMultipleOptions = () => {
    const { questionsIndex } = this.state;
    const maxQuestions = 5;
    if (questionsIndex === maxQuestions) return;
    const { correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = this.handleQuestions();

    const answersArr = incorrectAnswers.concat(correctAnswer);

    for (let i = answersArr.length - 1; i > 0; i -= 1) {
      const random = Math.floor(Math.random() * (i + 1));
      [answersArr[i], answersArr[random]] = [answersArr[random], answersArr[i]];
    }
    this.setState({
      answersArr,
    });
  }

  getMultiplier = (difficulty) => {
    const easyNum = 1;
    const mediumNum = 2;
    const hardNum = 3;
    if (difficulty === 'easy') return easyNum;
    if (difficulty === 'medium') return mediumNum;
    if (difficulty === 'hard') return hardNum;
  }

  handleAnswersClick = ({ target }) => {
    const { id } = target;
    const { dispatch, timer } = this.props;
    const { difficulty } = this.handleQuestions();

    this.setState({
      correct: 'correct',
      wrong: 'wrong',
      showNextBtn: true,
      stopTimer: true,
    });
    if (id === 'correct') {
      const baseScorePoints = 10;
      const multiplier = this.getMultiplier(difficulty);
      const totalScore = baseScorePoints + (timer * multiplier);

      dispatch(getAssertions(1));
      dispatch(getScorePoints(totalScore));
    }
    dispatch(handleDisableBtns(true));
  }

  handleNextBtnClick = () => {
    const { dispatch } = this.props;

    this.setState((prevState) => ({
      correct: '',
      wrong: '',
      questionsIndex: prevState.questionsIndex + 1,
      showNextBtn: false,
      stopTimer: false,
    }), () => {
      this.handleMultipleOptions();
      dispatch(getNextBtnClick(true));
    });
    dispatch(handleDisableBtns(false));
  }

  render() {
    const { questionsIndex, wrong, correct, showNextBtn,
      stopTimer, answersArr } = this.state;
    const { getGameData, history, isDisabled, timer } = this.props;

    if (getGameData.length === 0) {
      history.push('/');
      localStorage.removeItem('token');
      return <h1>Invalid Token</h1>;
    }
    if (questionsIndex === getGameData.length) {
      history.push('/feedback');
      return <h1> End Game </h1>;
    }
    return (
      <div>
        <Header />
        <div className="gamePage">
          <Timer
            className="cont"
            stopTimer={ stopTimer }
            handleNextBtnClick={ this.handleNextBtnClick }
          />
          <h1 data-testid="question-category">{ this.handleQuestions().category }</h1>
          <h2 data-testid="question-text">{ this.handleQuestions().question }</h2>
          <section data-testid="answer-options">
            {
              answersArr.map((el, index) => (
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
          </section>
          {
            (showNextBtn || timer === 0)
            && (
              <button
                type="button"
                data-testid="btn-next"
                className="buttonAsk"
                onClick={ this.handleNextBtnClick }
              >
                Next
              </button>
            )
          }
        </div>
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
