import React, { Component } from "react";
import CardBody from "./cardBody";
import DealButton from "./dealButton";

class Card extends Component {
  state = {
    numbers: [],
    kenoNumbers: [],
    playerNumbers: [],
    bet: 0,
    random: []
  };

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
    console.log("DESELECT", number, index);
    console.log("PLAYNUMS: ", playNums);
  };

  deal = () => {
    let genNumbers = [];

    for (let i = 0; i < 20; ) {
      const random = Math.floor(Math.random() * 80 + 1);

      const duplicate = genNumbers.indexOf(random);

      if (duplicate === -1) {
        genNumbers.push(random);
        console.log("IIIIIII: ", i);
        i++;
      }

      console.log("DUPLICATE CHECK: ", duplicate);
      console.log("DEAL :", random);
      console.log("genNumbers", genNumbers.length);
      console.log("genNumbers", genNumbers);
    }

    const numbers = [...this.state.kenoNumbers];

    genNumbers.forEach(num => {
      console.log("NUM: ", this.state.playerNumbers.indexOf(num));
      const duplicate = this.state.playerNumbers.indexOf(num);
      //if (duplicate !== -1) {
      if (numbers[num]) numbers[num].active = true;
      //}
    });
    this.setState({ kenoNumbers: numbers, random: genNumbers });
  };

  listNumbers(start, end) {
    return Array(end - start + 1)
      .fill()
      .map((item, index) => start + index);
  }

  createNumbers(numbers) {
    const kenoNumbers = [];

    numbers.forEach(num => {
      const kenoNumber = {
        number: num,
        active: false,
        selected: false
      };

      kenoNumbers.push(kenoNumber);
    });

    return kenoNumbers;
  }

  componentDidMount() {
    const numbers = this.listNumbers(1, 80);
    const kenoNumbers = this.createNumbers(numbers);

    this.setState({ numbers, kenoNumbers });
  }

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
