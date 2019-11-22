import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import TodoForm from "./todo-form";

export default class TodoContainer extends Component {
  constructor() {
    super();

    this.state = {
      data: []
    };

    this.deleteTodos = this.deleteTodos.bind(this);
  }

  getTodoItems() {
    setInterval(() => {
      axios
        .get("https://ag-todo-server.herokuapp.com/todo/todos")
        .then(response => {
          this.setState({
            data: response.data
          });
        })
        .catch(error => {
          console.log(error);
        });
    }, 400);
  }

  deleteTodos(_id) {
    event.preventDefault();
    axios
      .delete(`https://ag-todo-server.herokuapp.com/todo/todos/${_id}`)
      .then(response => {
        console.log("Your Todo has been deleted!");
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getTodoItems();
  }

  componentWillUnmount() {
    clearInterval(this.getTodoItems);
  }

  todoItems() {
    if (this.state.data.length == 0) {
      return (
        <div className="no-todos">
          <p>You have no Todo's!</p>
        </div>
      );
    } else {
      return this.state.data.map(items => {
        return (
          <div className="todos" key={items._id}>
            <span>{items.content}</span>
            <button
              className="delete-btn"
              onClick={() => this.deleteTodos(items._id)}
            >
              <FontAwesomeIcon icon="check" />
            </button>
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div className="todo-container w3-container">
        <div className="todo-collection">{this.todoItems()}</div>
      </div>
    );
  }
}
