import React, { Component } from "react";

class Move extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userChoices: [],
      cpuChoices: [],
    };
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps);
    if (prevProps.userMove !== this.props.userMove) {
      this.fillMovesArr();
    }
  }

  fillMovesArr() {
    let userMove = this.props.userMove;
    let cpuMove = this.props.cpuMove;
    this.setState({
      userChoices: [...this.state.userChoices, userMove],
      cpuChoices: [...this.state.cpuChoices, cpuMove],
    });
  }

  mapUserChoices = () => (item, key) => {
    return (
      <div key={key}>
        <img src={item} />
      </div>
    );
  };

  mapCpuChoices = () => (item, key) => {
    return (
      <div key={key}>
        <img src={item} />
      </div>
    );
  };

  render() {
    return (
      <div className={this.props.style}>
        {this.props.player === "user" &&
          this.state.userChoices.map(this.mapUserChoices)}
        {this.props.player === "cpu" &&
          this.state.cpuChoices.map(this.mapCpuChoices)}
      </div>
    );
  }
}

export default Move;
