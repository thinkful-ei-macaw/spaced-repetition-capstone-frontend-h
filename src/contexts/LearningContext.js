import React, { Component } from 'react'

const LearningContext = React.createContext({

    setError: () => { },
    clearError: () => { },
    setNextWord: () => { },
    setTotalScore: () => { },
    setWordCorrectCount: () => { },
    setWordIncorrectCount: () => { },
    setGuess: () => { },
    setAnswer: () => { },
    setIsCorrect: () => { },
    reset: () => { }

})

export default LearningContext

export class LearningProgress extends Component {

    state = {

        totalScore: 0,
        wordCorrectCount: 0,
        wordIncorrectCount: 0,
        nextWord: null,
        guess: null,
        isCorrect: null,
        answer: null,
        error: null

    }

    setError = error => {
        console.error(error)
        this.setState({ error })
    }

    clearError = () => {
        this.setState({ error: null })
    }

    setTotalScore = totalScore => {
        this.setState({
            totalScore
        })
    }

    setWordCorrectCount = wordCorrectCount => {
        this.setState({
            wordCorrectCount
        })
    }

    setWordIncorrectCount = wordIncorrectCount => {
        this.setState({
            wordIncorrectCount
        })
    }

    setNextWord = nextWord => {
        this.setState({
            nextWord
        })
    }

    setGuess = guess => {
        this.setState({
            guess
        })
    }

    setIsCorrect = isCorrect => {
        this.setState({
            isCorrect
        })
    }

    setAnswer = answer => {
        this.setState({
            answer
        })
    }

    reset = () => {
        this.setState({
            ...this.state
        })
    }



    render() {
        const value = {
            totalScore: this.state.totalScore,
            wordCorrectCount: this.state.wordCorrectCount,
            wordIncorrectCount: this.state.wordIncorrectCount,
            nextWord: this.state.nextWord,
            guess: this.state.guess,
            isCorrect: this.state.isCorrect,
            answer: this.state.answer,
            error: this.state.error,
            setError: this.setError,
            clearError: this.clearError,
            setNextWord: this.setNextWord,
            setTotalScore: this.setTotalScore,
            setWordCorrectCount: this.setWordCorrectCount,
            setWordIncorrectCount: this.setWordIncorrectCount,
            setGuess: this.setGuess,
            setAnswer: this.setAnswer,
            setIsCorrect: this.setIsCorrect,
            reset: this.reset
        }
        return (
            <div>
                <LearningContext.Provider value={value}>
                    {this.props.children}
                </LearningContext.Provider>
            </div>
        )
    }
}