// export function selectNumber(number, marked, kenoNumbers) {
//   if (marked.length < 10) {
//     const zeroIndex = number - 1;
//     kenoNumbers[zeroIndex].selected = true;
//     marked.push(number);
//     return { kenoNumbers, marked };
//   }
// }

// export function deselectNumber(number, marked, kenoNumbers) {
//   if (marked.length > 0) {
//     const zeroIndex = number - 1;
//     const index = marked.indexOf(number);
//     marked.splice(index, 1);
//     kenoNumbers[zeroIndex].selected = false;
//     return { kenoNumbers, marked };
//   }
// }

// export default {
//   selectNumber,
//   deselectNumber
// };
