import React from "react";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 48,
      max: 50,
      min: -50,
    };
  }

  limitFunc = () => {
    if (
      this.state.counter === this.state.max ||
      this.state.counter === this.state.min
    ) {
      return false;
    } else {
      return true;
    }
  };

  incFunc = () => {
    if (this.limitFunc()) {
      this.setState((state) => {
        return { counter: state.counter + 1 };
      });
    }
  };

  decFunc = () => {
    if (this.limitFunc()) {
      this.setState((state) => {
        return { counter: state.counter - 1 };
      });
    }
  };

  rndFunc = () => {
    let newCounter = Math.floor(Math.random() * 101) - 50;
    if (newCounter >= this.state.max) {
      newCounter = this.state.max;
    }
    this.setState(() => {
      return { counter: newCounter };
    });
  };

  resFunc = () => {
    this.setState(() => {
      return { counter: 0 };
    });
  };

  render() {
    return (
      <div class="app">
        <div class="counter">{this.state.counter}</div>
        <div class="controls">
          <button onClick={this.incFunc}>INC</button>
          <button onClick={this.decFunc}>DEC</button>
          <button onClick={this.rndFunc}>RND</button>
          <button onClick={this.resFunc}>RESET</button>
        </div>
      </div>
    );
  }
}

