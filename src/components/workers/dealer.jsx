export function generate(quantity) {
  let genNumbers = [];
  for (let i = 0; i < quantity; ) {
    const random = Math.floor(Math.random() * 80 + 1);
    const duplicate = genNumbers.indexOf(random);
    if (duplicate === -1) {
      genNumbers.push(random);
      i++;
    }
  }
  return genNumbers;
}

export function setNumberStatus(random, hits, numbers) {
  // console.log("RANDOM: ", random);
  // console.log("HITS: ", hits);
  // console.log("NUMBERS: ", numbers);
  random.forEach((num, i) => {
    if (numbers[num - 1]) {
      numbers[num - 1].active = true;
      numbers[num - 1].randomOrder = i + 1;
    }
  });

  hits.forEach(num => {
    numbers[num - 1].hit = true;
  });
  return numbers;
}

export function setNumberDeal(kenoNumbers) {
  //console.log("KENO NUMBERS: ", kenoNumbers);
  kenoNumbers.forEach(num => {
    //const zeroIndex = num.number - 1;
    //if (kenoNumbers[zeroIndex]) {
    num.active = false;
    num.hit = false;
    num.randomOrder = null;
    //}
  });
  return kenoNumbers;
}

export function setQuickPick(random, numbers) {
  random.forEach(num => {
    numbers[num - 1].selected = true;
  });
  return numbers;
}

export function compareNumbers(random, player) {
  let hits = [];
  player.forEach(num => {
    const hit = random.indexOf(num);
    if (hit !== -1) hits.push(num);
  });
  return hits;
}

export function randomHitOrder(random, hits) {
  const hitOrder = [];
  hits.forEach(num => {
    const index = random.indexOf(num);
    hitOrder.push({ hit: num, index, pay: null, divId: null, delay: null });
  });
  function compare(a, b) {
    if (a.index < b.index) {
      return -1;
    }
    if (a.index > b.index) {
      return 1;
    }
    return 0;
  }

  hitOrder.sort(compare);
  return hitOrder;
}

export function payDelay() {
  // const delay = [
  //   0,
  //   100,
  //   200,
  //   300,
  //   400,
  //   500,
  //   600,
  //   700,
  //   800,
  //   900,
  //   1000,
  //   1100,
  //   1200,
  //   1300,
  //   1400,
  //   1500,
  //   1600,
  //   1700,
  //   1800,
  //   1900
  // ];
  const delay = [];

  for (let i = 100; i <= 1900; i += 100) {
    delay.push(i);
  }

  console.log("DELAY ARRAY COMPILED: ", delay);

  return delay;
}

export function createNumbers(numbers) {
  const kenoNumbers = [];
  numbers.forEach(num => {
    const kenoNumber = {
      number: num,
      active: false,
      selected: false,
      hit: false,
      sound: false,
      randomOrder: null
    };
    kenoNumbers.push(kenoNumber);
  });
  return kenoNumbers;
}

export function listNumbers(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((item, index) => start + index);
}

// export function getCurrentUser() {
//   try {
//     const jwt = localStorage.getItem(tokenKey);
//     return jwtDecode(jwt);
//   } catch (ex) {
//     return null;
//   }
// }

export function selectNumber(number, marked, kenoNumbers) {
  if (marked.length < 10) {
    const zeroIndex = number - 1;
    kenoNumbers[zeroIndex].selected = true;
    marked.push(number);
    return { kenoNumbers, marked };
  }
}

export function deselectNumber(number, marked, kenoNumbers) {
  if (marked.length > 0) {
    const zeroIndex = number - 1;
    const index = marked.indexOf(number);
    marked.splice(index, 1);
    kenoNumbers[zeroIndex].selected = false;
    return { kenoNumbers, marked };
  }
}

export function setDenomination(denom, options) {
  if (!denom) return 0.25;
  if (denom) {
    let index = options.indexOf(denom);
    if (index === 3) return options[0];
    index++;
    return options[index];
  }
}

export default {
  generate,
  setNumberStatus,
  setNumberDeal,
  compareNumbers,
  randomHitOrder,
  payDelay,
  createNumbers,
  listNumbers,
  setQuickPick,
  selectNumber,
  deselectNumber,
  setDenomination
};
