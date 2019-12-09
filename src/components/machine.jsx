import React, { Component } from "react";
import Buttons from "./buttons";
import Display from "./display";
import SingleCard from "./singleCard";
import KenoBallRack from "./kenoBallRack";
import KenoBallRackLast from "./kenoBallRackLast";
import calculator from "./workers/calculator";
import dealer from "./workers/dealer";
import sounds from "./workers/sounds";

class Machine extends Component {
  state = {
    random: [],
    randomLast: [],
    numbers: [],
    kenoNumbers: [],
    kenoNumbersLast: [],
    kenoBallStatus: "",
    kenoBallExit: false,
    marked: [],
    firstPlay: true,
    hitNumbers: [],
    hit: "0",
    hits: [],
    hitsLast: [],
    hitDelayed: "",
    denomination: "",
    denomOption: [0.01, 0.05, 0.1, 0.25],
    bet: 0,
    maxBet: 5,
    newBet: true,
    credit: 30,
    creditType: "dollar",
    addCredit: 100,
    winnings: 0,
    status: "ready",
    lastBet: 0,
    lastMarked: 0,
    delayExponent: 2,
    randomHitOrder: [],
    activePayLine: null,
    volume: 0.5
  };

  componentDidMount() {
    const { denomination, denomOption } = this.state;
    const numbers = dealer.listNumbers(1, 80);
    const kenoNumbers = dealer.createNumbers(numbers);
    const getDenom = dealer.setDenomination(denomination, denomOption);
    // sounds.createSounds(this.state.volume);
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
    this.softInit();
    const { marked, kenoNumbers } = this.state;
    const returnSelected = dealer.selectNumber(number, marked, kenoNumbers);
    this.setState({ returnSelected });
  };

  deselectNumber = number => {
    this.softInit();
    const { marked, kenoNumbers } = this.state;
    const returnDeselected = dealer.deselectNumber(number, marked, kenoNumbers);
    this.setState({ returnDeselected });
  };

  softInit = () => {
    const status = this.state.status;
    const kenoNumbers = [...this.state.kenoNumbers];

    if (status === "ready") {
      const setNumbers = dealer.setNumberDeal(kenoNumbers);

      this.setState({
        kenoNumbers: setNumbers
      });
    }
  };

  initDeal = () => {
    const { status, bet, lastBet, credit, marked } = this.state;
    const kenoNumbers = [...this.state.kenoNumbers];
    if (lastBet > credit) {
      //console.log("Last Bet: ", lastBet, "Credit: ", credit);
    }

    if (status === "ready" && bet > 0 && credit >= bet && marked.length > 1) {
      let credit = this.state.credit;
      credit = credit - bet;
      const setNumbers = dealer.setNumberDeal(kenoNumbers);
      // this.setState({ kenoNumbers: setNumbers }, () => {
      //   this.deal(setNumbers, credit);
      // });
      this.setState({
        credit,
        kenoNumbers: setNumbers,
        hitDelayed: "",
        status: "running",
        kenoBallStatus: "remove"
      });
      setTimeout(() => {
        this.deal(setNumbers, credit);
      }, 100);
    }
  };

  deal = (numbers, credit) => {
    const { marked, bet, volume, delayExponent } = this.state;
    const random = dealer.generate(20);
    const hits = dealer.compareNumbers(random, marked);
    const winnings = calculator.calculateWinnings(hits, marked, bet);
    credit = credit + winnings;
    const randomHitOrder = dealer.randomHitOrder(random, hits);
    const kenoNumbers = dealer.setNumberStatus(random, hits, numbers);
    sounds.playSounds(volume, random, hits, delayExponent);
    this.setState({
      kenoNumbers,
      kenoBallExit: true,
      random,
      winnings,
      hit: hits.length,
      hits,
      newBet: false,
      lastBet: bet,
      lastMarked: marked.length,
      randomHitOrder,
      activePayLine: null
    });
    if (this.state.firstPlay) this.firstPlay();
    this.payLine(randomHitOrder, marked.length, delayExponent);
    this.hitTiming(randomHitOrder);
    this.setState({ kenoBallStatus: "add" });
    setTimeout(() => {
      this.setState({
        status: "ready",
        credit,
        kenoBallExit: false,
        randomLast: this.state.random,
        hitsLast: this.state.hits
      });
    }, 2500 * delayExponent);
  };

  firstPlay = () => {
    this.setState({ firstPlay: false });
  };

  payLine = (order, marked, delay) => {
    //console.log("PAY LINE! ", order); // [{obj}]
    //console.log("PAY LINE MARKED! ", marked);
    //console.log("PAY LINE DELAY! ", delay);
    const payArray = calculator.payTable(marked);
    //console.log("PAY LINE FROM TABLE! ", payArray);
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
      //console.log("PAY LINE INDEX!", payIndex);

      //console.log("PAY LINE NUM!", order);
    });
  };

  setPayLine = (divId, delay) => {
    setTimeout(() => {
      this.setState({ activePayLine: divId });
    }, delay * this.state.delayExponent);
  };

  hitTiming = order => {
    let hit = 0;
    order.forEach(num => {
      //console.log("HIT TIMING ORDER: ", order);
      num.delay = dealer.payDelay()[num.index];
      //console.log("HIT TIMING: ", num);
      hit++;
      this.setHit(hit, num.delay);
    });
  };

  setHit = (hit, delay) => {
    setTimeout(() => {
      this.setState({ hitDelayed: hit });
      //console.log("HIT DELAYED: ", this.state.hitDelayed);
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
      this.clearBet();
      this.setState({ credit });
    }
  };

  betPlus = () => {
    //let credit = this.state.credit;
    let bet = this.state.bet;
    if (bet < 5) {
      //credit--;
      bet++;
      this.setState({ bet, newBet: true });
    }
  };

  betMinus = () => {
    //let credit = this.state.credit;
    let bet = this.state.bet;
    if (bet > 0) {
      //credit++;
      bet--;
      this.setState({ bet, newBet: true });
    }
  };

  betMax = () => {
    // const maxBet = this.state.maxBet;
    // let credit = this.state.credit;
    // let bet = this.state.bet;
    // let betDiff = maxBet - bet;
    // if (betDiff > 0 && credit >= betDiff) {
    //   credit -= betDiff;
    //   bet += betDiff;
    //   this.setState({ credit, bet, newBet: true });
    // }

    // if (credit < betDiff) {
    //   bet = bet + credit;
    //   credit = 0;
    //   this.setState({ bet, credit, newBet: true });
    // }
    this.setState({ bet: this.state.maxBet });
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
      randomLast,
      hit,
      hits,
      hitsLast,
      hitDelayed,
      kenoNumbers,
      kenoBallStatus,
      kenoBallExit,
      credit,
      creditType,
      denomination,
      winnings
    } = this.state;

    return (
      <React.Fragment>
        <div className="machine-wrap">
          <Display
            active={activePayLine}
            bet={bet}
            marked={marked.length}
            hits={hit}
            hitDelayed={hitDelayed}
            credit={credit}
            denom={denomination}
            type={creditType}
            winnings={winnings}
            toggleCredits={this.toggleCredits}
          />

          <KenoBallRackLast
            fade={kenoBallExit}
            random={randomLast}
            hits={hitsLast}
          />
          <KenoBallRack status={kenoBallStatus} random={random} hits={hits} />
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
