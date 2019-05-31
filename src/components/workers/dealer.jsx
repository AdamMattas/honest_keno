export function deal() {
  let genNumbers = [];

  for (let i = 0; i < 20; ) {
    const random = Math.floor(Math.random() * 80 + 1);
    const duplicate = genNumbers.indexOf(random);

    if (duplicate === -1) {
      genNumbers.push(random);
      i++;
    }
  }

  return genNumbers;
}

export function setStatus(random, hits, numbers) {
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

export default {
  deal,
  setStatus,
  compareNumbers,
  createNumbers,
  listNumbers
};
