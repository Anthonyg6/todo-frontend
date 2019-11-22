import React, { Component } from "react";
import axios from "axios";

export default class TodoForm extends Component {
  constructor() {
    super();

    this.state = {
      _id: "",
      content: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    axios({
      method: "post",
      url: "https://ag-todo-server.herokuapp.com/todo/todos",
      headers: { "content-type": "application/json" },
      data: {
        _id: this.state._id,
        content: this.state.content,
        done: false
      }
    })
      .then(data => {
        this.setState({
          _ids: [...this.state._ids, data.data],
          contents: [...this.state.contents, data.data],
          content: "",
          _id: ""
        });
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({ _id: "", content: "" });
  };

  render() {
    return (
      <div className="todo-form-wrapper">
        <form className="todo-form" onSubmit={this.handleSubmit}>
          <input
            className="todo-input"
            type="text"
            name="content"
            placeholder="Add Some Todos!"
            value={this.state.content}
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}
