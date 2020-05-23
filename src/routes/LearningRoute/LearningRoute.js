import React, { Component } from "react";
import Header from "../../components/Header/Header"
import languageService from "../../services/language-api-service"

class LearningRoute extends Component {
  componentDidMount() {
    languageService.getWords().then((data) => {
      console.log(data);
      this.setState(data);
      this.setState({ changedState: true });
    });
  }

  state = {
    currentWord: '',
    nextWord: '',
    totalScore: 0,
    wordCorrectCount: "0",
    wordIncorrectCount: "0",
    guess: '',
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
        event.target["spaced-rep-form"].reset();
      })
      .catch((err) => {
        console.log(event);
      });
    
  };

  responseFeedback = (event) => {
    event.preventDefault();
    return languageService.guessWord(this.state.guess).then((res) => {
      if (res.isCorrect) {
        this.setState({
          response: res,
          feedback: "Correct! Great job!",
          totalScore: res.totalScore,
          nextWord: res.nextWord,
          wordCorrectCount: res.wordCorrectCount,
          wordIncorrectCount: res.wordIncorrectCount
        });
      }
      else {
        this.setState({
          response: res,
          feedback: `Sorry, that was incorrect! The correct answer is: ${res.answer}`,
          totalScore: res.totalScore,
          nextWord: res.nextWord,
          wordCorrectCount: res.wordCorrectCount,
          wordIncorrectCount: res.wordIncorrectCount
        });
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
          <form 
            id="spaced-rep-form"
            onSubmit={((event) => this.handleGuess(event), (event) => this.responseFeedback(event))}>
            <label htmlFor="learn-guess-input" id="input"/>
            <input
              placeholder="What's the translation for this word?"
              type="text"
              id="learn-guess-input"
              name="guess-input"
              required
              onChange={this.setGuess}
            ></input>
            <button
             className='submit-button'
             type="submit">Submit your answer</button>
          </form>
        </section>
        <h4>{ feedback }</h4>
        {/* <button
          onClick = {() => this.handleNextWord()}>
          Next Word
        </button> */}
        <main className="DisplayScore">
          <p>You have answered this word correctly {wordCorrectCount} times.</p>
          <p>You have answered this word incorrectly {wordIncorrectCount} times.</p>
        </main>
      </div>
    );
  }
}

export default LearningRoute;
