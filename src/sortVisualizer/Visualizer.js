import React, { useState, useEffect, useRef } from 'react';
import './Visualizer.css';
import { getQuickSortAnimations } from '../algorithms/quick';
import { getInsertionSortAnimations } from '../algorithms/insertion';
import { getMergeSortAnimations } from '../algorithms/merge';

//Constants which we use Frequently
const ARR_LEN = 150;
const MIN_NUM = 5;
const MAX_NUM = 80;
const DELAY = 5;
const ACCESSED_COLOUR = 'red';
const SORTED_COLOUR = 'green';

export default function SortVisualizer() {

  //for storing array elements
  const [arr, setArr] = useState([]);

  //for checking array is sorting or not
  const [isSorting, setIsSorting] = useState(false);

  //for checking array is sorted or not
  const [isSorted, setIsSorted] = useState(false);

  //useRef Hook allows you to persist values between renders
  const containerRef = useRef(null);

  //when ever re-render happens we will just initialize our array.
  useEffect(initialiseArray, []);


  function initialiseArray() {
    //this is for if some sorting is happening and someone interrupt 
    //by clicking create new array then , if not put this return 
    //array will change every time . 
    if (isSorting) return;

    //if array is already sorted then reset it to its initial state
    if (isSorted) resetArrayColour();

    //make Issorted as FALSE
    setIsSorted(false);

    //Creating a new array after every initialization
    const arr = [];
    for (let i = 0; i < ARR_LEN; i++) {
      arr.push((MAX_NUM - MIN_NUM) * (i / ARR_LEN) + MIN_NUM);
    }

    //shuffle it 
    shuffle(arr);

    //and finally set it 
    setArr(arr);
  }

  function mergeSort() {
    const animations = getMergeSortAnimations(arr);
    animateArrayUpdate(animations);
  }

  function insertionSort() {
    const animations = getInsertionSortAnimations(arr);
    animateArrayUpdate(animations);
  }

  function quickSort() {
    const animations = getQuickSortAnimations(arr);
    animateArrayUpdate(animations);
  }

  function bubbleSort() {
    const animations = getQuickSortAnimations(arr);
    animateArrayUpdate(animations);
  }

  function selectionSort() {
    const animations = getQuickSortAnimations(arr);
    animateArrayUpdate(animations);
  }

  function animateArrayUpdate(animations) {

    if (isSorting) return;
    setIsSorting(true);
    animations.forEach(([comparison, swapped], index) => {
      setTimeout(() => {
        if (!swapped) {
          if (comparison.length === 2) {
            const [i, j] = comparison;
            animateArrayAccess(i);
            animateArrayAccess(j);
          } else {
            const [i] = comparison;
            animateArrayAccess(i);
          }
        } else {
          setArr((prevArr) => {
            const [k, newValue] = comparison;
            const newArr = [...prevArr];
            newArr[k] = newValue;
            return newArr;
          });
        }
      }, index * DELAY);
    });
    setTimeout(() => {
      animateSortedArray();
    }, animations.length * DELAY);
  }

  function animateArrayAccess(index) {
    const arrayBars = containerRef.current.children;
    const arrayBarStyle = arrayBars[index].style;

    setTimeout(() => {
      arrayBarStyle.backgroundColor = ACCESSED_COLOUR;
    }, DELAY);

    setTimeout(() => {
      arrayBarStyle.backgroundColor = '';
    }, DELAY * 2);
    
  }

  function animateSortedArray() {
    const arrayBars = containerRef.current.children;
    for (let i = 0; i < arrayBars.length; i++) {
      const arrayBarStyle = arrayBars[i].style;
      setTimeout(
        () => (arrayBarStyle.backgroundColor = SORTED_COLOUR),
        i * DELAY,
      );
    }
    setTimeout(() => {
      setIsSorted(true);
      setIsSorting(false);
    }, arrayBars.length * DELAY);
  }

  function resetArrayColour() {
    const arrayBars = containerRef.current.children;
    for (let i = 0; i < arr.length; i++) {
      const arrayBarStyle = arrayBars[i].style;
      arrayBarStyle.backgroundColor = '';
    }
  }

  return (
    <div className="visualizer-container">
      
      {/* Array Bars */}
      <div className="array-container" ref={containerRef}>
        {
        arr.map((barHeight, index) => (

          <div
            className="array-bar"
            style={{
              height: `${barHeight}vmin`,
              width: `${100 / ARR_LEN}vw`,
            }}
            key={index}
          >
          </div>

        ))
        }
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <ul>
          <li>
            <button className="app-button" onClick={initialiseArray}>
              Create new array
            </button>
          </li>
          <li>
            <button className="app-button" onClick={mergeSort}>
              Merge sort
            </button>
          </li>
          <li>
            <button className="app-button" onClick={insertionSort}>
              Insertion sort
            </button>
          </li>
          <li>
            <button className="app-button" onClick={quickSort}>
              Quick sort
            </button>
          </li>
          <li>
            <button className='app-button' onClick={selectionSort}>
              Selection Sort</button>
          </li>
          <li>
            <button className='app-button' onClick={bubbleSort}>
              Bubble Sort</button>
          </li>
        </ul>
        

    </footer>

    </div>
  );
}


//generate array with random numbers
const shuffle = (arr) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
};