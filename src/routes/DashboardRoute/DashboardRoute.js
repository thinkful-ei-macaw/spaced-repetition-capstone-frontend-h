import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./DashboardRoute.css";
import UserContext from '../../contexts/UserContext';
import languageService from "../../services/language-api-service";

class DashboardRoute extends Component {
  state = {
    language: [],
    words: [],
  };

  componentDidMount() {
    languageService.getLanguage().then((data) => {
      this.setState(data);
    });
  }
  static contextType = UserContext; 

  render() {
    const { name, user_id, total_score } = this.state.language;

    const words = this.state.words;
    return (
      <div className="language">
        <section className="language-wrapper">
          <h2>Ready to learn {name}, amigo?</h2>
          <p>
            <span>Language:</span> {name}
          </p>
          <p>
            <span>Hi</span> {this.context.user.name}!
          </p>
          <p>
            <span>Total correct answers:</span> {total_score}
          </p>
          <h3>Words to practice</h3>
            {words.map((word) => (
              <li key={word.id}>
                <h4>
                  {word.original} 
                </h4>
              </li>
            ))}
          <Link to="/learn">
            <button type="button">Start practicing</button>
          </Link>
        </section>
      </div>
    );
  }
}

export default DashboardRoute;
