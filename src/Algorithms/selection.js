import { swap } from "./Utility";

export function getSelectionSortAnimations(arr) {
  const copy = [...arr];
  const animations = [];
  var j , min_index ; 
  for (let i = 0; i < copy.length; i++) {
    min_index = i ;
    for (j = i + 1; j < copy.length; j++) {
      animations.push([[j, min_index], false]);
      if (copy[j] < copy[min_index]) {
        min_index = j;
      }
    }
    animations.push([[i, copy[min_index]], true]);
    animations.push([[min_index, copy[i]], true]);
    swap(copy, min_index, i);
  }
  return animations;
}