import React, { Component } from "react";
import BetPlusButton from "./betPlusButton";
import AddCreditButton from "./addCreditButton";
import BetMinusButton from "./betMinusButton";
import BetMaxButton from "./betMaxButton";
import ClearButton from "./clearButton";
import DealButton from "./dealButton";
import QuickPickButton from "./quickPickButton";
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
    denomOption: [5, 25],
    bet: 0,
    maxBet: 5,
    newBet: false,
    credit: 30,
    addCredit: 100,
    winnings: 0,
    status: "ready",
    lastBet: 0,
    lastMarked: 0
  };

  componentDidMount() {
    const numbers = dealer.listNumbers(1, 80);
    const kenoNumbers = dealer.createNumbers(numbers);
    //console.log("New Bet: ", this.state.newBet);
    this.setState({ numbers, kenoNumbers });
  }

  componentDidUpdate() {
    console.log("New Bet: ", this.state.newBet);
    console.log("Last Bet: ", this.state.lastBet);
    console.log("Last Marked: ", this.state.lastMarked);
  }

  numClick = (e, number) => {
    const isSelected = e.currentTarget.classList.contains("selected");
    isSelected ? this.deselectNumber(number) : this.selectNumber(number);
  };

  selectNumber = number => {
    const { marked, kenoNumbers } = this.state;
    const returnSelected = dealer.selectNumber(number, marked, kenoNumbers);
    this.setState({ returnSelected });
  };

  deselectNumber = number => {
    const { marked, kenoNumbers } = this.state;
    const returnDeselected = dealer.deselectNumber(number, marked, kenoNumbers);
    this.setState({ returnDeselected });
    // const zeroIndex = number - 1;
    // const index = marked.indexOf(number);

    // marked.splice(index, 1);

    // numbers[zeroIndex].selected = false;

    // this.setState({ kenoNumbers: numbers, marked: marked });
  };

  initDeal = () => {
    const { status, bet, lastBet, credit, marked } = this.state;
    if (lastBet > credit) {
      console.log("Last Bet: ", lastBet, "Credit: ", credit);
    }
    if (status === "ready" && bet > 0 && credit >= bet && marked.length > 1) {
      let kenoNumbers = [...this.state.kenoNumbers];
      let credit = this.state.credit - bet;
      console.log("Credit: ", credit);

      kenoNumbers.forEach(num => {
        const zeroIndex = num.number - 1;
        if (kenoNumbers[zeroIndex]) kenoNumbers[zeroIndex].active = false;
        if (kenoNumbers[zeroIndex]) kenoNumbers[zeroIndex].hit = false;
      });

      this.setState({ kenoNumbers: kenoNumbers });

      this.deal(kenoNumbers, credit);
    }
  };

  deal = (numbers, credit) => {
    const { marked, bet } = this.state;
    const random = dealer.generate(20);
    const hits = dealer.compareNumbers(random, marked);
    const winnings = calculator.calculateWinnings(hits, marked, bet);
    credit = credit + winnings;
    const kenoNumbers = dealer.setNumberStatus(random, hits, numbers);

    this.setState({
      kenoNumbers,
      random,
      winnings,
      credit,
      hit: hits.length,
      newBet: false,
      lastBet: bet,
      lastMarked: marked.length
    });
  };

  clearBet = () => {
    console.log("Clear Bet!");
    const bet = 0;
    this.setState({ bet });
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

  addCredit = () => {
    console.log("Credit++");
    const credit = this.state.addCredit;
    if (this.state.credit < credit) {
      this.setState({ credit });
    }
  };

  betPlus = () => {
    let credit = this.state.credit;
    let bet = this.state.bet;
    if (credit > 0 && bet < 5) {
      credit--;
      bet++;
      this.setState({ credit, bet, newBet: true });
    }
  };

  betMinus = () => {
    let credit = this.state.credit;
    let bet = this.state.bet;
    if (bet > 0) {
      credit++;
      bet--;
      this.setState({ credit, bet, newBet: true });
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
      this.setState({ credit, bet, newBet: true });
    }

    if (credit < betDiff) {
      bet = bet + credit;
      credit = 0;
      this.setState({ bet, credit, newBet: true });
    }
  };

  quickPick = () => {
    this.clearSingleCard();
    let numbers = [...this.state.kenoNumbers];
    const lastMarked = this.state.lastMarked;
    const random = dealer.generate(lastMarked);
    console.log("Random: ", random);
    const kenoNumbers = dealer.setQuickPick(random, numbers);

    this.setState({ kenoNumbers, marked: random });
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
        <BetPlusButton betPlus={this.betPlus} />
        <BetMinusButton betMinus={this.betMinus} />
        <BetMaxButton betMax={this.betMax} />
        <ClearButton clear={this.clearSingleCard} />
        <AddCreditButton add={this.addCredit} />
        <QuickPickButton pick={this.quickPick} />
        <DealButton deal={this.initDeal} />
        <SingleCard data={this.state.kenoNumbers} numSelect={this.numClick} />
      </React.Fragment>
    );
  }
}

export default Machine;
