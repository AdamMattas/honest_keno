import React, { Component } from "react";
import CardBody from "./cardBody";
import DealButton from "./dealButton";
import dealer from "./workers/dealer";

class Card extends Component {
  state = {
    numbers: [],
    kenoNumbers: [],
    playerNumbers: [],
    bet: 0,
    random: []
  };

  componentDidMount() {
    const numbers = dealer.listNumbers(1, 80);
    const kenoNumbers = dealer.createNumbers(numbers);

    this.setState({ numbers, kenoNumbers });
  }

  numClick = (e, number) => {
    const isSelected = e.currentTarget.classList.contains("selected");
    isSelected ? this.deselectNumber(number) : this.selectNumber(number);
  };

  selectNumber = number => {
    const playNums = [...this.state.playerNumbers];
    if (playNums.length < 10) {
      const zeroIndex = number - 1;
      let numbers = [...this.state.kenoNumbers];
      numbers[zeroIndex].selected = true;

      playNums.push(number);

      this.setState({ kenoNumbers: numbers, playerNumbers: playNums });
    }
  };

  deselectNumber = number => {
    const playNums = [...this.state.playerNumbers];
    const zeroIndex = number - 1;
    const index = playNums.indexOf(number);
    let numbers = [...this.state.kenoNumbers];

    playNums.splice(index, 1);

    numbers[zeroIndex].selected = false;

    this.setState({ kenoNumbers: numbers, playerNumbers: playNums });
  };

  deal = () => {
    const numbers = [...this.state.kenoNumbers];
    const random = dealer.deal();
    //console.log("State: ", this.state.playerNumbers);
    const hits = dealer.compareNumbers(random, this.state.playerNumbers);
    const kenoNumbers = dealer.setStatus(random, hits, numbers);

    this.setState({ kenoNumbers, random });
  };

  render() {
    return (
      <React.Fragment>
        <CardBody data={this.state.kenoNumbers} numSelect={this.numClick} />
        <DealButton deal={this.deal} />
      </React.Fragment>
    );
  }
}

export default Card;
