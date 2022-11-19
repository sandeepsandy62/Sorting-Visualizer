import { Box, Flex} from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import Visualizer from "./components/Visualizer";

import React , {useEffect, useState} from "react";




const App = ()=> {
    //to store numbers which need to be sorted
    const [arr,setArr] = useState([]);
    
    //boolean variable to check whether array is generating or not
    //const [generating,setGenerating] = useState(false);
    
    //boolean variable to check whether array is sorting or not
   // const [sorting,setSorting] = useState(false);

    //To generate random array
    const generateArr = (formState) => {
      //setGenerating(true);
      setTimeout(()=>{
          let newArr = [];
          while(newArr.length <= formState.size){
          let random = Math.floor(Math.random()*(200-10)+10);
          if(newArr.indexOf(random) === -1){
              newArr.push(random);
          }
      }
      setArr([...newArr]);
         // setGenerating(false);
      },500);
    };
  
    //runs on first render only
    useEffect(()=>{
      generateArr({size:10});
    },[])
    
    //Bubble sort algorithm
    const bubblesort = () => {
      setTimeout(() => {
        let newArr = [...arr];
        for (let i = 0; i < arr.length - 1; i++) {
          setTimeout(() => {
            for (let j = i + 1; j < arr.length; j++) {
              if (newArr[i] > newArr[j]) {
                let temp = newArr[i];
                newArr[i] = newArr[j];
                newArr[j] = temp;
                let newStep = [...newArr];
                setTimeout(() => {
                  setArr([...newStep]);
                }, j * 100);
              }
              
            }
          }, i * 1000);
        }
      }, 500);
    };

    //insertion sort algorithm
    
    const insertionsort = () =>{
      setTimeout(()=>{
        let newArr = [...arr];
        for (let i = 1; i < arr.length; i++) {
          setTimeout(() => {
           let key = newArr[i];
           let j = i-1 ;
           while(j >= 0 && newArr[j] > key){
            newArr[j+1] = newArr[j];
            j = j-1 ;
           }
           newArr[j+1] = key;
           let newStep = [...newArr];
           setTimeout(() => {
            setArr([...newStep]);
          }, j * 100);
          }, i * 1000);
        }
      },500);
    }


    //selection sort algorithm

    const selectionsort = () => {
    setTimeout(()=>{
      let newArr = [...arr];
      for(let i = 0 ; i < arr.length-1 ; i++){
        setTimeout(()=>{
       let  min_idx = i , j ;
        for(j = i+1 ; j < arr.length ; j++){
          if(newArr[j] < newArr[min_idx]){
            min_idx = j ;
          }
        }

        let temp = newArr[min_idx];
        newArr[min_idx] = newArr[i];
        newArr[i] = temp;

        let newStep = [...newArr];
        setTimeout(() => {
          setArr([...newStep]);
        }, j * 100);

        },i*1000);
      }
    },500);
    }

    //merge sort algorithm

    const mergesort = () => {
    }

    

    //quick sort algorithm

    const quicksort = () => {

    }


    return(
        <Box p={"4"}>
            <Flex gap={"4"} flexDirection="column">
                <Sidebar
                generateArr={generateArr}
                sort = {selectionsort}
                >
                </Sidebar>
                
                <Visualizer data={arr}></Visualizer>
            </Flex>
        </Box>
    );
}

export default App