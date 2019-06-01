const spots = [
  [0], //1
  [0, 15], //2
  [0, 2, 48], //3
  [0, 2, 5, 75], //4
  [0, 0, 3, 13, 838], //5
  [0, 0, 3, 4, 75, 1660], //6
  [0, 0, 1, 2, 22, 422, 7000], //7
  [0, 0, 0, 2, 13, 100, 1670, 10000], //8
  [0, 0, 0, 1, 6, 44, 362, 4700, 10000], //9
  [0, 0, 0, 0, 5, 24, 146, 1000, 4500, 10000] //10
];

export function calculateWinnings(hits, marked, bet) {
  console.log("SPOTS!", spots);
  console.log("Hits: ", hits);
  console.log("Marked: ", marked);
  console.log("Bet: ", bet);
  console.log("Won!", spots[marked.length - 1][hits.length - 1]);

  const winnings = spots[marked.length - 1][hits.length - 1] * bet;

  return winnings ? winnings : 0;
}

export default {
  calculateWinnings
};
