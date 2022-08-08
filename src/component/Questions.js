import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      teste: '',
      questions: '',
      seconds: 30,
      classWrongOptions: 'options',
      classCorrectOption: 'options',
      clicked: false,
      questionIndex: 0,
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
    const { clicked } = this.state;
    if (!clicked) {
      this.setState({
        classCorrectOption: 'correct-option',
        classWrongOptions: 'wrong-options',
        clicked: true,
      });
    }
  }

  handleClickNext = () => {
    this.setState((prevState) => ({
      questionIndex: prevState + 1,
      seconds: 30,
      classWrongOptions: 'options',
      classCorrectOption: 'options',
    }));
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

    render() {
      const {
        teste,
        questions,
        seconds,
        classWrongOptions,
        classCorrectOption,
        questionIndex,
      } = this.state;
      const number3 = 3;
      const number05 = 0.5;
      const testReponse = 'correct-option';

      if (teste.response_code === number3) {
        return <Redirect to="/" />;
      }
      if (questions.length !== 0) {
        const array = questions[questionIndex].incorrect_answers
          .concat(questions[questionIndex].correct_answer);
        const arraySort = array.sort(() => number05 - Math.random());
        return (
          <div>
            <p>
              Timer:
              { seconds }
            </p>
            <div key={ questions[questionIndex].index } className="card_question">
              <p data-testid="question-category">{ questions[questionIndex].category }</p>
              <p data-testid="question-text">{ questions[questionIndex].question }</p>
              <div data-testid="answer-options">
                {
                  arraySort.map((element) => (
                    element === questions[questionIndex].correct_answer
                      ? (
                        <button
                          type="button"
                          key={ element.index }
                          name="correct-answer"
                          data-testid="correct-answer"
                          disabled={ seconds === 0
                            || classCorrectOption === testReponse }
                          className={ classCorrectOption }
                          onClick={ () => this.handleClickAnswer() }
                        >
                          { element }
                        </button>)
                      : (
                        <button
                          type="button"
                          key={ element.index }
                          name="wrong-answer"
                          data-testid="wrong-answer"
                          disabled={ seconds === 0
                            || classCorrectOption === testReponse }
                          className={ classWrongOptions }
                          onClick={ () => this.handleClickAnswer() }
                        >
                          { element }
                        </button>)))
                }
                <br />
                { seconds === 0
                || classWrongOptions === 'wrong-options'
                  ? (
                    <button
                      type="button"
                      data-testid="btn-next"
                      onClick={ () => this.handleClickNext() }
                    >
                      Next
                    </button>
                  )
                  : <> </>}
              </div>
            </div>
          </div>);
      }
      return (<> </>);
    }
}

export default Questions;
