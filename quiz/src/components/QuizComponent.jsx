import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class QuizComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            index:0,
            datas:[],
            currentCount:120,
            attempt : 0
        }
    }
 componentDidMount(){
       axios.get('https://my-json-server.typicode.com/Naveen132895/quiz-api/questions').then((res)=>{
            this.setState({
                datas:res.data
            })
        
       })

     this.intervalId = setInterval(this.timer.bind(this), 1000);
   }

    timer() {
        let hide = document.getElementById('hide')
        let show = document.getElementById('show')
        this.setState({
            currentCount: this.state.currentCount - 1
        })
        if (this.state.currentCount < 1) {
            clearInterval(this.intervalId);
            hide.style.display='none'
            show.style.display='block'
        }
        
    }
    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    //Goto previous Qustion
    previousQuestion=()=>{
        this.disable()
        if(this.state.index>0)
            this.setState({index:this.state.index-1})
    }
    //Goto next question
    nextQuestion =()=>{
        this.enable()
        if(this.state.index<9)
        {
            this.setState({index: this.state.index + 1})
            setTimeout (this.hide,600)
        }
        else{
            alert("Quiz Completed press on exit button")
        }
    }
    // hide the popup button
    hide = () => {
        let btn = document.getElementById('ans')
        btn.style.display = 'none'
    }
    //Checkinng ans is correct or not
    chcekAns = (e)=>{
        let ans = e.target.value
        let btn = document.getElementById('ans')
        console.log(this.state.datas[this.state.index].answer +" " +ans)
        this.props.isAttempt()
        if (this.state.datas[this.state.index].answer===ans)
        {
           
            
            btn.innerText="Correct"
            btn.style.backgroundColor='green'
            btn.style.display="block"
            this.nextQuestion()
            this.setState({
                correct : this.state.correct+1
            })
            this.props.checkCorrect()
        }
        else
        {
            btn.innerText = "Wrong"
            btn.style.backgroundColor = 'red'
            btn.style.animation = 'hideIt 1s forwards'
            btn.style.display = "block"
            this.nextQuestion()
        }
    }
    //enable next qustions button
    enable =()=>{
        let btn = document.getElementById('options').querySelectorAll('.button')
        btn.forEach((val) => {
            val.disabled = false
        })
    }
    //disable previous question button
   disable = ()=>{
    let btn = document.getElementById('options').querySelectorAll('.button')
    btn.forEach((val)=>{
            val.disabled = true 
    })
   }

  

    render() {
        const isdata = this.state.datas.length
        const finaldata = this.state.datas[this.state.index]
        // console.log(this.state.correct);
            return (
               <>
                    
                    <div className="main-container">
                        {isdata > 0 ?
                            <div className="quiz-container">
                                <div id="show" style={{display:'none'}}>
                                    <h2>Time is up. Please click on Quit button to check the result</h2>
                                </div>
                                <div id="hide">
                                    <h1>Question</h1>
                                    <div className="question-container">
                                        <h4>{finaldata.id} of 10</h4>
                                        <h3>{finaldata.question}</h3>
                                        <h5>{this.state.currentCount}</h5>
                                    </div>
                                    <div className="options" id="options">
                                        <button className="button" onClick={this.chcekAns} value={finaldata.options[0]}>{finaldata.options[0]}</button>
                                            <button className="button" onClick={this.chcekAns} value={finaldata.options[1]}>{finaldata.options[1]}</button>
                                        <button className="button" onClick={this.chcekAns} value={finaldata.options[2]}>{finaldata.options[2]}</button>
                                        <button className="button" onClick={this.chcekAns} value={finaldata.options[3]}>{finaldata.options[3]}</button>
                                    </div>
                                </div>
                                <div className="buttons">
                                    <button onClick={this.previousQuestion}>Previous</button>
                                    <button onClick={ this.nextQuestion }>Next</button>
                                    <button><Link to="/ResultComponent" className="link">Quit</Link></button>  
                                </div>
                                <div>
                                    <button id="ans"></button>
                                </div>
                        </div>
                        :<div></div>}
                    </div>
                </>  
            );
          
    }
}
