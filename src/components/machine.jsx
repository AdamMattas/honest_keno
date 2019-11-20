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
    hit: "0",
    hits: [],
    denomination: "",
    denomOption: [0.01, 0.05, 0.1, 0.25],
    bet: 0,
    maxBet: 5,
    newBet: false,
    credit: 30,
    creditType: "dollar",
    addCredit: 100,
    winnings: 0,
    status: "ready",
    lastBet: 0,
    lastMarked: 0,
    delayExponent: 2,
    randomHitOrder: [],
    activePayLine: null
  };

  componentDidMount() {
    const { denomination, denomOption } = this.state;
    const numbers = dealer.listNumbers(1, 80);
    const kenoNumbers = dealer.createNumbers(numbers);
    const getDenom = dealer.setDenomination(denomination, denomOption);
    this.setState({ numbers, kenoNumbers, denomination: getDenom });
  }

  componentDidUpdate() {
    //console.log("New Bet: ", this.state.newBet);
    //console.log("Last Bet: ", this.state.lastBet);
    //console.log("Last Marked: ", this.state.lastMarked);
    //console.log("UPDATE KENO NUMBERS", this.state.kenoNumbers);
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
    //console.log("1st KENO NUMBERS: ", kenoNumbers);
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
      this.setState({ kenoNumbers: setNumbers, status: "running" });
      setTimeout(() => {
        this.deal(setNumbers, credit);
      }, 100);
    }
  };

  deal = (numbers, credit) => {
    //console.log("NUMBERS DEAL FUNCTION: ", numbers);
    const { marked, bet } = this.state;
    const random = dealer.generate(20);
    const hits = dealer.compareNumbers(random, marked);
    const winnings = calculator.calculateWinnings(hits, marked, bet);
    credit = credit + winnings;
    const randomHitOrder = dealer.randomHitOrder(random, hits);
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
      lastMarked: marked.length,
      randomHitOrder,
      activePayLine: null
    });
    this.payLine(randomHitOrder, marked.length, this.state.delayExponent);
    setTimeout(() => {
      this.setState({ status: "ready" });
    }, 1900 * this.state.delayExponent);
  };

  payLine = (order, marked, delay) => {
    console.log("PAY LINE! ", order); // [{obj}]
    console.log("PAY LINE MARKED! ", marked);
    console.log("PAY LINE DELAY! ", delay);
    const payArray = calculator.payTable(marked);
    console.log("PAY LINE FROM TABLE! ", payArray);
    order.forEach(num => {
      const payIndex = order.indexOf(num);
      if (payArray[payIndex] > 0) {
        num.pay = true;
        num.divId = payIndex + 1;
        num.delay = dealer.payDelay()[num.index];
        this.setPayLine(num.divId, num.delay);
      } else {
        num.pay = false;
      }
      console.log("PAY LINE INDEX!", payIndex);

      console.log("PAY LINE NUM!", order);
    });
  };

  setPayLine = (divId, delay) => {
    setTimeout(() => {
      this.setState({ activePayLine: divId });
    }, delay * this.state.delayExponent);
  };

  clearBet = () => {
    const bet = 0;
    this.setState({ bet });
  };

  clearSingleCard = () => {
    if (this.state.status === "ready") {
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
    }
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
    if (this.state.status === "ready") {
      this.clearSingleCard();
      let numbers = [...this.state.kenoNumbers];
      const lastMarked = this.state.lastMarked;
      const random = dealer.generate(lastMarked);
      //console.log("Random: ", random);
      const kenoNumbers = dealer.setQuickPick(random, numbers);
      this.setState({ kenoNumbers, marked: random });
    }
  };

  changeDenom = () => {
    if (this.state.status === "ready") {
      const { denomination, denomOption } = this.state;
      const getDenom = dealer.setDenomination(denomination, denomOption);
      this.setState({ denomination: getDenom });
    }
  };

  toggleCredits = () => {
    if (this.state.status === "ready") {
      console.log("CLICKED!!!!!!!!!!!!!");
      const creditType =
        this.state.creditType === "dollar" ? "credit" : "dollar";
      this.setState({ creditType });
    }
  };

  render() {
    const {
      activePayLine,
      bet,
      marked,
      random,
      hit,
      hits,
      kenoNumbers,
      credit,
      creditType,
      denomination,
      winnings
    } = this.state;

    return (
      <React.Fragment>
        <KenoBallRack random={random} hits={hits} />
        <div className="machine-wrap">
          <Display
            active={activePayLine}
            bet={bet}
            marked={marked.length}
            hits={hit}
            credit={credit}
            denom={denomination}
            type={creditType}
            winnings={winnings}
            toggleCredits={this.toggleCredits}
          />
          <div className="spacer-200"></div>
          <SingleCard
            data={kenoNumbers}
            denom={denomination}
            changeDenom={this.changeDenom}
            numSelect={this.numClick}
          />
        </div>
        <Buttons
          betPlus={this.betPlus}
          betMinus={this.betMinus}
          betMax={this.betMax}
          clear={this.clearSingleCard}
          add={this.addCredit}
          pick={this.quickPick}
          deal={this.initDeal}
          status={this.state.status}
        />
      </React.Fragment>
    );
  }
}

export default Machine;
