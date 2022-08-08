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
                  array.sort(() => number05 - Math.random()).map((element) => (
                    element === questions[0].correct_answer
                      ? (
                        <button
                          type="button"
                          name="correct-answer"
                          data-testid="correct-answer"
                          disabled={ seconds === 0 }
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

export default Questions;
