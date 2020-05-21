import React, { Component } from "react";
import Header from "../../components/Header/Header"
import languageService from "../../services/language-api-service"

class LearningRoute extends Component {
  componentDidMount() {
    languageService.getWords().then((data) => {
      this.setState(data);
    });
  }

  state = {
    nextWord: "",
    totalScore: 0,
    wordCorrectCount: "0",
    wordIncorrectCount: "0",
    guess: "",
    answered: false,
    response: null,
  };

  setGuess = (e) => {
    this.setState({
      guess: e.target.value,
    });
  };

  handleGuess = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    languageService.guessWord(e.target.value)
      .then(res => {
        console.log(res);
      })
  };

  render() {

    const {
      nextWord,
      totalScore,
      wordCorrectCount,
      wordIncorrectCount,
    } = this.state;

    return (
      <div className="learn">
        <section>
          <h2>Translate the word:</h2>
          <span>{nextWord}</span>
          <p>Your total score is: {totalScore}</p>
          <form onSubmit={(e) => this.handleGuess(e)}>
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

        <main>You have answered this word correctly {wordCorrectCount} times.</main>
        <main>You have answered this word incorrectly {wordIncorrectCount} times.</main>
      </div>
    );
  }
}

export default LearningRoute;
