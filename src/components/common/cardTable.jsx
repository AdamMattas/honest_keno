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

    // function KenoNumber(num) {
    //   this.number = num;
    //   this.active = false;
    //   this.selected = false;
    // }

    numbers.forEach(num => {
      //const kenoNumber = new KenoNumber(num);

      const kenoNumber = {
        number: num,
        active: false,
        selected: false
      };

      kenoNumbers.push(kenoNumber);
      // console.log(kenoNumber);
    });
    return kenoNumbers;
    //console.log(kenoNumbers[0]);
  }

  componentDidMount() {
    const numbers = this.listNumbers(1, 80);
    const kenoNumbers = this.createNumbers(numbers);

    //console.log(Array.isArray(kenoNumbers));
    console.log(kenoNumbers);
    this.setState({ numbers, kenoNumbers });
  }

  render() {
    return (
      <div>
        <TableBody data={this.state.numbers} />
      </div>
    );
  }
}

export default Card;
