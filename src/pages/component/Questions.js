import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      teste: '',
      questions: '',
    };
  }

  componentDidMount() {
    const tokenGame = localStorage.getItem('token');
    this.getQuestions(tokenGame);
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
      const { teste, questions } = this.state;
      const number = 3;

      if (teste.response_code === number) {
        return <Redirect to="/" />;
      }
      if (questions.length !== 0) {
        const array = questions[0].incorrect_answers.concat(questions[0].correct_answer);
        console.log(randomNumber);
        return (
          <div>
            <div key={ questions[0].index } className="card_question">
              <p data-testid="question-category">{ questions[0].category }</p>
              <p data-testid="question-text">{ questions[0].question }</p>
              <div data-testid="answer-options">
                {
                  array.map((element) => (
                    element === questions[0].correct_answer
                      ? (
                        <button
                          type="button"
                          data-testid="correct-answer"
                        >
                          { element }
                        </button>)
                      : (
                        <button
                          type="button"
                          key={ element.index }
                          data-testid="wrong-answer"
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
