import React, { Component } from "react";
import LearningContext from "../../contexts/LearningContext";


export default class FeedBack extends Component {
  static contextType = LearningContext;

  // nextButton = React.createRef();

  // goToNextWord = (e) => {
  //   e.preventDefault();
  //   //this.context.setIsCorrect(null);
  //   this.props.history.push('/learn');
  // };

  // componentDidMount() {
  //   this.nextButton.current.focus();
  // }

  render() {
    const { isCorrect, answer, nextWord, guess } = this.context;
    console.log(this.context);
    return (
      <div>
        {isCorrect ? (
          <h2>You are correct!</h2>
        ) : (
          <h2>You are terrible at this!</h2>
        )}
        <p>
          The correct translation for <span className="makeBold">{nextWord}</span> was{" "}
          <span className="makeBold">{answer}</span>
          </p>
          <p>Your answer was <span className="makeBold">{guess}</span></p>
          <button onClick={e => {e.preventDefault(); this.props.history.push('/learn')}}>
            Try another word
          </button>
      </div>
    );
  }
}