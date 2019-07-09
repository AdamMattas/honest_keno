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
  console.log("KENO NUMBERS: ", kenoNumbers);
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

export default {
  generate,
  setNumberStatus,
  setNumberDeal,
  compareNumbers,
  createNumbers,
  listNumbers,
  setQuickPick,
  selectNumber,
  deselectNumber
};
