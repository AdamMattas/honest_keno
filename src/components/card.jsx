import React, { Component } from "react";

class Card extends Component {
  state = { availableNumbers: [] };

  componentDidMount() {
    const fillRange = (start, end) => {
      return Array(end - start + 1)
        .fill()
        .map((item, index) => start + index);
    };
    // console.log(fillRange(1, 80));
    this.setState({ availableNumbers: fillRange(1, 80) });
  }

  render() {
    return (
      <table>
        <tbody>
          {this.state.availableNumbers.map(item => (
            <tr key={item}>
              <td>{item}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Card;
