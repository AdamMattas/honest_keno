import React, { Component } from "react";
import BetOneButton from "./betOneButton";
import BetMaxButton from "./betMaxButton";
import ClearButton from "./clearButton";
import DealButton from "./dealButton";
import Display from "./display";
import SingleCard from "./singleCard";
import calculator from "./workers/calculator";
import dealer from "./workers/dealer";

class Machine extends Component {
  state = {
    random: [],
    numbers: [],
    kenoNumbers: [],
    marked: [],
    hitNumbers: [],
    hit: "",
    denomination: 25,
    bet: 0,
    maxBet: 5,
    credit: 30,
    winnings: 0,
    status: "ready"
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
    const marked = [...this.state.marked];
    if (marked.length < 10) {
      const zeroIndex = number - 1;
      let numbers = [...this.state.kenoNumbers];
      numbers[zeroIndex].selected = true;

      marked.push(number);

      this.setState({ kenoNumbers: numbers, marked: marked });
    }
  };

  deselectNumber = number => {
    const marked = [...this.state.marked];
    const zeroIndex = number - 1;
    const index = marked.indexOf(number);
    let numbers = [...this.state.kenoNumbers];

    marked.splice(index, 1);

    numbers[zeroIndex].selected = false;

    this.setState({ kenoNumbers: numbers, marked: marked });
  };

  initDeal = () => {
    let numbers = [...this.state.kenoNumbers];

    numbers.forEach(num => {
      const zeroIndex = num.number - 1;
      if (numbers[zeroIndex]) numbers[zeroIndex].active = false;
      if (numbers[zeroIndex]) numbers[zeroIndex].hit = false;
    });

    this.setState({ kenoNumbers: numbers });

    this.deal(numbers);
  };

  deal = numbers => {
    if (this.state.status === "ready" && this.state.bet > 0) {
      const random = dealer.deal();
      const hits = dealer.compareNumbers(random, this.state.marked);
      const winnings = calculator.calculateWinnings(
        hits,
        this.state.marked,
        this.state.bet
      );
      const credit = winnings + this.state.credit;
      const kenoNumbers = dealer.setNumberStatus(random, hits, numbers);

      this.setState({
        kenoNumbers,
        random,
        winnings,
        credit,
        hit: hits.length
      });
    }
  };

  clearSingleCard = () => {
    const marked = [];
    let kenoNumbers = [...this.state.kenoNumbers];

    kenoNumbers.forEach(num => {
      const zeroIndex = num.number - 1;
      kenoNumbers[zeroIndex].active = false;
      kenoNumbers[zeroIndex].hit = false;
      kenoNumbers[zeroIndex].selected = false;
    });
    console.log("CLEAR!");
    this.setState({ kenoNumbers, marked });
  };

  betOne = () => {
    let credit = this.state.credit;
    let bet = this.state.bet;
    if (credit > 0 && bet < 5) {
      credit--;
      bet++;
      this.setState({ credit, bet });
    }
  };

  betMax = () => {
    const maxBet = this.state.maxBet;
    let credit = this.state.credit;
    let bet = this.state.bet;
    let betDiff = maxBet - bet;
    if (betDiff > 0 && credit >= betDiff) {
      credit -= betDiff;
      bet += betDiff;
      this.setState({ credit, bet });
    }

    if (credit < betDiff) {
      bet = bet + credit;
      credit = 0;
      this.setState({ bet, credit });
    }
  };

  render() {
    const { bet, marked, hit, credit, winnings } = this.state;

    return (
      <React.Fragment>
        <Display
          bet={bet}
          marked={marked.length}
          hits={hit}
          credit={credit}
          winnings={winnings}
        />
        <BetOneButton betOne={this.betOne} />
        <BetMaxButton betMax={this.betMax} />
        <ClearButton clear={this.clearSingleCard} />
        <DealButton deal={this.initDeal} />
        <SingleCard data={this.state.kenoNumbers} numSelect={this.numClick} />
      </React.Fragment>
    );
  }
}

export default Machine;
