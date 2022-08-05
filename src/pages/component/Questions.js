import React, { Component } from 'react';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      teste: '',
    };
  }

  componentDidMount() {
    const tokenGame = localStorage.getItem('token');
    this.getQuestions(tokenGame);
  }

    getQuestions = async (token) => {
      const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const requestJson = await request.json();
      this.setState({
        teste: requestJson.results,
      });
      return requestJson;
    };

    render() {
      const { teste } = this.state;
      console.log(teste);
      if (teste.length !== 0) {
        return (
          <div>
            {
              teste.map((item) => (
                <div key={ item.index } className="card_question">
                  <p data-testid="question-category">{ item.category }</p>
                  <p data-testid="question-text">{ item.question }</p>
                  {
                    item.incorrect_answers.map((element) => (
                      <button
                        type="button"
                        key={ element.index }
                      >
                        { element }
                      </button>))
                  }
                  <button
                    type="button"
                    data-testid="correct-answer"
                  >
                    { item.correct_answer }
                  </button>
                </div>))
            }
          </div>);
      }
      return (<div />);
    }
}

export default Questions;
