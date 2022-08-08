import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { addScore } from '../redux/actions';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      teste: '',
      questions: '',
      seconds: 30,
      classWrongOptions: 'options',
      classCorrectOption: 'options',
    };
  }

  componentDidMount() {
    const { seconds } = this.state;
    const tokenGame = localStorage.getItem('token');
    const oneSecond = 1000;
    this.getQuestions(tokenGame);
    if (seconds > 0) {
      setInterval(() => {
        this.setState((prevState) => ({
          seconds: prevState.seconds > 0 ? prevState.seconds - 1 : prevState.seconds,
        }));
      }, oneSecond);
    }
  }

  handleClickAnswer = () => {
    this.setState({
      classCorrectOption: 'correct-option',
      classWrongOptions: 'wrong-options',
    });
  }

    getQuestions = async (token) => {
      const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const requestJson = await request.json();
      console.log(requestJson);
      this.setState({
        questions: requestJson.results,
        teste: requestJson,
      });
      return requestJson;
    };

    somaScore = (timer, difficulty) => {
      const { addScoreDispatch } = this.props;
      const TRES = 3;
      const DEZ = 10;
      if (difficulty === 'easy') return addScoreDispatch(DEZ + (timer * 1));
      if (difficulty === 'medium') return addScoreDispatch(DEZ + (timer * 2));
      if (difficulty === 'hard') return addScoreDispatch(DEZ + (timer * TRES));
    };

    render() {
      const { teste, questions, seconds, classWrongOptions,
        classCorrectOption } = this.state;
      const number3 = 3;
      const number05 = 0.5;

      if (teste.response_code === number3) {
        return <Redirect to="/" />;
      }
      if (questions.length !== 0) {
        const array = questions[0].incorrect_answers.concat(questions[0].correct_answer);
        return (
          <div>
            <p>
              Timer:
              { seconds }
            </p>
            <div key={ questions[0].index } className="card_question">
              <p data-testid="question-category">{ questions[0].category }</p>
              <p data-testid="question-text">{ questions[0].question }</p>
              <div data-testid="answer-options">
                {
                  array.sort(() => number05 - Math.random()).map((element, index) => (
                    element === questions[0].correct_answer
                      ? (
                        <button
                          type="button"
                          key={ index }
                          name="correct-answer"
                          data-testid="correct-answer"
                          disabled={ seconds === 0 }
                          className={ classCorrectOption }
                          onClick={ () => {
                            this.handleClickAnswer();
                            this.somaScore(1, questions[0].difficulty);
                          } }
                        >
                          { element }
                        </button>)
                      : (
                        <button
                          type="button"
                          key={ index }
                          name="wrong-answer"
                          data-testid="wrong-answer"
                          disabled={ seconds === 0 }
                          className={ classWrongOptions }
                          onClick={ () => this.handleClickAnswer() }
                        >
                          { element }
                        </button>)))
                }
              </div>
            </div>
          </div>);
      }
      return (<div />);
    }
}

Questions.propTypes = {
  addScoreDispatch: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addScoreDispatch: (score) => dispatch(addScore(score)),
});

export default connect(null, mapDispatchToProps)(Questions);
