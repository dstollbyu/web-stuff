import React from 'react';
import './PomodoroClock.css';
import NavbarProj from './NavbarProj.js';

class Timer extends React.Component {
  render() {
    let timeMin = parseInt(this.props.timeMin,10);
    timeMin = timeMin < 10 ? "0" + timeMin : timeMin;
    let timeSec = parseInt(this.props.timeSec,10);
    timeSec = timeSec < 10 ? "0" + timeSec : timeSec;
    return(
      <div id="timer-wrapper">
        <div id="timer-label">{this.props.toggleSessionOn ? "Session" : "Break"}</div>
        <div id="time-left">
          {timeMin + ":" + timeSec}
        </div>
        <button id="start_stop" onClick = {this.props.handleStartStop}>Start/Stop Timer</button>
        <button id="reset" onClick = {this.props.handleReset} >Reset</button>
      </div>
    )
  }
}

class Session extends React.Component {
  render() {
    return(
      <div id="session-wrapper">
        <div id="session-length">{this.props.sessionLength}</div>
        <div id="session-arrows">
          <button id="session-decrement" className="sessionControl" onClick={this.props.sessionDecrement}><i className="arrow down"></i></button> 
          <button id="session-increment" className="sessionControl" onClick={this.props.sessionIncrement}><i className="arrow up"></i></button>
        </div>
        <div id="session-label">Session Length</div>
      </div>
    )
  }
}

class Break extends React.Component {
  render() {
    return(
      <div id="break-wrapper">
        <div id="break-length">{this.props.breakLength}</div>
        <div id="break-arrows">
          <button id="break-decrement" className="breakControl" onClick={this.props.breakDecrement}><i className="arrow down"></i></button> 
          <button id="break-increment" className="breakControl" onClick={this.props.breakIncrement}><i className="arrow up"></i></button>
        </div>
        <div id="break-label">Break Length</div>
      </div>
    )
  }
}

//Set up interval globally so that it can be used for setInterval and clearInterval
let myInterval;

class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 1500,
      timerEnabled: false,
      sessionLength: 25,
      breakLength: 5,
      toggleSessionOn: true
    }
    this.handleStartStop = this.handleStartStop.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
    this.breakIncrement = this.breakIncrement.bind(this);
  }
  
  handleStartStop() {
    if (!this.state.timerEnabled) {
      this.setState({
        timerEnabled: true
      });
      let timer = () => {
        if (this.state.timer > 0) {
          this.setState({
            timer: (this.state.timer) - 1
          });
        } else {
          if (this.state.toggleSessionOn) {
            this.setState({
              toggleSessionOn: false,
              timer: (this.state.breakLength * 60)
            });
          } else {
            this.setState({
              toggleSessionOn: true,
              timer: (this.state.sessionLength * 60)
            })
          }
        }  
      }
      myInterval = setInterval(timer, 1000);
    } else {
      this.setState({
        timerEnabled: false
      });
      clearInterval(myInterval);
    }
  }
  
  handleReset() {
    const baseTime = this.state.sessionLength * 60
    this.setState({
      timer: baseTime,
      timerEnabled: false,
      sessionLength: 25,
      breakLength: 5,
      toggleSessionOn: true
    });
    clearInterval(myInterval);
  }
  
  sessionDecrement() {
    let current = this.state.sessionLength;
    if (current > 1 && current <= 60) {
      current = current - 1;
      this.setState({
        sessionLength: current,
        timer: current * 60,
        timerEnabled: false,
        toggleSessionOn: true
      });
      clearInterval(myInterval);
    }
  }
  
  sessionIncrement() {
    let current = this.state.sessionLength;
    if (current > 0 && current < 60) {
      current = current + 1;
      this.setState({
        sessionLength: current,
        timer: current * 60,
        timerEnabled: false,
        toggleSessionOn: true
      });
      clearInterval(myInterval);
    }
  }
  
  breakDecrement() {
    let current = this.state.breakLength;
    if (current > 1 && current <= 60) {
      current = current - 1;
      this.setState({
        breakLength: current,
        timer: this.state.sessionLength * 60,
        timerEnabled: false,
        toggleSessionOn: true
      });
      clearInterval(myInterval);
    }
  }
  
  breakIncrement() {
    let current = this.state.breakLength;
    if (current > 0 && current < 60) {
      current = current + 1;
      this.setState({
        breakLength: current,
        timer: this.state.sessionLength * 60,
        timerEnabled: false,
        toggleSessionOn: true
      });
      clearInterval(myInterval);
    }
  }
  
  render() {
    let timeMin = this.state.timer / 60;
    let timeSec = this.state.timer % 60;
    return(
      <>
        <NavbarProj />
        <div id="clock" style={{marginTop: '40px'}}>
          <Timer toggleSessionOn={this.state.toggleSessionOn} totalTime={this.state.timer} timeMin={timeMin} timeSec={timeSec} handleStartStop = {this.handleStartStop} handleReset = {this.handleReset} />
          <div id="counters">
            <Break breakLength = {this.state.breakLength} breakDecrement = {this.breakDecrement} breakIncrement = {this.breakIncrement} />
            <Session sessionLength = {this.state.sessionLength} sessionDecrement = {this.sessionDecrement} sessionIncrement = {this.sessionIncrement} />
          </div>
          {/* Omitting doing the audio portion, since my browser has some settings that I don't know how to change that prevent it from working */}
          <audio id="beep" 
            src="https://goo.gl/65cBl1" 
            ref={(audio) => {this.audioBeep = audio;}} />
        </div> 
      </>
    );
  }
}

export default PomodoroClock;