import React, { Component } from "react";
import CardBody from "./cardBody";

class Card extends Component {
  state = { numbers: [], kenoNumbers: [] };

  selectNumber = (e, number) => {
    const zeroIndex = number - 1;
    let numbers = [...this.state.kenoNumbers];
    numbers[zeroIndex].selected = true;

    console.log("NUMBERS :", numbers);
    console.log("CLICK :", number, zeroIndex);

    this.setState({ kenoNumbers: numbers });
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
        <CardBody data={this.state.kenoNumbers} onSelect={this.selectNumber} />
      </React.Fragment>
    );
  }
}

export default Card;
