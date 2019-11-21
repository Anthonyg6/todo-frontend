import React, { Component } from "react";
import moment from "moment";

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      time: moment().format("MMM Do YYYY, h:mm:ss a")
    };

    this.updateTime = this.updateTime.bind(this);
  }

  updateTime() {
    this.setState({
      time: moment().format("MMM Do YYYY, h:mm:ss a")
    });
  }

  componentDidMount() {
    this.intervalID = setInterval(this.updateTime, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    return (
      <div className="header-wrapper w3-container">
        <h1 className="header">What is on the agenda for today?</h1>
        <h2 className="current-clock">{this.state.time}</h2>
      </div>
    );
  }
}
