import React, { Component } from "react";
import Buttons from "./buttons";
import Display from "./display";
import SingleCard from "./singleCard";
import KenoBallRack from "./kenoBallRack";
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
    hits: [],
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
    this.setState({ numbers, kenoNumbers });
  }

  componentDidUpdate() {
    console.log("New Bet: ", this.state.newBet);
    console.log("Last Bet: ", this.state.lastBet);
    console.log("Last Marked: ", this.state.lastMarked);
    console.log("UPDATE KENO NUMBERS", this.state.kenoNumbers);
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
  };

  initDeal = () => {
    const { status, bet, lastBet, credit, marked } = this.state;
    const kenoNumbers = [...this.state.kenoNumbers];
    console.log("1st KENO NUMBERS: ", kenoNumbers);
    if (lastBet > credit) {
      //console.log("Last Bet: ", lastBet, "Credit: ", credit);
    }

    if (status === "ready" && bet > 0 && credit >= bet && marked.length > 1) {
      const credit = this.state.credit - bet;
      const setNumbers = dealer.setNumberDeal(kenoNumbers);
      //console.log("SET NUMBERS: ", setNumbers);
      // this.setState({ kenoNumbers: setNumbers }, () => {
      //   this.deal(setNumbers, credit);
      // });
      this.setState({ kenoNumbers: setNumbers });
      setTimeout(() => {
        this.deal(setNumbers, credit);
      }, 100);
    }
  };

  deal = (numbers, credit) => {
    console.log("NUMBERS DEAL FUNCTION: ", numbers);
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
      hits,
      newBet: false,
      lastBet: bet,
      lastMarked: marked.length
    });
  };

  clearBet = () => {
    const bet = 0;
    this.setState({ bet });
  };

  clearSingleCard = () => {
    const marked = [];
    const kenoNumbers = [...this.state.kenoNumbers];
    kenoNumbers.forEach(num => {
      const zeroIndex = num.number - 1;
      kenoNumbers[zeroIndex].active = false;
      kenoNumbers[zeroIndex].hit = false;
      kenoNumbers[zeroIndex].selected = false;
      kenoNumbers[zeroIndex].randomOrder = false;
    });
    this.setState({ kenoNumbers, marked });
  };

  addCredit = () => {
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
    const { bet, marked, random, hit, hits, credit, winnings } = this.state;

    return (
      <React.Fragment>
        <div className="machine-wrap">
          <KenoBallRack random={random} hits={hits} />
          <Display
            bet={bet}
            marked={marked.length}
            hits={hit}
            credit={credit}
            winnings={winnings}
          />
          <div className="spacer-200" />
          <SingleCard data={this.state.kenoNumbers} numSelect={this.numClick} />
        </div>
        <div className="button-wrap">
          <Buttons
            betPlus={this.betPlus}
            betMinus={this.betMinus}
            betMax={this.betMax}
            clear={this.clearSingleCard}
            add={this.addCredit}
            pick={this.quickPick}
            deal={this.initDeal}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Machine;
