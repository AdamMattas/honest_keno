import React, { Component } from "react";
import Buttons from "./buttons";
import Display from "./display";
import SingleCard from "./singleCard";
import KenoBallRack from "./kenoBallRack";
import KenoBallRackLast from "./kenoBallRackLast";
import calculator from "./workers/calculator";
import dealer from "./workers/dealer";
import sounds from "./workers/sounds";
import operations from "./workers/operations";

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
    credit: 10.0,
    creditType: "dollar",
    addCredit: 10.0,
    winnings: 0,
    status: "ready",
    lastBet: 0,
    lastMarked: 0,
    delayExponent: 2,
    randomHitOrder: [],
    activePayLine: null,
    volume: 0.5,
    betHint: false
  };

  // Init keno numbers and set denomination
  componentDidMount() {
    const { denomination, denomOption } = this.state;
    const numbers = dealer.listNumbers(1, 80);
    const kenoNumbers = dealer.createNumbers(numbers);
    const getDenom = dealer.setDenomination(denomination, denomOption);
    this.setState({ numbers, kenoNumbers, denomination: getDenom });
  }

  // Route numClick to select or deselect function
  numClick = (e, number) => {
    if (this.state.status === "ready") {
      this.softInit();
      const { marked, kenoNumbers } = this.state;
      const isSelected = e.currentTarget.classList.contains("selected");
      const returnSelected = isSelected
        ? dealer.deselectNumber(number, marked, kenoNumbers)
        : dealer.selectNumber(number, marked, kenoNumbers);
      this.setState({ returnSelected });
    }
  };

  simulateJackPot = (picked, hit) => {
    const { status, bet } = this.state;
    const kenoNumbers = [...this.state.kenoNumbers];

    if (status === "ready" && bet > 0) {
      const setNumbers = dealer.setNumberDeal(kenoNumbers);
      const random = dealer.simulate(picked, hit);

      this.setState({
        kenoNumbers: setNumbers,
        hitDelayed: "",
        marked: random.simMarked,
        kenoBallStatus: "remove"
      });
      setTimeout(() => {
        this.simulate(setNumbers, random);
      }, 100);
    }
  };

  simulate = (numbers, random) => {
    console.log("SIMNUMBERS", random);
    const { bet, volume, delayExponent, denomination } = this.state;
    const hits = dealer.compareNumbers(random.simNumbers, random.simMarked);
    //const winnings = calculator.calculateWinnings(hits, random.simMarked, bet);
    const winnings = calculator.calculateWinnings(
      hits,
      random.simMarked,
      bet,
      denomination
    );
    const credit = this.state.credit + winnings;
    const randomHitOrder = dealer.randomHitOrder(random.simNumbers, hits);
    const kenoNumbers = dealer.setNumberStatus(
      random.simNumbers,
      hits,
      numbers
    );
    sounds.playSounds(volume, random.simNumbers, hits, delayExponent);
    this.setState({
      kenoNumbers,
      kenoBallExit: true,
      random: random.simNumbers,
      winnings,
      hit: hits.length,
      hits,
      newBet: false,
      lastBet: bet,
      randomHitOrder,
      activePayLine: null
    });
    if (this.state.firstPlay) this.firstPlay();
    this.payLine(randomHitOrder, random.simMarked.length, delayExponent);
    this.hitTiming(randomHitOrder);
    this.setState({ kenoBallStatus: "add" });

    setTimeout(() => {
      if (this.state.activePayLine) {
        sounds.playWinSound(volume, winnings, denomination);
        this.creditRoll(winnings, denomination); //Animate credit increase
      }
    }, 2000 * delayExponent);

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

  // Reset keno ball state
  softInit = () => {
    if (this.state.status === "ready") {
      const setNumbers = dealer.setNumberDeal([...this.state.kenoNumbers]);
      this.setState({
        kenoNumbers: setNumbers
      });
    }
  };

  initDeal = () => {
    const { status, bet, credit, denomination, lastBet, marked } = this.state;
    const kenoNumbers = [...this.state.kenoNumbers];
    const amount = bet * denomination;
    if (lastBet > credit) {
      //console.log("Last Bet: ", lastBet, "Credit: ", credit);
    }

    console.log("CREDIT MAIN: ", credit);
    console.log("BET MAIN: ", bet);

    if (status === "ready" && bet < 1) this.setState({ betHint: true });

    if (
      status === "ready" &&
      bet > 0 &&
      credit >= amount &&
      marked.length > 1
    ) {
      let credit = this.state.credit - bet * denomination;
      const setNumbers = dealer.setNumberDeal(kenoNumbers);
      this.setState({
        credit,
        kenoNumbers: setNumbers,
        hitDelayed: "",
        status: "running",
        kenoBallStatus: "remove"
      });
      // Delay to allow state to update before deal
      // Fix?
      setTimeout(() => {
        this.deal(setNumbers, credit);
      }, 100);
    }
  };

  deal = (numbers, credit) => {
    const { marked, bet, volume, delayExponent, denomination } = this.state;
    const random = dealer.generate(20);
    const hits = dealer.compareNumbers(random, marked);
    const winnings = calculator.calculateWinnings(
      hits,
      marked,
      bet,
      denomination
    );
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
      if (this.state.activePayLine) {
        sounds.playWinSound(volume, winnings, denomination);
        this.creditRoll(winnings, denomination); //Animate credit increase
      }
    }, 2000 * delayExponent);
    setTimeout(() => {
      this.setState({
        status: "ready",
        //credit,
        kenoBallExit: false,
        randomLast: this.state.random,
        hitsLast: this.state.hits
      });
    }, 2500 * delayExponent);
  };

  creditRoll = (winnings, denomination) => {
    // 16 = 16, 20 = 32, 100 = 48, 1000 = 64
    let prevCredit = this.state.credit;
    let tempCredit = prevCredit;
    let timeBase = 105;
    let time = 0;
    let increment = Math.round(winnings / 64);
    let original = winnings;

    winnings = winnings / denomination;

    if (winnings < 17) increment = 1;

    if (winnings > 16 && winnings < 100) increment = Math.round(winnings / 32);

    if (winnings > 99 && winnings < 1000) increment = Math.round(winnings / 48);

    for (let i = increment; i <= winnings; i += increment) {
      tempCredit += increment * denomination;
      this.creditTimeout(time, tempCredit);
      time = time += timeBase;
    }
    time = time += timeBase;
    const realCredit = (prevCredit += original);
    this.creditTimeout(time, realCredit);
  };

  creditTimeout = (time, credit) => {
    setTimeout(() => {
      this.setState({ credit });
    }, time);
  };

  firstPlay = () => {
    this.setState({ firstPlay: false });
  };

  payLine = (order, marked, delay) => {
    const payArray = calculator.payTable(marked);
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
      num.delay = dealer.payDelay()[num.index];
      hit++;
      this.setHit(hit, num.delay);
    });
  };

  setHit = (hit, delay) => {
    setTimeout(() => {
      this.setState({ hitDelayed: hit });
    }, delay * this.state.delayExponent);
  };

  clearBet = () => {
    this.setState({ bet: 0 });
  };

  clearSingleCard = () => {
    if (this.state.status === "ready") {
      const kenoNumbers = dealer.clearCard([...this.state.kenoNumbers]);
      this.setState({ kenoNumbers, marked: [] });
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
    let bet = this.state.bet;
    if (bet < 5) {
      bet++;
      this.setState({ bet, newBet: true });
    }
  };

  betMinus = () => {
    let bet = this.state.bet;
    if (bet > 0) {
      bet--;
      this.setState({ bet, newBet: true });
    }
  };

  betMax = () => {
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
      betHint,
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
          betHint={betHint}
          betPlus={this.betPlus}
          betMinus={this.betMinus}
          betMax={this.betMax}
          clear={this.clearSingleCard}
          add={this.addCredit}
          pick={this.quickPick}
          deal={this.initDeal}
          status={this.state.status}
          simulate={this.simulateJackPot}
        />
      </React.Fragment>
    );
  }
}

export default Machine;
