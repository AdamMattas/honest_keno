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
  console.log(hits);
  random.forEach(num => {
    if (numbers[num - 1]) numbers[num - 1].active = true;
    //console.log("CALLED RAND!", numbers[num - 1]);
  });

  hits.forEach(num => {
    numbers[num - 1].hit = true;
    //console.log(numbers[num - 1]);
  });

  return numbers;
}

export function setQuickPick(random, numbers) {
  random.forEach(num => {
    numbers[num - 1].selected = true;
    //console.log(numbers[num - 1]);
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

export function createNumbers(numbers) {
  const kenoNumbers = [];

  numbers.forEach(num => {
    const kenoNumber = {
      number: num,
      active: false,
      selected: false,
      hit: false
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
  //const marked = [...this.state.marked];
  if (marked.length < 10) {
    const zeroIndex = number - 1;
    //let numbers = [...this.state.kenoNumbers];
    kenoNumbers[zeroIndex].selected = true;

    marked.push(number);

    //this.setState({ kenoNumbers: numbers, marked: marked });
    return { kenoNumbers, marked };
  }
}

export default {
  generate,
  setNumberStatus,
  compareNumbers,
  createNumbers,
  listNumbers,
  setQuickPick,
  selectNumber
};
