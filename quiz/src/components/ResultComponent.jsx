import React, { Component } from 'react'

export default class ResultComponent extends Component {
    constructor(props)
    {
        super(props)
    }
    render() {
        return (
            <div className="result-main-container">
                <i className="far fa-check-circle" aria-hidden="true"></i>
                <h1>Result</h1>
                <div className="result-container">
                    {this.props.correct*10<60 ?
                    <h2>You need more practice!</h2>
                    :
                    <h2>Well Done you pass the Quiz</h2>
                    }
                    <h1>Your Score: {this.props.correct*10}</h1>
                    <p>Total number of questions: <span>10</span></p>
                    <p>Number of attempted questions: <span>{this.props.attempt}</span></p>
                    <p>Number of Correct Answers: <span>{this.props.correct}</span></p>
                    <p>Number of Wrong Answers: <span>{10 - this.props.correct }</span></p>
                </div>
                <div className="button-container">
                    <button>Play Again</button>
                    <button>Back to Home</button>
                </div>
               
            </div>
        )
    }
}
