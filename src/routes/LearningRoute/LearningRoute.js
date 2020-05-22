import React, { Component } from "react";
import Header from "../../components/Header/Header"
import languageService from "../../services/language-api-service"

class LearningRoute extends Component {
  componentDidMount() {
    languageService.getWords().then((data) => {
      this.setState(data);
      this.setState({ changedState: true });
    });
  }

  // componentDidUpdate() {
  //   this.setState({ changedState: false })
  // }

  state = {
    nextWord: "",
    totalScore: 0,
    wordCorrectCount: "0",
    wordIncorrectCount: "0",
    guess: "",
    answered: false,
    response: null,
    feedback: '',
    translation: '',
    changeState: false,
  };

  setGuess = (event) => {
    this.setState({
      guess: event.target.value,
    });
  };

  handleGuess = (event) => {
    event.preventDefault();
    return languageService.guessWord(this.state.guess)
      .then(res => {
        this.setState({
          response: res,
          answered: true
        });
      });
  };

  responseFeedback = (event) => {

    event.preventDefault();
    return languageService.guessWord(this.state.guess).then((res) => {
      if (res.isCorrect) {
        this.setState({
          response: res,
          feedback: "Correct! Great job!"
        });
      }
      else {
        this.setState({
          response: res,
          feedback: `Sorry, that was incorrect! The correct answer is: ${res.answer}`
        })
      }
    })
  }

  render() {

    const {
      nextWord,
      totalScore,
      wordCorrectCount,
      wordIncorrectCount,
      feedback
    } = this.state;

    return (
      <div className="learn">
        <section>
          <h2>Translate the word:</h2>
          <span>{nextWord}</span>
          <p>Your total score is: {totalScore}</p>
          <form onSubmit={((event) => this.handleGuess(event), (event) => this.responseFeedback(event))}>
            <label htmlFor="learn-guess-input" id="input">
              What's the translation for this word?
            </label>
            <input
              type="text"
              id="learn-guess-input"
              name="guess-input"
              required
              onChange={this.setGuess}
            ></input>
            <button type="submit">Submit your answer</button>
          </form>
        </section>
        <h4>{ feedback }</h4>
        <button>
          Next Word
        </button>
        <main className="DisplayScore">
          <p>You have answered this word correctly {wordCorrectCount} times.</p>
          <p>You have answered this word incorrectly {wordIncorrectCount} times.</p>
        </main>
      </div>
    );
  }
}

export default LearningRoute;
