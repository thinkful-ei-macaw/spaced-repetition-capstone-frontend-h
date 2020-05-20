import React, { Component } from "react";
import UserContext from "../../contexts/UserContext";
import "./UserLanguage.css";

export default class UserLanguage extends React.Component {
  static contextType = UserContext;

  render() {
    const { name, user_id, total_score } = this.props.language;

    const words = this.props.words;
    return (
      <div className="language">
        <div className="language-wrapper">
          <h2>Ready to learn {name}, amigo?</h2>
          <p>
            <span>Language:</span> {name}
          </p>
          <p>
            <span>Hi</span> {this.context.user.name}!
          </p>
          <p>
            <span>You have a score of:</span> {total_score}
          </p>
          <ul>Words to learn:</ul>{" "}
          {words.map((word) => (
            <li key={word.id}>{word.original} </li>
          ))}
        </div>
      </div>
    );
  }
}