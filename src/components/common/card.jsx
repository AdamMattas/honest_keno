import React, { Component } from "react";
import TableBody from "./tableBody";

class Card extends Component {
  state = { numbers: [], kenoNumbers: [] };

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
        section: num < 41 ? "top" : "bottom",
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

    console.log(kenoNumbers);
    this.setState({ numbers, kenoNumbers });
  }

  render() {
    return (
      <div>
        <TableBody data={this.state.kenoNumbers} />
      </div>
    );
  }
}

export default Card;
