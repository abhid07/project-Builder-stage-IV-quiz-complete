
import './App.css';
import HomeComponent from './components/HomeComponent';
import QuizComponent from './components/QuizComponent';
import ResultComponent from './components/ResultComponent';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import React, { Component } from 'react';

class App extends Component {

  constructor()
  {
    super()
    this.state={
      correct:0,
      attempt:0
    }
    
  }

  checkCorrect = ()=>{
    this.setState({
      correct:this.state.correct+1
    })
  }
  isAttempt = () =>{
    this.setState({
      attempt:this.state.attempt+1
    })

  }
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path='/'>
              <HomeComponent />
            </Route>
            <Route path="/QuizComponent">
              <QuizComponent checkCorrect={this.checkCorrect} isAttempt={this.isAttempt}/>
            </Route>
            <Route path='/ResultComponent'>
              <ResultComponent {...this.state} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;